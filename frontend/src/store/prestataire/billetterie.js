import BilletterieService from "@/services/billetterie.service";

export default {
    namespaced: true,
    state: {
        category: [],
        date: [],
        nbPersonnes: [],
        prestataire: {}
    },

    mutations: {
        set_category(state, category) {
            state.category = category;
        },
        set_date(state, date) {
            state.date = date;
        },
        set_nbPersonnes(state, nbPersonnes) {
            state.nbPersonnes = nbPersonnes;
        },
        set_prestataire(state, prestataire) {
            state.prestataire = prestataire;
        }
    },

    actions: {
        async getShop({ commit }, prestataire_name) {  // Changé de prestataire_id à prestataire_name
            console.log("Get billetterie informations for:", prestataire_name);

            try {
                let res = await BilletterieService.getBilletterieInformations(prestataire_name);

                if (res.data) {
                    commit("set_category", res.data.category || []);
                    commit("set_date", res.data.date || []);
                    commit("set_nbPersonnes", res.data.nbPersonnes || []);
                    commit("set_prestataire", res.data.prestataire || {});
                    return true; // Succès
                } else {
                    console.error("Erreur API:", res);
                    return false;
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
                throw error;
            }
        }
    }
};
