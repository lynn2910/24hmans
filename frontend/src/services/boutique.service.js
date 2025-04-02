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
    let boutiques = await Request.get("/boutique/available_shops").send();
    if (boutiques.error) return boutiques;
    boutiques = boutiques.data;

    let fetchingActions = boutiques.map(async (shop) => {
        let res = await getShopInformations(shop.prestataire_id);
        if (!res.error) {
            shop.articles = res.data.articles.map((a) => ({...a, prestataire_id: shop.prestataire_id}));
        } else {
            shop.articles = []
        }
    })

    await Promise.all(fetchingActions)


    return {error: 0, status: 200, data: boutiques.map(({articles}) => articles || []).flatMap((a) => a)}
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
    return await Request.patch("/boutique/:shop_id")
        .args({shop_id})
        .body({enabled: newValue})
        .send()
}

async function createShopCategory(shop_id, category_label) {
    return await Request.post("/boutique/:shop_id/categories")
        .args({shop_id})
        .body({category_label})
        .send()
}


// TODO API stats

async function getBoutiqueChiffreAffaireSerie(shop_id) {
    // return LocalSource.getBoutiqueChiffreAffaireSerie(presta_id);
    return await Request.get('/boutique/{id}/stats/gains')
        .args({id: shop_id})
        .send()
}

async function getBoutiqueStats(shop_id) {
    // return LocalSource.getBoutiqueStats(prestataire_id);
    return await Request.get('/boutique/{id}/stats/general')
        .args({id: shop_id})
        .send()
}

async function getBoutiqueCategoriesSellsStats(shop_id) {
    // return LocalSource.getBoutiqueCategoriesSellsStats(prestataire_id);
    return await Request.get('/boutique/{id}/stats/categories')
        .args({id: shop_id})
        .send()
}

async function getBoutiqueArticleSellsStats(shop_id) {
    // return LocalSource.getBoutiqueArticleSellsStats(shop_id);
    return await Request.get('/boutique/{id}/stats/sells')
        .args({id: shop_id})
        .send()
}

export default {
    getShopInformations,
    getItemFromName,
    getAllItems,
    addArticleToBoutique,
    removeArticleFromBoutique,
    enableOrDisableShop,
    createShopCategory,
    getBoutiqueChiffreAffaireSerie, getBoutiqueStats, getBoutiqueCategoriesSellsStats, getBoutiqueArticleSellsStats
}