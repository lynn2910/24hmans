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


// liens presta

async function getPrestataireLink(prestataireId, linkId) {
    const prestataire = await getPrestataire(prestataireId);
    if (!prestataire || !prestataire.links) {
        return null;
    }
    const link = prestataire.links.find(link => link.id === parseInt(linkId, 10));
    return link || null;
}

async function createPrestataireLink(prestataireId, linkData) {
    return new Promise(async (resolve, reject) => {
        try {
            let newLink = await prisma.prestataireLink.create({
                data: {
                    name: linkData.name,
                    url: linkData.url,
                    prestataire: {
                        connect: {id: prestataireId},
                    }
                }
            })

            return resolve(newLink);
        } catch (error) {
            return reject(error);
        }
    })
}


async function updatePrestataireLink(prestataireId, linkId, updatedData) {
    return prisma.prestataireLink.update({
        data: {
            name: updatedData?.name,
            url: updatedData?.url,
        },
        where: {
            id: Number.parseInt(linkId),
        }
    })
}

async function deletePrestataireLink(presta_id, link_id) {
    try {
        // Chercher le lien à supprimer
        const existingLink = await prisma.prestataireLink.findUnique({
            where: {
                id: Number.parseInt(link_id),
            }
        });

        // Si le lien n'existe pas
        if (!existingLink) {
            return {error: 1, status: 404, data: "Link not found."};
        }

        // Supprimer le lien
        const deletedLink = await prisma.prestataireLink.delete({
            where: {
                id: Number.parseInt(link_id),
            }
        });

        return {error: 0, status: 200, data: deletedLink};

    } catch (error) {
        console.error("Error deleting link:", error);
        return {error: 1, status: 500, data: "Internal server error."};
    }
}


module.exports = {
    getPrestataire,
    getPrestataireFromName,
    getPrestataireLink,
    createPrestataireLink,
    updatePrestataireLink,
    deletePrestataireLink
};