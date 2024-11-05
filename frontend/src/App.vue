<template>
	<div id="app" class="font-sans h-screen w-screen bg-dark text-white">
		<!-- On affiche la barre de navigation, sauf si on est dans le dashboard prestataire ou admin -->
		<!--		<nav v-if="!($route.fullPath.startsWith('/prestataire') || $route.fullPath.startsWith('/admin'))">-->
		<!--			<router-link to="/">Home</router-link>-->
		<!--			|-->
		<!--			<router-link to="/about">About</router-link>-->
		<!--		</nav>-->

		<NavbarComponent
				v-if="!($route.fullPath.match(/(\/prestataire\/[^/]+\/panel)|(\/admin\/panel)/))">
    </NavbarComponent>

		<router-view/>
	</div>
</template>
<script setup lang="ts">
import NavbarComponent from "@/components/navbar/NavbarComponent.vue";
</script>