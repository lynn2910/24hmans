<script>
import PrestataireService from "@/services/prestataire.service";

export default {
    name: "Billetteries",
    async beforeMount() {
        try {
            const prestatairesRes = await PrestataireService.getAllPrestataires();
            if (!prestatairesRes.error) {
                const allPrestataires = prestatairesRes.data;

                for (const prestataire of allPrestataires) {
                    const servicesRes = await PrestataireService.getPrestataireServices(prestataire.id);
                    if (!servicesRes.error) {
                        const services = servicesRes.data;
                        if (services.some(service => service.toLowerCase() === "billetterie")) {
                            this.billetteries.push(prestataire);
                        }
                    }
                }
            } else {
                console.error(prestatairesRes.data);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des billetteries :", error);
        }
    },
    data() {
        return {
            billetteries: [],
            publicPath: process.env.BASE_URL,
        };
    },
};
</script>

<template>
    <div class="w-full mt-36 bg-dark">
        <h1 class="font-extrabold text-4xl text-center py-8">Liste des Billetteries</h1>

        <!-- Affichage des billetteries -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 ">
            <div
                v-for="prestataire in billetteries"
                :key="prestataire.id"
                class="flex flex-col items-center text-center p-6 border border-gray-600 rounded shadow-lg
                       transition-transform duration-300 transform hover:scale-105 hover:shadow-[0px_0px_15px_2px_white] ">
                <img
                    :src="`${publicPath}${prestataire.icon}`"
                    alt="Logo du prestataire"
                    class="w-24 h-24 rounded-full mb-4"
                />
                <h2 class="text-2xl font-bold mb-2">{{ prestataire.name }}</h2>
                <router-link
                    :to="`/billetterie/${prestataire.name.toLowerCase()}`"
                    class="py-2 px-5 bg-gray-700 rounded-3xl hover:bg-gray-500 text-white">
                    Voir la Billetterie
                </router-link>
            </div>
        </div>

        <!-- Message si aucune billetterie n'est disponible -->
        <p v-if="!billetteries.length" class="text-center text-lg mt-12">
            Aucun prestataire ne possède de billetterie pour le moment.
        </p>
    </div>
</template>
