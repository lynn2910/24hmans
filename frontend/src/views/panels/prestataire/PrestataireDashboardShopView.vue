<template>
	<PrestataireDashboardWithTabsTemplate :current-tab="activeTab" current-page="shop" :tabs="tabs"
																				@changeTab="changeTab">
		<div v-if="activeTab === 'items'" class="h-[95%]">
			<PrestataireShopArticles :prestataire="prestataire" :articles="items"
															 :categories="categories"
															 @createArticle="createArticle"
															 @articleDelete="deleteArticle"></PrestataireShopArticles>
		</div>
		<div v-if="activeTab === 'categories'">
			<h1>Catégories</h1>
		</div>
	</PrestataireDashboardWithTabsTemplate>
</template>

<script>
import PrestataireDashboardWithTabsTemplate
	from "@/components/dashboard/prestataire/PrestataireDashboardWithTabsTemplate.vue";
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
		}
	},
	computed: {
		...mapState('login', ['loggedInUser']),
		...mapState('prestataire/boutique', ['items', 'categories', 'prestataire'])
	},
	methods: {
		changeTab(newTab) {
			this.activeTab = newTab;
		},
		async createArticle(article) {
			await this.$store.dispatch("prestataire/boutique/addArticleToBoutique", {
				article,
				prestataire_id: this.prestataire.id
			});
		},
		async deleteArticle(article_id) {
			await this.$store.dispatch("prestataire/boutique/removeArticleFromBoutique", {
				article_id,
				prestataire_id: this.prestataire.id
			})
		},
	},
	async beforeMount() {
		await this.$store.dispatch("prestataire/boutique/getShop", this.loggedInUser.id)
		// let res = await BoutiqueService.getShopInformations(this.loggedInUser.id, true);
		// console.log(res)
		// if (!res.error) {
		// 	this.shop = res.data;
		// } else {
		// 	console.error(`Cannot get the shop informations: ${res.data}`)
		// }
	}
}
</script>
