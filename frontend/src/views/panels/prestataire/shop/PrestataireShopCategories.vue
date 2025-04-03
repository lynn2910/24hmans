<template>
	<div class="flex flex-col lg:flex-row gap-6 h-full w-full">
		<div class="bg-blue-50/10 p-6 rounded-xl border border-gray-700 w-full overflow-auto">
			<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
				<h1 class="font-bold text-xl text-white">
					{{ $t("dashboards.presta_admin.shop.categories.title") }}
				</h1>
			</div>

			<div class="overflow-x-auto">
				<table class="min-w-full whitespace-nowrap">
					<thead class="bg-gray-800 rounded-t-lg">
					<tr>
						<th
								class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
						>
							{{ $t("global.name") }}
						</th>
						<th
								class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
						>
							{{ $t("dashboards.presta_admin.shop.categories.articles_count") }}
						</th>
						<th
								class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
						>
							Actions
						</th>
					</tr>
					</thead>
					<tbody class="bg-gray-900 divide-y divide-gray-700">
					<tr v-for="(category, index) in categories" :key="index">
						<td class="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
							<span class="block truncate max-w-64">{{ category.category_label }}</span>
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
							{{ articles.filter((a) => a.category_id === category.category_id).length }}
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
							<button class="text-blue-400 hover:text-blue-300 transition-colors duration-200">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 24 24">
									<path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
									<path
											d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
								</svg>
							</button>
							<button
									class="text-red-400 hover:text-red-300 transition-colors duration-200"
									@click="$emit('categoryDelete', category.category_id)"
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

			<p v-if="categories?.length < 1" class="mt-4 text-gray-400">
				{{ $t("dashboards.presta_admin.shop.categories.no_category") }}
			</p>
		</div>

		<div class="bg-blue-50/10 p-6 rounded-xl border border-gray-700 w-full lg:w-1/4 transition-all duration-300"
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
					{{ $t("dashboards.presta_admin.shop.categories.category_creation") }}
				</h2>
			</div>

			<div v-if="expends.creation" class="flex flex-col gap-4">
				<div>
					<label for="name" class="block text-sm font-medium text-gray-300 mb-1"
					>{{ $t("global.name") }}</label
					>
					<input
							id="name"
							v-model="creationForm.name"
							type="text"
							:placeholder="$t('dashboards.presta_admin.shop.categories.category_name_placeholder')"
							minlength="1"
							class="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
					/>
				</div>

				<button
						@click="createCategory"
						:class="[
            'py-2 px-4 rounded-md transition-colors duration-200',
            isCategoryCreationValid
              ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed',
          ]"
						:disabled="!isCategoryCreationValid"
				>
					{{ $t("dashboards.presta_admin.shop.categories.add_category") }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "PrestataireShopCategories",
	components: {},
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
		return {
			creationForm: {
				name: "",
			},
			expends: {
				creation: true,
			},
		};
	},
	computed: {
		isCategoryCreationValid() {
			return this.creationForm.name.length > 0;
		},
	},
	methods: {
		createCategory() {
			if (this.isCategoryCreationValid) {
				this.$emit("createCategory", this.creationForm.name);
			}
		},
	},
};
</script>
