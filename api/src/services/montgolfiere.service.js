const prisma = require("../db");
const { v4: uuidv4 } = require("uuid");

// 🔹 GET toutes les montgolfières disponibles (enabled ou appartenant au prestataire)
function get_available_montgolfieres(prestataire_id = null) {
    const where = prestataire_id
        ? {
            OR: [
                { enabled: true },
                { prestataire_id: prestataire_id }
            ]
        }
        : { enabled: true };

    return prisma.montgolfiere.findMany({
        select: {
            montgolfiere_id: true,
            prestataire_id: true,
        },
        where,
    });
}

// 🔹 GET une montgolfière (avec sessions)
async function get_montgolfiere(montgolfiere_id, prestataire_id = null) {
    try {
        const montgolfiere = await prisma.montgolfiere.findUnique({
            where: { montgolfiere_id },
            include: {
                sessions: true, // sessions directes
            }
        });

        if (
            !montgolfiere ||
            (!montgolfiere.enabled && montgolfiere.prestataire_id !== prestataire_id)
        ) {
            throw { status: 401, message: "You don't have access to this montgolfiere" };
        }

        return montgolfiere;
    } catch (err) {
        console.error(err);
        throw { status: 500, message: err.message };
    }
}

// 🔹 CREATE montgolfière
function create_montgolfiere(prestataire_id) {
    return prisma.montgolfiere.create({
        data: {
            montgolfiere_id: uuidv4(),
            prestataire: {
                connect: { id: prestataire_id },
            },
        }
    });
}

// 🔹 GET toutes les sessions d'une montgolfière
function get_montgolfiere_sessions(montgolfiere_id) {
    return prisma.montgolfiereSessionSlot.findMany({
        where: { montgolfiere_id },
    });
}

// 🔹 CREATE session pour une montgolfière
function create_session(montgolfiere_id, body) {
    return prisma.montgolfiereSessionSlot.create({
        data: {
            session_id: uuidv4(),
            montgolfiere: {
                connect: { montgolfiere_id },
            },
            from_date: body.fromDate,
            to_date: body.toDate,
            maxSize: body.maxSize,
        }
    });
}

// 🔹 GET une session spécifique
function get_montgolfiere_session(session_id) {
    return prisma.montgolfiereSessionSlot.findUnique({
        where: { session_id },
    });
}

// 🔹 UPDATE une session
function update_session(session_id, data) {
    return prisma.montgolfiereSessionSlot.update({
        where: { session_id },
        data: {
            from_date: data.fromDate,
            to_date: data.toDate,
            maxSize: data.maxSize,
        }
    });
}

// 🔹 DELETE une session
function delete_session(session_id) {
    return prisma.montgolfiereSessionSlot.delete({
        where: { session_id }
    });
}

// 🔹 GET réservations d’un utilisateur
function get_user_reservations(user_id) {
    return prisma.userMontgolfiereReservation.findMany({
        where: { user_id },
        include: {
            session: true,
        }
    });
}

// 🔹 CREATE réservation
function create_reservation(session_id, user_id, pseudo) {
    return prisma.userMontgolfiereReservation.create({
        data: {
            pseudo,
            session: {
                connect: { session_id }
            },
            user: {
                connect: { id: user_id }
            }
        }
    });
}

// 🔹 UPDATE réservation
function update_reservation(reservation_id, pseudo) {
    return prisma.userMontgolfiereReservation.update({
        where: { reservation_id },
        data: { pseudo }
    });
}

// 🔹 DELETE réservation
function delete_reservation(reservation_id) {
    return prisma.userMontgolfiereReservation.delete({
        where: { reservation_id }
    });
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
};
