import ShopService from "@/services/boutique.service"

export default {
    namespaced: true,
    state: {
        categories: [],
        items: [],
    },
    getters: {
        categories: state => state.categories,
        items: state => state.items,
    },
    mutations: {
        updateCategories(state, categories) {
            state.categories = categories;
        },
        updateItems(state, items) {
            state.items = items;
        },
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
            } else {
                console.error(res.data);
            }
        }
    }
}