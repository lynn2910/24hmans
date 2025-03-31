<template>
	<div class="h-full w-full flex flex-row gap-5">
		<!-- liste -->
		<div class="bg-blue-400 bg-opacity-5 m-5 mr-0 p-5 h-full border border-gray-700 rounded-2xl ml-0 mt-0 w-full">

			<div class="flex flex-row items-start content-center justify-between">
				<h1 class="font-bold text-xl">Liste des articles</h1>
			</div>

			<table class="block overflow-x-scroll overflow-y-scroll w-full whitespace-nowrap">
				<thead>
				<tr class="text-left border-b-2 border-blue-gray-100">
					<!--					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-5">Id</th>-->
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-52">Nom</th>
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-52 max-w-52">Catégorie</th>
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 min-w-24">Stock</th>
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 min-w-24">Prix (€)</th>
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-full">Description</th>
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50"></th>
				</tr>
				</thead>

				<tbody>

				<tr v-for="(article, index) in articles" :key="index"
						class="border-b border-b-blue-gray-50 my-2 h-12">
					<!--					<td class="p-4 py-2 border-b border-blue-gray-50">-->
					<!--						<p class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">-->
					<!--							{{ article.item_id }}-->
					<!--						</p>-->
					<!--					</td>-->
					<td class="p-4 py-2 border-b border-blue-gray-50">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900 truncate">
							{{ article.name }}
						</p>
					</td>
					<td class="p-4 py-2">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal bg-blue-600 py-1 px-2 rounded-full text-center">
							{{ findCategory(article.category_id || -1)?.category_label }}
						</p>
					</td>
					<td class="p-4 py-2">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
							{{ article.stock }}
						</p>
					</td>
					<td class="p-4 py-2">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
							{{ article.price ? Intl.NumberFormat('fr-FR').format(article.price) : 'ERROR' }}€
						</p>
					</td>
					<td class="p-4 py-2 max-w-56 truncate">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
							{{ article.description }}
						</p>
					</td>
					<td class="p-4 py-2 max-w-56 flex flex-row items-center content-center justify-end h-full">
						<!-- voir -->
						<router-link
								:to="`/boutique/${prestataire?.referencer || transformPrestataireName(prestataire.name)}/item/${transformPrestataireName(article?.name)}`"
								target="_blank"
								class="py-2 px-3 bg-dark rounded hover:bg-opacity-50 cursor-pointer text-base my-auto">
							<svg xmlns="http://www.w3.org/2000/svg" class="fill-white" width="24" height="24" viewBox="0 0 24 24">
								<path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
							</svg>
						</router-link>
						<!-- Edit -->
						<div class="px-2 cursor-pointer fill-blue-500 hover:fill-blue-400 my-auto">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
								<path
										d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
							</svg>
						</div>
						<!-- TODO modifier les informations d'un article -->
						<!-- Delete -->
						<div class="px-2 cursor-pointer fill-red-500 hover:fill-red-400 my-auto"
								 @click="$emit('articleDelete', article.item_id)">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path
										d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
							</svg>
						</div>
					</td>
				</tr>
				</tbody>

			</table>

			<p v-if="articles?.length < 1" class="mx-1 my-3">Aucun article à afficher</p>
		</div>
		<!-- Création -->
		<div
				class="bg-blue-400 bg-opacity-5 m-5 ml-0 p-5 h-full border border-gray-700 rounded-2xl mt-0"
				:class="expends.creation ? 'min-w-[350px] w-56' : 'w-20'">
			<!-- En-tête -->
			<div class="flex flex-row items-center content-center justify-start gap-9 h-16 w-full">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						 class="fill-white p-2 h-10 w-10 rounded-xl hover:bg-white hover:bg-opacity-10 cursor-pointer"
						 @click="expends.creation = !expends.creation">
					<path
							d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM5 5h3v14H5zm5 14V5h9v14z"></path>
				</svg>
				<h2 class="font-bold" v-if="expends.creation">Création d'un article</h2>
			</div>

			<!-- Form -->
			<div v-if="expends.creation" class="flex flex-col justify-start">

				<div>
					<p class="my-1">Nom</p>
					<input
							class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
							v-model="creationForm.name"
							type="text"
							placeholder="Nom de l'article"
							minlength="1">
				</div>

				<div>
					<p class="my-1">Catégorie</p>
					<Select placeholder="Catégorie" :items="[NO_CTG_SELECTED, ...categories.map((c) => c.category_label)]"
									@selectionChange="changeCategorySelectedCreation"></Select>
				</div>

				<div>
					<p class="my-1">Stock</p>
					<input
							class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
							v-model="creationForm.stock"
							type="number"
							placeholder="Stock initial du produit"
							minlength="1">
				</div>

				<div>
					<p class="my-1">Prix (en €)</p>
					<input
							class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
							v-model="creationForm.price"
							type="number"
							placeholder="Prix de vente"
							minlength="1">
				</div>

				<button class="py-2 px-3 rounded mt-5"
								:class="isItemCreationValid ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer': 'bg-gray-500 cursor-not-allowed'"
								@click="createArticle">
					Ajouter l'article
				</button>

			</div>
		</div>
	</div>
</template>

<script>
import {transformPrestataireName} from "@/utils";
import Select from "@/components/selects/Select.vue";

export default {
	name: "PrestataireShopArticles",
	components: {Select},
	props: {
		articles: {
			type: Array,
			default: () => []
		},
		categories: {
			type: Array,
			default: () => []
		},
		prestataire: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		const NO_CTG_SELECTED = "Aucune catégorie";
		return {
			creationForm: {
				name: "",
				category: NO_CTG_SELECTED,
				stock: 0,
				price: 0
			},
			NO_CTG_SELECTED,
			expends: {
				creation: true
			}
		}
	},
	computed: {
		isItemCreationValid() {
			return this.creationForm.name.length > 0
					&& !this.articles.some(a => a.name.toLowerCase().trim() === this.creationForm.name.toLowerCase().trim())
					&& (
							this.creationForm.category
							&& this.creationForm.category !== this.NO_CTG_SELECTED
							&& this.categories.find(category => category.category_id === this.creationForm.category.category_id)
					) && this.creationForm.stock >= 0 && this.creationForm.price >= 0;
		}
	},
	methods: {
		transformPrestataireName,
		findCategory(id) {
			return this.categories.find(category => category.category_id === id)
		},
		changeCategorySelectedCreation(newCategory) {
			let ctg = this.categories.find(category => category.category_label.trim().toLowerCase() === newCategory.trim().toLowerCase());
			if (ctg || newCategory === this.NO_CTG_SELECTED) {
				this.creationForm.category = ctg;
			} else {
				console.error(`Cannot find category with label '${newCategory.trim().toLowerCase()}'`)
			}
		},
		createArticle() {
			if (this.isItemCreationValid) {
				this.$emit('createArticle', {
					name: this.creationForm.name,
					price: Number.parseFloat(this.creationForm.price),
					stock: this.creationForm.price,
					category_id: this.creationForm.category?.category_id,
				});
			}
		},
	}
}
</script>