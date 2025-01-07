<template>
    <div>
        <h1 class="text-2xl font-bold my-3">Date Selection</h1>
        <div>
            <div v-for="(forfait, index) in forfaits" :key="index">
                <span class="text-white text-lg font-bold cursor-pointer hover:underline" :class="{ 'underline': selectedForfaits.includes(forfait) }" @click="toggleForfait(forfait)">
                    {{ forfait.forfait_label }}
                </span>
            </div>
            <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" :disabled="selectedForfaits.length === 0" @click="emitSelectedForfaits">
                Suivant
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
            selectedForfaits: [],
        };
    },
    methods: {
        toggleForfait(forfait) {
            const index = this.selectedForfaits.indexOf(forfait);
            if (index === -1) {
                this.selectedForfaits.push(forfait);
            } else {
                this.selectedForfaits.splice(index, 1);
            }
        },
        emitSelectedForfaits() {
            if (this.selectedForfaits.length > 0) {
                this.$emit('forfaits', this.selectedForfaits);
            }
        },
    },
};
</script>
