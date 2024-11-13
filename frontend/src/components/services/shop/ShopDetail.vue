<script>
export default {
	name: "ShopDetail",
	props: {
		name: String,
		open: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			opened: this.open
		}
	}
}
</script>

<template>
	<div class="my-4 bg-white bg-opacity-5 rounded">
		<div @click="opened = !opened"
				 class="font-semibold text-xl flex flex-row items-center my-2 py-2 px-1 cursor-pointer select-none">
			<svg v-if="opened" xmlns="http://www.w3.org/2000/svg" class="fill-white h-7 mr-3" viewBox="0 0 24 24">
				<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
			</svg>
			<svg v-else xmlns="http://www.w3.org/2000/svg" class="fill-white h-7 mr-3" viewBox="0 0 24 24">
				<path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
			</svg>
			<h2>{{ name }}</h2>
		</div>
		<div v-if="opened" class="p-4 pt-0">
			<!-- Le contenu iras ici -->
			<slot></slot>
		</div>
	</div>
</template>
