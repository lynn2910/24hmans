import boutique from "@/store/prestataire/boutique";
import PrestataireService from "@/services/prestataire.service";


export default {
    namespaced: true,
    state: {
        prestataires: [],
        prestataireServices: {},
    },
    getters: {
        // Getters must be functions that compute derived state
        prestataires: (state) => state.prestataires,
        prestataireServices: (state) => (prestataireId) => {
            return state.prestataireServices[prestataireId] || [];
        }
    },
    mutations: {
        updatePrestataires(state, prestataires) {
            // "localeCompare" existe sur les navigateurs modernes
            state.prestataires = prestataires.sort((a, b) => a.name.localeCompare(b.name));
        },
        updatePrestataireServices(state, {prestataireId, services}) {
            state.prestataireServices = {...state.prestataireServices, [prestataireId]: services};
        },
        addPresta(state, presta) {
            state.prestataires.push(presta);
        }
    },
    actions: {
        // Actions to handle asynchronous operations
        async getAllPrestataires({commit}) {
            try {
                let res = await PrestataireService.getAllPrestataires();

                if (!res.error) {
                    commit("updatePrestataires", res.data);
                } else {
                    console.error(res.data);
                }
            } catch (error) {
                console.error("Error fetching prestataires:", error);
            }
        },
        addPrestataireToCache({commit}, presta) {
            commit('addPresta', presta);
        },
        async getPrestataireServices({commit}, prestataireId) {
            try {
                let res = await PrestataireService.getPrestataireServices(prestataireId);

                if (res && res.data && Array.isArray(res.data)) {
                    commit("updatePrestataireServices", {prestataireId, services: res.data});
                } else {
                    console.error(res.data);
                }
            } catch (error) {
                console.error("Error fetching prestataireServices:", error);
            }
        },
    },
    modules: {
        boutique,
    },
};
