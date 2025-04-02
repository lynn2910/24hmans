import Vue from 'vue'
import Vuex from 'vuex'
import prestataire from "@/store/prestataire/prestataire";
import login from "@/store/login";
import shapes from "@/store/shapes"
import billetterie from "@/store/prestataire/billetterie";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        prestataire,
        login,
        shapes,
        billetterie,
    }
})
