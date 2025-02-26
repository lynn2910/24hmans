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

function get_karting_sessions(karting_id) {
    return prisma.kartingSessionSlot.findMany({
        where: {
            karting_id
        },
        include: {
            session_slot: true,
        },
    })
}

function create_session(karting_id, reservation_app_id, body) {
    return prisma.kartingSessionSlot.create({
        data: {
            session_id: uuid.v4(),
            karting: {
                connect: {karting_id},
            },
            session_slot: {
                create: {
                    reservation_id: uuid.v4(),
                    app: {
                        connect: {
                            app_id: reservation_app_id
                        }
                    },
                    from: body.fromDate,
                    to: body.toDate,
                    maxSize: body.maxSize,
                }
            }
        }
    })
}

function get_karting_session(karting_id, session_id) {
    return prisma.kartingSessionSlot.findUnique({
        where: {
            session_id, karting_id
        }
    })
}

function update_session(karting_id, session_id, data) {
    return prisma.kartingSessionSlot.update({
        data: {
            session_slot: {
                update: {
                    from: data.fromDate,
                    to: data.toDate,
                    maxSize: data.maxSize,
                }
            }
        }
    })
}

function delete_session(karting_id, session_id) {
    return prisma.kartingSessionSlot.delete({
        where: {
            karting_id, session_id,
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

function create_reservation(reservation_id, circuit_id, user_id, pseudo) {
    return prisma.userKartingSession.upsert({
        create: {
            pseudo,
            reservation_slot: {
                connect: {session_id: reservation_id}
            },
            circuit: {
                connect: {circuit_id}
            },
            user: {
                connect: {user_id}
            }
        },
        update: {
            pseudo
        },
        where: {
            user_id,
            reservation_slot: {
                session_id: reservation_id,
            }
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