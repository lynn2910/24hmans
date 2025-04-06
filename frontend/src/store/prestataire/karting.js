import KartingService from "@/services/karting.service";

export default {
    namespaced: true,
    state: {
        circuits: [],
        sessionsDate: [],
        userSessions: [],
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
        },

        setUserSessions(state, userSessions) {
            state.userSessions = userSessions;
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
        },

        async getAllReservations({commit}, userId) {
            try {
                const res = await KartingService.getAllKartingSessions(userId);
                commit('setUserSessions', res.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des sessions:", error);
            }
        },

        async putSession({commit}, {kartingId, sessionId, circuitId}) {
            try {
                const res = await KartingService.putKartingSession(
                    kartingId,
                    sessionId,
                    circuitId
                );
                commit('sessionsDate', res.data);
            } catch (error) {
                console.error("Erreur lors de la modification de la session:", error);
                throw error;
            }
        },

        async addUserSession({commit}, {karting_id, sessionId, userId, circuitId, newSessionUser}) {
            try {
                const res = await KartingService.addUserKartingSession(
                    karting_id,
                    sessionId,
                    userId,
                    circuitId,
                    newSessionUser,
                );
                console.log(res.data);
                commit('setUserSessions', res.data);
            } catch (error) {
                console.error("Erreur avec l'ajout de session user:", error);
            }
        }
    },

    getters: {
        circuits: (state) => state.circuits,
    },
};
