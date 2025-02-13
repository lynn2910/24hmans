const uuid = require("uuid").v4;
const prisma = require("../db")
const e = require("express");
const {addMailRequest} = require("./mail/mail.service");

function getParticipants(ecurie_id) {
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
            ecurie_id: ecurie_id,
        },
    });
}
// Fonction pour supprimer tous les participants d'une écurie
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

async function getRandomParticipants(ecurie_id) {
    try {
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
async function registerWinners(winners, ecurie_name) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!Array.isArray(winners) || winners.length !== 10) {
                return reject({ status: 400, message: "Exactly 10 winners must be provided" });
            }

            const winnerEntries = [];
            const winnerEmails = winners.map(winner => winner.email);

            for (const winner of winners) {
                const { email } = winner;

                const tryToFindUser = await prisma.formulaireEcurie.findFirst({
                    where: { email: { equals: email } }
                });

                if (!tryToFindUser) {
                    return reject({ status: 404, message: `User not found: ${email}` });
                }
                const { prenom: first_name, nom: last_name } = tryToFindUser;

                console.log(`Nom et prénom récupérés pour ${email}: ${first_name} ${last_name}`);

                winnerEntries.push({
                    where: { id: tryToFindUser.id },
                    data: {
                        is_winner: true,
                    }
                });
                await addMailRequest({
                    subject: `Félicitations, ${first_name} !`,
                    htmlPath: "ecurie/html_gagnant.ejs",
                    plainPath: "ecurie/ecurie_gagnant.ejs",
                    sendTo: email,
                    args: {
                        user: { email, first_name, last_name },
                        ecurie_name,
                        host: 'https://tonsite.com',
                    }
                });
            }
            for (const entry of winnerEntries) {
                await prisma.formulaireEcurie.update({
                    where: entry.where,
                    data: entry.data
                });
            }

            resolve({ message: "Winners registered successfully and marked in the database" });
        } catch (error) {
            console.error(`Cannot register winners: ${error.message}`, error);
            reject({ status: 500, message: error.message });
        }
    });
}

async function getRandomWinners() {
    // Récupérer tous les participants inscrits dans la base de données
    const participants = await prisma.formulaireEcurie.findMany({
        where: { is_winner: false }, // Sélectionner uniquement ceux qui ne sont pas déjà gagnants
    });

    // Mélanger les participants de manière aléatoire
    const shuffledParticipants = participants.sort(() => 0.5 - Math.random());

    // Sélectionner les 10 premiers gagnants aléatoires
    const winners = shuffledParticipants.slice(0, 10);

    // Appel à la fonction registerWinners pour enregistrer les gagnants
    await registerWinners(winners, 'Nom de l\'écurie');
}


module.exports = {
   getParticipants,
    deleteParticipants,
    getRandomParticipants,
    registerWinners
}