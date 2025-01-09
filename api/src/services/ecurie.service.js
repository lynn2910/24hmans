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

module.exports = {
   getParticipants
}