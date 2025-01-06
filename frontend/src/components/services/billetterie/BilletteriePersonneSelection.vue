<template>
    <div>
        <h1 class="text-2xl font-bold my-3">Type billet</h1>
        <div>
            <div v-for="(personne, index) in personnes" :key="index">
                <span class="text-white text-lg font-bold cursor-pointer hover:underline" @click="personneSelected(personne)">{{ personne.label }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "BilletteriePersonneSelection",
    props : {
        personnes: Array
    },
    methods : {
        personneSelected(pers) {
            this.$emit('personne', pers);
        }
    }
}
</script>