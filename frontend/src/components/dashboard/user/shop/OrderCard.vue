<template>
	<div class="rounded border border-gray-600 w-full">
		<!-- head -->
		<div class="flex flex-row items-center justify-start select-none p-2 bg-black bg-opacity-10 rounded-t"
				 @click="showBody = !showBody">
			<div class="fill-white">
				<svg v-if="showBody" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
				</svg>
				<svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
				</svg>
			</div>
			<div>{{ order.order_id }}</div>
		</div>

		<!-- body -->
		<div v-if="showBody" class="flex flex-row items-start justify-start p-5 pt-1">
			<div class="w-1/5">
				<p class="text-blue-500 font-bold text-2xl">{{ Intl.NumberFormat('fr-FR').format(order.total_price) }}€</p>
				<p class="mt-2 font-bold">Commandé le:</p>
				<p>{{ order.date.toLocaleString("fr-FR") }}</p>
			</div>
			<div class="w-2/3">
				<h3 class="font-bold text-lg mb-2 gap-5">Liste des articles</h3>

				<div v-for="item in order.articles" :key="item.article_id">

					<div class="flex flex-row items-start justify-start">
						<!-- Informations de l'article-->
						<div class="w-1/2">
							<p><strong>Nom:</strong> {{ item.article.name }}</p>
							<p><strong>Prix unitaire:</strong> {{ Intl.NumberFormat('fr-FR').format(item.unit_price) }}</p>
							<p><strong>Quantité achetée:</strong> {{ Intl.NumberFormat('fr-FR').format(item.amount) }}</p>
						</div>
						<div class="ml-auto w-1/5 pr-10">
							<p>Total:</p>
							<p class="text-left font-bold">
								{{ Intl.NumberFormat('fr-FR').format(item.unit_price * item.amount) }}€
							</p>
						</div>
					</div>

					<hr class="my-3 mx-2"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "OrderCard",
	props: {
		order: Object
	},
	data() {
		return {
			showBody: true
		}
	}
}
</script>