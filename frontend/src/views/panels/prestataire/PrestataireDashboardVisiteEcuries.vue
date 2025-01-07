<script>
import PrestataireDashboardTemplate from "@/components/dashboard/prestataire/PrestataireDashboardTemplate.vue";
import EcurieService from "@/services/ecurie.service";
import { mapState } from "vuex";
import { transformPrestataireName } from "@/utils";

export default {
    components: { PrestataireDashboardTemplate },
    computed: {
        ...mapState("login", ["loggedInUser"])
    },
    data() {
        return {
            participants: [],
            selectedParticipants: []
        };
    },
    async beforeMount() {
        const prestataireKey = `selectedParticipants_${transformPrestataireName(this.loggedInUser.name)}`;
        const savedParticipants = localStorage.getItem(prestataireKey);
        if (savedParticipants) {
            this.selectedParticipants = JSON.parse(savedParticipants);
        }
        let res = await EcurieService.getAllEcurieParticipants(transformPrestataireName(this.loggedInUser.name));
        if (!res.error) {
            this.participants = res.data;
        } else {
            console.error(`cannot get participant: ${res.data}`);
        }
    },
    methods: {
        async handleTirage() {
            this.selectedParticipants = await EcurieService.tirageAuSort(
                transformPrestataireName(this.loggedInUser.name)
            );
            const prestataireKey = `selectedParticipants_${transformPrestataireName(this.loggedInUser.name)}`;
            localStorage.setItem(prestataireKey, JSON.stringify(this.selectedParticipants));
        },
        clearSelectedParticipants() {
            this.selectedParticipants = [];
            const prestataireKey = `selectedParticipants_${transformPrestataireName(this.loggedInUser.name)}`;
            localStorage.removeItem(prestataireKey);
        }
    },
}
</script>
<template>
    <PrestataireDashboardTemplate current-page="home">
        <div class="p-6 lg:p-10 flex flex-col lg:flex-row gap-6">
            <!-- Liste des Participants -->
            <div class="flex-1 bg-gradient-to-tl from-black to-gray-800 text-white p-6 rounded-lg shadow-xl">
                <h2 class="text-2xl font-bold mb-6">Liste des Participants</h2>

                <ul v-if="participants.length > 0" class="space-y-3">
                    <li v-for="participant in participants" :key="participant.email" class="transition-all transform hover:scale-105 hover:bg-gray-700 p-3 rounded-lg cursor-pointer">
                        <div class="font-semibold text-lg">{{ participant.lastname }} - {{ participant.name }}</div>
                        <div class="text-sm">{{ new Date(participant.time).toLocaleString() }}</div>
                    </li>
                </ul>
                <p v-else class="mt-4 text-gray-200">Aucun participant trouvé pour ce prestataire.</p>

                <button @click="handleTirage"
                        class="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full font-semibold transition-all hover:bg-blue-600 transform hover:scale-105 shadow-md">
                    Tirage au sort
                </button>
            </div>

            <!-- Résultat du Tirage -->
            <div class="flex-1 bg-white p-6 rounded-lg shadow-xl">
                <h3 v-if="selectedParticipants.length > 0" class="text-2xl font-semibold text-gray-800 mb-6">Participants sélectionnés</h3>

                <ul v-if="selectedParticipants.length > 0" class="space-y-3">
                    <li v-for="participant in selectedParticipants" :key="participant.email" class="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-all">
                        <div class="font-semibold text-gray-800">{{ participant.lastname }} - {{ participant.name }}</div>
                        <div class="text-sm text-gray-600">{{ participant.email }} - {{ participant.phone }}</div>
                    </li>
                </ul>

                <p v-else class="mt-4 text-gray-600">Aucun participant sélectionné.</p>

                <button @click="clearSelectedParticipants"
                        v-if="selectedParticipants.length > 0"
                        class="mt-6 bg-red-500 text-white py-2 px-6 rounded-full font-semibold transition-all hover:bg-red-600 transform hover:scale-105">
                    Effacer la sélection
                </button>
            </div>
        </div>
    </PrestataireDashboardTemplate>
</template>
