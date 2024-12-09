<template>
	<div class="pt-36 px-28 pb-10 flex flex-row w-screen h-screen">
		<!-- Articles -->
		<div class="w-2/3">
			<div
					class="flex flex-row justify-between items-center py-5 mx-10 ml-5 border-b border-b-white border-opacity-50 ">
				<h1 class="font-bold text-2xl">Votre panier</h1>
				<p class="font-bold text-right my-auto">Prix</p>
			</div>

			<div class="flex flex-col justify-start h-full overflow-y-auto">
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
import {mapActions, mapGetters, mapState} from "vuex";

export default {
	components: {CartItem},
	data() {
		return {
			cart: {items: []},
		}
	},
	methods: {
		...mapActions('prestataire/boutique', ['getCarts', 'removeItemFromCart', 'getAllItemsInShop']),
		deleteCartItem(item_id) {
			console.log(`Deleting ${item_id}`)
			this.removeItemFromCart({user_id: this.userId, item_id})
		},
	},
	computed: {
		...mapState('login', ['loggedInUser', 'userType']),
		...mapGetters('prestataire', ['prestataires']),
		...mapGetters("prestataire/boutique", ['getCart']),
		...mapState('prestataire/boutique', ['allShopItems']),
		userId() {
			return this.loggedInUser?.user_id || 'guest';
		},
		nonNullItems() {
			console.log(JSON.stringify(this.allShopItems, null, 2))
			return this.getCart(this.userId).items.filter((i) => i).map((i) => {
				console.log(JSON.stringify(i));
				const item = this.allShopItems.find((it) => it.item_id === i.id && it.prestataire.id === i.origin);
				console.log(item)
				if (item) return {...item, ...i}
				else return {...i, name: "Unknown"}
			})
		}
	},
	async beforeCreate() {
		await this.$store.dispatch('prestataire/getAllPrestataires');
		await this.getCarts();

		this.cart = this.getCart(this.userId);
		console.log("cart: ", this.cart)

		await this.getAllItemsInShop();
		// if (!res.error) {
		// 	console.log(res.data)
		// 	// Add count in the datas
		// } else {
		// 	console.error(`Cannot fetch all items in the cart: ${res.data}`)
		// }
	}
}
</script>