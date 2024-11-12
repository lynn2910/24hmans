<template>
	<div>
		<!-- Si le prestataire et la boutique existent -->
		<div v-if="prestataire && shopExists" class="w-full mt-36">
			<h1 class="font-bold text-4xl text-center">Boutique de {{ prestataire.name }}</h1>

			<div class="w-3/4 min-w-80 mx-auto my-10">
				<ShopFilter :categories="categories.map(c => c.category_label)"
										v-on:newFilters="(f) => filters = f"></ShopFilter>

				<div class="mt-10 flex flex-row flex-wrap">
					<ShopItem v-for="item in filteredItems"
										:key="item.item_id"
										:item="item"
										:category="categories.find(c => c.category_id === item.category).category_label"></ShopItem>
				</div>
			</div>
		</div>

		<!-- Si la boutique n'existe pas -->
		<NotExists v-else-if="prestataire && !shopExists" title="Cette boutique n'existe pas"
							 :route-back-u-r-l="`/prestataire/${$route.params.prestataire_name}`" route-back="Retourner à la
					page du prestataire"
							 description="Vous tentez d'accéder à une boutique qui n'existe pas."></NotExists>

		<!-- Si le prestataire n'existe pas -->
		<NotExists v-else title="Ce prestataire n'existe pas" route-back-u-r-l="/#prestataires" route-back="Retourner à la
					liste des prestataires"
							 description="Vous tentez d'accéder à la boutique d'un prestataire qui n'existe pas."></NotExists>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import store from "@/store/index"
import PrestataireService from "@/services/prestataire.service";
import ShopFilter from "@/components/services/shop/ShopFilter.vue";
import ShopItem from "@/components/services/shop/ShopItem.vue";
import NotExists from "@/components/services/NotExists.vue";

export default {
	name: "ShopContainer",
	components: {NotExists, ShopItem, ShopFilter},
	computed: {
		...mapGetters("prestataire/boutique", ["items", "categories", "shopExists"]),
		filteredItems() {
			let result = this.items;

			let categoriesToFilter = [];

			this.filters.forEach((filter) => {

				console.log(filter)
				if (filter.id === "keywords") {
					result = result.filter((item) => item.name.toLowerCase().includes(filter.value.toLowerCase()));
				} else if (filter.id.startsWith("category_")) {
					let ctg = filter.id.replace(/^category_/, '');
					categoriesToFilter.push(ctg)
				}
			})

			if (categoriesToFilter.length > 0) {
				result = result.filter((item) => {
					let category_label = this.categories.find((c) => c.category_id === item.category).category_label;
					return categoriesToFilter.includes(category_label.toLowerCase().replace(/\s+/g, ''))
				});
			}

			return result;
		}
	},
	actions: {...mapActions("prestataire/boutique", ["getShop"]),},
	data() {
		return {
			prestataire: null,
			filters: []
		}
	},
	async beforeMount() {
		let prestataire = await PrestataireService.getPrestataireFromName(this.$route.params.prestataire_name);
		console.log(prestataire)

		if (!prestataire.error) {
			this.prestataire = prestataire.data;
			await store.dispatch("prestataire/boutique/getShop", prestataire.data.id);
		} else {
			console.error(prestataire.data);
		}
	}
}
</script>