import LocalSource from "@/datasource/controller"

/**
 * Obtiens un prestataire s'il existe
 * @param id
 * @returns {Promise<{data: string, error: number, status: number}|{data: {id: string, password: string, name: string}, error: number, status: number}>}
 */
async function getPrestataire(id) {
    return LocalSource.getPrestataire(id)
}

async function getAllPrestataires() {
    return LocalSource.getAllPrestataires()
}

/**
 * Récupère un prestataire à partir du nom
 * @param name Le nom du prestataire
 * @returns {Promise<{data: string, error: number, status: number}|{data: {id: string, password: string, name: string, icon: string}, error: number, status: number}>}
 */
async function getPrestataireFromName(name) {
    return LocalSource.getPrestataireFromName(name)
}

export default {getPrestataire, getPrestataireFromName, getAllPrestataires}