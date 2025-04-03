const uuid = require("uuid").v4;
const prisma = require("../db");
const e = require("express");


async function getAllAreas() {
    try {
        const shapes = await prisma.shape.findMany({
            include: {
                point: true,
            },
        });

        return shapes.map(shape => {
            return ({
                shape_id: shape.shape_id,
                type: shape.type,
                coordinates: shape.type === "marker"
                    ? {
                        lat: parseFloat(shape.point[0]?.lat.toString()),
                        lng: parseFloat(shape.point[0]?.lng.toString())
                    }
                    : [
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
                iconUrl: shape.iconUrl
            })
        });
    } catch (err) {
        if (err.code === 'P2025') {
            return null;
        }
        throw new Error("Error while updating area: " + err.message);
    }
}

async function addArea(type, coordinates, name, logistics, surface, description, provider, service, category, iconUrl) {
    try {
        const newArea = await prisma.shape.create({
            data: {
                type: type,
                name: name,
                logistics: logistics,
                surface: surface,
                description: description,
                provider: provider,
                service: service,
                category: category,
                iconUrl: iconUrl,
                point: {
                    create: Array.isArray(coordinates)
                        ? coordinates.map(coord => ({
                            lat: parseFloat(coord.lat.toString()),
                            lng: parseFloat(coord.lng.toString()),
                        }))
                        : [{
                            lat: parseFloat(coordinates.lat.toString()),
                            lng: parseFloat(coordinates.lng.toString()),
                        }],
                },
            },
            select: {
                shape_id: true,
                type: true,
                name: true,
                logistics: true,
                surface: true,
                description: true,
                provider: true,
                service: true,
                category: true,
                iconUrl: true,
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
            coordinates: type === "marker"
                ? {
                    lat: parseFloat(newArea.point[0]?.lat),
                    lng: parseFloat(newArea.point[0]?.lng),
                }
                : [
                    newArea.point.map(p => ({
                        lat: parseFloat(p.lat),
                        lng: parseFloat(p.lng),
                    }))
                ]
        };

        delete formattedNewArea.point;

        return formattedNewArea;

    } catch (err) {
        if (err.code === 'P2025') {
            return null;
        }
        throw new Error("Error while adding area: " + err.message);
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
        if (err.code === 'P2025') {
            return null;
        }
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
        if (err.code === 'P2025') {
            return null;
        }
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
                point: updatedData.type === "shape"
                    ? (Array.isArray(updatedData.coordinates) && updatedData.coordinates.length > 0
                        ? {
                            deleteMany: {},
                            create: updatedData.coordinates.map(coord => ({
                                lat: coord.lat,
                                lng: coord.lng,
                            })),
                        }
                        : undefined)
                    : (updatedData.coordinates && updatedData.coordinates.lat !== undefined && updatedData.coordinates.lng !== undefined
                        ? {
                            deleteMany: {},
                            create: {
                                lat: updatedData.coordinates.lat,
                                lng: updatedData.coordinates.lng,
                            },
                        }
                        : undefined),
            },
            select: {
                shape_id: true,
                name: true,
                type: true,
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

        console.log("1________________________________________")

        let formattedCoordinates;
        if (updatedArea.type === "shape") {
            formattedCoordinates = updatedArea.point.map(p => ({
                lat: parseFloat(p.lat.toString()),
                lng: parseFloat(p.lng.toString()),
            }));
        } else if (updatedArea.type === "marker") {
            formattedCoordinates = updatedArea.point.length > 0 ? {
                lat: parseFloat(updatedArea.point[0].lat.toString()),
                lng: parseFloat(updatedArea.point[0].lng.toString()),
            } : null;
        }

        console.log("2________________________________________")

        const formattedUpdatedArea = {
            ...updatedArea,
            coordinates: formattedCoordinates
        };

        delete formattedUpdatedArea.point;

        return formattedUpdatedArea;

    } catch (err) {
        if (err.code === 'P2025') {
            return null;
        }
        throw new Error("Error while updating area: " + err.message);
    }
}

async function getShapeById(id) {
    console.log("🔍 [DB QUERY] Recherche du shape avec ID:", id);
    const shape = await prisma.shape.findUnique({
        where: {shape_id: parseInt(id)},
        select: {
            shape_id: true,
            provider: true,
        },
    });
    console.log("📌 [DB RESULT] Shape trouvé:", shape);
    return shape;
}

async function updateShape(id, updatedData) {
    try {
        console.log("🛠️ [DB UPDATE] Mise à jour du shape avec ID:", id);
        console.log("📤 [DB UPDATE] Données envoyées:", updatedData);

        const updatedShape = await prisma.shape.update({
            where: {shape_id: parseInt(id)},
            data: updatedData,
            select: {
                shape_id: true,
                name: true,
                logistics: true,
                surface: true,
                description: true,
                provider: true,
                service: true,
                category: true,
            },
        });

        console.log("✅ [DB SUCCESS] Shape mis à jour:", updatedShape);
        return updatedShape;
    } catch (err) {
        console.error("❌ [DB ERROR] Erreur lors de la mise à jour du shape:", err);

        if (err.code === "P2025") {
            console.log("❌ [DB ERROR] Aucun shape trouvé avec cet ID.");
            return null;
        }

        throw new Error("Erreur lors de la mise à jour de la zone : " + err.message);
    }
}


module.exports = {
    getAllAreas,
    getAreaFromId,
    addArea,
    deleteArea,
    updateArea,
    getShapeById,
    updateShape,
};