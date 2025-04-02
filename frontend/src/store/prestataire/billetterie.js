import BilletterieService from "@/services/billetterie.service";

export default {
    namespaced: true,
    state: {
        category : [],
        date: [],
        nbPersonnes: [],
        prestataire: {}
    },

    actions: {
        /**
         * Récupère la liste des items et des catégories
         * @param commit
         * @param {string} prestataire_id L'identifiant du prestataire
         * @returns {Promise<void>}
         */
        async getShop({commit}, prestataire_id) {
            console.log("Get billetterie informations");
            let res = await BilletterieService.getBilletterieInformations(prestataire_id);

            if (!res.error) {
                commit(res.data.category);
                commit(res.data.date);
                commit(res.data.nbPersonnes)
            } else {
                console.error(res.data);
                commit("updateShopExists", false);
            }
        },

    }
}