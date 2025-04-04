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
                console.log(res.data);
//                 les données qu'on a a partid 'ici:
//                 0: Object { session_id: Getter & Setter, circuit_id: Getter & Setter, from_date: Getter & Setter, … }
// ​​
// __ob__: Object { shallow: false, mock: false, vmCount: 0, … }
// ​​
// circuit_id: "1a945660-cef6-4e73-9456-60cef62e734f"
// ​​
// from_date: "2025-04-03T10:00:00.000Z"
// ​​
// maxSize: 10
// ​​
// session_id: "69d8024b-1f61-4e29-9802-4b1f616e29b3"
// ​​
// to_date: "2025-04-03T10:15:00.000Z"
// ​​
// <get circuit_id()>: function reactiveGetter()​​
// <set circuit_id()>: function reactiveSetter(newVal)​​
// <get from_date()>: function reactiveGetter()​​
// <set from_date()>: function reactiveSetter(newVal)​​
// <get maxSize()>: function reactiveGetter()​​
// <set maxSize()>: function reactiveSetter(newVal)​​
// <get session_id()>: function reactiveGetter()​​
// <set session_id()>: function reactiveSetter(newVal)​​
// <get to_date()>: function reactiveGetter()​​
// <set to_date()>: function reactiveSetter(newVal)​​
// <prototype>: Object { … }
// ​
// 1: Object { session_id: Getter & Setter, circuit_id: Getter & Setter, from_date: Getter & Setter, … }
// ​​
// __ob__: Object { shallow: false, mock: false, vmCount: 0, … }
// ​​
// circuit_id: "1a945660-cef6-4e73-9456-60cef62e734f"
// ​​
// from_date: "2025-04-03T10:15:00.000Z"
// ​​
// maxSize: 10
// ​​
// session_id: "c4f6134c-d491-476c-b613-4cd491976c85"
// ​​
// to_date: "2025-04-03T10:30:00.000Z"
// ​​
// <get circuit_id()>: function reactiv
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
