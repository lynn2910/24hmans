import boutique from "@/store/prestataire/boutique";
import PrestataireService from "@/services/prestataire.service";


export default {
    namespaced: true,
    state: {
        prestataires: [],
        // services: [],
    },
    getters: {
        // Getters must be functions that compute derived state
        prestataires: (state) => state.prestataires,
        // Example of another getter if needed
        // services: (state) => (presta) => {
        //     return presta ? state.services[state] || [] : [];
        // },
    },
    mutations: {
        // Mutations to update the state
        updatePrestataires(state, prestataires) {
            state.prestataires = prestataires;
        },
        // updateServices(state, { presta, services }) {
        //     state.services = { ...state.services, [presta]: services };
        // }
    },
    actions: {
        // Actions to handle asynchronous operations
        async getAllPrestataires({commit}) {
            try {
                let res = await PrestataireService.getAllPrestataires();
                console.log(res);

                if (!res.error) {
                    commit("updatePrestataires", res.data);
                } else {
                    console.error(res.data);
                }
            } catch (error) {
                console.error("Error fetching prestataires:", error);
            }
        },
        // Example of another action if needed
        // async getServicesForPresta({ commit }, presta) {
        //     try {
        //         let res = await PrestataireService.getPrestatairesServices(presta);
        //         console.log(res);

        //         if (!res.error) {
        //             commit("updateServices", { presta, services: res.data });
        //         } else {
        //             console.error(res.data);
        //         }
        //     } catch (error) {
        //         console.error("Error fetching services for presta:", error);
        //     }
        // }
    },
    modules: {
        boutique, // Nested module if necessary
    },
};
