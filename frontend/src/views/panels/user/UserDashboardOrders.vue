<template>
	<UserDashboardTemplate>
		<h1 class="text-xl font-bold mb-3">Mes commandes</h1>

		<div class="flex flex-row flex-wrap gap-5 overflow-y-scroll max-h-[95%]">
			<OrderCard v-for="order in orders" :key="order.order_id" :order="order"></OrderCard>
			<p v-if="orders.length < 1">Vous n'avez passé aucune commande.</p>
		</div>
	</UserDashboardTemplate>
</template>

<script>
import UserDashboardTemplate from "@/components/dashboard/user/UserDashboardTemplate.vue";
import OrderCard from "@/components/dashboard/user/shop/OrderCard.vue";
import UsersService from "@/services/users.service";
import {mapState} from "vuex";

export default {
	components: {OrderCard, UserDashboardTemplate},
	computed: {
		...mapState('login', ['loggedInUser'])
	},
	data() {
		return {
			orders: []
		}
	},
	async beforeMount() {
		let res = await UsersService.getUserOrders();
		console.log(res)
		if (!res.error) {
			this.orders = res.data.sort((a, b) => a.date.getUTCMilliseconds() - b.date.getUTCMilliseconds());
		} else {
			console.error(res.data)
		}
	},
}
</script>