const uuid = require("uuid").v4;
const prisma = require("../db");
const e = require("express");


async function getAllAreas() {
    const shapes = await prisma.shape.findMany({
        include: {
            point: true,
        }
    })

    return shapes.map(shape => ({
            shape_id: shape.shape_id,
            type: "shape",
            coordinates: shape.point.map(p => ({
                lat: parseFloat(p.lat.toString()),
                lng: parseFloat(p.lng.toString())
            })),
            name: shape.name,
            logistics: shape.logistics,
            surface: shape.surface,
            description: shape.description,
            provider: shape.provider,
            service: shape.service,
            category: shape.category,
        })
    )
}

async function getAreaFromId(id) {
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
        coordinates: shape.point.map(p => ({
            lat: parseFloat(p.lat.toString()),
            lng: parseFloat(p.lng.toString())
        })),
        name: shape.name,
        logistics: shape.logistics,
        logistics: shape.surface,
        description: shape.description,
        provider: shape.provider,
        service: shape.service,
        category: shape.category,
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
            include: {
                point: true
            }
        });
        return newArea;
    } catch (err) {
        throw new Error("Error while saving area: " + err.message);
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
        throw new Error("Error while deleting area: " + err.message);
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
                point: {
                    deleteMany: {},
                    create: updatedData.coordinates.map(coord => ({
                        lat: parseFloat(coord.lat.toString()),
                        lng: parseFloat(coord.lng.toString()),
                    })),
                }
            },
            include: {
                point: true,
            },
        });
        return updatedArea;
    } catch (err) {
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