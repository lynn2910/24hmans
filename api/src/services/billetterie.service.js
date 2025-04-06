const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function getBilletterie(prestataire_id) {
    try {
        const billetterie = await prisma.billetteries.findFirst({
            where: {prestataire_id: prestataire_id},
            include: {
                BilletterieCategories: true,
                BilletterieForfaits: true,
                BilletteriePersonnes: true,
                prestataire: true,
            },
        });
        return billetterie;
    } catch (error) {
        console.error("Error fetching billetterie:", error);
        throw error;
    }
}

// Fonction pour récupérer les catégories
async function getBilletterieCategories(prestataire_id) {
    return await prisma.billetterieCategories.findMany({
        where: {billetterie_id: prestataire_id}
    });
}

// Fonction pour récupérer les forfaits
async function getBilletterieForfaits(prestataire_id) {
    return await prisma.billetterieForfaits.findMany({
        where: {billetterie_id: prestataire_id}
    });
}

// Fonction pour récupérer les types de personnes
async function getBilletteriePersonnes(prestataire_id) {
    return await prisma.billetteriePersonnes.findMany({
        where: {billetterie_id: prestataire_id}
    });
}


async function createNewOrder(userId, orderData) {
    try {

        const id = (await prisma.tickets.findMany()).length + 1
        const ticket = await prisma.tickets.create({
            data: {
                ticket_id: id,
                User: {
                    connect: {
                        id: userId,
                    },
                },
                billetterie: {
                    connect: {
                        billetterie_id: orderData.billetterie_id,
                    },
                },
                category: {
                    connect: {
                        category_id: orderData.category.category_id,
                    },
                },
                personnes: {
                    create: orderData.nbPersonnes.map(personne => ({
                        personne_type_id: personne.id,
                        quantity: personne.quantity !== null ? personne.quantity : 0,
                    })),
                },
            },
            include: {
                forfait: true,
                personnes: true,
            },
        });

        const asyncActions = orderData.date
            .map(async (forfait) => {
                await prisma.ticketBilletterieForfaits.create({
                    data: {
                        forfait: {
                            connect: {
                                forfait_id: forfait.forfait_id,
                            }
                        },
                        ticket: {
                            connect: {
                                ticket_id: id
                            }
                        }
                    }
                })
            });

        await Promise.all(asyncActions);

        return ticket;
    } catch (error) {
        console.error("Error creating ticket:", error);
        throw error;
    }
}

module.exports = {
    getBilletterie,
    getBilletterieCategories,
    getBilletterieForfaits,
    getBilletteriePersonnes,
    createNewOrder
}