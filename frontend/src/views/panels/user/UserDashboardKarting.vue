<template>
	<UserDashboardTemplate>
		<h1 class="text-xl font-bold mb-3">Mes courses</h1>

	</UserDashboardTemplate>
</template>

<script>
import UserDashboardTemplate from "@/components/dashboard/user/UserDashboardTemplate.vue";
import UsersService from "@/services/users.service";
import {mapState} from "vuex";

export default {
	components: {UserDashboardTemplate},
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
		if (!res.error) {
			this.orders = res.data.sort((a, b) => a.date.getUTCMilliseconds() - b.date.getUTCMilliseconds());
		} else {
			console.error(res.data)
		}
	},
}
</script>