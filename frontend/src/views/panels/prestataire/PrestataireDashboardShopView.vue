<template>
	<PrestataireDashboardWithTabsTemplate :current-tab="activeTab" current-page="shop" :tabs="tabs"
																				@changeTab="changeTab">
		<div v-if="activeTab === 'items'" class="h-[95%]">
			<PrestataireShopArticles :prestataire="prestataire" :articles="items"
															 :categories="categories"
															 @createArticle="createArticle"
															 @articleDelete="deleteArticle">
			</PrestataireShopArticles>
		</div>
		<div v-else-if="activeTab === 'categories'">

			<PrestataireShopCategories :prestataire="prestataire" :articles="items"
																 :categories="categories"
																 @createCategory="createCategory"
																 @articleDelete="deleteArticle"> <!-- TODO updateCategory && deleteCategory -->
			</PrestataireShopCategories>
		</div>
		<div v-else-if="activeTab === 'settings'">
			<PrestataireShopSettings :prestataire="prestataire"></PrestataireShopSettings>
		</div>

		<Loading v-if="showImportLoadingAnimation"></Loading>
	</PrestataireDashboardWithTabsTemplate>
</template>

<script>
import PrestataireDashboardWithTabsTemplate
	from "@/components/dashboard/prestataire/PrestataireDashboardWithTabsTemplate.vue";
import {mapMutations, mapState} from "vuex";
import PrestataireShopArticles from "@/views/panels/prestataire/shop/PrestataireShopArticles.vue";
import Loading from "@/components/dashboard/Loading.vue";
import PrestataireShopSettings from "@/views/panels/prestataire/shop/PrestataireShopSettings.vue";
import PrestataireShopCategories from "@/views/panels/prestataire/shop/PrestataireShopCategories.vue";
import BoutiqueService from "@/services/boutique.service";


export default {
	components: {
		PrestataireShopCategories,
		PrestataireShopSettings, Loading, PrestataireShopArticles, PrestataireDashboardWithTabsTemplate
	},
	data() {
		return {
			tabs: [
				{id: "settings", name: "Paramètres généraux"},
				{id: "items", name: "Articles"},
				{id: "categories", name: "Catégories"},
			],
			activeTab: "settings",
			showImportLoadingAnimation: false
		}
	},
	computed: {
		...mapState('login', ['loggedInUser']),
		...mapState('prestataire/boutique', ['items', 'categories', 'prestataire', 'shopId', "shopEnabled"])
	},
	methods: {
		changeTab(newTab) {
			if (newTab !== this.activeTab && this.$route.query.tab !== newTab) {
				this.$router.replace({query: {tab: newTab}});
			}

			this.activeTab = newTab;
		},

		// ARTICLES
		async createArticle(article) {
			await this.$store.dispatch("prestataire/boutique/addArticleToBoutique", {
				article,
				boutique_id: this.shopId
			});
		},
		async deleteArticle(article_id) {
			await this.$store.dispatch("prestataire/boutique/removeArticleFromBoutique", {
				article_id,
				shop_id: this.shopId,
			})
		},

		...mapMutations("prestataire/boutique", ["addCategory", "removeCategory"]),

		// CATEGORIES
		async createCategory(category_name) {
			console.log("Creating category...")
			let res = await BoutiqueService.createShopCategory(this.shopId, category_name);
			console.log(res)
			if (!res.error) {
				this.addCategory(res.data.category);
			} else {
				console.error(res)
			}
		}
	},
	async beforeMount() {
		const tab = this.$route.query.tab;

		console.log("Tab in query: ", tab, this.activeTab);
		if (tab && this.tabs.some(t => t.id === tab) && this.activeTab !== tab) {
			this.changeTab(tab)
		}

		await this.$store.dispatch("prestataire/boutique/getShop", this.loggedInUser.id)
	}
}
</script>
