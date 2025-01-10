const uuid = require("uuid").v4;
const prisma = require("../db")
const e = require("express");

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

// Récupère 10 participants aléatoires
async function getRandomParticipants() {
    try {
        const totalParticipants = await prisma.formulaireEcurie.count();
        if (totalParticipants === 0) {
            return [];
        }
        const randomOffsets = [];
        while (randomOffsets.length < Math.min(10, totalParticipants)) {
            const randomIndex = Math.floor(Math.random() * totalParticipants);
            if (!randomOffsets.includes(randomIndex)) {
                randomOffsets.push(randomIndex);
            }
        }
        const participants = await prisma.formulaireEcurie.findMany({
            skip: Math.min(...randomOffsets),
            take: 10,
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

module.exports = {
   getParticipants,
    deleteParticipants,
    getRandomParticipants
}