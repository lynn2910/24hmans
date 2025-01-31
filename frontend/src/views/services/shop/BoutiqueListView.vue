<script>
import PrestataireService from "@/services/prestataire.service";
import billeterieListView from "@/views/services/BilleterieListView.vue";

export default {
	name: "Boutiques",
	computed: {
		billeterieListView() {
			return billeterieListView
		}
	},
	async beforeMount() {
		try {
			const prestatairesRes = await PrestataireService.getAllPrestataires();
			if (!prestatairesRes.error) {
				const allPrestataires = prestatairesRes.data;

				for (const prestataire of allPrestataires) {
					const servicesRes = await PrestataireService.getPrestataireServices(prestataire.id);
					if (!servicesRes.error) {
						const services = servicesRes.data;
						if (services.some(service => service.toLowerCase() === "boutique")) {
							this.boutiques.push(prestataire);
						}
					}
				}
			} else {
				console.error(prestatairesRes.data);
			}
		} catch (error) {
			console.error("Erreur lors du chargement des boutiques :", error);
		}
	},
	data() {
		return {
			boutiques: [],
			publicPath: process.env.BASE_URL,
		};
	},
};
</script>

<template>
	<div class="w-full mt-36 bg-dark">
		<h1 class="font-extrabold text-4xl text-center py-5 mx-auto mt-8 mb-6">{{ $t('lists.boutiques') }}</h1>

		<!-- Affichage des boutiques -->
		<div class="flex justify-center">
			<div
					class="grid gap-12 px-8"
					:class="{
                    'grid-cols-1': boutiques.length === 1,
                    'grid-cols-2 justify-center': boutiques.length === 2,
                    'sm:grid-cols-2 lg:grid-cols-3': boutiques.length > 2
                }"
			>

				<router-link
						v-for="prestataire in boutiques"
						:key="prestataire.id"
						:to="{ name: 'shop_view', params: {prestataire_name: prestataire.name.toLowerCase()} }"
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
							{{ $t('lists.bo_click') }}
						</p>
					</div>
				</router-link>
			</div>
		</div>


		<!-- Message si aucune boutique n'est disponible -->
		<p v-if="!boutiques.length" class="text-center text-lg mt-12">
			{{ $t('lists.bo_empty') }}
		</p>
	</div>
</template>


