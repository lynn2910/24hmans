<script setup>
import PrestataireDashboardWithTabsTemplate from "@/components/dashboard/PrestataireDashboardWithTabsTemplate.vue";
import {ref} from "vue";

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
		<div v-if="activeTab === 'shop'">boutique</div>
		<div v-if="activeTab === 'karting'">karting</div>
		<div v-if="activeTab === 'billeterie'">billeterie</div>
		<div v-if="activeTab === 'ecuries'">ecuries</div>
		<div v-if="activeTab === 'montgol'">montgol</div>
	</PrestataireDashboardWithTabsTemplate>
</template>