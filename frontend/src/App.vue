<template>
	<div id="app" class="font-sans h-full w-screen bg-dark text-white">
		<!-- On affiche la barre de navigation, sauf si on est dans le dashboard prestataire ou prestataire -->
		<NavbarComponent
				v-if="!$route.meta['hideNavbar'] && !($route.fullPath.match(/(\/prestataire\/[^/]+\/panel)|(\/admin\/panel)/))">
		</NavbarComponent>

		<router-view/>
	</div>
</template>
<script setup lang="ts">
import NavbarComponent from "@/components/navigation/navbar/NavbarComponent.vue";
</script>