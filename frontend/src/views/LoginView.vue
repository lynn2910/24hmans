<script>

import {mapActions, mapState} from "vuex";
import {Selected, transformPrestataireName} from "@/utils";
import IconEvent from "@/components/navigation/navbar/icons/IconEvent.vue";

export default {
	name: "LoginView",
	components: {IconEvent},
	data() {
		return {
			selected: Number.parseInt(this.$route.query.userType) || Selected.User,
			account_creation: false,

			login_id: "",
			password: "",
			show_password: false,

			box_message: null,
			account_creation_data: {
				first_name: "",
				last_name: "",
				email: "",
				password: "",
				confirm_password: "",
			},
			Selected
		}
	},
	async mounted() {
		// TODO en réalité c'est très mauvais; ca ne vérifie pas si on a de bons identifiants :o
		if (this.loggedInUser && this.userType) {
			this.redirectUser();
		}

		let query_params = this.$route.query;
		if ('type' in query_params) {
			switch (query_params.type) {
				case 'user': {
					this.selected = Selected.User;

					if ('signup' in query_params) {
						this.account_creation = true;
					} else if ('login' in query_params) {
						this.account_creation = false;
					}
					break;
				}
				case 'presta': {
					this.selected = Selected.Prestataire;
					break;
				}
				case 'admin': {
					this.selected = Selected.Admin;
					break;
				}
			}
		}
	},
	methods: {
		transformPrestataireName,
		...mapActions('login', ["login", "signup"]),
		changedSelectedLogin(new_type) {
			if (this.selected === Selected.User) {
				this.account_creation = false;
			}

			this.selected = new_type;
		},
		changeAccountCreationSelection() {
			if (this.selected === Selected.User) {
				this.account_creation = !this.account_creation;
			}
		},
		async loginUser() {
			console.log("Connexion");

			await this.login({id: transformPrestataireName(this.login_id), password: this.password, type: this.selected});

			if (!this.loggedInUser) {
				this.box_message = "Identifiant ou mot de passe invalide"
			} else this.redirectUser()
		},
		async signupUser() {
			if (this.isAllowedToSignup) {

				await this.signup({
					email: this.account_creation_data.email,
					password: this.account_creation_data.password,
					first_name: this.account_creation_data.first_name,
					last_name: this.account_creation_data.last_name,
				});

				if (!this.loggedInUser) {
					this.box_message = "Impossible de créer un compte utilisateur"
				} else this.redirectUser()
			}
		},
		/**
		 * Redirige l'utilisateur une fois le login effectué
		 */
		redirectUser() {
			console.log("Redirecting user")

			const backURL = this.$route.query.backURL;
			if (backURL) {
				const uri = decodeURIComponent(backURL);
				console.log(`redirecting to ${uri}`);
				this.$router.push({path: uri});
				return;
			}

			switch (this.selected) {
				case Selected.Prestataire: {
					this.$router.push({
						name: "prestataire_dashboard"
					});
					break
				}
				case Selected.User: {
					this.$router.push({path: `/client/panel`});
					break;
				}
				case Selected.Admin: {
					this.$router.push({name: "admin_dashboard"});
					break;
				}
				default: {
					alert(`Unknown login redirection: ${this.selected}`)
				}
			}
		}
	},
	computed: {
		...mapState('login', ['loggedInUser', 'userType']),
		/**
		 * Permet de verrouiller ou déverrouiller le bouton de connexion
		 */
		isAllowedToLogin() {
			return this.login_id.length > 0 && this.password.length > 0;
		},
		isAllowedToSignup() {
			return (this.selected === Selected.User)
					&& (
							(this.account_creation_data.email.length > 0) &&
							(this.account_creation_data.first_name.length > 0) &&
							(this.account_creation_data.last_name.length > 0) &&
							(this.account_creation_data.password.length > 0) &&
							(this.account_creation_data.password === this.account_creation_data.confirm_password)
					);
		}
	}
}
</script>

<template>
	<div class="w-screen h-screen">
		<div class="fixed top-0 left-0 bg-login bg-cover bg-bottom w-screen h-screen"></div>

		<div class="absolute ml-10 mt-5 w-2/6 min-w-[500px] flex flex-row items-center content-center">
			<router-link to="/"
									 class="border border-black rounded-xl bg-dark bg-opacity-65 backdrop-blur p-5 hover:bg-opacity-45 mr-5">
				<IconEvent width="50" height="50"></IconEvent>
			</router-link>
			<div v-if="box_message && box_message.length > 0"
					 class="border-2 border-red-600 rounded-xl bg-red-800 bg-opacity-20 backdrop-blur p-8 w-full">
				<p>{{ box_message }}</p>
			</div>
		</div>

		<!-- Login -->
		<div
				class="absolute top-1/2 -translate-y-1/2 ml-10 mt-10 bg-dark border border-black rounded-xl p-5 h-3/4 w-2/6 min-w-[500px] bg-opacity-65 backdrop-blur flex flex-col items-center content-center justify-between">
			<!-- bg-opacity-50 backdrop-blur  -->

			<!-- Sélection prestataire <> user <> prestataire -->
			<div class="flex flex-row content-center justify-between">
				<div
						class="flex flex-row content-center justify-center border border-gray-500 rounded-3xl w-fit p-1 select-none">
					<h2 class="w-[8rem] text-center cursor-pointer px-3 py-2 rounded-3xl"
							:class="selected === Selected.User        ? 'bg-blue-600' : 'hover:bg-blue-600 hover:bg-opacity-20'"
							@click="changedSelectedLogin(Selected.User)">
						Utilisateur
					</h2>
					<h2 class="w-[8rem] text-center cursor-pointer px-3 py-2 rounded-3xl"
							:class="selected === Selected.Prestataire ? 'bg-blue-600' : 'hover:bg-blue-600 hover:bg-opacity-20'"
							@click="changedSelectedLogin(Selected.Prestataire)">
						Prestataire
					</h2>
					<h2 class="w-[8rem] text-center cursor-pointer px-3 py-2 rounded-3xl"
							:class="selected === Selected.Admin ? 'bg-blue-600' : 'hover:bg-blue-600 hover:bg-opacity-20'"
							@click="changedSelectedLogin(Selected.Admin)">
						Administrateur
					</h2>
				</div>

				<div
						class="ml-3 border border-gray-500 fill-white rounded-3xl flex flex-row items-center content-center justify-center w-14 hover:bg-gray-500 hover:bg-opacity-50"
						:class="selected === Selected.User ? 'cursor-pointer' : 'cursor-not-allowed opacity-50 hover:bg-transparent'"
						@click="changeAccountCreationSelection">
					<svg v-if="account_creation" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 24 24">
						<path
								d="M20.29 8.29 16 12.58l-1.3-1.29-1.41 1.42 2.7 2.7 5.72-5.7zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"></path>
					</svg>
					<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 24 24">
						<path
								d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"></path>
					</svg>
				</div>
			</div>

			<!-- body -->
			<div class="flex flex-col items-center content-center justify-between mt-10 w-full h-full">
				<!-- Login (pour tout les types de comptes) -->
				<div
						v-if="selected === Selected.Prestataire || selected === Selected.Admin || (selected === Selected.User && !account_creation)"
						class="flex flex-col items-center h-full justify-between">
					<!-- Champs -->
					<div>
						<h1 class="font-bold text-xl text-center mb-10">Connexion</h1>

						<div class="mb-3">
							<p class="font-semibold my-2" v-if="selected !== Selected.User">Login</p>
							<p class="font-semibold my-2" v-else>Email</p>
							<input
									class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
									v-model="login_id"
									@change="login_id = transformPrestataireName(login_id)"
									type="text"
									placeholder="login"
									minlength="1">
						</div>

						<div class="mb-3">
							<p class="font-semibold my-2">Mot de passe</p>
							<div class="flex flex-row items-center content-center justify-between">
								<input
										class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500"
										v-model="password"
										:type="show_password ? 'text' : 'password'"
										placeholder="mot de passe" minlength="1">

								<div
										class="bg-dark w-10 h-10 flex flex-col rounded ml-5 border border-gray-400 cursor-pointer hover:border-blue-500"
										@click="show_password = !show_password">
									<svg v-if="show_password" class="fill-white m-auto" xmlns="http://www.w3.org/2000/svg" width="24"
											 height="24"
											 viewBox="0 0 24 24">
										<path
												d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z"></path>
									</svg>
									<svg v-else class="fill-white m-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
											 viewBox="0 0 24 24">
										<path
												d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path>
									</svg>
								</div>
							</div>
						</div>
					</div>

					<!-- Bouton de connexion -->
					<div class="flex flex-col items-center content-center text-center">
						<button
								class="py-3 px-4 mx-auto cursor-pointer bg-blue-600 hover:bg-blue-700 rounded disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed"
								:disabled="!isAllowedToLogin"
								@click="loginUser">
							Se connecter
						</button>
						<p v-if="selected === Selected.User" class="italic text-gray-300 mt-2 hover:underline cursor-pointer"
							 @click="changeAccountCreationSelection">
							Je n'ai pas encore de comptes
						</p>
					</div>
				</div>

				<!-- Création compte utilisateur -->
				<div v-if="selected === Selected.User && account_creation">
					<h1 class="font-bold text-xl text-center mb-5">Création d'un compte client</h1>
					<div>
						<!-- first_name & last_name -->
						<div class="flex flex-row items-center content-center">
							<div class="mr-2">
								<p>Prénom</p>
								<input
										class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
										v-model="account_creation_data.first_name"
										type="text"
										placeholder="Prénom"
										minlength="1">
							</div>
							<div>
								<p>Nom</p>
								<input
										class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
										v-model="account_creation_data.last_name"
										type="text"
										placeholder="Nom de famille"
										minlength="1">
							</div>
						</div>
						<!-- email -->
						<div class="my-2">
							<p>Email</p>
							<input
									class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
									v-model="account_creation_data.email"
									type="email"
									placeholder="Email"
									minlength="1">
						</div>
						<div>
							<p>Mot de passe</p>
							<div class="flex flex-row items-center content-center justify-between">
								<input
										class="w-full outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500"
										v-model="account_creation_data.password"
										:type="show_password ? 'text' : 'password'"
										placeholder="mot de passe" minlength="1">

								<div
										class="bg-dark w-12 h-10 flex flex-col rounded ml-5 border border-gray-400 cursor-pointer hover:border-blue-500"
										@click="show_password = !show_password">
									<svg v-if="show_password" class="fill-white m-auto" xmlns="http://www.w3.org/2000/svg" width="24"
											 height="24"
											 viewBox="0 0 24 24">
										<path
												d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z"></path>
									</svg>
									<svg v-else class="fill-white m-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
											 viewBox="0 0 24 24">
										<path
												d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path>
									</svg>
								</div>
							</div>
							<p>Confirmer le mot de passe</p>
							<div class="flex flex-row items-center content-center justify-between">
								<input
										class="w-full outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:border-gray-500 disabled:hover:border-gray-500"
										v-model="account_creation_data.confirm_password"
										:disabled="account_creation_data.password?.length < 1"
										:type="show_password ? 'text' : 'password'"
										placeholder="mot de passe" minlength="1">

								<div
										class="bg-dark w-12 h-10 flex flex-col rounded ml-5 border border-gray-400 hover:border-blue-500"
										:class="account_creation_data.password?.length < 1 ? 'border-gray-500 cursor-not-allowed hover:border-gray-500' : 'cursor-pointer'"
										@click="() => {if (account_creation_data.password?.length > 0) show_password = !show_password}">
									<svg v-if="show_password" class="fill-white m-auto" xmlns="http://www.w3.org/2000/svg" width="24"
											 height="24"
											 viewBox="0 0 24 24">
										<path
												d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z"></path>
									</svg>
									<svg v-else class="fill-white m-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
											 viewBox="0 0 24 24">
										<path
												d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path>
									</svg>
								</div>
							</div>
						</div>
					</div>

					<!-- Bouton de connexion -->
					<div class="flex flex-col items-center content-center text-center">
						<button
								class="mt-5 py-3 px-4 mx-auto cursor-pointer bg-blue-600 hover:bg-blue-700 rounded disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed"
								:disabled="!isAllowedToSignup"
								@click="signupUser">
							Créer le compte
						</button>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>