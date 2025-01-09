<template>
	<div>
		<h1 class="text-2xl font-bold my-3">Paiement</h1>
		<div>
			<PaymentInformations></PaymentInformations>
			<p class="italic col-span-2 mt-5 text-gray-400">
				Le système de rentrée des informations bancaires est factice. Aucune information n'est traitée, ni
				enregistrée.
			</p>
		</div>
		<button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Payer et réserver</button>

	</div>
</template>

<script>
import PaymentInformations from "@/components/PaymentInformations.vue";

export default {
	name: "BilletteriePaiement",
	components: {PaymentInformations}


}
</script>