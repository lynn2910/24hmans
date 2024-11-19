<template>
	<!-- On réutilise directement la template globale du dashboard -->
	<AdminDashboardTemplate :current-page="currentPage">
		<!-- Tabs -->
		<div class="h-20 w-full bg-dark flex flex-row content-center align-baseline">
			<!-- Chaque onglet dans le for -->
			<div v-for="(t, index) in tabs" :key="index"
					 @click="$emit('changeTab', t.id)"
					 class="mx-3 w-48 h-2/3 mt-auto rounded-t-lg p-3 text-center font-bold cursor-pointer"
					 :class="(currentTab === t.id ? 'bg-white text-black' : 'text-white bg-transparent hover:bg-white hover:bg-opacity-15 hover:transition')">
				<h2>{{ t.name }}</h2>
			</div>
		</div>

		<!-- Pages -->
		<div class="flex flex-row h-full">
			<div class="w-3 bg-dark h-full"></div>
			<div class="h-full">
				<slot></slot>
			</div>
		</div>
	</AdminDashboardTemplate>
</template>

<script>
import AdminDashboardTemplate from "@/components/dashboard/admin/AdminDashboardTemplate.vue";

export default {
	name: "PrestataireDashboardWithTabsTemplate",
	components: {AdminDashboardTemplate},
	props: {
		/**
		 * La page actuelle où nous sommes.
		 *
		 * Peut-être :
		 * - "home"
		 * - "stats"
		 * - "shop"
		 * - "ecuries"
		 * - "karting"
		 * - "montgol"
		 */
		currentPage: String,
		/**
		 * [
		 *   {
		 *     name: "Visite des écuries",
		 *     id: "garage"
		 *   }
		 * ]
		 */
		tabs: Array,
		currentTab: String,
	}
}
</script>