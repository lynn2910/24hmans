<template>
	<div class="pt-36 px-28 pb-10 flex flex-row w-screen h-screen">
		<!-- Articles -->
		<div class="w-2/3">
			<div
					class="flex flex-row justify-between items-center py-5 mx-10 ml-5 border-b border-b-white border-opacity-50 ">
				<h1 class="font-bold text-2xl">Votre panier</h1>
				<p class="font-bold text-right my-auto">Prix</p>
			</div>

			<div class="flex flex-col justify-start">
				<CartItem v-for="(item, index) in nonNullItems" :key="index"
									:article="item" :count="item.count"
									@remove="deleteCartItem(item.item_id)"></CartItem>
			</div>
		</div>

		<!-- Résumé -->
		<div class="p-5 rounded bg-emerald-500 bg-opacity-10 border border-gray-500 w-1/3">
			<h2 class="font-bold text-2xl">Résumé</h2>

			{{ cart }}
		</div>
	</div>
</template>

<script>
import CartItem from "@/components/services/shop/cart/CartItem.vue";
import BoutiqueService from "@/services/boutique.service";
import PanierService from "@/services/panier.service";
import {mapGetters, mapState} from "vuex";

export default {
	components: {CartItem},
	data() {
		return {
			cart: {items: []},
			items: [],
		}
	},
	methods: {
		deleteCartItem(item_id) {
			// TODO Ne marche pas, il faut reload... Passer sur un store!
			PanierService.removeItemFromCart(this.userId, item_id)
		}
	},
	computed: {
		...mapState('login', ['loggedInUser', 'userType']),
		...mapGetters('prestataire', ['prestataires']),
		userId() {
			return this.loggedInUser?.user_id || 'guest';
		},
		nonNullItems() {
			return this.items.filter((i) => i)
		}
	},
	async beforeCreate() {
		await this.$store.dispatch('prestataire/getAllPrestataires');

		this.cart = PanierService.getUserCart(this.userId);
		const res = await BoutiqueService.getItemsBulk(this.cart?.items || []);

		if (!res.error) {
			// Add count in the datas
			res.data.forEach(item => {
				console.log(`Item id: ${item?.item_id}`)
				console.log(this.cart.items.map(({origin, count, id}) => ({origin, count, id})))
				const cartItem = this.cart.items.find(({id}) => id === item?.item_id);
				console.log("cartItem: ", cartItem)
				if (item && cartItem) {
					item.count = cartItem.count;
					const presta = this.prestataires.find((prestataire) => prestataire.id === cartItem.origin);
					console.log("origin: ", cartItem.origin)
					console.log(this.prestataires)
					item.prestataire = presta;
				}
			})

			this.items = res.data;
		} else {
			console.error(`Cannot fetch all items in the cart: ${res.data}`)
		}
	}
}
</script>