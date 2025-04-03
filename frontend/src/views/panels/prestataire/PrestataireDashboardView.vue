<script>
import PrestataireDashboardTemplate from "@/components/dashboard/prestataire/PrestataireDashboardTemplate.vue";
import {mapState} from "vuex";
import BoutiqueService from "@/services/boutique.service";
import I18n from "@/i18n";

export default {
	components: {
		PrestataireDashboardTemplate,
	},
	data() {
		return {
			greetings: '',
			stats: [
				{title: "Visites", value: 1250, icon: "📈"},
				{title: "Commandes", value: 540, icon: "📅"},
				{title: "Chiffre d'affaires", value: "25,000€", icon: "💰"},
			],
			upcomingEvents: [
				{id: 1, title: "Visite guidée du Mans (1h)", date: "2025-08-14", time: "14h00"},
				{id: 2, title: "Course de Karting Junior (10m)", date: "2025-08-15", time: "10h00"},
			],
			services: [
				{id: 'boutique', title: 'Boutique', icon: '🛒', link: {name: 'prestataire_dashboard_shop'}},
				{id: 'visites', title: 'Visites des écuries', icon: '📸', link: {name: 'visite_ecuries_panel'}},
				{id: 'karting', title: 'Karting', icon: '🏎️', link: {name: '#'}},
				{id: 'billeterie', title: 'Billeterie', icon: '🎟️', link: {name: '#'}},
				{id: 'montgolfieres', title: 'Montgolfières', icon: '🎈', link: {name: '#'}},
			],
		};
	},
	methods: {
		async getBoutiqueStats() {
			if (!this.loggedInUser) return;

			let shop = await BoutiqueService.getShopInformations(this.loggedInUser.id, true)
			if (shop.error) {
				return console.error(shop)
			}
			shop = shop.data;

			const res = await BoutiqueService.getBoutiqueStats(shop.id);
			if (!res.error) {
				this.stats[1].value = res.data.commands || 0;
				this.stats[2].value = Intl.NumberFormat(
						this.$route.params.locale || 'fr',
						{style: 'currency', currencyDisplay: 'symbol', currency: 'EUR'}
				)
						.format(res.data.total_gains)
			}
		}
	},
	watch: {
		loggedInUser(v) {
			if (v) {
				this.getBoutiqueStats()
			}
		}
	},
	computed: {
		...mapState('login', ['loggedInUser'])
	},
	async mounted() {
		const hour = new Date().getHours();
		if (hour < 12) {
			this.greetings = "Bonjour";
		} else if (hour < 18) {
			this.greetings = "Bon après-midi";
		} else {
			this.greetings = "Bonsoir";
		}

		await this.getBoutiqueStats()
	},
}
</script>

<template>
	<PrestataireDashboardTemplate current-page="home">
		<div class="p-6">
			<h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
				{{ greetings }}, {{ loggedInUser.name }}
			</h1>
			<p class="text-gray-600 dark:text-gray-400 mb-6">
				Bienvenue sur votre tableau de bord. Consultez vos statistiques et gérez vos services.
			</p>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div v-for="stat in stats" :key="stat.title"
						 class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center gap-4">
					<span class="text-2xl">{{ stat.icon }}</span>
					<div>
						<h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ stat.title }}</h2>
						<p class="text-xl font-bold text-blue-600 dark:text-blue-400">{{ stat.value }}</p>
					</div>
				</div>
			</div>

			<div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
				<h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Événements à venir</h2>
				<ul v-if="upcomingEvents.length > 0" class="space-y-3">
					<li v-for="event in upcomingEvents" :key="event.id"
							class="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 flex justify-between items-center">
						<div>
							<h3 class="text-md font-medium text-gray-800 dark:text-gray-100">{{ event.title }}</h3>
							<p class="text-sm text-gray-500 dark:text-gray-400">Date: {{ event.date }}, {{ event.time }}</p>
						</div>
						<span
								class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100">
                            Prochainement
                        </span>
					</li>
				</ul>
				<p v-else class="text-gray-500 dark:text-gray-400">Aucun événement à venir.</p>
			</div>

			<div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
				<h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Services</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					<div v-for="service in services" :key="service.id"
							 class="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
						<span class="text-xl">{{ service.icon }}</span>
						<span class="text-gray-700 dark:text-gray-200 font-medium">{{ service.title }}</span>
					</div>
				</div>
			</div>
		</div>
	</PrestataireDashboardTemplate>
</template>
