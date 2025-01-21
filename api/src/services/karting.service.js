const prisma = require("../db")

function get_available_kartings(prestataire_id = null) {
    if (prestataire_id) {
        return prisma.karting.findMany({
            select: {
                karting_id: true,
                prestataire_id: true,
            },
            where: {
                OR: [
                    {
                        enabled: {
                            equals: true
                        }
                    },
                    {
                        prestataire_id: {
                            equals: prestataire_id
                        }
                    }
                ]
            }
        })
    } else {
        return prisma.karting.findMany({
            select: {
                karting_id: true,
                prestataire_id: true,
            },
            where: {
                enabled: {
                    equals: true
                }
            }
        })
    }
}

module.exports = {
    get_available_kartings
}