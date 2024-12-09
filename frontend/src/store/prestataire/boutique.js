import ShopService from "@/services/boutique.service"
import PanierService from "@/services/panier.service";
import BoutiqueService from "@/services/boutique.service";

export default {
    namespaced: true,
    state: {
        categories: [],
        items: [],
        shopExists: false,
        carts: {},
        allShopItems: []
    },
    getters: {
        categories: state => state.categories,
        items: state => state.items,
        shopExists: state => state.shopExists,
        getCart: (state) => (user_id) => state.carts[user_id],
        getCartCount: (state) => (user_id) => {
            const items = state.carts[user_id]?.items || [];
            return items.reduce((a, b) => a += b?.count || 0, 0);
        }
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
        },
        updateCarts(state, carts) {
            state.carts = carts;
        },
        addItemToCart(state, {user_id, item}) {
            state.carts[user_id].items.push(item);
            PanierService.addItemToCart(user_id, item);
        },
        removeItemFromCart(state, {user_id, item_id}) {
            const index = state.carts[user_id].items.findIndex(i => i.id === item_id);
            if (index >= 0) state.carts[user_id].items.splice(index, 1);

            PanierService.removeItemFromCart(user_id, item_id);
        },
        updateAllShopItemsStore(state, items) {
            state.allShopItems = items;
        }
    },
    actions: {
        getCarts({commit}) {
            commit("updateCarts", PanierService.getCart());
        },
        addItemToCart({commit}, {user_id, item}) {
            commit("addItemToCart", {user_id, item});
        },
        removeItemFromCart({commit}, {user_id, item_id}) {
            commit("removeItemFromCart", {user_id, item_id});
        },
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
        },
        async getAllItemsInShop({commit}) {
            const res = await BoutiqueService.getAllItems();

            if (!res.error) {
                commit("updateAllShopItemsStore", res.data);
            } else {
                console.error(`Cannot get all items stored in all shops: ${res.data}`)
            }
        }
    }
}