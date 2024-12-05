<template>
	<div
			class="flex flex-row items-center content-center justify-start p-5 border-b border-b-white border-opacity-50 mx-5 my-2">
		<!-- Image -->
		<div class="flex flex-col items-center content-center h-20">
			<img v-if="article.image" class="w-20 h-auto" :src="article.image" alt="Impossible de charger l'image"/>
			<img v-else class="w-20 h-auto my-auto px-5" src="@/assets/images/no_image.png" alt="Aucune image">
		</div>

		<div>
			<!-- Nom -->
			<router-link
					:to="`/boutique/${transformPrestataireName(article.prestataire?.name || '')}/item/${transformPrestataireName(article.name)}`"
					class="font-bold text-lg hover:underline">
				{{ article.name }}
			</router-link>
			<!-- Indicateur de stock si nécessaire -->
			<p v-if="article.stock < 30" class="text-red-600">Il ne reste plus que {{ article.stock }} articles en stock</p>

			<!-- Actions -->
			<div class="flex flex-row items-center content-center justify-between">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						 class="fill-gray-300 hover:fill-red-500 cursor-pointer"
						 @click="$emit('remove')">
					<path
							d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
				</svg>
			</div>
		</div>
		<svg v-if="isInvalid" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path
					d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
		</svg>
	</div>
</template>

<!--

{ "item_id": 2, "name": "Porte-clé porsche", "image": "/shop_images/porsche_porte_cle_ecusson.png",
"category": "be2cff03-7d12-4369-acff-037d12a36993", "stock": 146, "price": 24.99,
"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
-->

<script>
import {transformPrestataireName} from "@/utils"

export default {
	name: "CartItem",
	props: {
		count: Number,
		article: Object
	},
	methods: {
		transformPrestataireName
	},
	computed: {
		isInvalid() {
			return this.article.count > this.article.stock;
		}
	}
}
</script>