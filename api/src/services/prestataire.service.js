const prisma = require("../db");

function getPrestataire(prestataire_id) {
    return prisma.prestataire.findUnique({
        where: {id: prestataire_id},
        include: {
            links: true
        }
    });
}

function createPrestataire({name, password}) {
    return prisma.prestataire.create({
        data: {
            name,
            password,
            id: require("uuid").v4(),
            referencer: name.toLowerCase().replace(/\s+/g, "-"),
            email: `${name.toLowerCase().replace(/\s+/g, "-")}@24hmans.fr`,
        },
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

function getPrestataireService(presta_id) {
    return new Promise(async (resolve, reject) => {
        try {
            let presta = await prisma.prestataire.findUnique({
                select: {
                    boutique: true,
                    Ecurie: true,
                    Billetterie: true,
                    karting: true,
                    Montgolfiere: true
                },
                where: {
                    id: presta_id,
                },
            });

            console.log(presta)

            return resolve(
                Object.entries(presta)
                    .filter(([_, v]) => v && ("enabled" in v ? v.enabled : true))
                    .map(([s, _]) => s.toLowerCase())
            );
        } catch (err) {
            console.error(err);
            return reject(null);
        }
    })
}

async function updatePrestataire(prestataireId, updatedData) {
    // if (typeof updatedData.description === 'string') {
    //     const reg = /<img(?:\s+\w+="[^"]+")*\s+src="data:image\/(\w+);(\w+),([^"]+)"/gm;
    //
    //     const matches = updatedData.description.matchAll(reg);
    //
    //     let actions = Array.from(matches)
    //         .map(async (match) => {
    //             const [fullMatch, type, encoding, encodedData] = match;
    //             if (encoding !== 'base64') throw new Error("Encoding is not base64");
    //
    //             const data = Buffer.from(encodedData, 'base64');
    //             const fileName = `prestataire/icon/${uuid.v7()}.${type}`;
    //
    //             // replace <img
    //             return [fullMatch, CdnService.createCdnFile(fileName, data)];
    //         });
    //
    //     actions = await Promise.all(actions);
    //
    //     // Replace all <img> with the new URL
    //     for (const action of actions) {
    //         const [fullMatch, url] = action;
    //         updatedData.description = updatedData.description.replace(fullMatch, `<img alt="" src="${url}">`);
    //     }
    // }

    return prisma.prestataire.update({
        data: {
            name: updatedData.name,
            email: updatedData.email,
            referencer: updatedData.referencer,
            banner: updatedData.banner,
            accentColor: updatedData.accentColor,
            description: updatedData.description,
        },
        where: {
            id: prestataireId,
        }
    })
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

async function DeleteSelection() {

}

module.exports = {
    getPrestataire,
    createPrestataire,
    getPrestataireFromName,
    getPrestataireService,
    updatePrestataire,
    getPrestataireLink,
    createPrestataireLink,
    updatePrestataireLink,
    deletePrestataireLink
};