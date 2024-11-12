<script>
import {mapActions, mapGetters} from "vuex";
import BoutiqueService from "@/services/boutique.service";
import ShopDetail from "@/components/services/shop/ShopDetail.vue";
import ShopItemCategory from "@/components/services/shop/ShopItemCategory.vue";
import PrestataireService from "@/services/prestataire.service";
import store from "@/store";
import NotExists from "@/components/services/NotExists.vue";

export default {
	name: "ItemBigView",
	components: {NotExists, ShopItemCategory, ShopDetail},
	data() {
		return {
			article: null
		}
	},
	props: {
		item_name: String,
		prestataire_name: String,
	},
	computed: {
		...mapGetters("prestataire/boutique", ["categories"]),
	},
	methods: {
		/**
		 * Return either white, yellow, orange or red, based on the stock number
		 * @param {number|string} stock The stock of the article
		 * @return {String} the tailwind class corresponding to the color
		 */
		getStockColor(stock) {
			if (stock < 10) return "text-red-500";
			else if (stock < 30) return "text-yellow-500";
			else return "text-white";
		}
	},
	actions: {...mapActions("prestataire/boutique", ["getShop"]),},
	async beforeMount() {
		let prestataire = await PrestataireService.getPrestataireFromName(this.$route.params.prestataire_name);
		console.log(prestataire)

		if (!prestataire.error) {
			this.prestataire = prestataire.data;
			await store.dispatch("prestataire/boutique/getShop", prestataire.data.id);
		} else {
			console.error(prestataire.data);
			await this.$router.push({path: "/"});
		}

		let item = await BoutiqueService.getItemFromName(this.prestataire_name, this.item_name);
		if (!item.error) {
			this.article = item.data;
		}
	},
}
</script>

<template>
	<div class="h-full w-full">
		<!-- Si l'article existe bien -->
		<div class="mt-36 h-full w-full flex flex-row" v-if="article">
			<div class="flex flex-col items-center content-center w-[50%] h-full">
				<img v-if="article.image" class="w-[50%] h-auto h-max-[90%]" :src="article.image"
						 alt="Impossible de charger l'image"/>
				<div v-else class="w-[50%] h-[75vh] h-max-[90%] flex flex-col items-center content-center">
					<img class="w-auto h-20 m-auto mb-0" src="@/assets/images/no_image.png" alt="Aucune image">
					<h2 class="m-auto mt-2 text-base opacity-90">Aucun visuel</h2>
				</div>
			</div>
			<div class="bg-white bg-opacity-45 rounded-xl h-[75vh] w-0.5 overflow-hidden"></div>
			<div class="w-[50%] pl-10 overflow-y-scroll mr-10">
				<div class="flex flex-row content-center w-full">
					<h1 class="text-3xl font-bold leading-loose mr-5">{{ article.name }}</h1>
					<!-- Category -->
					<ShopItemCategory :category="categories.find(c => c.category_id === article.category)?.category_label"
														class="w-min-30 w-auto my-auto"></ShopItemCategory>
				</div>

				<div>
					<h2 class="text-5xl my-4 mb-0 font-bold text-blue-500">{{ article.price.toFixed(2) }} €</h2>

					<!-- Indicateur de stock -->
					<p v-if="article.stock > 0" class="opacity-80">Encore <strong
							:class="getStockColor(article.stock)">{{ article.stock }}</strong>
						produits en stock
					</p>
					<p v-else class="opacity-80 text-red-500">Stock épuisé</p>
				</div>

				<ShopDetail v-if="article.description && article.description.length > 0" name="Description" open>
					<p>{{ article.description }}</p>
				</ShopDetail>

				<!-- TODO Ajouter les options liées au panier et au système de commandes (faire que ca colle au bas) -->
			</div>
		</div>

		<!--
 {
                item_id: 2,
                name: "Porte-clé porsche",
                image: null,
                category: "be2cff03-7d12-4369-acff-037d12a36993",
                stock: 146,
                price: 24.99,
                description: null
            }
            -->


		<!-- Si l'article n'existe pas -->
		<NotExists v-else title="Cet article n'existe pas"
							 description="Vous tentez d'accéder à un article qui n'existe pas."
							 :route-back-u-r-l="`/boutique/${prestataire_name}`" route-back="Retourner à la
					boutique"></NotExists>
	</div>
</template>
