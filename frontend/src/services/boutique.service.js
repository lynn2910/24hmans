import LocalSource from "@/datasource/controller"


async function getShopInformations(prestataire_id, is_presta = false) {
    return LocalSource.getBoutiqueInfos(prestataire_id, is_presta)
}

async function getItemFromName(prestataire_name, item_name) {
    return LocalSource.getShopItemFromName(prestataire_name, item_name)
}

/**
 * Returns all articles given in the list
 * @param {Array<{origin: string, id: string}>} item_id_list
 * @return {Promise<{error: 0 | 1, status: number, data: Object[]}>}
 */
async function getItemsBulk(item_id_list) {
    return {
        error: 0,
        status: 200,
        data: item_id_list.map((item) => LocalSource.getShopItem(item.origin, item.id).data)
    };
}

async function getAllItems() {
    return LocalSource.getAllItems()
}

async function getShopItems(prestataire_id, is_presta = false) {
    return LocalSource.getShopItems(prestataire_id, is_presta)
}

async function addArticleToBoutique(prestataire_id, article) {
    return LocalSource.addArticleToBoutique(prestataire_id, article)
}

async function removeArticleFromBoutique(prestataire_id, article_id) {
    return LocalSource.removeItemFromBoutique(prestataire_id, article_id)
}


async function enableOrDisableShop(presta_id, newValue) {
    return LocalSource.enableOrDisableShop(presta_id, newValue);
}

export default {
    getShopInformations,
    getItemFromName,
    getItemsBulk,
    getAllItems,
    getShopItems,
    addArticleToBoutique,
    removeArticleFromBoutique,
    enableOrDisableShop
}