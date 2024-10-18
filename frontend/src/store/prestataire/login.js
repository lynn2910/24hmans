import router from "@/router";
import PrestataireService from "@/services/prestataire.service";

export default {
    namespaced: true,
    state: {
        /**
         * L'utilisateur connecté. Peut-être un administrateur ou un prestataire
         */
        loggedInUser: null
    },
    mutations: {
        updateLoggedInUser(state, loggedInUser) {
            state.loggedInUser = loggedInUser;
        },
        // TODO ajouter la logique de déconnexion
        logOut(state) {
            state.loggedInUser = null;
            router.go(-1)
        }
    },
    actions: {
        async getLoggedInUser({commit}, data) {
            console.log("Get logged in user");
            let res = await PrestataireService.getPrestataireFromName(data);

            if (!res.error) {
                console.log(res.data)
                commit("updateLoggedInUser", res.data);
            } else {
                console.error(res.data);
            }
        },
        logOut({commit}) {
            console.log("The user has been disconnected")
            commit("logOut", null);
        }
    },
}