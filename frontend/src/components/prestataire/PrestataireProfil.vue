<script>
import {mapActions, mapState} from "vuex";
import PrestataireService from "@/services/prestataire.service";

export default {
    name: "PrestataireProfil",
    async beforeMount() {
        let res = await PrestataireService.getPrestataireFromName(this.$route.params.prestataire_name);
        if (!res.error) {
            this.prestataire = res.data;
        } else {
            console.error(res.data);
        }
    },
    data() {
        return {
            prestataire: null,
            publicPath: process.env.BASE_URL
        }
    },
    computed: {
        ...mapState("prestataire/login", ["loggedInUser"])
    },
    methods: {
        ...mapActions("prestataire/login", ["getLoggedInUser"])
    }
}

</script>

<template>
    <div class="w-full mt-36 bg-dark">
        <img :src="`${publicPath}${prestataire.icon}`" alt="Photo de profil" class="mx-auto rounded-full w-44 h-44">
        <h1 class="font-extrabold text-4xl text-center py-4">{{ prestataire?.name }}</h1>
        <div class="flex flex-row mx-auto justify-center content-center">
            <a v-for="link in prestataire?.links" :key="link" :href="link.url"
               class="py-2 px-5 bg-gray-700 mx-5 font-medium rounded-3xl hover:bg-gray-500 text-xl">
                {{ link.name }}</a>
        </div>
        <p class="w-[75%] mx-auto mt-36 text-xl"> {{ prestataire?.description }}</p>
    </div>
</template>