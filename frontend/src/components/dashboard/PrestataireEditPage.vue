<template>
	<div class="w-full h-full overflow-y-scroll">
		<div class="fixed -z-10 top-0 left-0 w-full h-full" :style="{backgroundColor: prestataire.accentColor}"></div>
		<div class="h-[95%] bg-dark rounded-xl overflow-y-scroll text-ellipsis overflow-x-hidden">

			<div class="h-10"></div>

			<!--			<div class="w-full h-36 rounded-t-xl bg-bottom bg-no-repeat bg-cover"-->
			<!--					 :style="{background: `url('/banners/${prestataire.banner || ''}')`}"></div>-->

			<!-- Body -->
			<div class="p-5">
				<!-- Name  -->
				<h1 class="font-bold text-3xl text-center flex flex-row justify-center items-center content-center">
					{{ prestataire.name }}
					<svg xmlns="http://www.w3.org/2000/svg"
							 class="ml-2 my-auto cursor-pointer fill-current"
							 width="24" height="24"
							 viewBox="0 0 24 24"
							 @click="openNameEditPopup">
						<path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
						<path
								d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
					</svg>
				</h1>
				<!-- Edit Name -->
				<Popup v-if="showNameEditPopup" title="Modification du nom" @close="closeNameEditPopup">

					<div class="flex flex-row items-center content-center justify-between">
						<p class="font-bold mr-5 w-14">Nom</p>
						<input
								class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
								type="text"
								v-model="editedName"
								placeholder="Nom"
								minlength="1"
								maxlength="64">
					</div>

					<div class="flex flex-row items-center content-center justify-between mt-5">
						<button class="bg-green-600 hover:bg-green-800 py-2 px-3 rounded mr-5"
										@click="updateName()">
							{{ $t("prestataire_edit") }}
						</button>
						<button class="bg-gray-500 hover:bg-gray-800 py-2 px-3 rounded" @click="closeNameEditPopup">
							{{ $t('cancel') }}
						</button>
					</div>

				</Popup>
				<!-- Liens -->
				<div class="flex flex-row justify-center items-center content-center my-5">
					<div v-for="(link, index) in prestataire.links || []" :key="index"
							 class="rounded-3xl py-2 px-3 hover:mix-blend-difference flex flex-row justify-center content-center items-center mx-1"
							 :style="{backgroundColor: prestataire.accentColor || '#000', color: blackOrWhite}">
						<a :href="link.url" class="font-semibold leading-loose">{{ link.name }}</a>
						<svg xmlns="http://www.w3.org/2000/svg"
								 @click="openLinkEditPopup(link)"
								 class="ml-2 my-auto cursor-pointer fill-current"
								 width="24" height="24"
								 viewBox="0 0 24 24">
							<path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
							<path
									d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
						</svg>
					</div>

					<div
							@click="openCreateLinkPopup"
							class="rounded-3xl py-2 px-3 hover:mix-blend-difference flex flex-row justify-center content-center items-center h-12 mx-1 cursor-pointer bg-black"
							:style="{backgroundColor: prestataire.accentColor, color: blackOrWhite}">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								 class="fill-white">
							<path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
						</svg>
					</div>

					<!-- Edit link -->
					<Popup v-if="showLinkEditPopup" title="Modification d'un lien" @close="closeLinkEditPopup">

						<div class="flex flex-row items-center content-center justify-between">
							<p class="font-bold mr-5 w-14">{{ $t('global.name') }}</p>
							<input
									class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
									type="text"
									v-model="selectedLink.name"
									placeholder="Nom"
									minlength="1"
									maxlength="64">
						</div>
						<div class="flex flex-row items-center content-center justify-between mt-2">
							<p class="font-bold mr-5 w-14">{{ $t('global.url') }}</p>
							<input
									class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
									type="text"
									v-model="selectedLink.url"
									placeholder="URL"
									pattern="/(((ftp|http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/"
									minlength="1"
									maxlength="64">
						</div>

						<div class="flex flex-row items-center content-center justify-between mt-5">
							<button class="bg-green-600 hover:bg-green-800 py-2 px-3 rounded mr-5"
											@click="updateLink()">
								{{ $t('global.update') }}
							</button>
							<button class="bg-gray-500 hover:bg-gray-800 py-2 px-3 rounded" @click="closeLinkEditPopup">
								{{ $t('cancel') }}
							</button>
						</div>

					</Popup>

					<!-- Create link -->
					<Popup v-if="showCreateLinkPopup" title="Ajout d'un lien" @close="closeLinkCreatePopup">
						<div class="flex flex-row items-center content-center justify-between">
							<p class="font-bold mr-5 w-14">{{ $('global.name') }}</p>
							<input
									class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
									type="text"
									v-model="selectedLink.name"
									placeholder="Nom"
									minlength="1"
									maxlength="64">
						</div>
						<div class="flex flex-row items-center content-center justify-between mt-2">
							<p class="font-bold mr-5 w-14">{{ $t('global.url') }}</p>
							<input
									class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
									type="text"
									v-model="selectedLink.url"
									placeholder="URL"
									pattern="/(((ftp|http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/"
									minlength="1"
									maxlength="64">
						</div>


						<div class="flex flex-row items-center content-center justify-between mt-5">
							<button class="bg-green-600 hover:bg-green-800 py-2 px-3 rounded mr-5"
											@click="createLink()">
								{{ $t("prestataire_edit.create_link") }}
							</button>
							<button class="bg-gray-500 hover:bg-gray-800 py-2 px-3 rounded" @click="closeLinkEditPopup">
								{{ $t("cancel") }}
							</button>
						</div>
					</Popup>

				</div>

				<!-- Editeur de description :o -->
				<!--				<p class="py-2 px-3 bg-red-600 bg-opacity-20 border-2 border-red-500 font-bold text-center my-5">Sauvegarder les-->
				<!--					modifications-->
				<!--					provoquera un reload de la page. N'est pas fonctionnel</p>-->

				<!-- Actions -->
				<div class="flex flex-row items-center content-center justify-start">
					<button class="py-2 px-3 rounded-3xl bg-blue-500 hover:bg-blue-600 m-2 flex flex-row"
									@click="saveDescription">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								 class="fill-white mr-2">
							<path
									d="M5 21h14a2 2 0 0 0 2-2V8a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H5z"></path>
						</svg>
						{{ $t('global.save') }}
					</button>
					<button class="py-2 px-3 rounded-3xl bg-gray-500 hover:bg-gray-600 m-2 flex flex-row"
									@click="setDescription(prestataire.description)">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								 class="fill-white mr-2">
							<path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"></path>
							<path
									d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"></path>
						</svg>
						{{ $t('global.reset') }}
					</button>
				</div>

				<Editor
						spellcheck="true"
						:api-key="TINY_MCE_API_KEY"
						:init="editorSettings"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import {getOptimalTextColor, TINY_MCE_API_KEY, wait} from "@/utils";
import Popup from "@/components/dashboard/Popup.vue";
import PrestataireService from "@/services/prestataire.service";
import Editor from '@tinymce/tinymce-vue'
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
					'lists', 'link', 'image', 'table', 'code', 'help', 'wordcount',
					'accordion', 'insertdatetime', 'advlist', 'nonbreaking', 'pagebreak',
					'preview', 'quickbars', 'autoresize', 'searchreplace'
				],

				skin: 'jam',
				icons: 'thin',

				quickbars_insert_toolbar: 'quicktable image media codesample',
				quickbars_selection_toolbar: 'bold italic underline | blocks | bullist numlist | blockquote quicklink',
				contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
				toolbar: 'formatselect | forecolor backcolor | bold italic underline strikethrough | link image blockquote codesample | align bullist numlist | preview' + (window.location.host.startsWith('localhost') ? '| code' : ''),
			}
		}
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
					this.selectedLink.name, this.selectedLink.url, this.selectedLink.id
			);

			if (!res.error) {
				this.closeLinkEditPopup();
			} else {
				alert(res.data)
			}
		},
		async createLink() {
			let res = await PrestataireService.addPrestataireLink(
					this.prestataire.id,
					this.selectedLink.name, this.selectedLink.url
			);

			if (!res.error) {
				this.closeLinkCreatePopup();
			} else {
				alert(res.data)
			}
		},

		// EDITOR

		async setDescription(content) {
			while (!getTinymce() || !getTinymce().activeEditor) {
				await wait(1000);
			}
			getTinymce().activeEditor.setContent(content)
		},
		async saveDescription() {
			if (!getTinymce() || !getTinymce().activeEditor) {
				alert("L'éditeur n'est pas encore initialisé");
				return;
			}

			let content = getTinymce().activeEditor.getContent();
			if (!content) return;

			let res = await PrestataireService.updatePrestataire(this.prestataire.id, {description: content});
			if (res.error) {
				alert(`Erreur de sauvegarde de la description: ${res.data}`)
			} else {
				alert("Le contenu a été sauvegardé avec succès.")
			}
		},
	},
	computed: {
		blackOrWhite() {
			return getOptimalTextColor(this.prestataire.accentColor || "#000")
		},
		TINY_MCE_API_KEY() {
			return TINY_MCE_API_KEY
		},
	}
}
</script>
