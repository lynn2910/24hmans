<template>
	<div
			:class="hideContainerDecorations ? '' : 'bg-gray-900 border border-gray-800 rounded-xl shadow-lg'"
			class="p-6 w-full max-w-md bg-opacity-65 backdrop-blur-md flex flex-col justify-between space-y-8"
	>
		<div class="flex justify-between">
			<div class="flex rounded-full border border-gray-700 p-1 select-none">
				<h2
						class="flex flex-row items-center text-center px-3 py-2 rounded-full cursor-pointer transition-colors duration-200"
						:class="[
            omit_logins.includes(Selected.User)
              ? 'text-gray-500 cursor-not-allowed'
              : selected === Selected.User
              ? 'bg-blue-500 text-white'
              : 'hover:bg-blue-500/20 text-gray-300',
          ]"
						@click="changedSelectedLogin(Selected.User)"
				>
					{{ $t("user") }}
				</h2>
				<h2
						class="flex flex-row items-center text-center px-3 py-2 rounded-full cursor-pointer transition-colors duration-200"
						:class="[
            omit_logins.includes(Selected.Prestataire)
              ? 'text-gray-500 cursor-not-allowed'
              : selected === Selected.Prestataire
              ? 'bg-blue-500 text-white'
              : 'hover:bg-blue-500/20 text-gray-300',
          ]"
						@click="changedSelectedLogin(Selected.Prestataire)"
				>
					{{ $t("presta") }}
				</h2>
				<h2
						class="flex flex-row items-center text-center px-3 py-2 rounded-full cursor-pointer transition-colors duration-200"
						:class="[
            omit_logins.includes(Selected.Admin)
              ? 'text-gray-500 cursor-not-allowed'
              : selected === Selected.Admin
              ? 'bg-blue-500 text-white'
              : 'hover:bg-blue-500/20 text-gray-300',
          ]"
						@click="changedSelectedLogin(Selected.Admin)"
				>
					{{ $t("admin") }}
				</h2>
			</div>

			<button
					class="ml-3 rounded-full border border-gray-700 w-14 h-14 flex items-center justify-center transition-colors duration-200"
					:class="
          selected === Selected.User
            ? 'cursor-pointer hover:bg-gray-500/20'
            : 'cursor-not-allowed opacity-50'
        "
					@click="changeAccountCreationSelection"
					:disabled="selected !== Selected.User"
			>

				<svg
						v-if="account_creation"
						xmlns="http://www.w3.org/2000/svg"
						class="h-7 w-7 text-white"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
				>
					<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						 class="h-7 w-7 fill-white">
					<path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
				</svg>
			</button>
		</div>

		<div
				v-if="
        selected === Selected.Prestataire ||
        selected === Selected.Admin ||
        (selected === Selected.User && !account_creation)
      "
				class="w-full space-y-6"
		>
			<h1 class="font-bold text-2xl text-center text-white">
				{{ $t("login.title") }}
			</h1>

			<div class="space-y-2">
				<label
						for="login_id"
						class="block text-sm font-semibold text-gray-200"
						:class="{'text-gray-200': selected !== Selected.User,}"
				>
					{{
						selected !== Selected.User
								? $t("login.login.title")
								: $t("login.login.email")
					}}
				</label>
				<input
						id="login_id"
						v-model="login_id"
						@change="login_id = transformPrestataireName(login_id)"
						type="text"
						:placeholder="selected !== Selected.User ? $t('login.login.title') : $t('login.login.email')"
						minlength="1"
						class="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>

			<div class="space-y-2">
				<label for="password" class="block text-sm font-semibold text-gray-200">
					{{ $t("login.password.title") }}
				</label>
				<div class="flex items-center">
					<input
							id="password"
							v-model="password"
							:type="show_password ? 'text' : 'password'"
							:placeholder="$t('login.password.title')"
							minlength="1"
							class="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					<button
							type="button"
							class="ml-3 p-2 rounded-md bg-gray-800 border border-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							@click="show_password = !show_password"
					>
						<Unlocked v-if="show_password"/>
						<Locked v-else/>
					</button>
				</div>
			</div>
		</div>

		<div
				v-if="
        selected === Selected.Prestataire ||
        selected === Selected.Admin ||
        (selected === Selected.User && !account_creation)
      "
				class="w-full"
		>
			<button
					@click="loginUser"
					:disabled="!isAllowedToLogin"
					class="w-full py-3 px-4 rounded-md bg-blue-500 text-white font-semibold transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
			>
				{{ $t("login.login_btn") }}
			</button>
			<p
					v-if="selected === Selected.User"
					class="mt-4 text-center text-gray-400 text-sm cursor-pointer hover:underline"
					@click="changeAccountCreationSelection"
			>
				{{ $t("login.register_link") }}
			</p>
		</div>

		<div v-if="selected === Selected.User && account_creation" class="w-full space-y-6">
			<h1 class="font-bold text-2xl text-center text-white">
				Création d'un compte client
			</h1>
			<div class="space-y-4">
				<div class="flex space-x-4">
					<div class="flex-1 space-y-2">
						<label for="first_name" class="block text-sm font-semibold text-gray-200">
							{{ $t("services.ecurie.sign.firstname_simple") }}
						</label>
						<input
								id="first_name"
								v-model="account_creation_data.first_name"
								type="text"
								placeholder="Prénom"
								minlength="1"
								class="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					<div class="flex-1 space-y-2">
						<label for="last_name" class="block text-sm font-semibold text-gray-200">
							{{ $t("global.name") }}
						</label>
						<input
								id="last_name"
								v-model="account_creation_data.last_name"
								type="text"
								placeholder="Nom"
								minlength="1"
								class="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
				</div>
				<div class="space-y-2">
					<label for="email" class="block text-sm font-semibold text-gray-200">
						{{ $t("services.ecurie.sign.email_simple") }}
					</label>
					<input
							id="email"
							v-model="account_creation_data.email"
							type="email"
							placeholder="Email"
							minlength="1"
							class="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
				<div class="space-y-2">
					<label for="new_password" class="block text-sm font-semibold text-gray-200">
						{{ $t("login.password.title") }}
					</label>
					<div class="flex items-center">
						<input
								id="new_password"
								v-model="account_creation_data.password"
								:type="show_password ? 'text' : 'password'"
								placeholder="Mot de passe"
								minlength="1"
								class="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<button
								type="button"
								class="ml-3 p-2 rounded-md bg-gray-800 border border-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								@click="show_password = !show_password"
						>
							<Unlocked v-if="show_password"/>
							<Locked v-else/>
						</button>
					</div>
				</div>
				<div class="space-y-2">
					<label for="confirm_password" class="block text-sm font-semibold text-gray-200">
						{{ $t("login.password.confirm_password") }}
					</label>
					<div class="flex items-center">
						<input
								id="confirm_password"
								v-model="account_creation_data.confirm_password"
								:disabled="account_creation_data.password?.length < 1"
								:type="show_password ? 'text' : 'password'"
								placeholder="Confirmer le mot de passe"
								minlength="1"
								class="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
						/>
						<button
								type="button"
								class="ml-3 p-2 rounded-md bg-gray-800 border border-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								:class="{
                'opacity-50 cursor-not-allowed':
                  account_creation_data.password?.length < 1,
              }"
								@click="
                () => {
                  if (account_creation_data.password?.length > 0)
                    show_password = !show_password;
                }
              "
								:disabled="account_creation_data.password?.length < 1"
						>
							<Unlocked v-if="show_password"/>
							<Locked v-else/>
						</button>
					</div>
				</div>
			</div>
		</div>

		<div v-if="selected === Selected.User && account_creation" class="w-full">
			<button
					@click="signupUser"
					:disabled="!isAllowedToSignup"
					class="w-full py-3 px-4 rounded-md bg-blue-500 text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
			>
				{{ $t("login.signup") }}
			</button>
		</div>

		<div class="flex items-center justify-between w-full">
			<router-link :to="{ name: 'home' }" class="mr-5" v-if="!hideHomeIcon">
				<IconEvent width="50" height="50" class="text-white"></IconEvent>
			</router-link>
			<div
					v-if="box_message && box_message.length > 0"
					class="text-red-400 text-sm"
			>
				{{ box_message }}
			</div>
		</div>
	</div>
</template>


<script>
import {mapActions, mapState} from "vuex";
import {Selected, transformPrestataireName} from "@/utils";
import IconEvent from "@/components/navigation/navbar/icons/IconEvent.vue";
import i from "@/i18n"
import Locked from "@/views/Locked.vue";
import Unlocked from "@/views/Unlocked.vue";


export default {
	name: "Login",
	components: {Unlocked, Locked, IconEvent},
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
			already_redirected: false,
			Selected
		}
	},
	async mounted() {
		if (this.loggedInUser && this.userType) {
			this.redirectUser(this.userType);
		}

		let query_params = this.$route.query;
		if ('userType' in query_params) {
			switch (query_params.userType) {
				case Selected.User: {
					this.selected = Selected.User;

					if ('signup' in query_params) {
						this.account_creation = true;
					} else if ('login' in query_params) {
						this.account_creation = false;
					}
					break;
				}
				case Selected.Prestataire: {
					this.selected = Selected.Prestataire;
					break;
				}
				case Selected.Admin: {
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
			if (this.omit_logins.includes(new_type)) {
				return;
			}

			if (this.selected === Selected.User) {
				this.account_creation = false;
			}

			this.selected = new_type;

			if (this.$route.query.userType !== this.selected) {
				this.$router.replace({query: {userType: this.selected}});
				delete this.$route.query['backURL']
			}
		},
		changeAccountCreationSelection() {
			if (this.selected === Selected.User) {
				this.account_creation = !this.account_creation;
			}
		},
		async loginUser() {
			console.log("Connexion");

			await this.login({id: this.login_id, password: this.password, type: this.selected});

			if (!this.loggedInUser) {
				this.box_message = i.t('login.invalid');
			} else this.redirectUser(this.selected)
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
				} else this.redirectUser(this.selected)
			}
		},
		/**
		 * Redirige l'utilisateur une fois le login effectué
		 */
		redirectUser(user_type) {
			if (this.noRedirection || this.already_redirected)
				return;

			console.log("Redirecting user")

			const backURL = this.$route.query.backURL;
			const userType = this.$route.query.userType;
			if (backURL) {
				const uri = decodeURIComponent(backURL);
				console.log(`redirecting to ${uri}`);
				let good = true;
				if (userType === Selected.User && !uri.startsWith('/client/panel')) good = false;
				if (userType === Selected.Prestataire && !uri.startsWith('/prestataire/panel')) good = false;
				if (userType === Selected.Admin && !uri.startsWith('/admin/panel')) good = false;

				console.log("is good?", good)
				if (good) {
					this.already_redirected = true;
					return this.$router.push({path: uri})
				}
			}

			console.log("Redirecting to default view of logged in user: ", userType)

			try {
				switch (user_type) {
					case Selected.Prestataire: {
						this.$router.push({name: "prestataire_dashboard"});
						this.already_redirected = true;
						break
					}
					case Selected.User: {
						this.$router.push({name: 'client_panel'});
						this.already_redirected = true;
						break;
					}
					case Selected.Admin: {
						this.$router.push({name: "admin_dashboard"});
						this.already_redirected = true;
						break;
					}
					default: {
						alert(`Unknown login redirection: ${this.selected}`)
					}
				}
			} catch (_) {
			}
		}
	},
	watch: {
		loggedInUser(newValue, _) {
			if (newValue) {
				this.redirectUser(newValue.role || newValue.userType);
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
	},
	props: {
		hideHomeIcon: {
			type: Boolean,
			default: false
		},
		hideContainerDecorations: {
			type: Boolean,
			default: false
		},
		omit_logins: {
			type: Array,
			default: () => []
		},
		noRedirection: {
			type: Boolean,
			default: false
		}
	}
}
</script>