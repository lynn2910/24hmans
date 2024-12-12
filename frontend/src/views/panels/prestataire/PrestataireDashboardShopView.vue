<template>
	<PrestataireDashboardWithTabsTemplate :current-tab="activeTab" current-page="shop" :tabs="tabs"
																				@changeTab="changeTab">
		<div v-if="activeTab === 'items'">
			<h1>Items</h1>
		</div>
		<div v-if="activeTab === 'categories'">
			<h1>Catégories</h1>
		</div>
	</PrestataireDashboardWithTabsTemplate>
</template>

<script>
import PrestataireDashboardWithTabsTemplate
	from "@/components/dashboard/prestataire/PrestataireDashboardWithTabsTemplate.vue";

export default {
	components: {PrestataireDashboardWithTabsTemplate},
	data() {
		return {
			tabs: [
				{id: "items", name: "Articles"},
				{id: "categories", name: "Catégorie"},
			],
			activeTab: "items",
		}
	},
	methods: {
		changeTab(newTab) {
			this.activeTab = newTab;
		}
	}
}
</script>
