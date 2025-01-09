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
    const fs = require("fs/promises");
    const data = require("../data/prestataires.json");

    const prestataire = data.find(presta => presta.id === parseInt(prestataireId, 10));
    if (!prestataire) return null;

    const newLink = {
        id: prestataire.links?.length
            ? prestataire.links[prestataire.links.length - 1].id + 1
            : 1,
        ...linkData,
    };

    prestataire.links = [...(prestataire.links || []), newLink];

    await fs.writeFile("./data/prestataires.json", JSON.stringify(data, null, 2));
    return newLink;
}



async function updatePrestataireLink(prestataireId, linkId, updatedData) {
    const fs = require("fs/promises");
    const data = require("../data/prestataires.json");

    const prestataire = data.find(presta => presta.id === parseInt(prestataireId, 10));
    if (!prestataire || !prestataire.links) return null;

    const linkIndex = prestataire.links.findIndex(link => link.id === parseInt(linkId, 10));
    if (linkIndex === -1) return null;

    prestataire.links[linkIndex] = {
        ...prestataire.links[linkIndex],
        ...updatedData,
    };

    await fs.writeFile("./data/prestataires.json", JSON.stringify(data, null, 2));
    return prestataire.links[linkIndex];
}

async function deletePrestataireLink(presta_id, link_id) {
    try {
        // Chercher le lien à supprimer
        const existingLink = await prisma.prestataireLink.findUnique({
            where: {
                prestataire_id_id: {
                    prestataire_id: presta_id,
                    id: link_id
                }
            }
        });

        // Si le lien n'existe pas
        if (!existingLink) {
            return { error: 1, status: 404, data: "Link not found." };
        }

        // Supprimer le lien
        const deletedLink = await prisma.prestataireLink.delete({
            where: {
                prestataire_id_id: {
                    prestataire_id: presta_id,
                    id: link_id
                }
            }
        });

        return { error: 0, status: 200, data: deletedLink };

    } catch (error) {
        console.error("Error deleting link:", error);
        return { error: 1, status: 500, data: "Internal server error." };
    }
}


module.exports = {getPrestataire, getPrestataireFromName, getPrestataireLink, createPrestataireLink, updatePrestataireLink, deletePrestataireLink};