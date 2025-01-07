<template>
	<UserDashboardTemplate>
		<h1 class="text-xl font-bold mb-3">Mes commandes</h1>

		<div class="flex flex-row flex-wrap gap-5">
			<OrderCard v-for="order in orders" :key="order.order_id" :order="order"></OrderCard>
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
		let res = await UsersService.getUserOrders(this.loggedInUser.user_id);
		if (!res.error) {
			this.orders = res.data;
		} else {
			console.error(res.data)
		}
	},
}
</script>