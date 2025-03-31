<script setup>
import PrestataireDashboardTemplate from "@/components/dashboard/prestataire/PrestataireDashboardTemplate.vue";
</script>

<template>
	<PrestataireDashboardTemplate current-page="home">
		<p>{{ $t('dashboards.presta_admin.presta_home.hello') }}</p>
	</PrestataireDashboardTemplate>
</template>