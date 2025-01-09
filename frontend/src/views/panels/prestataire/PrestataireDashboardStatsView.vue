<script setup>
import PrestataireDashboardWithTabsTemplate
	from "@/components/dashboard/prestataire/PrestataireDashboardWithTabsTemplate.vue";
import {ref} from "vue";
import PrestataireShopStats from "@/components/dashboard/prestataire/stats/PrestataireShopStats.vue";

const tabs = [
	{id: "shop", name: "Boutique"},
	{id: "karting", name: "Karting"},
	{id: "billeterie", name: "Billeterie"},
	{id: "ecuries", name: "Visites de garage"},
	{id: "montgol", name: "Montgolfières"}
];
const activeTab = ref(tabs[0].id);

function changeTab(newTab) {
	console.log(`New tab. activeTab = ${newTab}`)
	activeTab.value = newTab;
	console.log(activeTab.value);
}

console.log(activeTab)
</script>

<template>
	<PrestataireDashboardWithTabsTemplate :current-tab="activeTab" current-page="stats" :tabs="tabs"
																				v-on:changeTab="changeTab">
		<div v-if="activeTab === 'shop'">
			<PrestataireShopStats></PrestataireShopStats>
		</div>
		<div v-else>
			<div
					class="bg-orange-500 bg-opacity-10 border-2 border-orange-500 p-5 m-10 mt-5 rounded flex flex-row items-center justify-start gap-8">
				<svg xmlns="http://www.w3.org/2000/svg" class="fill-orange-500" width="40" height="40" viewBox="0 0 24 24">
					<path
							d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"></path>
				</svg>
				<p>Les statistiques pour la catégorie <strong>{{ activeTab }}</strong> ne sont pas
					encore disponibles.</p>
			</div>
		</div>
		<!--		<div v-if="activeTab === 'karting'">karting</div>-->
		<!--		<div v-if="activeTab === 'billeterie'">billeterie</div>-->
		<!--		<div v-if="activeTab === 'ecuries'">ecuries</div>-->
		<!--		<div v-if="activeTab === 'montgol'">montgol</div>-->
	</PrestataireDashboardWithTabsTemplate>
</template>