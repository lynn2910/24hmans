import ShopService from "@/services/boutique.service"

export default {
    namespaced: true,
    state: {
        categories: [],
        items: [],
        minPrice: 0,
        maxPrice: 0,
    },
    getters: {
        categories: state => state.categories,
        items: state => state.items,
        minPrice: state => state.minPrice,
        maxPrice: state => state.maxPrice,
    },
    mutations: {
        updateCategories(state, categories) {
            state.categories = categories;
        },
        updateItems(state, items) {
            state.items = items;
        },
        updateMinPrice(state, minPrice) {
            state.minPrice = minPrice;
        },
        updateMaxPrice(state, maxPrice) {
            state.maxPrice = maxPrice;
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

                if (res.data.items.length > 0) {
                    commit("updateMinPrice", res.data.items.sort((a, b) => a.price > b.price)[0].price);
                    commit("updateMaxPrice", res.data.items.sort((a, b) => a.price < b.price)[0].price);
                }
            } else {
                console.error(res.data);
            }
        }
    }
}