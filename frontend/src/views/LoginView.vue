<script>

import {mapActions, mapState} from "vuex";
import {ROUNDS, Selected, transformPrestataireName} from "@/utils";
import bcrypt from 'bcryptjs'
import IconEvent from "@/components/icons/IconEvent.vue";

export default {
	name: "LoginView",
	components: {IconEvent},
	data() {
		return {
			selected: Selected.Prestataire,
			account_creation: false,

			login_id: "",
			password: "",
			show_password: false,

			Selected
		}
	},
	async mounted() {
		// TODO en réalité c'est très mauvais; ca ne vérifie pas si on a de bons identifiants :o
		console.log("LoginView mounted")
		console.log(this.loggedInUser)
		console.log(this.userType)
		if (this.loggedInUser && this.userType) {
			this.redirectUser();
		}
	},
	methods: {
		transformPrestataireName,
		...mapActions('login', ["login"]),
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
		loginUser() {
			console.log("Connexion");

			bcrypt.hash(this.password, ROUNDS, (err, hash) => {
				if (err) {
					console.log(err);
					alert(`Erreur (hachage du password): ${err.message}`);
				}

				this.login({id: transformPrestataireName(this.login_id), password: hash, type: this.selected});

				setTimeout(() => {
					if (!this.loggedInUser) return alert("Identifiants invalides");
					else this.redirectUser()
				}, 1000)
			})
		},
		/**
		 * Redirige l'utilisateur une fois le login effectué
		 */
		redirectUser() {
			switch (this.selected) {
				case Selected.Prestataire: {
					this.$router.push({
						path: `/prestataire/${transformPrestataireName(this.loggedInUser.name)}/panel`
					});
					break
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
		 * Permet de verrouiller ou déverrouiller le bouton de login
		 */
		isAllowedToLogin() {
			switch (this.selected) {
				case Selected.Prestataire: {
					return this.login_id.length > 0 && this.password.length > 0;
				}
				default: {
					return false;
				}
			}
		}
	}
}
</script>

<template>
	<div class="w-screen h-screen">
		<div class="fixed top-0 left-0 bg-login bg-cover bg-bottom w-screen h-screen"></div>

		<router-link to="/"
								 class="absolute border border-black rounded-xl bg-dark bg-opacity-65 backdrop-blur p-5 ml-10 mt-5 hover:bg-opacity-45">
			<IconEvent width="50" height="50"></IconEvent>
		</router-link>

		<!-- Login -->
		<div
				class="absolute top-1/2 -translate-y-1/2 ml-10 mt-10 bg-dark border border-black rounded-xl p-5 h-3/4 w-2/6 min-w-[500px] bg-opacity-65 backdrop-blur flex flex-col items-center content-center justify-between">
			<!-- bg-opacity-50 backdrop-blur  -->

			<!-- Sélection prestataire <> user -->
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
				<!-- Prestataire -->
				<div v-if="selected === Selected.Prestataire || selected === Selected.Admin"
						 class="flex flex-col items-center h-full justify-between">
					<!-- Champs -->
					<div>
						<h1 class="font-bold text-xl text-center mb-10">Connexion</h1>

						<div class="mb-3">
							<p class="font-semibold my-2">Login</p>
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
					<button
							class="py-3 px-4 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed"
							:disabled="!isAllowedToLogin"
							@click="loginUser">
						Se connecter
					</button>
				</div>

			</div>
		</div>

	</div>
</template>