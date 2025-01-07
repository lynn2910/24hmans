<template>
    <div>
        <h1 class="text-2xl font-bold my-3">Type billet</h1>
        <div>
            <div v-for="(personne, index) in personnes" :key="index" class="mb-3">
                <span
                    class="text-white text-lg font-bold cursor-pointer hover:underline" :class="{ 'underline': selectedPersonne.includes(personne) }" @click="togglePersonne(personne)">{{ personne.label }}</span>
                <input
                    v-model="personneInputs[index]"
                    class="text-black ml-3 p-1 border border-gray-300 rounded"
                    placeholder="Entrez une valeur"
                >
            </div>
        </div>
        <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" :disabled="selectedPersonne.length === 0" @click="submitSelection">Suivant</button>
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
            personneInputs: [] // Tableau pour stocker les valeurs des inputs
        };
    },
    mounted() {
        this.personneInputs = Array(this.personnes.length).fill('');
    },
    methods: {
        togglePersonne(personne) {
            const index = this.selectedPersonne.indexOf(personne);
            if (index === -1) {
                // Ajoute le forfait s'il n'est pas déjà sélectionné
                this.selectedPersonne.push(personne);
            } else {
                // Supprime le forfait s'il est déjà sélectionné
                this.selectedPersonne.splice(index, 1);
            }
        },
        personneSelected(pers) {
            this.$emit('personne', pers);
        },
        submitSelection() {
            // Émettre les données saisies et signaler que l'étape est terminée
            this.$emit('submit', this.personneInputs);
        }
    }
};
</script>
