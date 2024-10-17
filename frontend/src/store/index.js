import Vue from 'vue'
import Vuex from 'vuex'
import prestataire from "@/store/prestataire/prestataire";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {prestataire}
})
