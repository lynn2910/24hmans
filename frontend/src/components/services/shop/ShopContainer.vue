<template>
	<div>
		<!-- Si le prestataire et la boutique existent -->
		<div v-if="prestataire && shopExists" class="w-full mt-36">
			<h1 class="font-bold text-4xl text-center">{{ $t('services.shop.shop_name', {name: prestataire.name}) }}</h1>

			<div class="w-3/4 min-w-80 mx-auto my-10">
				<ShopFilter :categories="categories.map(c => c.category_label)"
										v-on:newFilters="(f) => filters = f"></ShopFilter>

				<div class="mt-10 flex flex-row flex-wrap">
					<ShopItem v-for="item in filteredItems"
										:key="item.item_id"
										:item="item"
										:category="categories.find(c => c.category_id === item.category_id)?.category_label"></ShopItem>
				</div>
			</div>
		</div>


		<NotExists v-else-if="prestataire && !shopExists"
							 :title="$t('services.shop.shop_doesnt_exist_title')"
							 :description="$t('services.shop.shop_doesnt_exist')"
							 :route-back-u-r-l="{name: 'prestataire_profile', params: {prestataire_name: prestataire.referencer}}"
							 :route-back="$t('services.shop.go_back_to_prestataire_profile')"></NotExists>

		<NotExists v-else-if="fetchedPrestataire"
							 :title="$t('services.shop.prestataire_doesnt_exist_title')"
							 :description="$t('services.shop.prestataire_doesnt_exist')"
							 :route-back-u-r-l="{path:'/#prestataires'}"
							 :route-back="$t('services.shop.go_back_to_prestataires_list')"></NotExists>
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
				if (filter.id === "keywords") {
					result = result.filter((item) => item.name.toLowerCase().includes(filter.value.toLowerCase()));
				} else if (filter.id.startsWith("category_")) {
					let ctg = filter.id.replace(/^category_/, '');
					categoriesToFilter.push(ctg)
				}
			})

			if (this.categories && categoriesToFilter.length > 0) {
				result = result.filter((item) => {
					let category_label = this.categories.find((c) => c.category_id === item.category_id)?.category_label;
					return categoriesToFilter.includes(category_label.toLowerCase().replace(/\s+/g, ''))
				});
			}

			return result;
		}
	},
	actions: {...mapActions("prestataire/boutique", ["getShop"]),},
	data() {
		return {
			fetchedPrestataire: false,
			prestataire: null,
			filters: []
		}
	},
	async beforeMount() {
		try {
			let prestataire = await PrestataireService.getPrestataireFromName(this.$route.params.prestataire_name);

			this.fetchedPrestataire = true;

			if (prestataire && !prestataire.error) {
				this.prestataire = prestataire.data;
				await store.dispatch("prestataire/boutique/getShop", prestataire.data.id);
			} else {
				console.error(prestataire.data);
			}
		} catch (e) {
			console.log("No prestataire or shop")
		}
	}
}
</script>