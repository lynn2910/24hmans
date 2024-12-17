<!--

Page de gestion des prestataires du dashboard admin

 -->

<template>
	<AdminDashboardTemplate current-page="prestataires">
		<div class="flex flex-row items-center content-center justify-start gap-5 h-[90%] w-full mt-[2.5%]">
			<div class="w-full bg-blue-400 bg-opacity-5 m-5 mr-0 p-5 h-full border border-gray-700 rounded-2xl">
				<div class="flex flex-row content-center items-center justify-between w-full mb-5">
					<h2 class="text-2xl font-bold">Prestataires</h2>
					<DownloadData @download="downloadPrestataires" @copy="copyPrestataires"
												@import="importPrestataires"></DownloadData>
				</div>

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
						<td class="p-4 py-2 border-b border-blue-gray-50">
							<p
									class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
								{{ prestataire.id }}</p>
						</td>
						<td class="p-4 py-2 border-b border-blue-gray-50">
							<p
									class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
								{{ prestataire.name }}</p>
						</td>
						<td class="p-4 py-2 border-b border-blue-gray-50">
							<p>
								<strong>
									{{
										services.find((s) => s.id === prestataire.id)?.nb_services || 0
									}}
								</strong> services
							</p>
						</td>
						<td class="p-4 py-2 border-b border-blue-gray-50 flex flex-row items-center justify-evenly">

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
							<div class="p-2 cursor-pointer fill-blue-500 hover:fill-blue-400" @click="openEditPopup(prestataire)">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
									<path
											d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
								</svg>
							</div>
							<!-- Delete -->
							<div class="p-2 cursor-pointer fill-red-500 hover:fill-red-400" @click="openDeletePopup(prestataire)">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path
											d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
								</svg>
							</div>

						</td>
					</tr>

					</tbody>
				</table>

			</div>
			<div class="min-w-[400px] w-96 bg-blue-400 bg-opacity-5 m-5 ml-0 p-5 h-full border border-gray-700 rounded-2xl">
				<h2 class="text-2xl font-bold mb-5">Ajouter un prestataire</h2>

				<div class="mb-3">
					<p class="font-semibold my-2">Nom</p>
					<input
							class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
							v-model="presta_creation.name"
							type="text"
							placeholder="Nom du prestataire"
							minlength="1">
				</div>
				<!-- Password -->
				<div class="mb-3">
					<p class="font-semibold my-2">Mot de passe</p>

					<PasswordField @levelUpdate="(i) => presta_creation.passwordLevel = i"
												 @passwordChange="(p) => presta_creation.password = p"></PasswordField>

					<!--					<div class="flex flex-row items-center content-center justify-between">-->
					<!--						<div class="w-5/6">-->
					<!--							<input-->
					<!--									class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"-->
					<!--									v-model="presta_creation.password"-->
					<!--									@keyup="presta_creation.passwordLevel = evaluatePasswordSecurity(presta_creation.password)"-->
					<!--									:type="presta_creation.showPassword ? 'text' : 'password'"-->
					<!--									placeholder="mot de passe" minlength="1">-->

					<!--							&lt;!&ndash; Security level &ndash;&gt;-->
					<!--							<div-->
					<!--									class="flex flex-row w-full items-center content-center justify-between mt-2">-->
					<!--								<div v-for="scoreRequired in [0,1,2,3,4]" :key="scoreRequired"-->
					<!--										 class="rounded w-1/6 m-auto h-1"-->
					<!--										 :class="presta_creation.passwordLevel > scoreRequired ? passwordScoreColor(presta_creation.passwordLevel) : 'bg-gray-400'"></div>-->

					<!--							</div>-->
					<!--						</div>-->

					<!--						<div-->
					<!--								class="bg-dark w-10 h-10 flex flex-col rounded ml-5 border border-gray-400 cursor-pointer hover:border-blue-500"-->
					<!--								@click="presta_creation.showPassword = !presta_creation.showPassword">-->
					<!--							<svg v-if="presta_creation.showPassword" class="fill-white m-auto" xmlns="http://www.w3.org/2000/svg"-->
					<!--									 width="24"-->
					<!--									 height="24"-->
					<!--									 viewBox="0 0 24 24">-->
					<!--								<path-->
					<!--										d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z"></path>-->
					<!--							</svg>-->
					<!--							<svg v-else class="fill-white m-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24"-->
					<!--									 viewBox="0 0 24 24">-->
					<!--								<path-->
					<!--										d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path>-->
					<!--							</svg>-->
					<!--						</div>-->
					<!--					</div>-->
				</div>

				<!-- Boutons-->
				<div class="flex flex-row justify-between content-center items-center mb-10">
					<button class="py-2 px-3 bg-green-600 hover:bg-green-800 rounded mt-5 mr-auto" @click="createPrestataire">
						Ajouter ce prestataire
					</button>
					<button class="py-2 px-3 bg-gray-600 hover:bg-gray-800 rounded ml-auto mt-5" @click="resetPrestaCreationForm">
						Réinitialiser
					</button>
				</div>

				<!-- Messages de confirmation/erreur -->
				<div
						class="bg-emerald-500 bg-opacity-5 border-2 border-emerald-500 rounded-xl p-5 w-full flex flex-row items-center content-center justify-start"
						v-if="old_presta_creation.show && !old_presta_creation.error">
					<p>Le prestataire <strong class="mx-1">{{ old_presta_creation.name }}</strong> a été créé avec succès</p>
				</div>

				<div
						class="bg-red-500 bg-opacity-5 border-2 border-red-500 rounded-xl p-5 w-full  flex flex-row items-center content-center justify-start"
						v-if="old_presta_creation.show && old_presta_creation.error && !old_presta_creation.invalidForm">
					<p>Une erreur est survenue en créant le prestataire <strong class="mx-1">{{
							old_presta_creation.name
						}}</strong></p>
				</div>

				<div
						class="bg-red-500 bg-opacity-5 border-2 border-red-500 rounded-xl p-5 w-full  flex flex-row items-center content-center justify-start"
						v-else-if="old_presta_creation.show && old_presta_creation.error && old_presta_creation.invalidForm">
					<p>Une erreur est survenue en créant le prestataire <strong class="mx-1">{{
							old_presta_creation.name
						}}</strong>:
						Le nom et le mot de passe doivent être précisés</p>
				</div>
			</div>

			<!-- Popups -->

			<!-- Edit -->
			<Popup title="Modifier un prestataire" full-page v-if="showEditPopup" @close="closePopup" bg="bg-transparent">
				<div class="w-[90vw] h-[90vh]">
					<PrestataireEditPage :prestataire="popupPrestataire"></PrestataireEditPage>
				</div>
			</Popup>

			<!-- Delete -->
			<Popup title="Supprimer un prestataire" v-if="showDeletePopup" @close="closePopup">
				<p>Vous êtes sur le point de supprimer le prestataire <strong>{{ popupPrestataire.name }}</strong>.</p>
				<p class="mt-1">Êtes-vous sûr de vouloir supprimer ce prestataire?</p>

				<div class="flex flex-row items-center content-center justify-start mt-5">
					<button class="bg-red-500 hover:bg-red-800 py-2 px-3 rounded mr-5"
									@click="deletePrestataire(popupPrestataire.id)">
						Supprimer
					</button>
					<button class="bg-gray-500 hover:bg-gray-800 py-2 px-3 rounded" @click="closePopup">Annuler</button>
				</div>
			</Popup>

			<!-- Copy popup -->
			<Popup title="Copie des prestataires" v-if="showCopyPopup" @close="showCopyPopup = false;">
				<p class="mt-1 mb-3">Vous avez copié avec succès les prestataires</p>
				<button class="ml-auto bg-gray-500 hover:bg-gray-800 py-2 px-3 rounded" @click="showCopyPopup = false;">
					Fermer
				</button>
			</Popup>

			<Loading
					v-if="showImportLoadingAnimation"
					title="Création des nouveaux prestataires..."
					indicator="prestataires créés"
					:step="importingLoader.step"
					:max-step="importingLoader.max">
			</Loading>

		</div>
	</AdminDashboardTemplate>
</template>

<script>
import AdminDashboardTemplate from "@/components/dashboard/admin/AdminDashboardTemplate.vue";
import {mapActions, mapGetters} from "vuex";
import store from "@/store";
import {evaluatePasswordSecurity, passwordScoreColor, transformPrestataireName} from "@/utils";
import Popup from "@/components/dashboard/Popup.vue";
import DownloadData from "@/components/dashboard/DownloadData.vue";
import Loading from "@/components/dashboard/Loading.vue";
import PrestataireService from "@/services/prestataire.service";
import PrestataireEditPage from "@/components/dashboard/PrestataireEditPage.vue";
import PasswordField from "@/components/dashboard/PasswordField.vue";

export default {
	name: "AdminDashboardView",
	components: {PasswordField, PrestataireEditPage, Loading, DownloadData, Popup, AdminDashboardTemplate},
	data() {
		return {
			services: [],
			showEditPopup: false,
			showDeletePopup: false,
			popupPrestataire: {},
			presta_creation: {
				name: "",
				password: "",
				passwordLevel: -1,
				showPassword: false,
			},
			old_presta_creation: {
				show: false,
				error: false,
				name: null,
				invalidForm: false,
			},
			showCopyPopup: false,
			showImportLoadingAnimation: false,

			importingLoader: {
				step: 0,
				max: 0,
			}
		}
	},
	methods: {

		// IMPORT
		evaluatePasswordSecurity,
		passwordScoreColor,
		transformPrestataireName,

		// DOWNLOAD/COPY/IMPORT
		downloadPrestataires() {
			let jsonPrestataires = JSON.stringify(this.prestataires);

			const blob = new Blob([jsonPrestataires], {type: 'application/json'});

			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = 'prestataires.json';
			link.click();

			URL.revokeObjectURL(link.href);
		},
		copyPrestataires() {
			let jsonPrestataires = JSON.stringify(this.prestataires);
			navigator.clipboard.writeText(jsonPrestataires)
					.then(() => {
						console.log('Prestataires copiés dans le presse-papier');
						this.showCopyPopup = true;
					})
					.catch(err => {
						console.error('Erreur de copie : ', err);
					});
		},
		async importPrestataires(d) {
			if (d.error) {
				alert("Format de fichier invalide.")
			}
			let importedPrestataires = d.data;
			this.showImportLoadingAnimation = true;

			let alreadyCreatedPrestataires = this.prestataires.map(({id, name}) => ({id, name}));
			this.importingLoader.max = importedPrestataires.length;

			try {
				for (const np of importedPrestataires) {
					// Pour éviter les doublons :O
					let doesAlreadyExist = alreadyCreatedPrestataires.some(p =>
							transformPrestataireName(p.name) === transformPrestataireName(np.name)
							|| p.id === np.id
					);

					if (!doesAlreadyExist) {
						// Ajout du prestataire
						alreadyCreatedPrestataires.push({name: np.name, id: np.id});

						let res = await PrestataireService.importPrestataire(np.name, np.password);

						console.log(res)
					}

					this.importingLoader.step++;
				}

				// Lastly, fetch again all prestataires
				await store.dispatch("prestataire/getAllPrestataires");
			} catch (err) {
				alert("Une erreur est survenue. Êtes-vous sûr d'avoir utilisé le bon format de données?");
				console.error(err)
			}

			this.showImportLoadingAnimation = false;
		},

		// POPUP
		closePopup() {
			this.showEditPopup = false;
			this.showDeletePopup = false;
			this.popupPrestataire = {};
		},
		openEditPopup(presta) {
			this.showEditPopup = true;
			this.showDeletePopup = false;

			this.popupPrestataire = presta;

			console.log('Description: ', presta.description)
			PrestataireEditPage.methods.setDescription(presta.description || '')
		},
		openDeletePopup(presta) {
			this.showEditPopup = false;
			this.showDeletePopup = true;

			this.popupPrestataire = presta;
		},

		// DELETE
		async deletePrestataire(presta_id) {
			let res = await PrestataireService.deletePrestataire(presta_id);

			if (!res.error) {
				// Reload prestataire list
				await store.dispatch("prestataire/getAllPrestataires");
				this.closePopup();
			} else {
				console.error(res.status + " -- " + res.data);
			}
		},

		// CREATION
		resetPrestaCreationForm() {
			this.presta_creation = {
				name: "",
				password: "",
				passwordLevel: -1,
				showPassword: false,
			};
		},
		async createPrestataire() {
			if (this.presta_creation.name?.trim().length < 1 || this.presta_creation.password.trim().length < 1) {
				this.old_presta_creation.show = true;
				this.old_presta_creation.invalidForm = true;
				this.old_presta_creation.error = true;
				this.old_presta_creation.name = this.presta_creation.name;
				return;
			}

			let res = await PrestataireService.createPrestataireWithHashing(this.presta_creation.name, this.presta_creation.password);

			this.old_presta_creation.show = true;
			this.old_presta_creation.invalidForm = false;
			this.old_presta_creation.error = res.error;
			this.old_presta_creation.name = this.presta_creation.name;

			if (!res.error) {
				this.resetPrestaCreationForm();
				this.addPrestataireToCache(res.data);
			} else {
				console.error(res.status + " -- " + res.data)
			}
		}
	},
	computed: {
		...mapGetters('prestataire', ['prestataires']),
	},
	actions: {
		...mapActions('prestataire', ["getAllPrestataires", "addPrestataireToCache"])
	},
	async beforeMount() {
		await store.dispatch("prestataire/getAllPrestataires");
	},
	async mounted() {
		let services = await PrestataireService.getPrestatairesServicesCount();
		if (!services.error) {
			this.services = services.data;
		} else {
			console.error(services)
		}
	}
}
</script>