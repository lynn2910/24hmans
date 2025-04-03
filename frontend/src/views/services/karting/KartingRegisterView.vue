<template>
  <div class="w-full mt-28 bg-dark pb-16">
    <h1 class="font-extrabold text-4xl text-center py-5 mx-auto mt-4 mb-12 text-white">
      Découvrez l'un de nos circuits
    </h1>

    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
            v-for="(circuit, index) in circuits"
            :key="circuit.id"
            :class="['bg-white/10 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl transition-all duration-300 hover:scale-105 group']"
        >
          <div class="flex flex-col h-full">
            <h2
                class="text-2xl font-bold mb-4 transition-colors duration-300"
                :class="{
                'text-green-400 group-hover:text-green-300': index === 0,
                'text-blue-400 group-hover:text-blue-300': index === 1,
                'text-red-400 group-hover:text-red-300': index === 2
              }"
            >
              {{ circuit.nom }}
            </h2>
            <h3 class="text-lg text-gray-300 mb-4">Karting {{ circuit.cc }} CC</h3>

            <ul class="flex-1 space-y-3 mb-6">
              <li class="flex items-center text-gray-400">
                <span
                    class="mr-2 animate-pulse"
                    :class="{
                    'text-green-500': index === 0,
                    'text-blue-500': index === 1,
                    'text-red-500': index === 2
                  }"
                >•</span>
                Circuit adapté aux pilotes de {{ circuit.age_minimum }} ans et plus
              </li>
              <li
                  v-for="(point, pointIndex) in additionalPoints[index]"
                  :key="'point-' + pointIndex"
                  class="flex items-center text-gray-400"
              >
                <span
                    class="mr-2 animate-pulse"
                    :class="{
                    'text-green-500': index === 0,
                    'text-blue-500': index === 1,
                    'text-red-500': index === 2
                  }"
                >•</span>
                {{ point }}
              </li>
            </ul>

            <button
                @click="goToReservation(circuit.id)"
                class="mt-auto text-white font-semibold py-3 px-6 rounded-lg
          transition-all duration-300 overflow-hidden relative"
                :class="{
      'bg-green-600 hover:bg-green-700': index === 0,
      'bg-blue-600 hover:bg-blue-700': index === 1,
      'bg-red-600 hover:bg-red-700': index === 2
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
import {mapActions, mapState} from "vuex";
import PrestataireService from "@/services/prestataire.service";

export default {
  name: "KartingRegisterView",

  data() {
    return {
      hoverButton: null,
      additionalPoints: [
        ["Piste adaptée aux enfants", "Circuit sécurisé avec des virages serrés", "Réservation en ligne possible"],
        ["Circuit pour pilotes expérimentés", "Vitesse max : 70 km/h", "Accès au parcours en groupe"],
        ["Circuit réservé aux pilotes confirmés", "Vitesse max : 100 km/h", "Bande de sécurité améliorée"],
      ],
    };
  },

  computed: {
    ...mapState("karting", ["circuits"]),
  },

  methods: {
    ...mapActions("karting", ["getAllCircuits"]),

    async goToReservation(circuitId) {
      const presta_id = await PrestataireService.getPrestataireFromName(this.$route.params.prestataire_name);
      this.$router.push({
        name: 'karting-date',
        params: {
          prestataire_name: this.$route.params.prestataire_name,
          circuitId: circuitId,
          kartingId: presta_id.data.id,
        }
      });
    }
  },

  async mounted() {
    const presta = await PrestataireService.getPrestataireFromName(this.$route.params.prestataire_name);
    if (presta.error) {
      console.error(presta);
      return;
    } else {
      const prestaId = presta.data.id;
      await this.getAllCircuits(prestaId);
      console.log("Circuits chargés :", this.circuits);
    }
  },
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
