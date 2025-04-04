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

		<!-- Liste des services -->
		<div v-if="services.length" class="flex justify-center mt-6 my-14">
			<div class="w-full max-w-2xl">
				<router-link
						v-for="(service, index) in services"
						:key="index"
						:to="service.toLowerCase() === 'garage' ? `/${$route.params.locale}/ecuries` : `/${$route.params.locale}/${service.toLowerCase()}/${prestataire?.name.toLowerCase()}`"
						class="relative flex flex-col items-center text-center p-4 border border-gray-600 rounded shadow-lg
                   transition-transform duration-300 transform hover:scale-105 hover:shadow-[0px_0px_15px_2px_white]"
				>
					<div
							class="absolute inset-0 bg-gradient-to-br from-red-700 to-indigo-500 opacity-30 blur-md transition-opacity duration-300 group-hover:opacity-50"
					></div>
					<div class="relative z-10">
						<div
								class="flex items-center justify-center bg-indigo-300 bg-opacity-75 drop-shadow-all-white-700 w-20 h-20 rounded-full border-2 border-indigo-400 shadow-md">
							<span class="text-red-950 text-lg font-bold">{{ service.charAt(0).toUpperCase() }}</span>
						</div>
						<h2 class="text-xl font-bold mt-3">{{ service }}</h2>
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

