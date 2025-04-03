<template>
	<AdminDashboardTemplate current-page="home">
		<div class="p-6">
			<h1 class="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
				{{ greetings }}, {{ loggedInUser.name }}
			</h1>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-7">
				<div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 col-span-2">
					<h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
						{{ $t('home.prestataires.name') }}
					</h2>
					<div class="overflow-x-auto">
						<table class="min-w-full leading-normal shadow-md rounded-lg overflow-hidden">
							<thead class="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
							<tr>
								<th class="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
									{{ $t('global.name') }}
								</th>
								<th class="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
									{{ $t('global.services') }}
								</th>
								<th class="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
									Actions
								</th>
							</tr>
							</thead>
							<tbody class="bg-white dark:bg-gray-800">
							<tr v-for="prestataire in prestataires" :key="prestataire.id">
								<td class="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
									<p class="text-gray-900 dark:text-white">{{ prestataire.name }}</p>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
                	<span
											class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight rounded-full bg-green-100 dark:bg-green-700 dark:text-green-100 w-[5.4rem]">
                	    <span class="absolute inset-0 bg-green-500 opacity-30 rounded-full"></span>
                	    <span class="relative">
												{{ services.find((s) => s.id === prestataire.id)?.nb_services || 0 }}
												{{ $t('global.services_lowercase') }}
											</span>
                	</span>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 dark:border-gray-700 text-sm">
									<div class="flex space-x-2">
										<router-link
												:to="{name: 'prestataire_profile', params: {prestataire_name: prestataire.referencer}}"
												target="_blank"
												class="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
										>
											<span>Voir</span>
											<svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24"
													 stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
															d="M14 5l7 7m0 0l-7 7m7-7H3"/>
											</svg>
										</router-link>
										<router-link
												:to="`/fr/admin/panel/prestataires?edit&prestataire_id=${prestataire.id}`"
												class="inline-flex items-center px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition-colors"
										>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
													 stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
															d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 012.828 0L20 10l-8 8-2-2 8-8-7-7z"/>
											</svg>
										</router-link>
										<router-link
												:to="`/fr/admin/panel/prestataires?delete&prestataire_id=${prestataire.id}`"
												class="inline-flex items-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors"
										>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
													 stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
											</svg>
										</router-link>
									</div>
								</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col justify-between">
					<div>
						<h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
							{{ $t('dashboards.presta_admin.some_stats') }}
						</h2>
						<div class="flex items-center">
							<span class="text-4xl font-bold text-blue-500 dark:text-blue-400 mr-4">{{ userCount }}</span>
							<span class="text-xl text-gray-700 dark:text-gray-300">Utilisateurs</span>
						</div>
					</div>
					<div class="mt-4">
						<p class="text-sm text-gray-500 dark:text-gray-400">
							Informations sur le nombre total d'utilisateurs inscrits sur la plateforme.
						</p>
					</div>
				</div>
			</div>
		</div>
	</AdminDashboardTemplate>
</template>

<script>
import AdminDashboardTemplate from "@/components/dashboard/admin/AdminDashboardTemplate.vue";
import UsersService from "@/services/users.service";
import {mapActions, mapGetters, mapState} from "vuex";
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
			services: [],
			greetings: '',
		};
	},
	computed: {
		...mapGetters('prestataire', ['prestataires']),
		...mapState('login', ['loggedInUser'])
	},
	actions: {
		...mapActions('prestataire', ["getAllPrestataires"]),
	},
	async beforeMount() {
		await store.dispatch("prestataire/getAllPrestataires");
	},
	async mounted() {
		const hour = new Date().getHours();
		if (hour < 12) {
			this.greetings = "Bonjour";
		} else if (hour < 18) {
			this.greetings = "Bon après-midi";
		} else {
			this.greetings = "Bonsoir";
		}

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
			console.error(services);
		}
	},
};
</script>
