<script>
export default {
	name: "ShopitemCategory",
	props: {
		category: String
	}
}
</script>

<template>
	<p class="bg-blue-600 bg-opacity-50 rounded-3xl py-1 px-4 h-9 text-center w-auto select-none">
		{{ category }}
	</p>
</template>