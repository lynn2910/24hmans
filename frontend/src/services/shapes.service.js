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

export default {
    getAllShapes,
    updateShape,
    addShape,
}