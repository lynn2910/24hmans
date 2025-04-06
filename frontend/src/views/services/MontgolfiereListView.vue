<template>
  <div class="w-full mt-28 bg-dark">
    <h1 class="font-extrabold text-4xl text-center py-5 mx-auto mt-4 mb-3">{{ $t('lists.montgolfiere') }}</h1>

    <!-- Affichage des montgolfières-->
    <div class="flex justify-center">
      <div
          class="grid gap-12 px-8"
          :class="{
                    'grid-cols-1': montgolfieres.length === 1,
                    'grid-cols-2 justify-center': montgolfieres.length === 2,
                    'sm:grid-cols-2 lg:grid-cols-3': montgolfieres.length > 2
                }"
      >
        <router-link
            v-for="prestataire in montgolfieres"
            :key="prestataire.id"
            :to="{ name: 'montgolfiere_view', params: {prestataire_name: prestataire.referencer} }"
            class="relative group flex flex-col items-center text-center w-96 h-[30rem] p-8 bg-red-950-800 border border-green-950 rounded-lg shadow-lg overflow-hidden
                   transition-transform duration-300 transform hover:scale-105 hover:shadow-[0px_0px_40px_2px_black]">
          <!-- Bordures -->
          <div
              class="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-400 opacity-30 blur-md transition-opacity duration-300 group-hover:opacity-50"></div>

          <!-- Informations prestataires -->
          <div class="relative z-10 flex flex-col justify-between h-full">
            <img
                :src="`${publicPath === '/' ? '' : publicPath}${prestataire.icon}`"
                alt="Logo du prestataire"
                class="flex-wrap drop-shadow-all-white-700 w-60 h-60 rounded-full mb-3 border-4 border-white shadow-md"
            />
            <h2 class="text-4xl font-bold text-white mb-2">{{ prestataire.name }}</h2>
            <p class="text-gray-400 text-base">
              {{ $t('lists.montgolfiere_click') }}
            </p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Message si aucune montgolfière n'est disponible -->
    <p v-if="!montgolfieres.length" class="text-center text-lg mt-12">
      {{ $t('lists.montgolfiere_empty') }}
    </p>
  </div>
</template>

<script>
import PrestataireService from "@/services/prestataire.service";
import {mapActions, mapState} from "vuex";

export default {
  name: "MontgolfieresListView",

  async beforeMount() {
    await this.getAllPrestataires()
    try {
      for (const prestataire of this.prestataires) {
        const servicesRes = await PrestataireService.getPrestataireServices(prestataire.id);
        if (!servicesRes.error) {
          const services = servicesRes.data;
          if (services.some(service => service.toLowerCase() === "montgolfiere")) {
            this.montgolfieres.push(prestataire);
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement des montgolfières :", error);
    }
  },
  methods: {
    ...mapActions('prestataire', ['getAllPrestataires'])
  },
  computed: {
    ...mapState('prestataire', ['prestataires'])
  },
  data() {
    return {
      montgolfieres: [],
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<style scoped>
.group:hover .blur-md {
  filter: blur(12px);
}
</style>
