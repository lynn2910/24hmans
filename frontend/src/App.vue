<template>
	<div id="app" class="font-sans h-full w-screen bg-dark text-white">
		<!-- On affiche la barre de navigation, sauf si on est dans le dashboard prestataire ou prestataire -->
		<NavbarComponent
				v-if="!$route.meta['hideNavbar'] && !($route.fullPath.match(/(\/prestataire\/[^/]+\/panel)|(\/admin\/panel)/))">
		</NavbarComponent>

		<router-view/>

		<!-- Santa is here -->
		<SakuraBlossom :radius="[10.0, 40.5]" :flowers-amount="125" :speed="[0.5,1.5]"
									 :rotation="[-7, 8]"></SakuraBlossom>
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