<template>
	<div id="app" class="font-sans h-full w-screen bg-dark text-white">
		<!-- On affiche la barre de navigation, sauf si on est dans le dashboard prestataire ou prestataire -->
		<NavbarComponent
				v-if="!$route.meta['hideNavbar'] && !($route.fullPath.match(/(\/prestataire\/[^/]+\/panel)|(\/admin\/panel)/))">
		</NavbarComponent>

		<router-view/>

		<!-- Santa is here -->
		<Snow :radius="[1.0, 4.5]" :snow-amount="500" :speed="[0.5,2.5]"></Snow>
	</div>
</template>
<script lang="ts">
import NavbarComponent from "@/components/navigation/navbar/NavbarComponent.vue";
import Snow from "@/components/Snow.vue";

export default {
	components: {NavbarComponent, Snow},
}
</script>