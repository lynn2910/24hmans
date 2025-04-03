<script>
import PrestataireDashboardTemplate from "@/components/dashboard/prestataire/PrestataireDashboardTemplate.vue";
import EcurieService from "@/services/ecurie.service";
import index, {mapState} from "vuex";
import {transformPrestataireName} from "@/utils";

export default {
	components: {PrestataireDashboardTemplate},
	computed: {
		...mapState("login", ["loggedInUser"])
	},
	data() {
		return {
			participantsByYear: {},
			selectedYear: 2025,
			years: [],
			archiveYears: [],
			archivedParticipants: [],
			selectedParticipants: []
		};
	},
	async created() {
		try {
			const response = await EcurieService.YearsRecup();
			this.years = response.data;
			console.log(this.years, 'fbjlqebfgvjleqbfjlqbfljabqflaeljfbjlbBJLFBZLAEFBLAB');
		} catch (error) {
			console.error("Erreur lors de la récupération des années:", error);
		}
	},
	async beforeMount() {
		console.log('aaaaaaaaaaaaaaaaaa');
		if (!this.loggedInUser) return;
		if (!this.participantsByYear[this.selectedYear]) {
			await this.fetchAllParticipants();
		}
		this.loadArchivedYears();
		this.loadArchivedParticipants(this.selectedYear);
	},
	watch: {
		async loggedInUser(nv){
			console.log(nv)
			if (nv){
				await this.fetchAllParticipants();
				this.loadArchivedYears();
				this.loadArchivedParticipants(this.selectedYear);
			}
		},
		async selectedYear(newYear) {
			console.log("Année sélectionnée :", newYear);
			await this.fetchAllParticipants();
			this.loadArchivedParticipants(newYear);
		}
	},
	methods: {
		async fetchAllParticipants() {
			try {
				this.participantsByYear = {};
				const res = await EcurieService.getAllEcurieParticipants(this.loggedInUser.id, this.selectedYear);
				if (!res.error) {
					this.participantsByYear = res.data.reduce((acc, participant) => {
						console.log(this.participantsByYear, 555)
						let year = new Date(participant.submitted_at).getFullYear();
						year = parseInt(year)
						if (!acc[year]) acc[year] = [];
						acc[year].push(participant);
						return acc;
					}, {});
					console.log("participantsByYear :", this.participantsByYear);
				} else {
					console.error('Erreur récupération participants: ${res.data}');
				}
			} catch (error) {
				console.error("Erreur API :", error);
			}
		},
		async handleTirage() {
			console.log('Démarrage du tirage au sort');

			const ecurie_id = this.loggedInUser.id;

			try {
				const response = await EcurieService.tirageAuSort(
						ecurie_id,
						this.selectedYear
				);

				if (response && response.data && Array.isArray(response.data.winners)) {
					this.selectedParticipants = response.data.winners;
					console.log("Participants sélectionnés:", JSON.stringify(this.selectedParticipants, null, 2));
				} else {
					console.error("Aucun gagnant trouvé dans la réponse:", response);
				}
			} catch (error) {
				console.error("Erreur lors du tirage au sort :", error);
			}
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
			const archivedData =  EcurieService.tirageAuSort(this.loggedInUser.id, this.selectedYear);
			console.log('Archived Data:', archivedData);
			this.archivedParticipants = archivedData ? JSON.parse(archivedData) : [];
			console.log('Participants archivés:', this.archivedParticipants); 
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
					<select v-model="selectedYear" id="year-select"
									class="p-2 border rounded bg-gray-800 text-white border-blue-400">
						<option v-for="year in years.slice().sort((a, b) => b - a)" :key="year" :value="year"
										class="text-black">
							{{ year }}
						</option>
					</select>
				</div>


				<ul v-if="participantsByYear[selectedYear] && participantsByYear[selectedYear].length > 0" class="space-y-3">
					<li v-for="participant in participantsByYear[selectedYear]" :key="participant.email"
							class="p-3 bg-gray-700 rounded-lg">
						<div class="font-semibold text-lg">{{ participant.nom }} - {{ participant.prenom }}</div>
						<div class="text-sm">{{ participant.submitted_at }}</div>
					</li>
				</ul>
				<p v-else class="mt-4 text-gray-400">Aucun participant trouvé pour {{ selectedYear }}.</p>
			</div>

			<!-- Résultat du Tirage -->
			<div class="flex-1 bg-white p-6 rounded-lg shadow-xl">
				<h3 v-if="selectedParticipants.length > 0"
						class="text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-between">
					Participants sélectionnés
					<button @click="deleteSelection()"
									v-if="selectedParticipants.length > 0"
									class="bg-red-500 text-white py-2 px-4 rounded-full font-semibold text-sm transition-all hover:bg-red-600 transform hover:scale-105 shadow-md ml-4">
						Effacer la sélection
					</button>
				</h3>
				<ul v-if="selectedParticipants.length > 0" class="space-y-3">
					<li v-for="(participant, index) in selectedParticipants" :key="index"
							class="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-all">
						<div class="font-semibold text-gray-800">{{ participant.nom }} - {{ participant.prenom }}</div>
						<div class="text-sm text-gray-600">{{ participant.email }} - {{ participant.tel }}</div>
					</li>
				</ul>

				<p v-else class="mt-4 text-gray-600">Aucun participant sélectionné.</p>
			</div>
		</div>
	</PrestataireDashboardTemplate>
</template>