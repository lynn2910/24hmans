<template>
    <div class="w-full mt-28 bg-dark pb-16">
        <h1 class="font-extrabold text-4xl text-center py-5 mx-auto mt-4 mb-12 text-white">
            Découvrez nos vols en montgolfière
        </h1>

        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div
                        v-for="(montgolfiere, index) in montgolfieres"
                        :key="montgolfiere.montgolfiere_id"
                        class="bg-white/10 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                    <div class="flex flex-col h-full">
                        <h2
                                class="text-2xl font-bold mb-4"
                                :class="{
                'text-yellow-400 group-hover:text-yellow-300': index % 3 === 0,
                'text-pink-400 group-hover:text-pink-300': index % 3 === 1,
                'text-indigo-400 group-hover:text-indigo-300': index % 3 === 2
              }"
                        >
                            Vol #{{ index + 1 }}
                        </h2>
                        <h3 class="text-lg text-gray-300 mb-4">
                            Capacité maximale : {{ montgolfiere.maxSize || 10 }} personnes
                        </h3>

                        <ul class="flex-1 space-y-3 mb-6">
                            <li class="flex items-center text-gray-400">
                <span class="mr-2 animate-pulse"
                      :class="{
                    'text-yellow-500': index % 3 === 0,
                    'text-pink-500': index % 3 === 1,
                    'text-indigo-500': index % 3 === 2
                  }"
                >•</span>
                                Montgolfière active : {{ montgolfiere.enabled ? "Oui" : "Non" }}
                            </li>
                            <li class="flex items-center text-gray-400">
                <span class="mr-2 animate-pulse"
                      :class="{
                    'text-yellow-500': index % 3 === 0,
                    'text-pink-500': index % 3 === 1,
                    'text-indigo-500': index % 3 === 2
                  }"
                >•</span>
                                Réservez une session pour survoler la région !
                            </li>
                        </ul>

                        <button
                                @click="goToReservation(montgolfiere.montgolfiere_id)"
                                class="mt-auto text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 overflow-hidden relative"
                                :class="{
                'bg-yellow-600 hover:bg-yellow-700': index % 3 === 0,
                'bg-pink-600 hover:bg-pink-700': index % 3 === 1,
                'bg-indigo-600 hover:bg-indigo-700': index % 3 === 2
              }"
                                @mouseenter="hoverButton = index"
                                @mouseleave="hoverButton = null"
                        >
                            <div class="relative inline-block overflow-hidden">
                <span
                        class="inline-block transition-all duration-300"
                        :class="{ 'translate-y-full opacity-0': hoverButton === index }"
                >
                  Réserver
                </span>
                                <span
                                        class="absolute left-0 inline-block w-full transition-all duration-300 text-gray-200"
                                        :class="{ '-translate-y-1/2 opacity-100': hoverButton === index, 'translate-y-0 opacity-0': hoverButton !== index }"
                                        style="top: 50%; transform: translateY(-50%);"
                                >
                  Réserver
                </span>
                            </div>

                            <div
                                    class="absolute inset-0 bg-gradient-to-r from-white/20 via-white/0 to-white/20
                     opacity-0 transition-opacity duration-300"
                                    :class="{ 'opacity-100': hoverButton === index }"
                                    style="transform: translateX(-100%) skewX(-20deg); animation: shine 1.5s infinite;"
                            ></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MontgolfiereService from "@/services/montgolfiere.service";
import PrestataireService from "@/services/prestataire.service";

export default {
    name: "MontgolfiereRegisterView",

    data() {
        return {
            hoverButton: null,
            montgolfieres: [],
        };
    },

    methods: {
        async goToReservation(montgolfiereId) {
            this.$router.push({
                name: 'montgolfiere-date',
                params: {
                    prestataire_name: this.$route.params.prestataire_name,
                    montgolfiereId,
                }
            });
        }
    },

    async mounted() {
        const presta = await PrestataireService.getPrestataireFromName(this.$route.params.prestataire_name);
        if (!presta || presta.error) return console.error("Prestataire introuvable");

        const res = await MontgolfiereService.getAvailableMontgolfieres();
        if (!res || res.error) return console.error("Erreur lors du chargement des montgolfières");

        // On ne garde que celles de ce prestataire
        this.montgolfieres = res.data.filter(m => m.prestataire_id === presta.data.id);
    }
};
</script>

<style scoped>
@keyframes shine {
    100% {
        transform: translateX(200%) skewX(-20deg);
    }
}

button {
    transform: translateY(0);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
</style>
