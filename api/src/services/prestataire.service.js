const prisma = require("../db");

function getPrestataire(prestataire_id) {
    return prisma.prestataire.findUnique({
        where: {id: prestataire_id},
        include: {
            links: true
        }
    });
}

function getPrestataireFromName(prestataire_name) {
    return prisma.prestataire.findFirst({
        where: {
            referencer: {
                equals: prestataire_name,
            }
        },
        include: {
            links: true
        }
    });
}

module.exports = {getPrestataire, getPrestataireFromName};