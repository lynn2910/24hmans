<template>
	<div class="w-full min-h-screen bg-gray-100 dark:bg-gray-900 overflow-y-auto">
		<div
				class="fixed -z-10 top-0 left-0 w-full h-full"
				:style="{ backgroundColor: prestataire.accentColor }"
		></div>
		<div class="h-auto bg-gray-800 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
			<div class="h-4"></div>

			<div class="p-6">
				<div class="flex flex-row justify-center items-center mb-4">
					<h1 class="font-bold text-3xl text-white mr-2">{{ prestataire.name }}</h1>
					<button @click="openNameEditPopup" class="text-gray-400 hover:text-white">
						<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 fill-current"
								viewBox="0 0 24 24"
						>
							<path d="M18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
							<path
									d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"
							></path>
						</svg>
					</button>
				</div>
				<Popup
						v-if="showNameEditPopup"
						title="Modification du nom"
						@close="closeNameEditPopup"
				>
					<div class="mb-4">
						<label for="name-input" class="block text-sm font-semibold text-gray-300 mb-1"
						>Nom</label
						>
						<input
								id="name-input"
								class="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
								type="text"
								v-model="editedName"
								placeholder="Nom"
								minlength="1"
								maxlength="64"
						/>
					</div>

					<div class="flex justify-end">
						<button
								class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-2 focus:outline-none focus:shadow-outline"
								@click="updateName()"
						>
							{{ $t("prestataire_edit.update") }}
						</button>
						<button
								class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
								@click="closeNameEditPopup"
						>
							{{ $t("cancel") }}
						</button>
					</div>
				</Popup>

				<div class="flex flex-wrap justify-center items-center my-4">
					<a
							v-for="(link, index) in prestataire.links || []"
							:key="index"
							:href="link.url"
							class="inline-flex items-center justify-center px-4 py-2 rounded-full font-semibold mr-2 mb-2 transition-colors duration-200"
							:style="{
              backgroundColor: prestataire.accentColor || '#000',
              color: blackOrWhite,
            }"
							target="_blank"
					>
						{{ link.name }}
						<button @click.stop.prevent="openLinkEditPopup(link)" class="ml-2 text-white hover:opacity-80">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 24 24">
								<path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
								<path
										d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
							</svg>
						</button>
					</a>
					<button
							@click="openCreateLinkPopup"
							class="flex flex-row items-center justify-center px-4 py-2 rounded-full font-semibold text-white transition-colors duration-200"
							:style="{ backgroundColor: prestataire.accentColor }"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
							<path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
						</svg>
						Ajouter un lien
					</button>

					<Popup
							v-if="showLinkEditPopup"
							title="Modification d'un lien"
							@close="closeLinkEditPopup"
					>
						<div class="mb-4">
							<label for="link-name-input" class="block text-sm font-semibold text-gray-300 mb-1"
							>{{ $t("global.name") }}</label
							>
							<input
									id="link-name-input"
									class="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
									type="text"
									v-model="selectedLink.name"
									placeholder="Nom"
									minlength="1"
									maxlength="64"
							/>
						</div>
						<div class="mb-4">
							<label for="link-url-input" class="block text-sm font-semibold text-gray-300 mb-1"
							>{{ $t("global.url") }}</label
							>
							<input
									id="link-url-input"
									class="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
									type="text"
									v-model="selectedLink.url"
									placeholder="URL"
									pattern="/(((ftp|http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/"
									minlength="1"
									maxlength="64"
							/>
						</div>

						<div class="flex justify-end">
							<button
									class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-2 focus:outline-none focus:shadow-outline"
									@click="updateLink()"
							>
								{{ $t("global.update") }}
							</button>
							<button
									class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
									@click="closeLinkEditPopup"
							>
								{{ $t("cancel") }}
							</button>
						</div>
					</Popup>

					<Popup
							v-if="showCreateLinkPopup"
							title="Ajout d'un lien"
							@close="closeLinkCreatePopup"
					>
						<div class="mb-4">
							<label for="new-link-name-input" class="block text-sm font-semibold text-gray-300 mb-1"
							>{{ $t("global.name") }}</label
							>
							<input
									id="new-link-name-input"
									class="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
									type="text"
									v-model="selectedLink.name"
									:placeholder="$t('global.name')"
									minlength="1"
									maxlength="64"
							/>
						</div>
						<div class="mb-4">
							<label for="new-link-url-input" class="block text-sm font-semibold text-gray-300 mb-1"
							>{{ $t("global.url") }}</label
							>
							<input
									id="new-link-url-input"
									class="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
									type="text"
									v-model="selectedLink.url"
									:placeholder="$t('global.url')"
									pattern="/(((ftp|http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/"
									minlength="1"
									maxlength="64"
							/>
						</div>

						<div class="flex justify-end">
							<button
									class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-2 focus:outline-none focus:shadow-outline"
									@click="createLink()"
							>
								{{ $t("prestataire_edit.create_link") }}
							</button>
							<button
									class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
									@click="closeLinkCreatePopup"
							>
								{{ $t("cancel") }}
							</button>
						</div>
					</Popup>
				</div>

				<div class="mb-4">
					<label class="block text-sm font-semibold text-gray-300 mb-2"
					>Description</label
					>
					<Editor
							spellcheck="true"
							:api-key="TINY_MCE_API_KEY"
							:init="editorSettings"
							class="bg-gray-800 rounded-md"
					/>
				</div>

				<div class="flex justify-start">
					<button
							class="flex flex-row  items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2 focus:outline-none focus:shadow-outline"
							@click="saveDescription"
					>
						<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 mr-2 fill-current"
								viewBox="0 0 24 24"
						>
							<path
									d="M5 21h14a2 2 0 0 0 2-2V8a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H5z"
							></path>
						</svg>
						{{ $t("global.save") }}
					</button>
					<button
							class="flex flex-row  items-center bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
							@click="setDescription(prestataire.description)"
					>
						<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 mr-2 fill-current"
								viewBox="0 0 24 24"
						>
							<path
									d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"
							></path>
							<path
									d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"
							></path>
						</svg>
						{{ $t("global.reset") }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getOptimalTextColor, TINY_MCE_API_KEY, wait} from "@/utils";
import Popup from "@/components/dashboard/Popup.vue";
import PrestataireService from "@/services/prestataire.service";
import Editor from "@tinymce/tinymce-vue";
import {getTinymce} from "@tinymce/tinymce-vue/lib/es2015/main/ts/TinyMCE";

export default {
	name: "PrestataireEditPage",
	components: {Popup, Editor},
	data() {
		return {
			editedName: this.prestataire.name,
			showNameEditPopup: false,
			selectedLink: null,
			showLinkEditPopup: false,
			showCreateLinkPopup: false,
			editorSettings: {
				plugins: [
					"lists",
					"link",
					"image",
					"table",
					"code",
					"help",
					"wordcount",
					"accordion",
					"insertdatetime",
					"advlist",
					"nonbreaking",
					"pagebreak",
					"preview",
					"quickbars",
					"autoresize",
					"searchreplace",
				],

				skin: "oxide-dark", // Use 'oxide-dark' for dark theme
				content_css: 'dark',
				icons: "thin",
				toolbar_mode: 'sliding',

				quickbars_insert_toolbar: "quicktable image media codesample",
				quickbars_selection_toolbar:
						"bold italic underline | blocks | bullist numlist | blockquote quicklink",
				contextmenu:
						"undo redo | inserttable | cell row column deletetable | help",
				toolbar:
						"formatselect | forecolor backcolor | bold italic underline strikethrough | link image | align bullist numlist |  preview " +
						(window.location.host.startsWith("localhost") ? "| code" : ""),
				content_style: "body { font-family: 'Inter', sans-serif; color: #e2e8f0; }", //Sets default font and color.
			},
		};
	},
	props: {
		prestataire: Object,
	},
	methods: {
		// NOM
		openNameEditPopup() {
			this.editedName = this.prestataire.name;
			this.showNameEditPopup = true;
		},
		closeNameEditPopup() {
			this.showNameEditPopup = false;
		},
		async updateName() {
			if (this.editedName !== this.prestataire.name) {
				let res = await PrestataireService.updatePrestataire(
						this.prestataire.id,
						{name: this.editedName}
				);

				if (!res.error) {
					this.editedName = this.prestataire.name;
					this.closeNameEditPopup();
				} else {
					alert(res.data);
				}
			} else {
				this.closeNameEditPopup();
			}
		},
		// LINKS

		openLinkEditPopup(link) {
			this.selectedLink = link;
			this.showLinkEditPopup = true;
			this.showCreateLinkPopup = false;
		},
		openCreateLinkPopup() {
			this.selectedLink = {name: "", url: ""};
			this.showLinkEditPopup = false;
			this.showCreateLinkPopup = true;
		},
		closeLinkCreatePopup() {
			this.selectedLink = null;
			this.showLinkEditPopup = false;
			this.showCreateLinkPopup = false;
		},
		closeLinkEditPopup() {
			this.selectedLink = null;
			this.showLinkEditPopup = false;
		},
		async updateLink() {
			let res = await PrestataireService.updatePrestataireLink(
					this.prestataire.id,
					this.selectedLink.name,
					this.selectedLink.url,
					this.selectedLink.id
			);

			if (!res.error) {
				this.closeLinkEditPopup();
			} else {
				alert(res.data);
			}
		},
		async createLink() {
			let res = await PrestataireService.addPrestataireLink(
					this.prestataire.id,
					this.selectedLink.name,
					this.selectedLink.url
			);

			if (!res.error) {
				this.closeLinkCreatePopup();
			} else {
				alert(res.data);
			}
		},

		// EDITOR

		async setDescription(content) {
			while (!getTinymce() || !getTinymce().activeEditor) {
				await wait(1000);
			}
			getTinymce().activeEditor.setContent(content);
		},
		async saveDescription() {
			if (!getTinymce() || !getTinymce().activeEditor) {
				alert("L'éditeur n'est pas encore initialisé");
				return;
			}

			let content = getTinymce().activeEditor.getContent();
			if (!content) return;

			let res = await PrestataireService.updatePrestataire(this.prestataire.id, {
				description: content,
			});
			if (res.error) {
				alert(`Erreur de sauvegarde de la description: ${res.data}`);
			} else {
				alert("Le contenu a été sauvegardé avec succès.");
			}
		},
	},
	computed: {
		blackOrWhite() {
			return getOptimalTextColor(this.prestataire.accentColor || "#000");
		},
		TINY_MCE_API_KEY() {
			return TINY_MCE_API_KEY;
		},
	},
};
</script>
