const uuid = require("uuid").v4;
const prisma = require("../db")
const e = require("express");
const {addMailRequest} = require("./mail/mail.service");

async function getParticipants(presta_id, year) {
    return prisma.formulaireEcurie.findMany({
        select: {
            id: true,
            prenom: true,
            nom: true,
            email: true,
            tel: true,
            num_billet: true,
            submitted_at: true,
        },
        where: {
            ecurie: {
                prestataire_id: presta_id
            },
        },
    });
}

async function deleteParticipants(ecurie_id) {
    try {
        await prisma.formulaireEcurie.deleteMany({
            where: {
                ecurie_id: ecurie_id, // Filtre basé sur l'ID de l'écurie
            },
        });
    } catch (error) {
        console.error("Erreur lors de la suppression des participants :", error);
        throw new Error("Impossible de supprimer les participants.");
    }
}

async function getRandomParticipants(presta_id) {
    try {
        // Récupérer l'écurie en fonction de l'ID du prestataire
        const ecurie = await prisma.ecurie.findUnique({
            where: { prestataire_id: presta_id }, // Utilise le prestataire_id pour récupérer l'écurie
            select: { id: true } // On récupère uniquement l'ID de l'écurie
        });

        if (!ecurie) {
            throw { status: 404, message: "Aucune écurie trouvée pour ce prestataire." };
        }

        const ecurie_id = ecurie.id; // ID de l'écurie associée

        const totalParticipants = await prisma.formulaireEcurie.count({
            where: { ecurie_id: ecurie_id }, // Filtre par écurie
        });

        if (totalParticipants === 0) {
            return []; // Aucun participant pour cette écurie
        }

        const randomOffsets = [];
        while (randomOffsets.length < Math.min(10, totalParticipants)) {
            const randomIndex = Math.floor(Math.random() * totalParticipants);
            if (!randomOffsets.includes(randomIndex)) {
                randomOffsets.push(randomIndex);
            }
        }

        const participants = await prisma.formulaireEcurie.findMany({
            where: { ecurie_id: ecurie_id }, // Filtre par écurie
            take: 10,
            skip: Math.min(...randomOffsets), // Commence à l'indice le plus petit
            select: {
                id: true,
                prenom: true,
                nom: true,
                email: true,
                tel: true,
                num_billet: true,
                submitted_at: true,
            },
        });

        return participants;
    } catch (error) {
        console.error("Erreur lors de la récupération des participants aléatoires :", error);
        throw new Error("Impossible de récupérer les participants aléatoires.");
    }
}

async function registerWinners(winners, presta_id) {
    try {
        if (!Array.isArray(winners) || winners.length !== 10) {
            throw { status: 400, message: "Exactly 10 winners must be provided" };
        }

        // Récupérer l'écurie en fonction de l'ID du prestataire
        const ecurie = await prisma.ecurie.findUnique({
            where: { prestataire_id: presta_id }, // Utilise le prestataire_id pour récupérer l'écurie
            select: { name: true, prestataire_id: true } // Récupère le nom et prestataire_id
        });

        if (!ecurie) {
            throw { status: 404, message: `Écurie introuvable pour le prestataire avec l'ID : ${presta_id}` };
        }

        const ecurie_name = ecurie.name; // Nom de l'écurie
        const winnerEntries = [];

        for (const winner of winners) {
            const { email } = winner;

            const tryToFindUser = await prisma.formulaireEcurie.findFirst({
                where: { email: { equals: email }, ecurie_id: ecurie.id } // Recherche le participant dans l'écurie associée
            });

            if (!tryToFindUser) {
                throw { status: 404, message: `User not found in this ecurie: ${email}` };
            }

            const { prenom: first_name, nom: last_name } = tryToFindUser;

            console.log(`Nom et prénom récupérés pour ${email}: ${first_name} ${last_name}`);

            winnerEntries.push({
                where: { id: tryToFindUser.id },
                data: { is_winner: true }
            });

            await addMailRequest({
                subject: `Félicitations, ${first_name} !`,
                htmlPath: "ecurie/html_gagnant.ejs",
                plainPath: "ecurie/ecurie_gagnant.ejs",
                sendTo: email,
                args: {
                    user: { first_name, last_name },
                    ecurie_name,
                    host: 'http://localhost:8080/fr/login',
                }
            });
        }

        // Mettre à jour les participants pour les marquer comme gagnants
        for (const entry of winnerEntries) {
            await prisma.formulaireEcurie.update({
                where: entry.where,
                data: entry.data
            });
        }

        return { message: "Winners registered successfully and marked in the database" };
    } catch (error) {
        console.error(`Cannot register winners: ${error.message}`, error);
        throw { status: 500, message: error.message };
    }
}

async function getRandomWinners() {
    const participants = await prisma.formulaireEcurie.findMany({
        where: { is_winner: false },
    });
    const shuffledParticipants = participants.sort(() => 0.5 - Math.random());
    const winners = shuffledParticipants.slice(0, 10);
    await registerWinners(winners, 'Nom de l\'écurie');
}
async function getAllYears() {
    try {
        const years = await prisma.formulaireEcurie.findMany({
            distinct: ['year'],
            select: { year: true },
            orderBy: { year: 'desc' } // Trie par ordre décroissant
        });

        return years.map(y => y.year);
    } catch (error) {
        console.error("Erreur lors de la récupération des années :", error);
        throw new Error("Impossible de récupérer les années.");
    }
}



module.exports = {
    getParticipants,
    deleteParticipants,
    getRandomParticipants,
    registerWinners,
    getAllYears
}