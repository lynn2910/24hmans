import PrestataireService from "@/services/prestataire.service";

export default {
    namespaced: true,
    state: {
        /**
         * L'utilisateur connecté. Peut-être un administrateur, un prestataire ou un client
         */
        loggedInUser: null,
        /**
         * Le type d'utilisateur connecté
         */
        userType: null
    },
    mutations: {
        updateLoggedInUser(state, loggedInUser) {
            state.loggedInUser = loggedInUser;
        },
        updateUserType(state, type) {
            state.userType = type;
        },
        logOut(state) {
            state.loggedInUser = null;
            state.userType = null;
        }
    },
    actions: {
        /**
         * @param commit
         * @param {{id: string, password: string, type: Selected}} data The prestataire id and password
         * @returns {Promise<void>}
         */
        async login({commit}, data) {
            // TODO Retirer cette condition
            if (!('password' in data)) return alert("champ 'password' manquant pour login le prestataire :/")

            console.log("Get logged in user");
            let res = await PrestataireService.loginPrestataire(data.id, data.password);

            if (!res.error) {
                commit("updateLoggedInUser", res.data);
                commit('updateUserType', data.type);
            } else {
                console.error(res);
            }
        },
        logout({commit}) {
            console.log("The user has been disconnected")
            commit("logOut", null);
        }
    },
}