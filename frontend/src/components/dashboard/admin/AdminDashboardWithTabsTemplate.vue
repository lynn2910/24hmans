<template>
	<AdminDashboardTemplate :current-page="currentPage">
		<div class="w-full bg-gray-900 flex flex-row items-center justify-start select-none border-b border-gray-700">
			<div
					v-for="(t, index) in tabs"
					:key="index"
					@click="$emit('changeTab', t.id)"
					class="px-6 py-3 rounded-t-lg font-semibold cursor-pointer transition-colors duration-200"
					:class="[
                    currentTab === t.id
                        ? 'bg-white text-gray-900 border-b-2 border-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white border-b border-transparent',
                    'mr-4'
                ]"
			>
				<h2 class="text-lg">{{ t.name }}</h2>
			</div>
		</div>

		<div class="flex flex-row flex-1 overflow-auto min-h-[calc(100vw-40rem)]">
			<div class="flex-1 overflow-auto py-6">
				<slot></slot>
			</div>
		</div>
	</AdminDashboardTemplate>
</template>

<script>
import AdminDashboardTemplate from "@/components/dashboard/admin/AdminDashboardTemplate.vue";

export default {
	name: "AdminDashboardWithTabsTemplate",
	components: {AdminDashboardTemplate},
	props: {
		currentPage: String,
		tabs: Array,
		currentTab: String,
	},
};
</script>
