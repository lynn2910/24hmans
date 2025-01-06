<template>
	<PrestataireDashboardWithTabsTemplate :current-tab="activeTab" current-page="shop" :tabs="tabs"
																				@changeTab="changeTab">
		<div v-if="activeTab === 'items'" class="h-[95%]">
			<PrestataireShopArticles :prestataire="prestataire" :articles="items"
															 :categories="categories"
															 @createArticle="createArticle"
															 @articleDelete="deleteArticle"
															 @download="downloadBoutique" @copy="copyBoutique"
															 @import="importPrestataires"></PrestataireShopArticles>
		</div>
		<div v-else-if="activeTab === 'categories'">

			<PrestataireShopCategories :prestataire="prestataire" :articles="items"
																 :categories="categories"
																 @createArticle="createArticle"
																 @articleDelete="deleteArticle"
																 @download="downloadBoutique" @copy="copyBoutique"
																 @import="importPrestataires">
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
import {mapState} from "vuex";
import PrestataireShopArticles from "@/views/panels/prestataire/shop/PrestataireShopArticles.vue";
import {transformPrestataireName, wait} from "@/utils";
import Loading from "@/components/dashboard/Loading.vue";
import PrestataireShopSettings from "@/views/panels/prestataire/shop/PrestataireShopSettings.vue";
import PrestataireShopCategories from "@/views/panels/prestataire/shop/PrestataireShopCategories.vue";


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
		...mapState('prestataire/boutique', ['items', 'categories', 'prestataire', 'shopId'])
	},
	methods: {
		changeTab(newTab) {
			if (newTab !== this.activeTab && this.$route.query.tab !== newTab) {
				this.$router.replace({query: {tab: newTab}});
			}

			this.activeTab = newTab;
		},

		// DOWNLOAD/COPY/IMPORT
		downloadBoutique() {
			let jsonPrestataires = JSON.stringify({
				items: this.items,
				categories: this.categories,
				prestataire_id: this.prestataire.id,
				shop_id: this.shopId,
			});

			const blob = new Blob([jsonPrestataires], {type: 'application/json'});

			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = `boutique_${transformPrestataireName(this.prestataire.name)}.json`;
			link.click();

			URL.revokeObjectURL(link.href);
		},
		copyBoutique() {
			let jsonBoutique = JSON.stringify({
				items: this.items,
				categories: this.categories,
				prestataire_id: this.prestataire.id,
				shop_id: this.shopId,
			});
			navigator.clipboard.writeText(jsonBoutique)
					.then(() => {
						console.log('Prestataires copiés dans le presse-papier');
						this.showCopyPopup = true;
					})
					.catch(err => {
						console.error('Erreur de copie : ', err);
					});
		},
		async importPrestataires(d) {
			if (d.error) {
				alert("Format de fichier invalide.")
			}
			console.log(d.data)
			this.showImportLoadingAnimation = true;

			// TODO ajoute l'importation de la boutique
			await wait(1000)

			this.showImportLoadingAnimation = false;
		},

		// ARTICLES
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
		const tab = this.$route.query.tab;

		console.log("Tab in query: ", tab, this.activeTab);
		if (tab && this.tabs.some(t => t.id === tab) && this.activeTab !== tab) {
			this.changeTab(tab)
		}

		await this.$store.dispatch("prestataire/boutique/getShop", this.loggedInUser.id)
	}
}
</script>
