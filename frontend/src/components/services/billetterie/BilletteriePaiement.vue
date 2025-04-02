<template>
	<div>
		<h1 class="text-2xl font-bold my-3">{{ $t('payment.title') }}</h1>
		<div>
			<PaymentInformations></PaymentInformations>
			<p class="italic col-span-2 mt-5 text-gray-400">
				{{
					$t('payment.warning')
				}}
			</p>
		</div>
		<button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" @click="handlePaymentClick">
			{{ $t('services.billetterie.reserve') }}
		</button>
		<LoginPopup v-if="!loggedInUser && showLoginPopup" @close="showLoginPopup = false"></LoginPopup>
	</div>
</template>

<script>
import PaymentInformations from "@/components/PaymentInformations.vue";
import LoginPopup from "@/components/dashboard/LoginPopup.vue";
import { mapState } from "vuex";
import UsersService from "@/services/users.service";


export default {
	name: "BilletteriePaiement",
	components: { LoginPopup, PaymentInformations },

	computed: {
		...mapState("login", ["loggedInUser"]),
		...mapState("billetterie", {
			billetterieCategory: state => state.category,
			billetterieDate: state => state.date,
			billetterieNbPersonnes: state => state.nbPersonnes
		}),
	},

	data() {
		return {
			showLoginPopup: false,
		};
	},

	methods: {
		async buildNewOrder() {
			if (!this.loggedInUser) {
				this.showLoginPopup = true;
				return;
			}

			const preparation = {
				user_id: this.loggedInUser.id,
				category: this.billetterieCategory,
				date: this.billetterieDate,
				nbPersonnes: this.billetterieNbPersonnes,
				created_at: new Date(),
			};

			try {
				const { data } = await UsersService.newOrder(preparation);

				if (data && data.order_id) {
					await this.$router.push({
						name: "client_panel_orders",
						query: { order_id: data.order_id },
					});
				} else {
					console.error("Erreur: Réponse inattendue du serveur", data);
				}
			} catch (error) {
				console.error("Erreur lors de la communication avec le serveur :", error);
			}
		},

		handlePaymentClick() {
			if (!this.loggedInUser) {
				this.showLoginPopup = true;
			} else {
				this.buildNewOrder();
			}
		},
	},

	watch: {
		loggedInUser(newUser) {
			if (newUser && this.showLoginPopup) {
				this.showLoginPopup = false;
				this.buildNewOrder();
			}
		},
	},
};
</script>
