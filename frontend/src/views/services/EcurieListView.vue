<script>
import PrestataireService from "@/services/prestataire.service";

export default {
    name: "Ecuries",
    async beforeMount() {
        try {
            const prestatairesRes = await PrestataireService.getAllPrestataires();
            if (!prestatairesRes.error) {
                const allPrestataires = prestatairesRes.data;

                for (const prestataire of allPrestataires) {
                    const servicesRes = await PrestataireService.getPrestataireServices(prestataire.id);
                    if (!servicesRes.error) {
                        const services =     servicesRes.data;
                        if (services.some(service => service.toLowerCase() === "ecurie")) {
                            this.ecuries.push(prestataire);
                        }
                    }
                }
            } else {
                console.error(prestatairesRes.data);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des écuries :", error);
        }
    },
    data() {
        return {
            ecuries: [],
            publicPath: process.env.BASE_URL,
        };
    },
};
</script>

<template>
    <div class="w-full mt-36 bg-dark">
        <h1 class="font-extrabold text-4xl text-center py-5 mx-auto mt-8 mb-6">Liste des écuries</h1>

        <!-- Affichage des écuries-->
        <div class="flex justify-center">
            <div
                    class="grid gap-12 px-8"
                    :class="{
                    'grid-cols-1': ecuries.length === 1,
                    'grid-cols-2 justify-center': ecuries.length === 2,
                    'sm:grid-cols-2 lg:grid-cols-3': ecuries.length > 2
                }"
            >
                <router-link
                        v-for="prestataire in ecuries"
                        :key="prestataire.id"
                        :to="`/ecurie/${prestataire.name.toLowerCase()}`"
                        class="relative group flex flex-col items-center text-center w-96 h-[40rem] p-8 bg-red-950-800 border border-red-950 rounded-lg shadow-lg overflow-hidden
                   transition-transform duration-300 transform hover:scale-105 hover:shadow-[0px_0px_40px_2px_black]">
                    <!-- Bordures -->
                    <div
                            class="absolute inset-0 bg-gradient-to-br from-red-950 to-red-500 opacity-30 blur-md transition-opacity duration-300 group-hover:opacity-50"></div>

                    <!-- Informations prestataires -->
                    <div class="relative z-10 flex flex-col justify-between h-full">
                        <img
                                :src="`${publicPath}${prestataire.icon}`"
                                alt="Logo du prestataire"
                                class="flex-wrap drop-shadow-all-white-700 w-60 h-60 rounded-full mb-6 border-4 border-white shadow-md"
                        />
                        <h2 class="text-4xl font-bold text-white mb-4">{{ prestataire.name }}</h2>
                        <p class="text-gray-400 text-base">
                            Cliquez pour accéder à l'écurie
                        </p>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- Message si aucune écurie n'est disponible -->
        <p v-if="!ecuries.length" class="text-center text-lg mt-12">
            Aucune écurie disponible pour le moment...
        </p>
    </div>
</template>

<style scoped>
.group:hover .blur-md {
    filter: blur(12px);
}
</style>
