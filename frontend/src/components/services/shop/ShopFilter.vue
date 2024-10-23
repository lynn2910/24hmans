<template>
	<div>
		<!-- Titre top -->
		<div class="w-full border-b-2 border-gray-500 py-5">
			<h2 class="font-extrabold italic text-xl uppercase">Notre sélection</h2>
		</div>
		<!-- Filtres -->
		<div class="w-full py-4 flex flex-row align-middle">
			<!-- Mots clés -->
			<div class="flex flex-row align-middle px-5 text-sm">
				<p class="uppercase font-semibold text-sm my-auto">Mots-clés</p>
				<input
						v-model="searchKeywords"
						class="ml-3 my-auto h-10 py-1 px-2 bg-dark border-2 border-blue-400 border-opacity-50 rounded outline-none focus:border-opacity-100"
						type="text"
						@change="updateActiveFilters"
						placeholder="Mots-clés">
			</div>
			<!-- Categories -->
			<div class="flex flex-row align-middle content-center px-5 min-w-96">
				<p class="uppercase font-semibold text-sm my-auto mr-5">Catégories</p>
				<!-- Sélection multiples -->
				<MultipleSelect
						ref="categoriesSelection"
						:items="categories"
						v-on:selectionChange="(selected) => {selectedCategories = selected; updateActiveFilters()}"></MultipleSelect>
			</div>
		</div>
		<!-- Filtres actifs -->
		<div v-if="activeFilters.length > 0" class="p-4 m-4 mt-0 border-2 border-gray-500 rounded-xl">
			<h2 class="font-extrabold text-xl uppercase">Filtres actifs</h2>
			<div class="p-5 flex flex-row align-middle">
				<div class="flex flex-row bg-blue-600 bg-opacity-50 rounded-3xl py-1 px-2 ml-2"
						 v-for="(filter, index) in activeFilters"
						 :key="index">
					<svg @click="removeActiveFilter(filter.id)"
							 class="fill-white cursor-pointer"
							 xmlns="http://www.w3.org/2000/svg"
							 width="24"
							 height="24" viewBox="0 0 24 24">
						<path
								d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
					</svg>
					<p>{{ filter.name }}: {{ filter.value }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MultipleSelect from "@/components/selects/MultipleSelect.vue";

export default {
	name: "ShopFilter",
	components: {MultipleSelect},
	data() {
		return {
			searchKeywords: "",
			selectedCategories: [],
			activeFilters: []
		}
	},
	methods: {
		removeActiveFilter(removed_filter_id) {
			if (removed_filter_id.startsWith("category_")) {
				this.$refs
						.categoriesSelection
						.removeItem(
								this.categories
										.find(c => `category_${c.toLowerCase().replace(/\s+/g, '')}` === removed_filter_id)
						)
			} else if (removed_filter_id === "keywords") {
				this.searchKeywords = "";
			}

			this.updateActiveFilters()
		},
		updateActiveFilters() {
			let newFilters = [];

			// mots-clés
			if (this.searchKeywords.length > 0) {
				newFilters.push({value: this.searchKeywords, name: "Mots-clés", id: "keywords"})
			}

			// catégories
			if (this.selectedCategories.length > 0) {
				this.selectedCategories.forEach((ctg) => {
					newFilters.push({value: ctg, name: "Catégorie", id: `category_${ctg.toLowerCase().replace(/\s+/g, '')}`})
				})
			}

			this.activeFilters = newFilters;
			// send events to the parent
			this.$emit("newFilters", this.activeFilters);
		}
	},
	props: {
		categories: {type: Array, default: () => []},
	}
}
</script>