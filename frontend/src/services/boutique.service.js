import LocalSource from "@/datasource/controller"


async function getShopInformations(prestataire_id) {
    return LocalSource.getBoutiqueInfos(prestataire_id)
}

export default {getShopInformations}