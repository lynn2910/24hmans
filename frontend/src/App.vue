<template>
	<div id="app" class="font-sans h-screen w-screen">
		<!-- On affiche la barre de navigation, sauf si on est dans le dashboard prestataire ou admin -->
		<nav v-if="!($route.fullPath.startsWith('/prestataire') || $route.fullPath.startsWith('/admin'))">
			<router-link to="/">Home</router-link>
			|
			<router-link to="/about">About</router-link>
		</nav>
		<router-view/>
	</div>
</template>