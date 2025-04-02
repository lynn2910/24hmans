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
		showErrorNotification(message) {
			// Implémentez votre système de notification ici
			console.error("Notification:", message);
			alert(message); // Solution temporaire
		},

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
				created_at: new Date().toISOString()
			};

			try {
				console.log("[DEBUG] Données envoyées au serveur:", JSON.stringify(preparation, null, 2));

				const response = await UsersService.newOrder(preparation);
				console.log("[DEBUG] Réponse du serveur:", response);

				if (!response) {
					throw new Error("Le serveur n'a pas renvoyé de réponse");
				}

				// Gestion des erreurs API
				if (response.status >= 400) {
					const errorMsg = response.data?.message || "Erreur lors de la création de commande";
					throw new Error(errorMsg);
				}

				// Extraction robuste de l'ID de commande
				const orderId = response.data?.order_id || response.data?.id;
				if (!orderId) {
					console.error("[ERROR] Structure de réponse inattendue:", response);
					throw new Error("La commande a été créée mais aucun ID n'a été retourné");
				}

				await this.$router.push({
					name: "client_panel_orders",
					query: { order_id: orderId }
				});

			} catch (error) {
				console.error("[ERROR] Erreur lors de la création de commande:", {
					error: error.message,
					stack: error.stack,
					response: error.response?.data
				});

				this.showErrorNotification(
						error.message || "Une erreur est survenue lors de la création de votre commande"
				);
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