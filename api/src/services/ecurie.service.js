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
module.exports = {
   getParticipants,
    deleteParticipants
}