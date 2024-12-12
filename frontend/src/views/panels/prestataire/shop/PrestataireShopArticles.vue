<template>
	<div class="h-full flex flex-row items-center content-center justify-center gap-5">
		<!-- liste -->
		<div class="w-full bg-blue-400 bg-opacity-5 m-5 mr-0 p-5 h-full border border-gray-700 rounded-2xl ml-0 mt-0">

			<table class="w-full">
				<thead>
				<tr class="text-left">
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-5">Id</th>
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Nom</th>
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Catégorie</th>
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Stock</th>
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Prix (€)</th>
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Description</th>
				</tr>
				</thead>

				<tbody>

				<tr v-for="(article, index) in articles" :key="index" class="border-b border-b-gray-500 my-2">
					<td class="p-4 py-2 border-b border-blue-gray-50">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
							{{ article.item_id }}
						</p>
					</td>
					<td class="p-4 py-2 border-b border-blue-gray-50">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
							{{ article.name }}
						</p>
					</td>
					<td class="p-4 py-2 border-b border-blue-gray-50">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal bg-blue-600 py-1 px-2 rounded-full text-center">
							{{ findCategory(article.category || -1)?.category_label }}
						</p>
					</td>
					<td class="p-4 py-2 border-b border-blue-gray-50">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
							{{ article.stock }}
						</p>
					</td>
					<td class="p-4 py-2 border-b border-blue-gray-50">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
							{{ article.price?.toFixed(2) || 0.00 }}
						</p>
					</td>
					<td class="p-4 py-2 border-b border-blue-gray-50 max-w-56 truncate">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
							{{ article.description }}
						</p>
					</td>
				</tr>
				</tbody>

			</table>

		</div>
		<!-- Création -->
		<div
				class="min-w-[400px] w-96 bg-blue-400 bg-opacity-5 m-5 ml-0 p-5 h-full border border-gray-700 rounded-2xl mt-0">
			Création
		</div>
	</div>
</template>

<script>
export default {
	name: "PrestataireShopArticles",
	props: {
		articles: {
			type: Array,
			default: () => []
		},
		categories: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		findCategory(id) {
			return this.categories.find(category => category.category_id === id)
		}
	}
}
</script>