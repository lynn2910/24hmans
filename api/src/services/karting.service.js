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

function get_karting(karting_id, prestataire_id = null) {
    return new Promise(async (resolve, reject) => {
        try {
            let karting = await prisma.karting.findUnique({
                where: {
                    karting_id,
                },
                include: {
                    circuits: true,
                    reservations: {
                        include: {
                            reservation_slots: true,
                        }
                    }
                }
            });

            if (
                !karting
                || (!karting.enabled && karting.prestataire_id !== prestataire_id)
            ) {
                return reject({status: 401, message: "You don't have access to this karting"});
            }

            return resolve(karting);
        } catch (err) {
            console.error(err)
            return reject({status: 500, message: err.message});
        }
    })
}

module.exports = {
    get_available_kartings,
    get_karting
}