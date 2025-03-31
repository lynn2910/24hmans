<template>
	<div>
		<h1 class="text-2xl font-bold my-3">{{ $t('services.billetterie.type_billet.title') }}</h1>
		<div>
			<div v-for="(category, index) in categories" :key="index">
				<span class="text-white text-lg font-bold cursor-pointer hover:underline"
							@click="categorySelected(category)">{{ category.category_label }}</span>
			</div>
		</div>
	</div>
</template>


<script>
export default {
	name: "BilletterieTypeBillet",
	props: {
		categories: Array
	},
	methods: {
		categorySelected(ctg) {
			this.$emit('category', ctg);
		}
	}

}
</script>