<template>
	<div class="bg-dark h-screen w-screen flex flex-row ">
		<!-- head -->
		<div class="m-5 p-5 w-1/5 min-w-1/5 bg-emerald-400 bg-opacity-5 rounded border border-gray-700"
				 style="height: calc(100% - 3rem)">
			<!-- Go back home -->
			<router-link to="/"
									 class="flex flex-row items-center content-center justify-between py-2 px-3 bg-black bg-opacity-10 hover:bg-opacity-50 cursor-pointer rounded border border-gray-600">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-white">
					<path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
				</svg>
				<p>Retourner à la page d'accueil</p>
			</router-link>

			<h1 class="mt-7 ml-3 text-lg">
				<strong class="text-xl">{{ bonjourOuBonsoir }}</strong> {{ loggedInUser?.first_name }}
				{{ loggedInUser?.last_name }}
			</h1>

			<!-- liens -->
			<div class="mt-8 w-2/3 ml-5 mr-auto">
				<!-- Billets -->
				<router-link to="/user/panel/tickets" class="mt-3 flex flex-row items-center content-center justify-start">
					<svg class="fill-white mr-3 my-auto" xmlns="http://www.w3.org/2000/svg" width="24"
							 height="24"
							 viewBox="0 0 24 24">
						<path d="M14 9h8v6h-8z"></path>
						<path
								d="M20 3H5C3.346 3 2 4.346 2 6v12c0 1.654 1.346 3 3 3h15c1.103 0 2-.897 2-2v-2h-8c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h8V5c0-1.103-.897-2-2-2z"></path>
					</svg>
					<h2 class="font-bold text-xl">Mes billets</h2>
				</router-link>
				<!-- Billets -->
				<router-link to="/user/panel/tickets" class="mt-3 flex flex-row items-center content-center justify-start">
					<svg class="fill-white mr-3 my-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
							 viewBox="0 0 24 24">
						<path
								d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
						<path d="m8 16 5.991-2L16 8l-6 2z"></path>
					</svg>
					<h2 class="font-bold text-xl">Mes courses</h2>
				</router-link>
				<!-- Boutique -->
				<router-link to="/user/panel/tickets" class="mt-3 flex flex-row items-center content-center justify-start">
					<svg class="fill-white mr-3 my-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
							 viewBox="0 0 24 24">
						<path
								d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 0 0-1 0l-9 5-.09.07-.11.08a.41.41 0 0 0-.07.11.39.39 0 0 0-.08.1.59.59 0 0 0-.06.14.3.3 0 0 0 0 .1A.76.76 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a.75.75 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06 9-5A1 1 0 0 0 22 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9zm0-7.72L18.94 8 16.7 9.25 9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z"></path>
					</svg>
					<h2 class="font-bold text-xl">Mes achats</h2>
				</router-link>
			</div>

		</div>
		<!-- Body -->
		<div class="m-5 ml-0 p-5 w-4/5 min-w-4/5 bg-emerald-400 bg-opacity-5 rounded border border-gray-700"
				 style="height: calc(100% - 3rem)">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import {mapState} from "vuex";
import {Selected} from "@/utils";

export default {
	name: "UserDashboardTemplate",
	computed: {
		...mapState('login', ['loggedInUser', 'userType']),
		bonjourOuBonsoir() {
			const hour = (new Date()).getHours();
			return hour < 8 || hour >= 19 ? "Bonsoir" : "Bonjour"
		}
	},
	async beforeMount() {
		if (!this.loggedInUser || this.userType !== Selected.User) {

			if (this.userType !== Selected.User) console.log("Ce n'est pas un utilisateur");
			else console.log("Aucun utilisateur connecté n'a été trouvé");

			await this.$router.push({
				name: 'login',
				query: {
					backURL: this.$route.fullPath,
					userType: Selected.User.toString()
				}
			});
		}
	},
}
</script>
