import LocalSource from "@/datasource/controller"

async function getAllShapes() {
    return LocalSource.getAllShapes()
}

async function updateShape(updateShapes) {
    return LocalSource.updateArea(updateShapes);
}

async function addShape(newShape) {
    return LocalSource.addArea(newShape);
}

async function removeShape(ShapeId) {
    return LocalSource.removeArea(ShapeId);
}

export default {
    getAllShapes,
    updateShape,
    addShape,
    removeShape,
}