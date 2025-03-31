<template>
	<div>
		<h1 class="text-2xl font-bold my-3">{{ $t('services.type_billet.title') }}</h1>
		<div>
			<div v-for="(personne, index) in personnes" :key="index" class="mb-3">
                <span
										class="text-white text-lg font-bold cursor-pointer hover:underline"
										:class="{ 'underline': selectedPersonne.includes(personne) }"
										@click="togglePersonne(personne)">{{ personne.personne_label }}</span>
				<input v-model="personneInputs[index]" class="text-black ml-3 p-1 border border-gray-300 rounded"
							 placeholder="Entrez une valeur">
			</div>
		</div>
		<button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						:disabled="selectedPersonne.length === 0 && personneInputs.length === 0" @click="submitSelection">Suivant
		</button>
	</div>
</template>

<script>
export default {
	name: "BilletteriePersonneSelection",
	props: {
		personnes: Array
	},
	data() {
		return {
			selectedPersonne: [],
			personneInputs: []
		};
	},
	mounted() {
		this.personneInputs = Array(this.personnes.length).fill('');
	},
	methods: {
		togglePersonne(personne) {
			const index = this.selectedPersonne.indexOf(personne);
			if (index === -1) {
				this.selectedPersonne.push(personne);
			} else {
				this.selectedPersonne.splice(index, 1);
			}
		},

		submitSelection() {
			this.$emit('submit', this.personneInputs);
		}
	}
};
</script>
