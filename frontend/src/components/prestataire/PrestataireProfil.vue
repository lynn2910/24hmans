<script>
import {mapState} from "vuex";
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
    // services associés au prestataire
    if (this.prestataire) {
      let servicesRes = await PrestataireService.getPrestataireServices(this.prestataire.id);
      if (!servicesRes.error) {
        this.services = servicesRes.data;
      } else {
        console.error(servicesRes.data);
      }
    }
  },
  data() {
    return {
      prestataire: null,
      services: [],
      publicPath: process.env.BASE_URL
    }
  },
  computed: {
    ...mapState("login", ["loggedInUser"])
  }
}

</script>

<template>
  <div class="w-full mt-36 bg-dark">
    <img v-if="prestataire?.icon" :src="`${publicPath === '/' ? '': '/'}${prestataire?.icon}`" alt="Photo de profil"
         class="mx-auto rounded-full w-44 h-44">
    <h1 class="font-extrabold text-4xl text-center py-4">
      {{ prestataire?.name || prestataire.referencer }}
    </h1>
    <div class="flex flex-row mx-auto justify-center content-center">
      <a v-for="(link, index) in (prestataire?.links || [])" :key="index" :href="link.url"
         class="py-2 px-5 bg-gray-700 mx-5 font-medium rounded-3xl hover:bg-gray-500 text-xl">
        {{ link.name }}</a>
    </div>

    <p id="prestataire_description" class="w-[75%] mx-auto mt-12 mb-16 text-xl" style="white-space: pre-wrap"
       v-html="prestataire?.description"></p>

    <h1 class="font-extrabold text-4xl text-center py-4">{{ $t('dashboards.services') }}</h1>

    <!-- Liste des services dynamique -->
    <div v-if="services.length" class="flex justify-center my-12 px-4">
      <div class="w-full max-w-4xl space-y-8">
        <!-- GARAGE -->
        <router-link
            v-if="services.includes('garage')"
            :to="`/${$route.params.locale}/ecuries`"
            class="group relative flex items-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]"
        >
          <div
              class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>

          <div
              class="flex-shrink-0 w-28 h-28 mr-8 bg-blue-500/10 rounded-2xl p-5 flex items-center justify-center border-2 border-blue-500/20">
            <svg class="w-full h-full text-blue-400" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-5h14v5z"/>
              <circle fill="currentColor" cx="7.5" cy="14.5" r="1.5"/>
              <circle fill="currentColor" cx="16.5" cy="14.5" r="1.5"/>
              <path fill="currentColor" d="M10 11l1.5-1.5h1L14 11v1h-4z"/>
            </svg>
          </div>

          <div class="flex-1 text-left">
            <h3 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3">
              Garage
            </h3>
            <p class="text-gray-300 text-lg leading-relaxed">
              Réparation mécanique complète et entretien sur mesure de votre véhicule par nos experts certifiés.
            </p>
            <div class="mt-6 flex items-center text-blue-300 transition-all group-hover:text-blue-400">
              <span class="mr-2 font-semibold">Voir nos services</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </div>
        </router-link>

        <!-- ÉCURIE -->
        <router-link
            v-if="services.includes('ecurie')"
            :to="`/${$route.params.locale}/ecuries/${prestataire?.name.toLowerCase()}`"
            class="group relative flex items-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-2 border-gray-700 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]"
        >
          <div
              class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>

          <div
              class="flex-shrink-0 w-28 h-28 mr-8 bg-amber-500/10 rounded-2xl p-5 flex items-center justify-center border-2 border-amber-500/20">
            <svg class="w-full h-full text-amber-400" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H5V4h14v14z"/>
              <path fill="currentColor" d="M7 12h2v5H7zm4-7h2v12h-2zm4 5h2v7h-2z"/>
            </svg>
          </div>

          <div class="flex-1 text-left">
            <h3 class="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-3">
              Écurie
            </h3>
            <p class="text-gray-300 text-lg leading-relaxed">
              Gestion professionnelle de votre écurie avec hébergement haut de gamme et soins équins sur mesure.
            </p>
            <div class="mt-6 flex items-center text-amber-300 transition-all group-hover:text-amber-400">
              <span class="mr-2 font-semibold">Découvrir</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </div>
        </router-link>

        <!-- KARTING -->
        <router-link
            v-if="services.includes('karting')"
            :to="`/${$route.params.locale}/karting/${prestataire?.name.toLowerCase()}`"
            class="group relative flex items-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-2 border-gray-700 hover:border-red-500 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]"
        >
          <div
              class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent"></div>

          <div
              class="flex-shrink-0 w-28 h-28 mr-8 bg-red-500/10 rounded-2xl p-5 flex items-center justify-center border-2 border-red-500/20">
            <svg class="w-full h-full text-red-400" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"/>
              <path fill="currentColor"
                    d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z"/>
              <path fill="currentColor" d="M12 7c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1z"/>
            </svg>
          </div>

          <div class="flex-1 text-left">
            <h3 class="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-300 bg-clip-text text-transparent mb-3">
              Karting
            </h3>
            <p class="text-gray-300 text-lg leading-relaxed">
              Piste professionnelle et karts haute performance pour des sensations extrêmes en toute sécurité.
            </p>
            <div class="mt-6 flex items-center text-red-300 transition-all group-hover:text-red-400">
              <span class="mr-2 font-semibold">Réserver</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </div>
        </router-link>

        <!-- BILLETTERIE -->
        <router-link
            v-if="services.includes('billetterie')"
            :to="`/${$route.params.locale}/billetterie/${prestataire?.name.toLowerCase()}`"
            class="group relative flex items-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-2 border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]"
        >
          <div
              class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent"></div>

          <div
              class="flex-shrink-0 w-28 h-28 mr-8 bg-green-500/10 rounded-2xl p-5 flex items-center justify-center border-2 border-green-500/20">
            <svg class="w-full h-full text-green-400" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
          </div>

          <div class="flex-1 text-left">
            <h3 class="text-3xl font-bold bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent mb-3">
              Billetterie
            </h3>
            <p class="text-gray-300 text-lg leading-relaxed">
              Achetez vos billets en ligne pour tous nos événements et activités. Réservation simple et sécurisée.
            </p>
            <div class="mt-6 flex items-center text-green-300 transition-all group-hover:text-green-400">
              <span class="mr-2 font-semibold">Acheter</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </div>
        </router-link>

        <!-- BOUTIQUE -->
        <router-link
            v-if="services.includes('boutique')"
            :to="`/${$route.params.locale}/boutique/${prestataire?.name.toLowerCase()}`"
            class="group relative flex items-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-2 border-gray-700 hover:border-emerald-500 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]"
        >
          <div
              class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>

          <div
              class="flex-shrink-0 w-28 h-28 mr-8 bg-emerald-500/10 rounded-2xl p-5 flex items-center justify-center border-2 border-emerald-500/20">
            <svg class="w-full h-full text-emerald-400" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>
            </svg>
          </div>

          <div class="flex-1 text-left">
            <h3 class="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-3">
              Boutique
            </h3>
            <p class="text-gray-300 text-lg leading-relaxed">
              Découvrez notre sélection premium d'équipements, accessoires et goodies exclusifs.
            </p>
            <div class="mt-6 flex items-center text-emerald-300 transition-all group-hover:text-emerald-400">
              <span class="mr-2 font-semibold">Visiter</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </div>
        </router-link>

        <!-- MONTGOLFIÈRE -->
        <router-link
            v-if="services.includes('montgolfiere')"
            :to="`/${$route.params.locale}/montgolfiere/${prestataire?.name.toLowerCase()}`"
            class="group relative flex items-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-2 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]"
        >
          <div
              class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>

          <div
              class="flex-shrink-0 w-28 h-28 mr-8 bg-purple-500/10 rounded-2xl p-5 flex items-center justify-center border-2 border-purple-500/20">
            <svg class="w-full h-full text-purple-400" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"/>
              <path fill="currentColor"
                    d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z"/>
              <path fill="currentColor" d="M12 7c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1z"/>
            </svg>
          </div>

          <div class="flex-1 text-left">
            <h3 class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent mb-3">
              Montgolfière
            </h3>
            <p class="text-gray-300 text-lg leading-relaxed">
              Vols en montgolfière exceptionnels avec vue panoramique et expérience inoubliable.
            </p>
            <div class="mt-6 flex items-center text-purple-300 transition-all group-hover:text-purple-400">
              <span class="mr-2 font-semibold">Voir les offres</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Message si aucun service n'est disponible -->
    <p v-else
       class="text-center text-gray-400 text-xl italic mt-4"
       style="display: flex; justify-content: center; align-items: center; height: 15vh;">
      {{ $t('dashboards.no_services') }}
    </p>
  </div>
</template>

<style>
#prestataire_description img {
  border-radius: 1rem;
}
</style>

