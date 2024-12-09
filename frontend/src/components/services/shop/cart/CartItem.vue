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
					class="font-bold text-lg hover:underline flex flex-row items-end justify-start">
				{{ article.name }}
				<p class="text-sm font-normal ml-2 text-gray-200">x {{ count }}</p>
			</router-link>
			<!-- Indicateur de stock si nécessaire -->
			<p v-if="article.stock < 30" class="text-red-600">Il ne reste plus que {{ article.stock }} articles en stock</p>

			<!-- Actions -->
			<div class="flex flex-row items-center content-center justify-start mt-3">
				<!-- Counter -->
				<div
						class="border border-gray-400 rounded-full flex flex-row items-center content-center justify-between p-1 mr-5">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							 @click="$emit('decrease')"
							 class="fill-white cursor-pointer">
						<path d="M5 11h14v2H5z"></path>
					</svg>

					<p class="py-1 px-3 w-14 my-1 text-center select-none">{{ count }}</p>

					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							 @click="$emit('increase')"
							 class="fill-white cursor-pointer">
						<path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
					</svg>
				</div>

				<!-- Delete -->
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						 class="fill-gray-300 hover:fill-red-500 cursor-pointer"
						 @click="$emit('remove')">
					<path
							d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
				</svg>
			</div>
		</div>

		<div class="ml-auto flex flex-col items-end justify-end text-right">
			<p class="font-bold text-xl text-blue-500">{{ totalPrice.toFixed(2) }}€</p>
			<p class="text-gray-300 text-sm">{{ article.price.toFixed(2) }}€ x{{ count }}</p>
		</div>

		<svg v-if="isInvalid" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path
					d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
		</svg>
	</div>
</template>

<script>
import {transformPrestataireName} from "@/utils"
import {mapActions} from "vuex";

export default {
	name: "CartItem",
	props: {
		count: Number,
		article: Object,
	},
	methods: {
		...mapActions('prestataire/boutique', ['getCarts']),
		transformPrestataireName
	},
	computed: {
		isInvalid() {
			return this.article.count > this.article.stock;
		},
		totalPrice() {
			return this.article.count * this.article.price
		}
	},
	beforeMount() {
		this.getCarts();
	}
}
</script>