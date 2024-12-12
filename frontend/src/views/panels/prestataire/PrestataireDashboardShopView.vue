<template>
	<PrestataireDashboardWithTabsTemplate :current-tab="activeTab" current-page="shop" :tabs="tabs"
																				@changeTab="changeTab">
		<div v-if="activeTab === 'items'">
			<PrestataireShopArticles :articles="shop.items" :categories="shop.categories"></PrestataireShopArticles>
		</div>
		<div v-if="activeTab === 'categories'">
			<h1>Catégories</h1>
		</div>
	</PrestataireDashboardWithTabsTemplate>
</template>

<script>
import PrestataireDashboardWithTabsTemplate
	from "@/components/dashboard/prestataire/PrestataireDashboardWithTabsTemplate.vue";
import BoutiqueService from "@/services/boutique.service";
import {mapState} from "vuex";
import PrestataireShopArticles from "@/views/panels/prestataire/shop/PrestataireShopArticles.vue";

export default {
	components: {PrestataireShopArticles, PrestataireDashboardWithTabsTemplate},
	data() {
		return {
			tabs: [
				{id: "items", name: "Articles"},
				{id: "categories", name: "Catégorie"},
			],
			activeTab: "items",
			shop: {
				categories: [],
				items: []
			}
		}
	},
	computed: {
		...mapState('login', ['loggedInUser'])
	},
	methods: {
		changeTab(newTab) {
			this.activeTab = newTab;
		}
	},
	async beforeMount() {
		let res = await BoutiqueService.getShopInformations(this.loggedInUser.id, true);
		if (!res.error) {
			this.shop = res.data;
		} else {
			console.error(`Cannot get the shop informations: ${res.data}`)
		}
	}
}
</script>
