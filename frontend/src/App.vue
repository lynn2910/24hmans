<template>
  <div id="app" class="font-sans h-full w-full bg-dark text-white">
    <!-- On affiche la barre de navigation, sauf si on est dans le dashboard prestataire ou prestataire -->
    <NavbarComponent
        v-if="!$route.meta['hideNavbar'] && !($route.fullPath.match(/(\/prestataire\/[^/]+\/panel)|(\/admin\/panel)/))">
    </NavbarComponent>

    <router-view/>

    <!-- Santa is here -->
    <SakuraBlossom :radius="[15.0, 20.5]"
                   :flowers-amount="100"
                   :speed="[0.2,1.07]"
                   :opacity="75"
                   :rotation="[-0.5, 0.5]"/>
  </div>
</template>
<script lang="ts">
import NavbarComponent from "@/components/navigation/navbar/NavbarComponent.vue";
import {mapActions} from "vuex";
import SakuraBlossom from "@/components/SakuraBlossom.vue";

export default {
  components: {SakuraBlossom, NavbarComponent},
  methods: {
    ...mapActions('login', ['getInformations']),
  },
  async beforeMount() {
    if (sessionStorage.getItem('access_token')) {
      console.log("Already logged in?");
      await this.getInformations();
    }
  }
}
</script>