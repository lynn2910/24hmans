import ShopService from "@/services/boutique.service"
import PanierService from "@/services/panier.service";
import BoutiqueService from "@/services/boutique.service";

export default {
    namespaced: true,
    state: {
        categories: [],
        items: [],
        shopId: null,
        shopExists: false,
        shopEnabled: false,
        carts: {},
        allShopItems: [],
        prestataire: {}
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
            if (!state.carts[user_id]) state.carts[user_id] = {items: []}

            const index = state.carts[user_id].items.some(i => i.id === item.id);
            if (index >= 0) {
                state.carts[user_id].items.count += item.count;
            } else {
                state.carts[user_id].items.push(item);
            }
        },
        removeItemFromCart(state, {user_id, item_id}) {
            if (!state.carts[user_id]) state.carts[user_id] = {items: []}

            const index = state.carts[user_id].items.findIndex(i => i.id === item_id);
            if (index >= 0) state.carts[user_id].items.splice(index, 1);
        },
        updateAllShopItemsStore(state, items) {
            state.allShopItems = items;
        },
        updateBoutiquePresta(state, prestataire) {
            state.prestataire = prestataire;
        },
        updateItemCount(state, {user_id, item_id, count}) {
            if (!state.carts[user_id]) state.carts[user_id] = {items: []}

            const index = state.carts[user_id].items.findIndex(i => i.id === item_id);
            if (index >= 0) {
                state.carts[user_id].items[index].count = count;
            }
        },
        updateShopId(state, shop_id) {
            state.shopId = shop_id;
        },
        updateShopEnabled(state, shopEnabled) {
            state.shopEnabled = shopEnabled;
        },
        clearCart(state, user_id) {
            state.carts[user_id] = {items: []}
        }
    },
    actions: {
        getCarts({commit}) {
            commit("updateCarts", PanierService.getCart());
        },
        addItemToCart({commit}, {user_id, item}) {
            commit("addItemToCart", {user_id, item});
            PanierService.addItemToCart(user_id, item);
        },
        removeItemFromCart({commit}, {user_id, item_id}) {
            commit("removeItemFromCart", {user_id, item_id});
            PanierService.removeItemFromCart(user_id, item_id);
        },
        setItemCount({commit}, {user_id, item_id, count}) {
            commit('updateItemCount', {user_id, item_id, count});
            PanierService.setCountOfItem(user_id, item_id, count)
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
                commit("updateCategories", res.data.categories);
                commit("updateItems", res.data.items);
                commit("updateBoutiquePresta", res.data.prestataire);
                commit("updateShopExists", true);
                commit('updateShopEnabled', res.data.enabled || false);
                commit('updateShopId', res.data.shop_id)
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
        },
        async addArticleToBoutique(_, {prestataire_id, article}) {
            const res = await BoutiqueService.addArticleToBoutique(prestataire_id, article);

            if (res.error) {
                console.error(res.data);
            }
        },
        async removeArticleFromBoutique(_, {prestataire_id, article_id}) {
            const res = await BoutiqueService.removeArticleFromBoutique(prestataire_id, article_id);

            if (res.error) {
                console.error(res.data);
            }
        },
        async enableOrDisableShop({commit}, {prestataire_id, value}) {
            const res = await ShopService.enableOrDisableShop(prestataire_id, value);
            if (res.error) {
                console.error(res.data);
            } else {
                commit('updateShopEnabled', res.data.enabled || false);
            }
        },
        clearCart({commit}, user_id) {
            commit('clearCart', user_id);
            PanierService.clearCart(user_id);
        }
    }
}