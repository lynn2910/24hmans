import LocalSource from "@/datasource/controller"
import {Request} from "@/services/axios.service";
import {Selected} from "@/utils";

/**
 * Obtiens un prestataire s'il existe
 * @param id
 * @returns {Promise<{data: string, error: number, status: number}|{data: {id: string, password: string, name: string}, error: number, status: number}>}
 */
async function getPrestataire(id) {
    // return LocalSource.getPrestataire(id)
    return Request.get("/prestataires/:id")
        .args({id})
        .send();
}

async function loginPrestataire(id, password) {
    // return LocalSource.getPrestataireWithPassword(id, password)

    return await Request.post("/auth/login")
        .body({
            login: id,
            password,
            userType: Selected.Prestataire
        })
        .send();
}

async function getAllPrestataires() {
    // return LocalSource.getAllPrestataires()
    return Request.get("/prestataires/all").send();
}

async function getPrestatairesServicesCount() {
    return LocalSource.getPrestatairesServicesCount();
}

async function getPrestataireServices(id) {
    return LocalSource.getPrestataireServices(id);
}

/**
 * Récupère un prestataire à partir du nom
 * @param name Le nom du prestataire
 * @returns {Promise<{data: string, error: number, status: number}|{data: {id: string, password: string, name: string, icon: string}, error: number, status: number}>}
 */
async function getPrestataireFromName(name) {
    // return LocalSource.getPrestataireFromName(name)
    return Request.get("/prestataires/:name")
        .args({name})
        .send();
}

async function deletePrestataire(id) {
    return Request.delete("/prestataires/:id")
        .args({id})
        .send();
}

async function createPrestataireWithHashing(name, password) {
    // TODO
    return LocalSource.createPrestataire({name, password})
}

async function importPrestataire(name, password) {
    // TODO
    return LocalSource.createPrestataireInternal({name, password})
}

async function updatePrestataire(presta_id, data) {
    // return LocalSource.updatePrestataire(presta_id, data);
    return await Request.patch("/prestataires/:id")
        .args({id: presta_id})
        .body(data)
        .send()
}

async function updatePrestataireLink(presta_id, link_name, link_url, link_id) {
    // return LocalSource.updatePrestataireLink(presta_id, {id: link_id, name: link_name, url: link_url})

    return await Request.patch("/prestataires/:presta_id/link/:link_id")
        .args({presta_id, link_id})
        .body({name: link_name, url: link_url})
        .send()
}

async function addPrestataireLink(presta_id, name, url) {
    // return LocalSource.addPrestataireLink(presta_id, {name, url})

    return await Request.post("/prestataire/:presta_id/link")
        .args({presta_id})
        .body({name, url})
        .send()
}


// TODO C4EST QUOI CA 👹👹👹👹👹 MAUVAIS SERVICE!!!!!

async function getAllCategoryTicket(prestataire_id) {
    return LocalSource.getAllCategoryTicket(prestataire_id);
}

async function getAllForfaitTicket(prestataire_id) {
    return LocalSource.getAllForfaitTicket(prestataire_id);
}

async function getAllPersonneTicket(prestataire_id) {
    return LocalSource.getAllPersonneTicket(prestataire_id);
}


export default {
    getPrestataire,
    getPrestataireFromName,
    getAllPrestataires,
    loginPrestataire,
    getPrestatairesServicesCount,
    getPrestataireServices,
    deletePrestataire,
    createPrestataireWithHashing,
    importPrestataire,
    updatePrestataireLink,
    addPrestataireLink,
    getAllCategoryTicket,
    getAllForfaitTicket,
    getAllPersonneTicket,
    updatePrestataire
}