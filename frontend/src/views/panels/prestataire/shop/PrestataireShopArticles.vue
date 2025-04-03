<template>
	<div class="flex flex-col lg:flex-row gap-6 h-full w-full">
		<div class="bg-blue-50/10 p-6 rounded-xl border border-gray-700 w-full h-full lg:w-full overflow-auto">
			<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
				<h1 class="font-bold text-xl text-white">
					{{ $t("dashboards.presta_admin.shop.articles.title") }}
				</h1>
			</div>

			<div class="overflow-x-auto">
				<table class="min-w-full whitespace-nowrap">
					<thead class="bg-gray-800 rounded-t-lg">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
							{{ $t("global.name") }}
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
							{{ $t("global.category") }}
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
							{{ $t("global.stock") }}
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
							{{ $t("global.price_detailed") }}
						</th>
						<th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
							Actions
						</th>
					</tr>
					</thead>
					<tbody class="bg-gray-900 divide-y divide-gray-700">
					<tr v-for="(article, index) in articles" :key="index">
						<td class="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
							<span class="truncate max-w-48 block">{{ article.name }}</span>
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
										class="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold text-white bg-blue-500"
								>
                  {{ findCategory(article.category_id || -1)?.category_label }}
                </span>
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
							{{ article.stock }}
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
							{{ article.price ? Intl.NumberFormat("fr-FR").format(article.price) : "ERROR" }}€
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
							<router-link
									:to="`/fr/boutique/${prestataire?.referencer}/item/${article?.referencer}`"
									target="_blank"
									class="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" width="24" height="24"
										 viewBox="0 0 24 24">
									<path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
								</svg>
							</router-link>
							<button class="text-blue-400 hover:text-blue-300 transition-colors duration-200">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 24 24">
									<path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
									<path
											d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
								</svg>
							</button>
							<button
									class="text-red-400 hover:text-red-300 transition-colors duration-200"
									@click="$emit('articleDelete', article.item_id)"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 24 24">
									<path
											d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
								</svg>
							</button>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
			<p v-if="articles?.length < 1" class="mt-4 text-gray-400">
				{{ $t("dashboards.presta_admin.shop.articles.no_article") }}
			</p>
		</div>

		<div
				class="bg-blue-50/10 p-6 rounded-xl border border-gray-700 w-full h-full lg:w-1/4 transition-all duration-300"
				:class="expends.creation ? 'lg:min-w-[350px]' : 'lg:w-20'"
		>
			<div class="flex items-center justify-between gap-4 mb-6">
				<button
						@click="expends.creation = !expends.creation"
						class="p-2 rounded-xl hover:bg-white/10 transition-colors duration-200"
						:title="expends.creation ? 'Collapse' : 'Expand'"
				>
					<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 fill-white"
							viewBox="0 0 24 24"
					>
						<path
								d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM5 5h3v14H5zm5 14V5h9v14z"
						/>
					</svg>
				</button>
				<h2 class="font-semibold text-lg text-white" v-if="expends.creation">
					{{ $t("dashboards.presta_admin.shop.articles.create_article") }}
				</h2>
			</div>

			<div v-if="expends.creation" class="flex flex-col gap-4">
				<div>
					<label for="name" class="block text-sm font-medium text-gray-300 mb-1">Nom</label>
					<input
							id="name"
							v-model="creationForm.name"
							type="text"
							placeholder="Nom de l'article"
							minlength="1"
							class="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
					/>
				</div>

				<div>
					<label for="category" class="block text-sm font-medium text-gray-300 mb-1"
					>{{ $t("global.category") }}</label
					>
					<Select
							id="category"
							:placeholder="$t('global.category')"
							:items="[NO_CTG_SELECTED, ...categories.map((c) => c.category_label)]"
							@selectionChange="changeCategorySelectedCreation"
					></Select>
				</div>

				<div>
					<label for="stock" class="block text-sm font-medium text-gray-300 mb-1"
					>{{ $t("global.stock") }}</label
					>
					<input
							id="stock"
							v-model="creationForm.stock"
							type="number"
							:placeholder="$t('dashboards.presta_admin.shop.articles.initial_stock')"
							min="0"
							class="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
					/>
				</div>

				<div>
					<label for="price" class="block text-sm font-medium text-gray-300 mb-1"
					>{{ $t("global.price_detailed") }}</label
					>
					<input
							id="price"
							v-model="creationForm.price"
							type="number"
							:placeholder="$t('dashboards.presta_admin.shop.articles.selling_price')"
							min="0"
							step="0.01"
							class="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
					/>
				</div>

				<button
						@click="createArticle"
						:class="[
            'py-2 px-4 rounded-md transition-colors duration-200',
            isItemCreationValid
              ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed',
          ]"
						:disabled="!isItemCreationValid"
				>
					{{ $t("dashboards.presta_admin.shop.articles.add_article") }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import Select from "@/components/selects/Select.vue";

export default {
	name: "PrestataireShopArticles",
	components: {Select},
	props: {
		articles: {
			type: Array,
			default: () => [],
		},
		categories: {
			type: Array,
			default: () => [],
		},
		prestataire: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		const NO_CTG_SELECTED = "Aucune catégorie";
		return {
			creationForm: {
				name: "",
				category: NO_CTG_SELECTED,
				stock: 0,
				price: 0,
			},
			NO_CTG_SELECTED,
			expends: {
				creation: true,
			},
		};
	},
	computed: {
		isItemCreationValid() {
			return (
					this.creationForm.name.length > 0 &&
					!this.articles.some(
							(a) => a.name.toLowerCase().trim() === this.creationForm.name.toLowerCase().trim()
					) &&
					(this.creationForm.category &&
							this.creationForm.category !== this.NO_CTG_SELECTED &&
							this.categories.find(
									(category) => category.category_id === this.creationForm.category.category_id
							)) &&
					this.creationForm.stock >= 0 &&
					this.creationForm.price >= 0
			);
		},
	},
	methods: {
		findCategory(id) {
			return this.categories.find((category) => category.category_id === id);
		},
		changeCategorySelectedCreation(newCategory) {
			let ctg = this.categories.find(
					(category) => category.category_label.trim().toLowerCase() === newCategory.trim().toLowerCase()
			);
			if (ctg || newCategory === this.NO_CTG_SELECTED) {
				this.creationForm.category = ctg;
			} else {
				console.error(`Cannot find category with label '${newCategory.trim().toLowerCase()}'`);
			}
		},
		createArticle() {
			if (this.isItemCreationValid) {
				this.$emit("createArticle", {
					name: this.creationForm.name,
					price: Number.parseFloat(this.creationForm.price),
					stock: this.creationForm.stock,
					category_id: this.creationForm.category?.category_id,
				});
			}
		},
	},
};
</script>
