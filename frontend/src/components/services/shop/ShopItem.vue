<template>
	<div class="group bg-white bg-opacity-5 hover:bg-opacity-10 m-4 p-6 rounded-lg h-auto cursor-pointer w-56">
		<img class="h-20 w-20 mx-auto" :src="item.image" alt="Aucune image">
		<h3 class="mx-auto text-xl font-bold italic group-hover:text-blue-500">{{ item.name }}</h3>
		<p class="mx-auto mt-5 text-xl font-semibold text-center ml-4">
			{{ item.price.toFixed(2) }} €</p>
		<p class="bg-blue-600 bg-opacity-50 rounded-3xl py-1 px-2 ml-2 mt-7 text-center">
			{{ category }}</p>
	</div>
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
export default {
	name: 'ShopItem',
	props: {
		item: Object,
		category: String,
	}
}
</script>
