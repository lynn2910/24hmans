import PrestataireService from "@/services/prestataire.service";
import UsersService from "@/services/users.service";
import {Selected} from "@/utils";
import AdminService from "@/services/admin.service";
import {defineToken, removeSessionId} from "@/services/axios.service";
import AuthService from "@/services/auth.service";

export default {
    namespaced: true,
    state: {
        /**
         * L'utilisateur connecté. Peut-être un administrateur, un prestataire ou un client
         */
        loggedInUser: null,
        /**
         * Le type d'utilisateur connecté
         * @type {Selected}
         */
        userType: null,
        token: null
    },
    mutations: {
        updateToken(state, token) {
            state.token = token;
            removeSessionId()
            defineToken(token);
        },
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
            if (!('password' in data)) return alert("champ 'password' manquant pour login le prestataire :/")

            console.log("Get logged in user");
            let res;
            if (data.type === Selected.User) res = await UsersService.loginUser(data.id, data.password);
            else if (data.type === Selected.Prestataire) res = await PrestataireService.loginPrestataire(data.id, data.password);
            else if (data.type === Selected.Admin) res = await AdminService.loginAdmin(data.id, data.password);

            if (!res.error) {
                localStorage.setItem("access_token", res.data.token);
                commit("updateToken", res.data.token);
                commit("updateLoggedInUser", res.data.user);
                commit('updateUserType', data.type);
            } else {
                console.error(res);
            }
        },
        /**
         * @param commit
         * @param {{email: string, first_name: string, last_name: string, password: string}} data
         * @returns {Promise<void>}
         */
        async signup({commit}, data) {
            console.log("Creating client account");

            let res = await UsersService.signupUser(data.email, data.password, data.first_name, data.last_name);
            if (!res.error) {
                commit("updateLoggedInUser", res.data);
                commit("updateUserType", Selected.User);
            } else {
                console.error(res)
            }
        },
        async logout({commit}) {
            console.log("The user has been disconnected");
            localStorage.removeItem("access_token");
            commit("updateToken", null);
            commit("logOut", null);
            commit('updateLoggedInUser', null)
            commit('updateUserType', null)
        },
        async getInformations({commit}) {
            console.log("Testing stored token...")
            let res = await AuthService.getAuthentificationInformations();
            console.log(res)
            if (!res.error) {
                console.log(res)
                console.log("Token valid!");
                commit('updateToken', localStorage.getItem('access_token'));
                commit('updateLoggedInUser', res.data);
                commit('updateUserType', res.data.userType);
            } else {
                console.log("Token invalid!");
                localStorage.removeItem("access_token");
                removeSessionId()
            }
        }
    },
}