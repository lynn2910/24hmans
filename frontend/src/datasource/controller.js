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

function getAllPrestataires() {
    return {error: 0, data: prestataires};
}

/**
 * Obtiens les informations sur le prestataire, s'il existe
 * @param {string} name Le nom du prestataire
 * @returns {{data: string, error: number, status: number}|{data: Prestataire, error: number, status: number}}
 */
function getPrestataireFromName(name) {
    let presta = prestataires
        .find(p =>
            p.name.toLowerCase().replace(/\W/g, '') === name.toLowerCase().replace(/\W/g, ''));

    if (!presta) return {error: 1, status: 404, data: "prestataire inexistant"};
    return {error: 0, status: 200, data: presta};
}

function getBoutiqueInfos(prestataire_id) {
    let boutique = boutiques.find(b => b.prestataire_id === prestataire_id);

    if (!boutique) return {error: 1, status: 404, data: "boutique inexistante"};
    return {error: 0, status: 200, data: boutique};
}

function getShopItemFromName(prestataire_name, item_name) {
    let prestataire = getPrestataireFromName(prestataire_name);
    if (prestataire.error) return {error: 1, status: 404, data: "prestataire inexistant"};
    prestataire = prestataire.data;

    let boutique = getBoutiqueInfos(prestataire.id);
    if (boutique.error) return {error: 1, status: 404, data: "boutique inexistante"};
    boutique = boutique.data;

    let item = boutique.items.find(a => a.name.trim().toLowerCase().replace(/\s+/, '-') === item_name);

    if (!item) return {error: 1, status: 404, data: "Item inexistant"};
    return {error: 0, status: 200, data: item};
}

export default {getPrestataire, getPrestataireFromName, getBoutiqueInfos, getAllPrestataires, getShopItemFromName};