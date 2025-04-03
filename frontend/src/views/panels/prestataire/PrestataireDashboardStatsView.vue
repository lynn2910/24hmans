<template>
	<PrestataireDashboardWithTabsTemplate
			:current-tab="activeTab"
			current-page="stats"
			:tabs="tabs"
			v-on:changeTab="changeTab"
	>
		<div v-if="activeTab === 'shop'">
			<PrestataireShopStats :prestataire_id="loggedInUser.id"></PrestataireShopStats>
		</div>
		<div v-else>
			<InfoCard classes="bg-orange-100 border-orange-400 text-orange-500 flex flex-row items-center w-full">
				<div class="flex flex-row items-center py-4">
					<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 mr-4 fill-current"
							viewBox="0 0 24 24">
						<path
								d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"
						></path>
					</svg>
					<p v-html="$t('dashboards.statistics.not_available', { activeTab })"></p>
				</div>
			</InfoCard>
		</div>
	</PrestataireDashboardWithTabsTemplate>
</template>

<script>
import PrestataireDashboardWithTabsTemplate
	from "@/components/dashboard/prestataire/PrestataireDashboardWithTabsTemplate.vue";
import PrestataireShopStats from "@/components/dashboard/prestataire/stats/PrestataireShopStats.vue";
import i from "@/i18n";
import {mapState} from "vuex";
import InfoCard from "@/components/dashboard/stats/InfoCard.vue";

export default {
	components: {InfoCard, PrestataireDashboardWithTabsTemplate, PrestataireShopStats},
	data() {
		const tabs = [
			{id: "shop", name: i.t("dashboards.presta_admin.shop.name")},
			{id: "karting", name: i.t("dashboards.presta_admin.karting.name")},
			{id: "billeterie", name: i.t("dashboards.presta_admin.tickets_obj.name")},
			{id: "ecuries", name: i.t("dashboards.presta_admin.ecuries_obj.name")},
			{id: "montgol", name: i.t("dashboards.presta_admin.montgolfieres.name")},
		];
		return {
			tabs,
			activeTab: tabs[0].id,
		};
	},
	computed: {
		...mapState("login", ["loggedInUser"]),
	},
	methods: {
		changeTab(newTab) {
			console.log(`New tab. activeTab = ${newTab}`);
			this.activeTab = newTab;
		},
	},
};
</script>
