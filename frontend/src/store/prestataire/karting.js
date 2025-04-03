import KartingService from "@/services/karting.service";

export default {
    namespaced: true,
    state: {
        circuits: [],
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
    },

    getters: {
        circuits: (state) => state.circuits,
    },
};
