<template>
	<div class="w-full h-full overflow-y-scroll">
		<div class="fixed -z-10 top-0 left-0 w-full h-full" :style="{backgroundColor: prestataire.accentColor}"></div>
		<div class="h-[95%] bg-dark rounded-xl overflow-y-scroll text-ellipsis overflow-x-hidden">

			<div class="w-full h-36 rounded-t-xl bg-bottom bg-no-repeat bg-cover"
					 :style="{background: `url('/banners/${prestataire.banner || ''}')`}"></div>

			<!-- Body -->
			<div class="p-5">
				<h1 class="font-bold text-3xl text-center">{{ prestataire.name }}</h1>

				<!-- Liens -->
				<div class="flex flex-row justify-center items-center content-center my-5">

					<div v-for="(link, index) in prestataire.links || []" :key="index"
							 class="rounded-3xl py-2 px-3 hover:mix-blend-difference flex flex-row justify-center content-center items-center mx-1"
							 :style="{backgroundColor: prestataire.accentColor, color: blackOrWhite}">
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
							class="rounded-3xl py-2 px-3 hover:mix-blend-difference flex flex-row justify-center content-center items-center h-12 mx-1 cursor-pointer"
							:style="{backgroundColor: prestataire.accentColor, color: blackOrWhite}">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
						</svg>
					</div>

					<!-- Edit link -->
					<Popup v-if="showLinkEditPopup" title="Modification d'un lien" @close="closeLinkEditPopup">

						<div class="flex flex-row items-center content-center justify-between">
							<p class="font-bold mr-5 w-14">Nom</p>
							<input
									class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
									type="text"
									v-model="selectedLink.name"
									placeholder="Nom"
									minlength="1"
									maxlength="64">
						</div>
						<div class="flex flex-row items-center content-center justify-between mt-2">
							<p class="font-bold mr-5 w-14">URL</p>
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
								Mettre à jour
							</button>
							<button class="bg-gray-500 hover:bg-gray-800 py-2 px-3 rounded" @click="closeLinkEditPopup">Annuler
							</button>
						</div>

					</Popup>

					<!-- Create link -->
					<Popup v-if="showCreateLinkPopup" title="Ajout d'un lien" @close="closeLinkCreatePopup">
						<div class="flex flex-row items-center content-center justify-between">
							<p class="font-bold mr-5 w-14">Nom</p>
							<input
									class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
									type="text"
									v-model="selectedLink.name"
									placeholder="Nom"
									minlength="1"
									maxlength="64">
						</div>
						<div class="flex flex-row items-center content-center justify-between mt-2">
							<p class="font-bold mr-5 w-14">URL</p>
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
								Créer le lien
							</button>
							<button class="bg-gray-500 hover:bg-gray-800 py-2 px-3 rounded" @click="closeLinkEditPopup">Annuler
							</button>
						</div>
					</Popup>

				</div>

				<!-- Editeur de description :o -->
				<p class="py-2 px-3 bg-red-600 bg-opacity-20 border-2 border-red-500 font-bold text-center my-5">Sauvegarder les
					modifications
					provoquera un reload de la page. N'est pas fonctionnel</p>
				<!-- TODO ne marche pas -->
				<Editor
						spellcheck="true"
						:api-key="TINY_MCE_API_KEY"
						:init="editorSettings"
						:content="prestataire.description"
						@onSubmit="console.log('YEET')"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import {getOptimalTextColor, TINY_MCE_API_KEY} from "@/utils";
import Popup from "@/components/dashboard/Popup.vue";
import PrestataireService from "@/services/prestataire.service";
import Editor from '@tinymce/tinymce-vue'

export default {
	name: "PrestataireEditPage",
	components: {Popup, Editor},
	data() {
		return {
			selectedLink: null,
			showLinkEditPopup: false,
			showCreateLinkPopup: false,
			editorSettings: {
				plugins: [
					'lists', 'link', 'image', 'table', 'code', 'help', 'wordcount',
					'accordion', 'insertdatetime', 'advlist', 'nonbreaking', 'pagebreak',
					'preview', 'powerpaste', 'quickbars', 'autoresize', 'searchreplace',
					'save'
				],

				skin: 'jam',
				icons: 'thin',

				quickbars_insert_toolbar: 'quicktable image media codesample',
				quickbars_selection_toolbar: 'bold italic underline | blocks | bullist numlist | blockquote quicklink',
				contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
				toolbar: 'save | cancel | formatselect | forecolor backcolor | bold italic underline strikethrough | link image blockquote codesample | align bullist numlist | code ',
			}
		}
	},
	props: {
		prestataire: Object,
	},
	methods: {
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

		async saveDescription(content) {
			console.log(content);

			return false;
		}
	},
	computed: {
		blackOrWhite() {
			return getOptimalTextColor(this.prestataire.accentColor)
		},
		TINY_MCE_API_KEY() {
			return TINY_MCE_API_KEY
		},
	}
}
</script>
