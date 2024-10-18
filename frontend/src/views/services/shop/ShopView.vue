<template>
	<div>
		<div class="w-full h-20"></div>
		<p>{{ $route.params }}</p>

		<p>Items</p>
		{{ items }}
		<p v-for="item in items" :key="item.id">{{ item }}</p>
		<p>Categories</p>
		{{ categories }}
		<p v-for="ctg in categories" :key="ctg.category_id">{{ ctg }}</p>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import store from "@/store/index"
import PrestataireService from "@/services/prestataire.service";

export default {
	computed: {...mapGetters("prestataire/boutique", ["items", "categories"])},
	actions: {...mapActions("prestataire/boutique", ["getShop"])},
	data() {
		return {
			prestataire: {}
		}
	},
	async beforeMount() {
		let prestataire = await PrestataireService.getPrestataireFromName(this.$route.params.prestataire_name);
		console.log(prestataire)

		if (!prestataire.error) {
			this.prestataire = prestataire;
			await store.dispatch("prestataire/boutique/getShop", prestataire.data.id);
		} else {
			console.error(prestataire.data)
		}
	}
}
</script>