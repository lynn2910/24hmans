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
            participantsByYear: {},
            selectedYear: new Date().getFullYear(),
            archiveYears: [],
            archivedParticipants: [],
            selectedParticipants: []
        };
    },
    async beforeMount() {
        await this.fetchAllParticipants();
        this.loadArchivedYears();
        this.loadArchivedParticipants(this.selectedYear);
    },
    watch: {
        selectedYear(newYear) {
            this.loadArchivedParticipants(newYear);
        }
    },
    methods: {
        async fetchAllParticipants() {
            try {
                const res = await EcurieService.getAllEcurieParticipants(transformPrestataireName(this.loggedInUser.name));
                if (!res.error) {
                    this.participantsByYear = res.data.reduce((acc, participant) => {
                        const year = new Date(participant.time).getFullYear();
                        if (!acc[year]) acc[year] = [];
                        acc[year].push(participant);
                        return acc;
                    }, {});
                } else {
                    console.error(`Erreur récupération participants: ${res.data}`);
                }
            } catch (error) {
                console.error("Erreur API :", error);
            }
        },
        async handleTirage() {
            this.selectedParticipants = await EcurieService.tirageAuSort(
                transformPrestataireName(this.loggedInUser.name),
                this.selectedYear
            );
            const prestataireKey = `archivedParticipants_${transformPrestataireName(this.loggedInUser.name)}_${this.selectedYear}`;
            localStorage.setItem(prestataireKey, JSON.stringify(this.selectedParticipants));
            this.loadArchivedParticipants(this.selectedYear);
        },
        loadArchivedYears() {
            this.archiveYears = [];
            for (let key in localStorage) {
                if (key.includes("archivedParticipants")) {
                    const yearMatch = key.match(/\d{4}/);
                    if (yearMatch) {
                        const year = parseInt(yearMatch[0], 10);
                        if (!this.archiveYears.includes(year)) {
                            this.archiveYears.push(year);
                        }
                    }
                }
            }
            this.archiveYears.sort((a, b) => b - a);
        },
        loadArchivedParticipants(year) {
            const prestataireKey = `archivedParticipants_${transformPrestataireName(this.loggedInUser.name)}_${year}`;
            const archivedData = localStorage.getItem(prestataireKey);
            this.archivedParticipants = archivedData ? JSON.parse(archivedData) : [];
        }
    }
}
</script>

<template>
    <PrestataireDashboardTemplate current-page="home">
        <div class="p-6 lg:p-10 flex flex-col lg:flex-row gap-6">
            <div class="flex-1 bg-gray-800 text-white p-6 rounded-lg shadow-xl">
                <h2 class="text-2xl font-bold mb-6">Participants par année</h2>
                <div>
                    <button @click="handleTirage"
                            class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full font-semibold transition-all hover:bg-blue-600 transform hover:scale-105 shadow-md">
                        Tirage au sort
                    </button>
                </div>
                <div class="mb-4">
                    <label for="year-select" class="text-blue-400 font-semibold">Sélectionner une année :</label>
                    <select v-model="selectedYear" id="year-select" class="p-2 border rounded bg-gray-800 text-white border-blue-400">
                        <option v-for="year in Object.keys(participantsByYear).sort((a, b) => b - a)" :key="year" :value="year" class="text-black">
                            {{ year }}
                        </option>
                    </select>
                </div>

                <ul v-if="participantsByYear[selectedYear] && participantsByYear[selectedYear].length > 0" class="space-y-3">
                    <li v-for="participant in participantsByYear[selectedYear]" :key="participant.email" class="p-3 bg-gray-700 rounded-lg">
                        <div class="font-semibold text-lg">{{ participant.lastname }} - {{ participant.name }}</div>
                        <div class="text-sm">{{ new Date(participant.time).toLocaleString() }}</div>
                    </li>
                </ul>
                <p v-else class="mt-4 text-gray-400">Aucun participant trouvé pour {{ selectedYear }}.</p>
            </div>

            <!-- Résultat du Tirage -->
            <div class="flex-1 bg-white p-6 rounded-lg shadow-xl">
                <h3 v-if="selectedParticipants.length > 0" class="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-between">
                    Participants sélectionnés
                    <button @click=""
                            v-if="selectedParticipants.length > 0"
                            class="bg-red-500 text-white py-2 px-4 rounded-full font-semibold text-sm transition-all hover:bg-red-600 transform hover:scale-105 shadow-md ml-4">
                        Effacer la sélection
                    </button>
                </h3>
                <ul v-if="selectedParticipants.length > 0" class="space-y-3">
                    <li v-for="participant in selectedParticipants" :key="participant.email" class="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-all">
                        <div class="font-semibold text-gray-800">{{ participant.lastname }} - {{ participant.name }}</div>
                        <div class="text-sm text-gray-600">{{ participant.email }} - {{ participant.phone }}</div>
                    </li>
                </ul>

                <p v-else class="mt-4 text-gray-600">Aucun participant sélectionné.</p>
            </div>
        </div>
    </PrestataireDashboardTemplate>
</template>
