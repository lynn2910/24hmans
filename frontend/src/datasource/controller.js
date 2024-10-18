import {boutiques, prestataires} from "@/datasource/prestataires";

/**
 * Obtiens les informations sur le prestataire, s'il existe
 * @param {string} id
 */
function getPrestataire(id) {
    let presta = prestataires.find(p => p.id === id);

    if (!presta) return {error: 1, status: 404, data: "prestataire inexistant"}
    return {error: 0, status: 200, data: presta};
}

/**
 * Obtiens les informations sur le prestataire, s'il existe
 * @param {string} name Le nom du prestataire
 * @returns {{data: string, error: number, status: number}|{data: Prestataire, error: number, status: number}}
 */
function getPrestataireFromName(name) {
    let presta = prestataires.find(p => p.name.toLowerCase() === name.toLowerCase());

    if (!presta) return {error: 1, status: 404, data: "prestataire inexistant"};
    return {error: 0, status: 200, data: presta};
}

function getBoutiqueInfos(prestataire_id) {
    let boutique = boutiques.find(b => b.prestataire_id === prestataire_id);

    if (!boutique) return {error: 1, status: 404, data: "boutique inexistante"};
    return {error: 0, status: 200, data: boutique};
}

export default {getPrestataire, getPrestataireFromName, getBoutiqueInfos};