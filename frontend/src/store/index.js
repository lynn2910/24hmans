import Vue from 'vue'
import Vuex from 'vuex'
import PrestataireService from "@/services/prestataire.service";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
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
        logOut(state) {
            state.loggedInUser = null;
            router.go(-1)
        }
    },
    actions: {
        async getLoggedInUser({commit}, data) {
            console.log("Get logged in user");
            let res = await PrestataireService.getPrestataire(data);

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
})
