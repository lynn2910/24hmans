const uuid = require("uuid").v4;
const prisma = require("../db");
const e = require("express");


async function getAllAreas() {
    try {
        const shapes = await prisma.shape.findMany({
            include: {
                point: true,
            }
        })

        return shapes.map(shape => ({
                shape_id: shape.shape_id,
                type: "shape",
                // tab de tab car c'est un polygone, sinon on dessine des polyline avec un simple tab
                coordinates: [
                    shape.point.map(p => ({
                        lat: parseFloat(p.lat.toString()),
                        lng: parseFloat(p.lng.toString())
                    }))
                ],
                name: shape.name,
                logistics: shape.logistics,
                surface: shape.surface,
                description: shape.description,
                provider: shape.provider,
                service: shape.service,
                category: shape.category,
            })
        )
    } catch (err) {
        // Code d'erreur Prisma pour "record not found"
        if (err.code === 'P2025') {
            // Si aucun enregistrement n'est trouvé, retourne null
            return null;
        }
        // Lève une erreur pour tout autre problème
        throw new Error("Error while updating area: " + err.message);
    }
}

async function addArea(coordinates, name, logistics, surface, description, provider, service, category) {
    try {
        const newArea = await prisma.shape.create({
            data: {
                name: name,
                logistics: logistics,
                surface: surface,
                description: description,
                provider: provider,
                service: service,
                category: category,
                point: {
                    create: coordinates.map(coord => ({
                        lat: parseFloat(coord.lat.toString()),
                        lng: parseFloat(coord.lng.toString()),
                    })),
                },
            },
            select: {
                shape_id: true,
                name: true,
                logistics: true,
                surface: true,
                description: true,
                provider: true,
                service: true,
                category: true,
                point: {
                    select: {
                        lat: true,
                        lng: true,
                    }
                },
            },
        });

        const formattedNewArea = {
            ...newArea,
            // Encapsulation dans un tableau car polygone
            coordinates: [
                newArea.point.map(p => ({
                    lat: parseFloat(p.lat),
                    lng: parseFloat(p.lng),
                }))
            ]
        };

        delete formattedNewArea.point;

        return formattedNewArea;

    } catch (err) {
        // Code d'erreur Prisma pour "record not found"
        if (err.code === 'P2025') {
            // Si aucun enregistrement n'est trouvé, retourne null
            return null;
        }
        // Lève une erreur pour tout autre problème
        throw new Error("Error while updating area: " + err.message);
    }
}

async function getAreaFromId(id) {
    try {
        const shape = await prisma.shape.findUnique({
            where: {
                shape_id: id,
            },
            include: {
                point: true,
            },
        });

        if (!shape) {
            throw new Error(`Aucune zone trouvée avec l'ID : ${id}`);
        }

        console.log(shape)

        return {
            shape_id: shape.shape_id,
            type: "shape",
            // tab de tab car c'est un polygone, sinon on dessine des polyline avec un simple tab
            coordinates: [
                shape.point.map(p => ({
                    lat: parseFloat(p.lat.toString()),
                    lng: parseFloat(p.lng.toString())
                }))
            ],
            name: shape.name,
            logistics: shape.logistics,
            surface: shape.surface,
            description: shape.description,
            provider: shape.provider,
            service: shape.service,
            category: shape.category,
        };
    } catch (err) {
        // Code d'erreur Prisma pour "record not found"
        if (err.code === 'P2025') {
            // Si aucun enregistrement n'est trouvé, retourne null
            return null;
        }
        // Lève une erreur pour tout autre problème
        throw new Error("Error while updating area: " + err.message);
    }
}

async function deleteArea(id) {
    try {
        const deletedArea = await prisma.shape.delete({
            where: {
                shape_id: id,
            }
        });
        return deletedArea;

    } catch (err) {
        // Code d'erreur Prisma pour "record not found"
        if (err.code === 'P2025') {
            // Si aucun enregistrement n'est trouvé, retourne null
            return null;
        }
        // Lève une erreur pour tout autre problème
        throw new Error("Error while updating area: " + err.message);
    }
}

async function updateArea(id, updatedData) {
    try {
        const updatedArea = await prisma.shape.update({
            where: {
                shape_id: id,
            },
            data: {
                name: updatedData.name,
                logistics: updatedData.logistics,
                surface: updatedData.surface,
                description: updatedData.description,
                provider: updatedData.provider,
                service: updatedData.service,
                category: updatedData.category,
                point: updatedData.coordinates && updatedData.coordinates.length > 0 ? {
                    deleteMany: {}, // Supprime les anciens points
                    create: updatedData.coordinates, // Crée les nouveaux points
                } : undefined,
            },
            select: {
                shape_id: true,
                name: true,
                logistics: true,
                surface: true,
                description: true,
                provider: true,
                service: true,
                category: true,
                point: {
                    select: {
                        lat: true,
                        lng: true,
                    }
                },
            },
        });

        const formattedUpdatedArea = {
            ...updatedArea,
            coordinates: updatedArea.point.length > 0 ? [
                updatedArea.point.map(p => ({
                    lat: parseFloat(p.lat.toString()),
                    lng: parseFloat(p.lng.toString()),
                }))
            ] : [] // Si aucune coordonnée n'est présente
        };

        delete formattedUpdatedArea.point;

        return formattedUpdatedArea;

    } catch (err) {
        // Code d'erreur Prisma pour "record not found"
        if (err.code === 'P2025') {
            // Si aucun enregistrement n'est trouvé, retourne null
            return null;
        }
        // Lève une erreur pour tout autre problème
        throw new Error("Error while updating area: " + err.message);
    }
}

module.exports = {
    getAllAreas,
    getAreaFromId,
    addArea,
    deleteArea,
    updateArea,
};