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
            state.category = category || [];
        },
        set_date(state, date) {
            state.date = date || [];
        },
        set_nbPersonnes(state, nbPersonnes) {
            state.nbPersonnes = nbPersonnes || [];
        },
        set_prestataire(state, prestataire) {
            state.prestataire = prestataire || {};
        }
    },

    actions: {
        async getBilletterie({ commit }, prestataire_name) {
            console.log("🔍 Récupération des informations pour :", prestataire_name);

            try {
                const data = await BilletterieService.getBilletterieInformations(prestataire_name);

                if (data) {
                    console.log("✅ Données récupérées :", data);
                    commit("set_category", data.category);
                    commit("set_date", data.date);
                    commit("set_nbPersonnes", data.nbPersonnes);
                    commit("set_prestataire", data.prestataire);
                    return true;
                } else {
                    console.error("❌ Aucune donnée reçue de l'API.");
                    return false;
                }
            } catch (error) {
                console.error("❌ Erreur lors de la récupération des données :", error);
                return false;
            }
        }
    }
};
