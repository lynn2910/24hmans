import {prestataires} from "@/datasource/prestataires";

/**
 * Obtiens les informations sur le prestataire, s'il existe
 * @param {string} id
 */
function getPrestataire(id) {
    let presta = prestataires.find(p => p.id === id);

    if (!presta) return {error: 1, status: 404, data: "prestataire inexistant"}
    return {error: 0, status: 200, data: presta};
}

export default {getPrestataire};