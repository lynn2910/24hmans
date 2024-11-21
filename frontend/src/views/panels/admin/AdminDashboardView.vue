<!--

Page d'accueil du dashboard admin

 -->

<template>
	<AdminDashboardTemplate current-page="home">
		<div class="flex flex-row items-center content-center justify-start gap-5 h-[90%] w-full mt-[2.5%]">
			<div class="w-full bg-blue-400 bg-opacity-5 m-5 mr-0 p-5 h-full border border-gray-700 rounded-2xl">
				<h2 class="text-2xl font-bold mb-5">Prestataires</h2>

				<table class="w-full text-left table-auto min-w-max">
					<thead>

					<tr class="text-left">
						<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Id</th>
						<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Name</th>
						<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Services</th>
						<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50"></th>
					</tr>

					</thead>
					<tbody>

					<tr v-for="(prestataire, index) in prestataires" :key="index" class="border-b border-b-gray-500 my-2">
						<td class="p-4 border-b border-blue-gray-50">
							<p
									class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
								{{ prestataire.id }}</p>
						</td>
						<td class="p-4 border-b border-blue-gray-50">
							<p
									class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
								{{ prestataire.name }}</p>
						</td>
						<td class="p-4 border-b border-blue-gray-50">
							<p>
								<strong>
									{{
										services.find((s) => s.id === prestataire.id)?.nb_services || 0
									}}
								</strong> services
							</p>
						</td>
						<td class="p-4 border-b border-blue-gray-50 flex flex-row items-center justify-evenly">
							<!-- voir -->
							<router-link
									:to="`/prestataire/${transformPrestataireName(prestataire.name)}`"
									target="_blank"
									class="flex flex-row items-center content-center py-2 px-3 bg-dark rounded hover:bg-opacity-50 cursor-pointer">
								<p class="mr-2">Voir</p>
								<svg xmlns="http://www.w3.org/2000/svg" class="fill-white" width="24" height="24" viewBox="0 0 24 24">
									<path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
								</svg>
							</router-link>
							<!-- Edit -->
							<router-link :to="`/admin/panel/prestataires?edit&prestataire_id=${prestataire.id}`"
													 class="p-2 cursor-pointer fill-blue-500 hover:fill-blue-400">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
									<path
											d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
								</svg>
							</router-link>
							<!-- Delete -->
							<router-link :to="`/admin/panel/prestataires?delete&prestataire_id=${prestataire.id}`"
													 class="p-2 cursor-pointer fill-red-500 hover:fill-red-400">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path
											d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
								</svg>
							</router-link>

						</td>
					</tr>

					</tbody>
				</table>

			</div>
			<div class="min-w-[400px] w-96 bg-blue-400 bg-opacity-5 m-5 ml-0 p-5 h-full border border-gray-700 rounded-2xl">
				<h2 class="text-2xl font-bold mb-5">Quelques statistiques</h2>
				<p class="text-xl"><strong class="text-2xl font-bold">{{ userCount }}</strong> utilisateurs</p>
			</div>
		</div>
	</AdminDashboardTemplate>
</template>

<script>
import AdminDashboardTemplate from "@/components/dashboard/admin/AdminDashboardTemplate.vue";
import UsersService from "@/services/users.service";
import {mapActions, mapGetters} from "vuex";
import store from "@/store";
import PrestataireService from "@/services/prestataire.service";
import {transformPrestataireName} from "@/utils";

export default {
	name: "AdminDashboardView",
	methods: {transformPrestataireName},
	components: {AdminDashboardTemplate},
	data() {
		return {
			userCount: 0,
			services: []
		}
	},
	computed: {
		...mapGetters('prestataire', ['prestataires'])
	},
	actions: {
		...mapActions('prestataire', ["getAllPrestataires"])
	},
	async beforeMount() {
		await store.dispatch("prestataire/getAllPrestataires");
	},
	async mounted() {
		let userCount = await UsersService.getUserCount();
		if (!userCount.error) {
			this.userCount = userCount.data?.length || 0;
		} else {
			console.error(userCount);
		}

		let services = await PrestataireService.getPrestatairesServicesCount();
		if (!services.error) {
			this.services = services.data;
		} else {
			console.error(services)
		}
	}
}
</script>