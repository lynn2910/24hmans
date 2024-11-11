<template>
	<router-link
			:to="`/boutique/${$route.params.prestataire_name}/item/${item.name.trim().toLowerCase().replace(/\s+/, '-')}`"
			class="group bg-white bg-opacity-5 hover:bg-opacity-10 m-4 p-6 rounded-lg h-auto cursor-pointer w-56">

		<img v-if="item.image" class="h-20 w-auto mx-auto text-center mb-2" :src="item.image"
				 alt="Aucune image">
		<img v-else class="h-20 w-20 mx-auto text-center opacity-90 mb-2" src="@/assets/images/no_image.png"
				 alt="Aucune image">
		<h3 class="mx-auto text-xl text-center font-bold italic group-hover:text-blue-500">{{ item.name }}</h3>
		<p class="mx-auto mt-5 text-xl font-semibold text-center ml-4">
			{{ item.price.toFixed(2) }} €</p>
		<ShopitemCategory class="ml-2 mt-7" :category="category"></ShopitemCategory>
	</router-link>
</template>

<!--
 {
                item_id: 2,
                name: "Porte-clé porsche",
                image: null,
                category: "be2cff03-7d12-4369-acff-037d12a36993",
                stock: 146,
                price: 24.99,
                description: null
            }
            -->

<script>
import ShopitemCategory from "@/components/services/shop/ShopItemCategory.vue";

export default {
	name: 'ShopItem',
	components: {ShopitemCategory},
	props: {
		item: Object,
		category: String,
	}
}
</script>
