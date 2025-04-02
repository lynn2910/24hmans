<template>
	<div class="h-full w-full flex flex-row gap-5">
		<!-- liste -->
		<div class="bg-blue-400 bg-opacity-5 m-5 mr-0 p-5 h-full border border-gray-700 rounded-2xl ml-0 mt-0 w-full">

			<div class="flex flex-row items-start content-center justify-between">
				<h1 class="font-bold text-xl">{{ $t('dashboards.presta_admin.shop.categories.title') }}</h1>
			</div>

			<table class="block overflow-x-scroll overflow-y-scroll w-full whitespace-nowrap">
				<thead>
				<tr class="text-left border-b-2 border-blue-gray-100 w-full">
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-1/2">{{ $t('global.name') }}</th>
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-1/2">
						{{ $t('dashboards.presta_admin.shop.categories.articles_count') }}
					</th>
					<th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50"></th>
				</tr>
				</thead>

				<tbody>

				<tr v-for="(category, index) in categories" :key="index"
						class="border-b border-b-blue-gray-50 my-2 h-12">

					<td class="p-4 py-2 border-b border-blue-gray-50">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900 truncate">
							{{ category.category_label }}
						</p>
					</td>
					<td class="p-4 py-2 max-w-56 truncate">
						<p class="block font-sans text-sm antialiasing font-normal leading-normal text-blue-gray-900">
							{{ articles.filter(a => a.category_id === category.category_id).length }}
						</p>
					</td>
					<td class="p-4 py-2 max-w-56 flex flex-row items-center content-center justify-end h-full">
						<!-- Edit -->
						<div class="px-2 cursor-pointer fill-blue-500 hover:fill-blue-400 my-auto">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
								<path
										d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
							</svg>
						</div>
						<!-- Delete -->
						<div class="px-2 cursor-pointer fill-red-500 hover:fill-red-400 my-auto"
								 @click="$emit('categoryDelete', category.category_id)">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path
										d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
							</svg>
						</div>
					</td>
				</tr>
				</tbody>

			</table>

			<p v-if="articles?.length < 1" class="mx-1 my-3">{{
					$t('dashboards.presta_admin.shop.categories.no_category')
				}}</p>
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
				<h2 class="font-bold" v-if="expends.creation">
					{{ $t('dashboards.presta_admin.shop.categories.category_creation') }}</h2>
			</div>

			<!-- Form -->
			<div v-if="expends.creation" class="flex flex-col justify-start">

				<div>
					<p class="my-1">{{ $t('global.name') }}</p>
					<input
							class="outline-none border border-gray-400 rounded bg-dark py-2 px-3 hover:border-blue-500 focus:border-blue-500 w-full"
							v-model="creationForm.name"
							type="text"
							:placeholder="$t('dashboards.presta_admin.shop.categories.category_name_placeholder')"
							minlength="1">
				</div>

				<button class="py-2 px-3 rounded mt-5"
								:class="isCategoryCreationValid ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer': 'bg-gray-500 cursor-not-allowed'"
								@click="createCategory">
					{{ $t('dashboards.presta_admin.shop.categories.add_category') }}
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
		return {
			creationForm: {
				name: "",
			},
			expends: {
				creation: true
			}
		}
	},
	computed: {
		isCategoryCreationValid() {
			return this.creationForm.name.length > 0;
		}
	},
	methods: {
		createCategory() {
			if (this.isCategoryCreationValid) {
				this.$emit('createCategory', this.creationForm.name);
			}
		},
	}
}
</script>