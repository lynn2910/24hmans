<template>
    <div>
        <h1 class="text-2xl font-bold my-3">Date Selection</h1>
        <div>
            <div v-for="(forfait, index) in forfaits" :key="index">
                <span
                    class="text-white text-lg font-bold cursor-pointer hover:underline"
                    :class="{ 'underline': selectedForfaits.includes(forfait) }"
                    @click="toggleForfait(forfait)"
                >
                    {{ forfait.label }}
                </span>
            </div>
            <button
                class="text-white text-lg font-bold cursor-pointer hover:underline mt-3"
                :disabled="selectedForfaits.length === 0"
                @click="emitSelectedForfaits"
            >
                Suivant ->
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "BilletterieDateSelection",
    props: {
        forfaits: Array,
    },
    data() {
        return {
            selectedForfaits: [], // Stocke les forfaits sélectionnés
        };
    },
    methods: {
        toggleForfait(forfait) {
            const index = this.selectedForfaits.indexOf(forfait);
            if (index === -1) {
                // Ajoute le forfait s'il n'est pas déjà sélectionné
                this.selectedForfaits.push(forfait);
            } else {
                // Supprime le forfait s'il est déjà sélectionné
                this.selectedForfaits.splice(index, 1);
            }
        },
        emitSelectedForfaits() {
            if (this.selectedForfaits.length > 0) {
                this.$emit('forfaits', this.selectedForfaits); // Émet tous les forfaits sélectionnés
            }
        },
    },
};
</script>
