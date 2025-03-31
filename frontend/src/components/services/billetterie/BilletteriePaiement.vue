<template>
	<div>
		<h1 class="text-2xl font-bold my-3">Paiement</h1>
		<div>
			<PaymentInformations></PaymentInformations>
			<p class="italic col-span-2 mt-5 text-gray-400">
				Le système de rentrée des informations bancaires est factice. Aucune information n'est traitée, ni enregistrée.
			</p>
		</div>
		<button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" @click="handlePaymentClick">Payer et réserver</button>
		<LoginPopup v-if="showLoginPopup" @close="showLoginPopup = false"></LoginPopup>
	</div>
</template>

<script>
import PaymentInformations from "@/components/PaymentInformations.vue";
import LoginPopup from "@/components/dashboard/LoginPopup.vue";

export default {
	name: "BilletteriePaiement",
	components: { LoginPopup, PaymentInformations },

	data() {
		return {
			showLoginPopup: false
		};
	},
	methods: {
		handlePaymentClick() {
			if (!this.loggedInUser) {
				this.showLoginPopup = true;
			} else {
				this.buildNewOrder();
			}
		}
	},
	watch: {
		loggedInUser(newUser) {
			if (newUser && this.showLoginPopup) {
				this.showLoginPopup = false;
				this.buildNewOrder();
			}
		}
	}
};
</script>
