<template>
	<div class="pt-36 px-28 pb-10 flex flex-row w-screen h-screen">
		<!-- Articles -->
		<div class="w-1/2">
			<div
					class="flex flex-row justify-between items-center py-5 ml-5 mr-5 border-b border-b-white border-opacity-50 ">
				<h1 class="font-bold text-2xl">Votre panier</h1>
				<p class="font-bold text-right my-auto mr-5">Prix</p>
			</div>

			<div class="flex flex-col justify-start h-[90%] overflow-y-auto">

				<CartItem v-for="(item, index) in nonNullItems" :key="index"
									:article="item" :count="item.count"
									@decrease="decreaseItem(item.item_id)"
									@increase="increaseItem(item.item_id)"
									@remove="deleteCartItem(item.item_id)"></CartItem>
			</div>
		</div>

		<!-- Résumé -->
		<div class="p-5 rounded bg-emerald-500 bg-opacity-10 border border-gray-500 w-1/2 flex flex-col justify-start">
			<div class="grid grid-cols-3">
				<div>
					<h2 class="font-bold text-2xl mb-5">Résumé</h2>
					<p class="text-2xl font-bold">Total: <span class="text-blue-500">{{ totalPrice.toFixed(2) }}€</span><span
							class="text-sm ml-1">TTC</span></p>

					<p class="italic col-span-2 mt-5 text-gray-400">
						Le système de rentrée des informations bancaires est factice. Aucune information n'est traitée, ni
						enregistrée.
					</p>
				</div>

				<div class="col-span-2">
					<PaymentInformations></PaymentInformations>
				</div>
			</div>

			<div class="flex flex-row items-center mt-auto gap-3">
				<div class="bg-gray-500 hover:bg-red-500 cursor-pointer p-2 rounded-xl" @click="clearUserCart">
					<svg class="fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
							 viewBox="0 0 24 24">
						<path
								d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
					</svg>
				</div>

				<button @click="buildNewOrder" class="py-2 px-3 rounded-xl bg-blue-500 hover:bg-blue-600 w-4/5">Payer</button>
			</div>
		</div>

		<LoginPopup v-if="!loggedInUser && showLoginPopup" @close="showLoginPopup = false"></LoginPopup>
	</div>
</template>

<script>
import CartItem from "@/components/services/shop/cart/CartItem.vue";
import {mapActions, mapGetters, mapState} from "vuex";
import UsersService from "@/services/users.service";
import LoginPopup from "@/components/dashboard/LoginPopup.vue";
import PaymentInformations from "@/components/PaymentInformations.vue";

export default {
	components: {PaymentInformations, LoginPopup, CartItem},
	data() {
		return {
			cart: {items: []},
			showLoginPopup: false
		}
	},
	methods: {
		...mapActions('prestataire/boutique', ['getCarts', 'removeItemFromCart', 'getAllItemsInShop', 'setItemCount', 'clearCart']),
		deleteCartItem(item_id) {
			console.log(`Deleting ${item_id}`)
			this.removeItemFromCart({user_id: this.userId, item_id})
		},
		decreaseItem(item_id) {
			const item = this.myCart.items.find(i => i.id === item_id);

			if (item.count > 1) {
				this.setItemCount({user_id: this.userId, item_id, count: item.count - 1});
			} else {
				this.deleteCartItem(item_id)
			}
		},
		increaseItem(item_id) {
			const item = this.myCart.items.find(i => i.id === item_id);
			if (!item) return console.error(`Cannot find the item '${item_id}' in the cart of '${this.userId}'`);

			const shopItem = this.allShopItems.find((it) => it.item_id === item.id && it.prestataire_id === item.origin);
			if (!shopItem) return console.error(`Cannot find the item '${item_id}' in the shop`);

			if (shopItem.stock >= item.count + 1)
				this.setItemCount({user_id: this.userId, item_id, count: item.count + 1});
		},
		clearUserCart() {
			let id = this.loggedInUser?.id || 'guest';
			this.clearCart(id);
		},
		async buildNewOrder() {
			if (!this.loggedInUser) {
				this.showLoginPopup = true;
				return;
			}

			let items = this.cart.items;
			let articles = items.map(({id, count}) => ({article_id: id, amount: count}));

			const preparation = {
				user_id: this.loggedInUser.id,
				date: new Date(),
				articles,
			};

			this.clearUserCart();
			this.cart.items = []
			
			let res = await UsersService.newOrder(preparation);
			if (!res.error) {
				await this.$router.push({name: 'client_panel_orders', query: {order_id: res.data.order_id}});
			}
		}
	},
	computed: {
		...mapState('login', ['loggedInUser', 'userType']),
		...mapGetters('prestataire', ['prestataires']),
		...mapGetters("prestataire/boutique", ['getCart']),
		...mapState('prestataire/boutique', ['allShopItems']),
		userId() {
			return this.loggedInUser?.user_id || 'guest';
		},
		myCart() {
			return this.getCart(this.userId);
		},
		nonNullItems() {
			return this.myCart.items.filter((i) => i).map((i) => {
				const item = this.allShopItems.find((it) => it.item_id === i.id && it.prestataire_id === i.origin);

				if (item) return {...item, ...i}
				else return {...i, name: "Unknown"}
			})
		},
		totalPrice() {
			return this.nonNullItems.reduce((a, b) => a + (b.price * b.count), 0)
		}
	},
	async beforeCreate() {
		await this.$store.dispatch('prestataire/getAllPrestataires');
		await this.getCarts();

		this.cart = this.getCart(this.userId);
		await this.getAllItemsInShop();
		// if (!res.error) {
		// 	console.log(res.data)
		// 	// Add count in the datas
		// } else {
		// 	console.error(`Cannot fetch all items in the cart: ${res.data}`)
		// }
	},
	watch: {
		loggedInUser(newUser) {
			if (newUser && this.showLoginPopup) {
				this.showLoginPopup = false;
				this.buildNewOrder();
			}
		}
	}
}
</script>