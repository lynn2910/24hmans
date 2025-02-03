import LocalSource from "@/datasource/controller"

async function getAllShapes() {
    return LocalSource.getAllShapes()
}

async function updateShape(updateShapes) {
    return LocalSource.updateArea(updateShapes);
}

export default {
    getAllShapes,
    updateShape,
}