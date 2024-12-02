import LocalSource from "@/datasource/controller"

/**
 * Obtiens un prestataire s'il existe
 * @param id
 * @returns {Promise<{data: string, error: number, status: number}|{data: {id: string, password: string, name: string}, error: number, status: number}>}
 */
async function getPrestataire(id) {
    return LocalSource.getPrestataire(id)
}

async function loginPrestataire(id, password) {
    return LocalSource.getPrestataireWithPassword(id, password)
}

async function getAllPrestataires() {
    return LocalSource.getAllPrestataires()
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
    return LocalSource.getPrestataireFromName(name)
}

async function deletePrestataire(id) {
    return LocalSource.deletePrestataire(id)
}

async function createPrestataireWithHashing(name, password) {
    return LocalSource.createPrestataire({name, password})
}


async function importPrestataire(name, password) {
    return LocalSource.createPrestataireInternal({name, password})
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
    importPrestataire
}