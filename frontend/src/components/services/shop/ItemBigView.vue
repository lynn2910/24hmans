<script>
import {mapActions, mapGetters} from "vuex";
import BoutiqueService from "@/services/boutique.service";
import ShopDetail from "@/components/services/shop/ShopDetail.vue";
import ShopItemCategory from "@/components/services/shop/ShopItemCategory.vue";
import PrestataireService from "@/services/prestataire.service";
import store from "@/store";

export default {
	name: "ItemBigView",
	components: {ShopItemCategory, ShopDetail},
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
	actions: {...mapActions("prestataire/boutique", ["getShop"]),},
	async beforeMount() {
		let prestataire = await PrestataireService.getPrestataireFromName(this.$route.params.prestataire_name);
		console.log(prestataire)

		if (!prestataire.error) {
			this.prestataire = prestataire.data;
			await store.dispatch("prestataire/boutique/getShop", prestataire.data.id);
		} else {
			console.error(prestataire.data)
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
				<img class="w-[50%] h-auto h-max-[90%]" v-if="article.image" :src="article.image"
						 alt="Impossible de charger l'image"/>
			</div>
			<div class="bg-white h-[75vh] w-0.5 overflow-hidden"></div>
			<div class="w-[50%] pl-10 overflow-y-scroll mr-10">
				<div class="flex flex-row content-center w-full">
					<h1 class="text-3xl font-bold leading-loose mr-5">{{ article.name }}</h1>
					<!-- Category -->
					<ShopItemCategory :category="categories.find(c => c.category_id === article.category)?.category_label"
														class="w-min-30 w-auto my-auto"></ShopItemCategory>
				</div>

				<!-- TODO Ajouter les options liées au panier et au système de commandes -->
				<div>
					<h2 class="text-5xl my-4 mb-0 font-bold text-blue-500">{{ article.price.toFixed(2) }} €</h2>

					<!-- Indicateur de stock -->
					<p v-if="article.stock > 0" class="opacity-80">Encore <strong>{{ article.stock }}</strong> produits en stock
					</p>
					<p v-else class="opacity-80 text-red-500">Aucun article restant en stock</p>
				</div>

				<ShopDetail v-if="article.description && article.description.length > 0" name="Description" open>
					<p>{{ article.description }}</p>
				</ShopDetail>
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
		<div v-else class="w-screen h-screen flex items-center justify-center">
			<div
					class="w-[50%] h-[30%] border-2 border-orange-600 rounded-xl p-3 py-5 bg-orange-600 bg-opacity-10 text-center flex flex-col items-center justify-between">
				<h1 class="text-2xl font-bold">Cet article n'existe pas</h1>
				<p class="m-auto text-base">Vous tentez d'accéder à un article qui n'existe pas.</p>

				<router-link :to="`/boutique/${prestataire_name}`"
										 class="mt-auto text-xl underline text-blue-400 font-semibold hover:text-blue-600">Retourner à la
					boutique
				</router-link>
			</div>
		</div>
	</div>
</template>
