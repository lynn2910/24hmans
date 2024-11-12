import ShopService from "@/services/boutique.service"

export default {
    namespaced: true,
    state: {
        categories: [],
        items: [],
        shopExists: false
    },
    getters: {
        categories: state => state.categories,
        items: state => state.items,
        shopExists: state => state.shopExists,
    },
    mutations: {
        updateCategories(state, categories) {
            state.categories = categories;
        },
        updateItems(state, items) {
            state.items = items;
        },
        updateShopExists(state, shopExists) {
            state.shopExists = shopExists;
        }
    },
    actions: {
        /**
         * Récupère la liste des items et des catégories
         * @param commit
         * @param {string} prestataire_id L'identifiant du prestataire
         * @returns {Promise<void>}
         */
        async getShop({commit}, prestataire_id) {
            console.log("Get Shop informations");
            let res = await ShopService.getShopInformations(prestataire_id);

            if (!res.error) {
                console.log(res.data);
                commit("updateCategories", res.data.categories);
                commit("updateItems", res.data.items);
                commit("updateShopExists", true);
            } else {
                console.error(res.data);
                commit("updateShopExists", false);
            }
        }
    }
}