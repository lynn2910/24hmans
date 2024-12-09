import LocalSource from "@/datasource/controller"


async function getShopInformations(prestataire_id) {
    return LocalSource.getBoutiqueInfos(prestataire_id)
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
    return {error: 0, status: 200, data: item_id_list.map((item) => LocalSource.getShopItem(item.origin, item.id))};
}

async function getAllItems() {
    return {error: 0, status: 200, data: LocalSource.getAllItems()}
}

export default {getShopInformations, getItemFromName, getItemsBulk, getAllItems}