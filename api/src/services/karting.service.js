const prisma = require("../db");
const uuid = require("uuid");

function get_all_circuits(presta_id) {
    return prisma.kartingCircuit.findMany({
        select: {
            circuit_id: true,
            karting_id: true,
            karting: true,
            minAge: true,
            circuit_name: true,
            kart_power: true,
        },
        where: {
            karting: {
                prestataire_id: presta_id
            }
        }
    })
}

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
            let karting = await prisma.karting.findMany({
                where: {
                    karting_id,
                },
                include: {
                    circuits: true,
                }
            });

            let filteredKarting = karting.filter(k => k.enabled || k.prestataire_id === prestataire_id)[0]

            if (!filteredKarting) {
                return reject({status: 401, message: "You don't have access to this karting"});
            }

            return resolve(karting);
        } catch (err) {
            console.error(err)
            return reject({status: 500, message: err.message});
        }
    })
}

function create_karting(prestataire_id) {
    return new Promise(async (resolve, reject) => {
        const reservation_app = await prisma.reservationApp.create({
            data: {
                app_id: uuid.v4(),
            }
        });

        const karting = await prisma.karting.create({
            data: {
                karting_id: uuid.v4(),
                prestataire: {
                    connect: prestataire_id,
                },
                reservations: {
                    connect: reservation_app.app_id,
                }
            }
        });

        return resolve(karting);
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

function update_circuit(karting_id, circuit_id, updates) {
    return prisma.kartingCircuit.update({
        data: {
            minAge: updates.minAge,
            circuit_id: updates.circuit_id,
            kart_power: updates.kart_power,
        },
        where: {
            karting_id,
            circuit_id
        }
    })
}

function delete_circuit(karting_id, circuit_id) {
    return prisma.kartingCircuit.delete({
        where: {karting_id, circuit_id}
    })
}

/**
 * @param {string} circuit_id
 */
function get_karting_sessions(circuit_id) {
    return prisma.kartingSessionSlot.findMany({
        where: {
            circuit: {
                circuit_id: {equals: circuit_id}
            }
        },
    })
}

/**
 * @param {string} circuit_id
 * @param {{fromDate: string, toDate: string, maxSize: string}} body
 */
function create_session(circuit_id, body) {
    return prisma.kartingSessionSlot.create({
        data: {
            session_id: uuid.v4(),
            maxSize: body.maxSize,
            from_date: body.fromDate,
            to_date: body.toDate,
            circuit: {
                connect: {
                    circuit_id
                }
            }
        }
    })
}

function get_karting_session(circuit_id, session_id) {
    return prisma.kartingSessionSlot.findUnique({
        where: {
            circuit_id, session_id
        }
    })
}

function update_session(circuit_id, session_id, data) {
    return prisma.kartingSessionSlot.update({
        data: {
            maxSize: data.maxSize,
            from_date: data.fromDate,
            to_date: data.toDate
        },
        where: {
            circuit: {
                circuit_id
            }
        }
    })
}

function delete_session(circuit_id, session_id) {
    return prisma.kartingSessionSlot.delete({
        where: {
            circuit_id, session_id,
        }
    })
}

function get_user_reservations(user_id) {
    return prisma.userKartingSession.findMany({
        where: {
            user_id
        },
        include: {
            reservation_slot: true,
            circuit: true,
        }
    })
}

function create_reservation(circuit_id, session_id, user_id, pseudo) {
    return prisma.userKartingReservation.upsert({
        create: {
            pseudo,
            circuit: {
                connect: {circuit_id}
            },
            session: {
                connect: {session_id}
            },
            user: {
                connect: {id: user_id}
            }
        },
        update: {
            pseudo
        },
        where: {
            user_id,
            session_id,
            circuit_id
        }
    })
}

function update_reservation(reservation_id, user_id, pseudo) {
    return prisma.userKartingSession.update({
        data: {
            pseudo
        },
        where: {
            user_id,
            session_id: reservation_id,
        }
    })
}

function delete_reservation(user_id, user_reservation_id) {
    return prisma.userKartingSession.delete({
        where: {
            user_id,
            session_id: user_reservation_id,
        }
    })
}

module.exports = {
    get_available_kartings,
    get_karting,

    get_all_circuits,
    create_circuit,
    get_karting_circuit,
    update_circuit,
    delete_circuit,

    get_karting_sessions,
    get_karting_session,
    create_session,
    update_session,
    delete_session,

    get_user_reservations,
    create_reservation,
    update_reservation,
    delete_reservation
}