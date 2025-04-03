import KartingService from "@/services/karting.service";

export default {
    namespaced: true,
    state: {
        circuits: [],
        sessionsDate: [],
    },

    mutations: {
        setCircuits(state, circuits) {
            state.circuits = circuits.map(circuit => ({
                id: circuit.circuit_id,
                nom: circuit.circuit_name,
                cc: circuit.kart_power,
                age_minimum: circuit.minAge
            }));
        },

        sessionsDate(state, sessions) {
            state.sessionsDate = sessions;
        }
    },

    actions: {
        async getAllCircuits({commit}, presta_id) {
            try {
                const response = await KartingService.getAllCircuits(presta_id);
                if (response && response.data) {
                    commit("setCircuits", response.data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des circuits:", error);
            }
        },

        async getAllSessions({commit}, {kartingId, circuitId}) {
            try {
                const res = await KartingService.getKartingSessions(kartingId, circuitId);
                commit('sessionsDate', res.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des sessions:", error);
            }
        }
    },

    getters: {
        circuits: (state) => state.circuits,
    },
};
