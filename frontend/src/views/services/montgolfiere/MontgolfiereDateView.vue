<template>
    <div class="montgolfiere-view">
        <h1>Liste des Montgolfières Disponibles</h1>

        <div v-if="loading" class="loading">Chargement...</div>

        <div v-if="error" class="error">
            <p>{{ errorMessage }}</p>
        </div>

        <div v-for="montgolfiere in montgolfieres" :key="montgolfiere.montgolfiere_id" class="montgolfiere-card">
            <h2>{{ montgolfiere.prestataire_id }}</h2>
            <button @click="fetchMontgolfiereSessions(montgolfiere.montgolfiere_id)">
                Voir les sessions
            </button>
        </div>

        <div v-if="sessions.length > 0">
            <h2>Sessions Disponibles</h2>
            <div v-for="session in sessions" :key="session.session_id" class="session-card">
                <p>Date et Heure: {{ session.date_heure }}</p>
                <button @click="registerUserInSession(session.montgolfiere_id, session.session_id)">
                    S'inscrire à cette session
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { getAvailableMontgolfieres, getMontgolfiereSessions, registerUserInMontgolfiereSession } from "@/services/montgolfiere.service";

export default {
    data() {
        return {
            montgolfieres: [],
            sessions: [],
            loading: false,
            error: false,
            errorMessage: "",
        };
    },
    methods: {
        // Fonction pour récupérer les montgolfières disponibles
        async fetchMontgolfieres() {
            this.loading = true;
            try {
                const response = await getAvailableMontgolfieres();
                console.log('Réponse API des montgolfières:', response); // Afficher la réponse

                // Vérifier si l'API renvoie des montgolfières disponibles
                if (response.error === 0 || response.data.length === 0) {
                    // Si l'API renvoie un error: 0 ou aucune donnée
                    this.errorMessage = "Aucune montgolfière disponible.";
                    this.error = true;
                } else {
                    // Sinon, charger les montgolfières disponibles
                    this.montgolfieres = response.data;
                    this.error = false;
                }
            } catch (error) {
                this.errorMessage = "Erreur lors de la récupération des montgolfières.";
                this.error = true;
            } finally {
                this.loading = false;
            }
        }
        ,

        // Fonction pour récupérer les sessions d'une montgolfière
        async fetchMontgolfiereSessions(montgolfiere_id) {
            this.loading = true;
            this.sessions = []; // Reset sessions on new fetch
            try {
                const response = await getMontgolfiereSessions(montgolfiere_id);
                if (response.error === 1) {
                    this.sessions = response.data;
                } else {
                    this.errorMessage = "Aucune session disponible pour cette montgolfière.";
                    this.error = true;
                }
            } catch (error) {
                this.errorMessage = "Erreur lors de la récupération des sessions.";
                this.error = true;
            } finally {
                this.loading = false;
            }
        },

        // Fonction pour inscrire un utilisateur à une session
        async registerUserInSession(montgolfiere_id, session_id) {
            this.loading = true;
            try {
                const registering_details = {
                    user_id: "user123", // Exemple d'ID utilisateur, à remplacer par celui de l'utilisateur connecté
                };
                const response = await registerUserInMontgolfiereSession(
                    montgolfiere_id,
                    session_id,
                    registering_details
                );
                if (response.error === 1) {
                    alert("Inscription réussie à la session !");
                } else {
                    this.errorMessage = "Impossible de s'inscrire à cette session.";
                    this.error = true;
                }
            } catch (error) {
                this.errorMessage = "Erreur lors de l'inscription à la session.";
                this.error = true;
            } finally {
                this.loading = false;
            }
        },
    },
    created() {
        this.fetchMontgolfieres(); // Appel lors du chargement du composant pour récupérer les montgolfières
    },
};
</script>

<style scoped>
.montgolfiere-view {
    font-family: Arial, sans-serif;
    padding: 20px;
}

.montgolfiere-card, .session-card {
    border: 1px solid #ccc;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
}

.montgolfiere-card h2 {
    margin-bottom: 10px;
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.loading {
    color: #888;
}

.error {
    color: red;
}

.error p {
    font-weight: bold;
}
</style>
