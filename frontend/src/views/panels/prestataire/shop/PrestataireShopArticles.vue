<template>
	<div class="flex flex-row items-center content-center justify-center gap-5 ">
		<!-- liste -->
		<div class="w-full bg-blue-400 bg-opacity-5 m-5 mr-0 p-5 h-full border border-gray-700 rounded-2xl ml-0 mt-0">
			Liste
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
		articles: Array,
		categories: Array
	}
}
</script>