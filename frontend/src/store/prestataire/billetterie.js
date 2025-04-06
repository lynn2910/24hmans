import BilletterieService from "@/services/billetterie.service";


export default {
    namespaced: true,
    state: {
        billetterie_id: null,
        category: [],
        date: [],
        nbPersonnes: [],
        prestataire: {},

        selectedCategory: null,
        selectedDates: [],
        selectedPersonnes: [],

        tickets: [],
        loading: false,
        error: null,
    },

    getters: {
        allTickets: (state) => state.tickets,
        isLoadingTickets: (state) => state.loading,
        ticketsError: (state) => state.error,
    },

    mutations: {
        setBilletterieId(state, id) {
            state.billetterie_id = id;
        },
        getPrestataire(state, prestataire) {
            state.prestataire = prestataire
        },
        setData(state, payload) {
            if (payload.category) state.category = payload.category;
            if (payload.date) state.date = payload.date;
            if (payload.nbPersonnes) state.nbPersonnes = payload.nbPersonnes;
            if (payload.prestataire) state.prestataire = payload.prestataire;
        },
        setSelectedCategory(state, category) {
            state.selectedCategory = category;
        },
        setSelectedDates(state, dates) {
            state.selectedDates = dates;
        },
        setSelectedPersonnes(state, personnes) {
            state.selectedPersonnes = personnes;
        },
        setTickets(state, tickets) {
            state.tickets = tickets;
        },
        setLoading(state, isLoading) {
            state.loading = isLoading;
        },
        setError(state, error) {
            state.error = error;
        },
    },
    actions: {
        setBilletterieData({commit}, data) {
            commit('setData', data);
        },
        updateSelectedCategory({commit}, category) {
            commit('setSelectedCategory', category);
        },
        updateSelectedDates({commit}, dates) {
            commit('setSelectedDates', dates);
        },
        updateSelectedPersonnes({commit}, personnes) {
            commit('setSelectedPersonnes', personnes);
        },
        async getBilletterie({commit}, prestataire_name) {

            try {
                const data = await BilletterieService.getBilletterieInformations(prestataire_name);
                console.log(JSON.stringify(data, null, 2))

                if (data) {
                    commit("set_category", data.category);
                    commit("set_date", data.date);
                    commit("set_nbPersonnes", data.nbPersonnes);
                    commit("set_prestataire", data.prestataire);
                    commit("setBilletterieId", data.billetterie_id);

                    return true;
                } else {
                    console.error(" Aucune donnée reçue de l'API.");
                    return false;
                }
            } catch (error) {
                console.error(" Erreur lors de la récupération des données :", error);
                return false;
            }
        },
        async fetchTicketsByUser({commit}, userId) {
            commit('setLoading', true);
            try {
                const response = await axios.get(`/api/tickets/user/${userId}`);
                commit('setTickets', response.data);
            } catch (error) {
                commit('setError', error);
            } finally {
                commit('setLoading', false);
            }
        },

    }

};