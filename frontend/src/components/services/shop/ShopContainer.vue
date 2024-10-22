<template>
	<!-- Pour éviter que la page n'apparaisse sous la navbar -->
	<div class="w-full mt-36">
		<h1 class="font-bold text-4xl text-center">Boutique de {{ prestataire.name }}</h1>

		<div class="w-3/4 min-w-80 mx-auto my-10">
			<ShopFilter :categories="categories" :max-price="maxPrice" :min-price="minPrice"></ShopFilter>

			<div>
				<ShopItem v-for="item in items"
									:key="item.item_id"
									v-on:newMinPrice="updateMinPrice"
									v-on:newMaxPrice="updateMaxPrice"></ShopItem>
			</div>

			<button @click="updateMinPrice(10)">AA</button>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import store from "@/store/index"
import PrestataireService from "@/services/prestataire.service";
import ShopFilter from "@/components/services/shop/ShopFilter.vue";
import ShopItem from "@/components/services/shop/ShopItem.vue";

export default {
	name: "ShopContainer",
	components: {ShopItem, ShopFilter},
	computed: {...mapGetters("prestataire/boutique", ["items", "categories", "minPrice", "maxPrice"]),},
	actions: {...mapActions("prestataire/boutique", ["getShop"]),},
	data() {
		return {
			prestataire: {},
		}
	},
	methods: {
		...mapMutations("prestataire/boutique", ["updateMinPrice", "updateMaxPrice"])
	},
	async beforeMount() {
		let prestataire = await PrestataireService.getPrestataireFromName(this.$route.params.prestataire_name);
		console.log(prestataire)

		if (!prestataire.error) {
			this.prestataire = prestataire.data;
			await store.dispatch("prestataire/boutique/getShop", prestataire.data.id);
		} else {
			console.error(prestataire.data)
		}
	}
}
</script>