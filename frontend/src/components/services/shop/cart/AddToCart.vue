<template>
	<div
			class="w-3/4  flex flex-row items-center justify-start select-none">
		<!-- Add to cart button -->
		<div
				class="flex flex-row items-center justify-start p-5 rounded-l-full h-16 bg-opacity-50 hover:bg-opacity-100"
				:class="isValid ? 'bg-blue-600 cursor-pointer' : 'bg-red-600 cursor-not-allowed'"
				@click="$emit('addToCart', counter)">
			<svg class="fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path
						d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921z"></path>
				<circle cx="10.5" cy="19.5" r="1.5"></circle>
				<circle cx="17.5" cy="19.5" r="1.5"></circle>
			</svg>
			<h2 class="font-bold mx-5">Ajouter au panier</h2>
		</div>

		<!-- Counter -->
		<div
				class="flex flex-row items-center justify-start py-3 px-5 rounded-r-full h-16 border-l border-l-gray-400 bg-opacity-50 hover:bg-opacity-100"
				:class="isValid ? 'bg-blue-600' : 'bg-red-600'">

			<input type="number"
						 pattern="\d+"
						 min="1" :max="max"
						 v-model="counter"
						 @change="counter = Math.min(counter, max)"
						 class="bg-black bg-opacity-25 rounded py-2 px-3 outline-none appearance-none w-20">

			<!-- icons -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					 class="fill-white cursor-pointer"
					 @click="counter = Math.max(counter - 1, 1)">
				<path d="M5 11h14v2H5z"></path>
			</svg>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					 class="fill-white cursor-pointer"
					 @click="counter = Math.min(counter + 1, max)">
				<path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
			</svg>
		</div>
	</div>
</template>

<script>
export default {
	name: "AddToCart",
	props: {
		max: Number,
	},
	data() {
		return {
			counter: 1
		}
	},
	computed: {
		isValid() {
			return this.counter > 0 && this.counter <= this.max;
		}
	}
}
</script>