import login from "@/store/prestataire/login";
import boutique from "@/store/prestataire/boutique";
import PrestataireService from "@/services/prestataire.service";

export default {
    namespaced: true,
    state: {
        prestataires: []
    },
    getters: {
        prestataires: state => state.prestataires,
    },
    mutations: {
        updatePrestataires(state, prestataires) {
            state.prestataires = prestataires;
        },
    },
    actions: {
        async getAllPrestataires({commit}) {
            let res = await PrestataireService.getAllPrestataires();

            if (!res.error) {
                commit("updatePrestataires", res.data);
            } else {
                console.error(res.data);
            }
        }
    },
    modules: {
        login,
        boutique
    }
}