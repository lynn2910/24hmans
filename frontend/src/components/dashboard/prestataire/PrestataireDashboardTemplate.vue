<template>
	<div class="flex h-screen bg-gray-100 dark:bg-gray-900 w-full overflow-hidden">
		<div class="bg-gray-900 text-white w-64 flex flex-col select-none">
			<router-link :to="{ name: 'home' }" class="py-4 flex items-center justify-center">
				<IconEvent class="mr-2" width="60" height="60"/>
			</router-link>

			<div class="flex flex-col overflow-y-auto">
				<div class="mt-5">
					<router-link
							:to="{ name: 'prestataire_dashboard' }"
							class="flex items-center py-3 px-4 hover:bg-gray-800 rounded-md transition-colors"
							:class="{ 'bg-gray-800': currentPage === 'home' }"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								 class="fill-white h-6 w-6 mr-2">
							<path
									d="M12.74 2.32a1 1 0 0 0-1.48 0l-9 10A1 1 0 0 0 3 14h2v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1 1 1 0 0 0-.26-.68z"></path>
						</svg>
						<span class="text-lg font-medium">Tableau de bord</span>
					</router-link>
					<router-link
							:to="{ name: 'prestataire_dashboard_stats' }"
							class="flex items-center py-3 px-4 hover:bg-gray-800 rounded-md transition-colors"
							:class="{ 'bg-gray-800': currentPage === 'stats' }"
					>
						<svg class="h-6 w-6 mr-2" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
									d="M6.49984 30.2498H1.74984C1.32991 30.2498 0.927184 30.083 0.630251 29.7861C0.333319 29.4892 0.166504 29.0864 0.166504 28.6665V15.9998C0.166504 15.5799 0.333319 15.1772 0.630251 14.8803C0.927184 14.5833 1.32991 14.4165 1.74984 14.4165H6.49984C6.91976 14.4165 7.32249 14.5833 7.61942 14.8803C7.91636 15.1772 8.08317 15.5799 8.08317 15.9998V28.6665C8.08317 29.0864 7.91636 29.4892 7.61942 29.7861C7.32249 30.083 6.91976 30.2498 6.49984 30.2498ZM17.5832 30.2498H12.8332C12.4132 30.2498 12.0105 30.083 11.7136 29.7861C11.4167 29.4892 11.2498 29.0864 11.2498 28.6665V1.74984C11.2498 1.32991 11.4167 0.927184 11.7136 0.630251C12.0105 0.333319 12.4132 0.166504 12.8332 0.166504H17.5832C18.0031 0.166504 18.4058 0.333319 18.7028 0.630251C18.9997 0.927184 19.1665 1.32991 19.1665 1.74984V28.6665C19.1665 29.0864 18.9997 29.4892 18.7028 29.7861C18.4058 30.083 18.0031 30.2498 17.5832 30.2498ZM28.6665 30.2498H23.9165C23.4966 30.2498 23.0938 30.083 22.7969 29.7861C22.5 29.4892 22.3332 29.0864 22.3332 28.6665V11.2498C22.3332 10.8299 22.5 10.4272 22.7969 10.1303C23.0938 9.83332 23.4966 9.6665 23.9165 9.6665H28.6665C29.0864 9.6665 29.4892 9.83332 29.7861 10.1303C30.083 10.4272 30.2498 10.8299 30.2498 11.2498V28.6665C30.2498 29.0864 30.083 29.4892 29.7861 29.7861C29.4892 30.083 29.0864 30.2498 28.6665 30.2498Z"
									style="fill: rgb(255, 255, 255);"></path>
						</svg>
						<span class="text-lg font-medium">Statistiques</span>
					</router-link>
					<router-link
							:to="{ name: 'presta_edit_profile' }"
							class="flex items-center py-3 px-4 hover:bg-gray-800 rounded-md transition-colors"
							:class="{ 'bg-gray-800': currentPage === 'profil' }"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
								 stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
						</svg>
						<span class="text-lg font-medium">Profil</span>
					</router-link>
					<router-link
							:to="{ name: 'presta_carte' }"
							class="flex items-center py-3 px-4 hover:bg-gray-800 rounded-md transition-colors"
							:class="{ 'bg-gray-800': currentPage === 'map' }"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-white h-6 w-6 mr-2">
							<path
									d="m21.447 6.105-6-3a1 1 0 0 0-.895 0L9 5.882 3.447 3.105A1 1 0 0 0 2 4v13c0 .379.214.725.553.895l6 3a1 1 0 0 0 .895 0L15 18.118l5.553 2.776a.992.992 0 0 0 .972-.043c.295-.183.475-.504.475-.851V7c0-.379-.214-.725-.553-.895zM10 7.618l4-2v10.764l-4 2V7.618zm-6-2 4 2v10.764l-4-2V5.618zm16 12.764-4-2V5.618l4 2v10.764z"></path>
						</svg>
						<span class="text-lg font-medium">Carte</span>
					</router-link>
				</div>

				<div class="mt-5">
					<h2 class="uppercase font-bold mt-5 mb-5 ml-4 text-sm text-gray-400">Services</h2>
					<router-link
							:to="{ name:'prestataire_dashboard_shop' }"
							class="flex items-center py-3 px-4 hover:bg-gray-800 rounded-md transition-colors"

					>
						<span class="mr-2">🛒</span>
						<span class="text-lg font-medium">Boutique</span>
					</router-link>
					<router-link
							:to="{ name:'visite_ecuries_panel' }"
							class="flex items-center py-3 px-4 hover:bg-gray-800 rounded-md transition-colors"

					>
						<span class="mr-2">📸</span>
						<span class="text-lg font-medium">Visites des écuries</span>
					</router-link>
					<div class="flex items-center py-3 px-4 opacity-25 cursor-not-allowed">
						<span class="mr-2">🏎️</span>
						<span class="text-lg font-medium">Karting</span>
					</div>
					<div class="flex items-center py-3 px-4 opacity-25 cursor-not-allowed">
						<span class="mr-2">🎫</span>
						<span class="text-lg font-medium">Billeterie</span>
					</div>
					<div class="flex items-center py-3 px-4 opacity-25 cursor-not-allowed">
						<span class="mr-2">🎈</span>
						<span class="text-lg font-medium">Montgolfières</span>
					</div>
				</div>

			</div>
			<div class="mt-auto border-t border-gray-700 p-4">
				<router-link :to="{ name: 'prestataire_profile', params: { prestataire_name: loggedInUser?.referencer } }"
										 class="flex items-center justify-between hover:bg-gray-800 rounded-md transition-colors p-2"
				>
					<div class="flex items-center">
						<img class="w-10 h-10 rounded-full mr-2"
								 :src="`${publicPath === '/' ? '' : publicPath}${loggedInUser?.icon}`" alt="icon">
						<p class="font-bold text-white text-md">{{ loggedInUser?.name }}</p>
					</div>
					<button @click="logoutUser"
									class="text-gray-400 p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
						<svg class="h-6 w-6" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
									d="M6.60689 8.8092V11.0115L16.5172 11.0115V14.3149L22.0229 9.91035L16.5172 5.50576V8.8092L6.60689 8.8092Z"
									style="fill: rgb(255, 255, 255);"></path>
							<path
									d="M2.20232 19.8208H12.1126C13.3272 19.8208 14.3149 18.8331 14.3149 17.6185V13.2139H12.1126V17.6185H2.20232L2.20232 2.20244H12.1126V6.60703H14.3149V2.20244C14.3149 0.987877 13.3272 0.000146866 12.1126 0.000146866H2.20232C0.987754 0.000146866 2.47955e-05 0.987877 2.47955e-05 2.20244L2.47955e-05 17.6185C2.47955e-05 18.8331 0.987754 19.8208 2.20232 19.8208Z"
									style="fill: rgb(255, 255, 255);"></path>
						</svg>
					</button>
				</router-link>
			</div>
		</div>
		<div class="flex-1 p-6 overflow-y-auto">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import IconEvent from "@/components/navigation/navbar/icons/IconEvent.vue";
import {mapActions, mapState} from 'vuex'
import {Selected} from "@/utils";

export default {
	name: "PrestataireDashboardTemplate",
	components: {IconEvent},
	async beforeMount() {
		if (!this.loggedInUser || this.userType !== Selected.Prestataire) {
			if (this.userType !== Selected.Prestataire) console.log("Ce n'est pas un prestataire");
			else console.log("Aucun utilisateur connecté n'a été trouvé");

			await this.$router.push({
				name: 'login',
				query: {
					backURL: this.$route.fullPath,
					userType: Selected.Prestataire.toString()
				}
			});
		}
	},
	props: {
		currentPage: String
	},
	data() {
		return {
			publicPath: process.env.BASE_URL
		}
	},
	computed: {
		...mapState('login', ['loggedInUser', 'userType'])
	},
	methods: {
		...mapActions('login', ['login', 'logout']),
		async logoutUser() {
			await this.logout();
			this.$router.push({name: 'login', query: {loggedOut: 1}})
		}
	}
}
</script>