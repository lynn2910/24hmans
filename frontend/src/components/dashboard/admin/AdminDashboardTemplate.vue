<template>
	<div class="flex h-screen bg-gray-100 dark:bg-gray-900 w-full">
		<div class="bg-gray-900 text-white w-64 flex flex-col">
			<router-link :to="{ name: 'home' }" class="py-4 flex items-center justify-center">
				<IconEvent class="mr-2" width="40" height="40"/>
				<span class="text-xl font-semibold">Event</span>
			</router-link>

			<div class="mt-8">
				<router-link
						:to="{ name: 'admin_dashboard' }"
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
						:to="{ name: 'admin_carte' }"
						class="flex items-center py-3 px-4 hover:bg-gray-800 rounded-md transition-colors"
						:class="{ 'bg-gray-800': currentPage === 'map' }"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 24 24"
							 class="fill-white h-6 w-6 mr-2">
						<path
								d="m21.447 6.105-6-3a1 1 0 0 0-.895 0L9 5.882 3.447 3.105A1 1 0 0 0 2 4v13c0 .379.214.725.553.895l6 3a1 1 0 0 0 .895 0L15 18.118l5.553 2.776a.992.992 0 0 0 .972-.043c.295-.183.475-.504.475-.851V7c0-.379-.214-.725-.553-.895zM10 7.618l4-2v10.764l-4 2V7.618zm-6-2 4 2v10.764l-4-2V5.618zm16 12.764-4-2V5.618l4 2v10.764z"></path>
					</svg>
					<span class="text-lg font-medium">Carte</span>
				</router-link>
				<div class="flex items-center py-3 px-4 opacity-50 cursor-not-allowed">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
							 stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M12 4.354a4 4 0 110 8 4 4 0 010-8zM2 10.943v8.017A2 2 0 004 21h16a2 2 0 002-2v-8.017a13.075 13.075 0 00-2-2.571.944.944 0 00-1.519.822 15.112 15.112 0 01-5.336-1.89a15.11 15.11 0 01-5.336 1.89.944.944 0 00-1.519-.822 13.072 13.072 0 00-2 2.57z"/>
					</svg>
					<span class="text-lg font-medium">Utilisateurs</span>
				</div>
				<router-link
						:to="{ name: 'admin_prestataires' }"
						class="flex items-center py-3 px-4 hover:bg-gray-800 rounded-md transition-colors"
						:class="{ 'bg-gray-800': currentPage === 'prestataires' }"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 24 24"
							 class="fill-white h-6 w-6 mr-2">
						<path d="M2 3h20v4H2zm17 5H3v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8h-2zm-3 6H8v-2h8v2z"></path>
					</svg>

					<span class="text-lg font-medium">Prestataires</span>
				</router-link>
			</div>

			<div class="mt-8">
				<h2 class="uppercase font-bold mt-5 mb-5 ml-4 text-sm text-gray-400">Services</h2>
				<div class="flex items-center py-3 px-4 opacity-50 cursor-not-allowed">
					<span class="mr-2">🛒</span>
					<span class="text-lg font-medium">Boutique</span>
				</div>
				<div class="flex items-center py-3 px-4 opacity-50 cursor-not-allowed">
					<span class="mr-2">📸</span>
					<span class="text-lg font-medium">Visites des écuries</span>
				</div>
				<div class="flex items-center py-3 px-4 opacity-50 cursor-not-allowed">
					<span class="mr-2">🏎️</span>
					<span class="text-lg font-medium">Karting</span>
				</div>
				<div class="flex items-center py-3 px-4 opacity-50 cursor-not-allowed">
					<span class="mr-2">🎟️</span>
					<span class="text-lg font-medium">Billeterie</span>
				</div>
				<div class="flex items-center py-3 px-4 opacity-50 cursor-not-allowed">
					<span class="mr-2">🎈</span>
					<span class="text-lg font-medium">Montgolfières</span>
				</div>
			</div>

			<div class="mt-auto border-t border-gray-700 p-4">
				<div class="flex items-center justify-between">
					<div>
						<p class="font-bold text-white text-md">{{ loggedInUser?.name }}</p>
					</div>
					<button @click="logoutUser" class="text-gray-400 hover:text-white transition-colors">
						<svg viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg"
								 class="h-6 w-6">
							<path
									d="M6.60689 8.8092V11.0115L16.5172 11.0115V14.3149L22.0229 9.91035L16.5172 5.50576V8.8092L6.60689 8.8092Z"
									style="fill: rgb(255, 255, 255);"></path>
							<path
									d="M2.20232 19.8208H12.1126C13.3272 19.8208 14.3149 18.8331 14.3149 17.6185V13.2139H12.1126V17.6185H2.20232L2.20232 2.20244H12.1126V6.60703H14.3149V2.20244C14.3149 0.987877 13.3272 0.000146866 12.1126 0.000146866H2.20232C0.987754 0.000146866 2.47955e-05 0.987877 2.47955e-05 2.20244L2.47955e-05 17.6185C2.47955e-05 18.8331 0.987754 19.8208 2.20232 19.8208Z"
									style="fill: rgb(255, 255, 255);"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
		<div class="flex-1 p-6 overflow-y-auto w-[calc(100vw - 16rem)]">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import IconEvent from "@/components/navigation/navbar/icons/IconEvent.vue";
import {mapActions, mapState} from 'vuex'
import {Selected} from "@/utils";

export default {
	name: "AdminDashboardTemplate",
	components: {IconEvent},
	async beforeMount() {
		if (!this.loggedInUser || this.userType !== Selected.Admin) {
			if (this.userType !== Selected.Admin) console.log("Ce n'est pas un administrateur");
			else console.log("Aucun utilisateur connecté n'a été trouvé");

			await this.$router.push({
				name: 'login',
				query: {
					backURL: this.$route.fullPath,
					userType: Selected.Admin.toString()
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
			await this.$router.push({name: "login"})
		}
	}
}
</script>

