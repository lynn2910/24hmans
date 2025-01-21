const prisma = require("../db");
const uuid = require("uuid");

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

//
//
//          CIRCUIT
//
//

function create_circuit(karting_id, prestataire_id, {minAge, circuit_name, kart_power}) {
    return new Promise(async (resolve, reject) => {
        // Create karting if it doesn't exist
        let id = uuid.v4();

        try {
            let circuit_id = uuid.v4().toString();

            let circuit = await prisma.kartingCircuit.create({
                data: {
                    circuit_id, minAge, circuit_name, kart_power,
                    karting: {
                        connectOrCreate: {
                            create: {
                                karting_id: id,
                                prestataire: {
                                    connect: {
                                        id: prestataire_id,
                                    }
                                },
                                reservations: {
                                    create: {
                                        app_id: uuid.v4()
                                    }
                                }
                            },
                            where: {
                                karting_id
                            }
                        }
                    }
                },
            })

            return resolve(circuit);
        } catch (err) {
            console.error(err)
            return reject({status: 500, message: err.message});
        }
    })
}

function get_karting_circuit(karting_id, circuit_id, prestataire_id = null) {
    return new Promise(async (resolve, reject) => {
        try {
            let filter = prestataire_id ? {karting: {prestataire_id}} : {};

            let circuit = await prisma.kartingCircuit.findFirst({
                where: {
                    karting_id, circuit_id,
                    ...filter
                }
            });

            return resolve(circuit);
        } catch (err) {
            if (err.code === 'P2025') {
                return reject({status: 404, message: "Circuit not found"})
            }

            console.error(err)
            return reject({status: 500, message: err.message});
        }
    })
}

module.exports = {
    get_available_kartings,
    get_karting,

    create_circuit,
    get_karting_circuit
}