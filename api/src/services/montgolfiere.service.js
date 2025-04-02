const prisma = require("../db");
const uuid = require("uuid");

function get_available_montgolfieres(prestataire_id = null) {
    if (prestataire_id) {
        return prisma.montgolfiere.findMany({
            select: {
                montgolfiere_id: true,
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
        return prisma.montgolfiere.findMany({
            select: {
                montgolfiere_id: true,
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

function get_montgolfiere(montgolfiere_id, prestataire_id = null) {
    return new Promise(async (resolve, reject) => {
        try {
            let montgolfiere = await prisma.montgolfiere.findUnique({
                where: {
                    montgolfiere_id,
                },
                include: {
                    reservations: {
                        include: {
                            reservation_slots: true,
                        }
                    }
                }
            });

            if (
                !montgolfiere
                || (!montgolfiere.enabled && montgolfiere.prestataire_id !== prestataire_id)
            ) {
                return reject({status: 401, message: "You don't have access to this montgolfiere"});
            }

            return resolve(montgolfiere);
        } catch (err) {
            console.error(err)
            return reject({status: 500, message: err.message});
        }
    })
}

function create_montgolfiere(prestataire_id) {
    return new Promise(async (resolve, reject) => {
        const reservation_app = await prisma.montgolfiereReservationApp.create({
            data: {
                app_id: uuid.v4(),
            }
        });

        const montgolfiere = await prisma.montgolfiere.create({
            data: {
                montgolfiere_id: uuid.v4(),
                prestataire: {
                    connect: { id: prestataire_id },
                },
                reservations: {
                    connect: { app_id: reservation_app.app_id },
                }
            }
        });

        return resolve(montgolfiere);
    })
}

function get_montgolfiere_sessions(montgolfiere_id) {
    return prisma.montgolfiereSessionSlot.findMany({
        where: {
            montgolfiere_id
        },
        include: {
            session_slot: true,
        },
    })
}

function create_session(montgolfiere_id, reservation_app_id, body) {
    return prisma.montgolfiereSessionSlot.create({
        data: {
            session_id: uuid.v4(),
            montgolfiere: {
                connect: { montgolfiere_id },
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

function get_montgolfiere_session(montgolfiere_id, session_id) {
    return prisma.montgolfiereSessionSlot.findUnique({
        where: {
            session_id, montgolfiere_id
        }
    })
}

function update_session(montgolfiere_id, session_id, data) {
    return prisma.montgolfiereSessionSlot.update({
        data: {
            session_slot: {
                update: {
                    from: data.fromDate,
                    to: data.toDate,
                    maxSize: data.maxSize,
                }
            }
        },
        where: {
            session_id,
            montgolfiere_id
        }
    })
}

function delete_session(montgolfiere_id, session_id) {
    return prisma.montgolfiereSessionSlot.delete({
        where: {
            montgolfiere_id, session_id,
        }
    })
}

function get_user_reservations(user_id) {
    return prisma.userMontgolfiereSession.findMany({
        where: {
            user_id
        },
        include: {
            reservation_slot: true,
        }
    })
}

function create_reservation(reservation_id, user_id, pseudo) {
    return prisma.userMontgolfiereSession.upsert({
        create: {
            pseudo,
            reservation_slot: {
                connect: {session_id: reservation_id}
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
    return prisma.userMontgolfiereSession.update({
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
    return prisma.userMontgolfiereSession.delete({
        where: {
            user_id,
            session_id: user_reservation_id,
        }
    })
}

module.exports = {
    get_available_montgolfieres,
    get_montgolfiere,
    create_montgolfiere,
    get_montgolfiere_sessions,
    get_montgolfiere_session,
    create_session,
    update_session,
    delete_session,
    get_user_reservations,
    create_reservation,
    update_reservation,
    delete_reservation
}
