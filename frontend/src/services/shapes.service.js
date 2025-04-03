import {Request} from "./axios.service"
import LocalSource from "@/datasource/controller"

async function getAllShapes() {
    return await Request.get("/carte/shapes")
        .send();
}

async function updateShape(updateShapes) {
    console.log(updateShapes);
    return await Request.put(`/carte/shapes/${updateShapes.shape_id}`)
        .body(updateShapes)
        .send();
}

async function addShape(newShape) {
    return await Request.post("/carte/shapes")
        .body(newShape)
        .send();
}

async function removeShape(ShapeId) {
    return await Request.delete(`/carte/shapes/${ShapeId}`)
        .send();
}

async function deleteInfosPost(infosShape) {
    console.log("BEFORE", infosShape);
    return await Request.post(`/carte/shapes/${infosShape.shape_id}`)
        .body(infosShape)
        .send();
}

export default {
    getAllShapes,
    updateShape,
    addShape,
    removeShape,
    deleteInfosPost,
}