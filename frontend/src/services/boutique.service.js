import LocalSource from "@/datasource/controller"


async function getShopInformations(prestataire_id) {
    return LocalSource.getBoutiqueInfos(prestataire_id)
}

async function getItemFromName(prestataire_name, item_name) {
    return LocalSource.getShopItemFromName(prestataire_name, item_name)
}

export default {getShopInformations, getItemFromName}