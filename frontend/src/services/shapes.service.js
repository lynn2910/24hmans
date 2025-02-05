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

// TODO: faut rajouter ca dans l'api ! requete post qui prend des
//  parametres différents en fonction de la personne qui supp des éléments d'une zone
async function deleteInfosPost(infosShape) {
    return LocalSource.deleteInfosPost(infosShape);
}

export default {
    getAllShapes,
    updateShape,
    addShape,
    removeShape,
    deleteInfosPost,
}