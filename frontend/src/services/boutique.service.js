import {Request} from "./axios.service"
import LocalSource from "@/datasource/controller"


async function getShopInformations(prestataire_id, is_presta = false) {
    // return LocalSource.getBoutiqueInfos(prestataire_id, is_presta)

    return Request.get("/boutique/:id")
        .args({id: prestataire_id})
        .send()
}

async function getItemFromName(shop_id, item_name) {
    // return LocalSource.getShopItemFromName(prestataire_name, item_name)

    return Request.get("/boutique/:shop_id/items/:item_id")
        .args({shop_id, item_id: item_name})
        .send()
}


async function getAllItems() {
    // TODO
    return LocalSource.getAllItems()
}

async function addArticleToBoutique(shop_id, article) {
    // return LocalSource.addArticleToBoutique(prestataire_id, article)

    return await Request.post("/boutique/:shop_id/items")
        .args({shop_id})
        .body(article)
        .send()
}

async function removeArticleFromBoutique(shop_id, article_id) {
    // return LocalSource.removeItemFromBoutique(shop_id, article_id)

    return await Request.delete("/boutique/:shop_id/items/:article_id")
        .args({shop_id, article_id})
        .send();
}


async function enableOrDisableShop(shop_id, newValue) {
    // return LocalSource.enableOrDisableShop(presta_id, newValue);

    return await Request.patch("/boutique/:shop_id")
        .args({shop_id})
        .body({enabled: newValue})
        .send()
}


// TODO API stats

async function getBoutiqueChiffreAffaireSerie(presta_id) {
    return LocalSource.getBoutiqueChiffreAffaireSerie(presta_id);
}

async function getBoutiqueStats(prestataire_id) {
    return LocalSource.getBoutiqueStats(prestataire_id);
}

async function getBoutiqueCategoriesSellsStats(prestataire_id) {
    return LocalSource.getBoutiqueCategoriesSellsStats(prestataire_id);
}

async function getBoutiqueArticleSellsStats(prestataire_id) {
    return LocalSource.getBoutiqueArticleSellsStats(prestataire_id);
}

export default {
    getShopInformations,
    getItemFromName,
    getAllItems,
    addArticleToBoutique,
    removeArticleFromBoutique,
    enableOrDisableShop,
    getBoutiqueChiffreAffaireSerie, getBoutiqueStats, getBoutiqueCategoriesSellsStats, getBoutiqueArticleSellsStats
}