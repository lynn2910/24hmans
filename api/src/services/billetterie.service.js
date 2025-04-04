const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getBilletterie(prestataire_id) {
    try {
        const billetterie = await prisma.billetteries.findFirst({
            where: { prestataire_id: prestataire_id },
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

async function createNewOrder(userId, orderData) {
    try {
        const ticket = await prisma.tickets.create({
            data: {
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
                forfait: {
                    create: orderData.date.map(forfait => ({
                        forfait_id: forfait.forfait_id,
                    })),
                },
                personnes: {
                    create: orderData.nbPersonnes.map(personne => ({
                        personne_type_id: personne.personne_type_id,
                        quantity: personne.quantity !== null ? personne.quantity : 0,
                    })),
                },
            },
            include: {
                forfait: true,
                personnes: true,
            },
        });

        return ticket;
    } catch (error) {
        console.error("Error creating ticket:", error);
        throw error;
    }
}

module.exports = { getBilletterie, createNewOrder }