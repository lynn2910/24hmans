<script>

import {defineComponent} from "vue";
import UserDashboardTemplate from "@/components/dashboard/user/UserDashboardTemplate.vue";
import {mapState} from "vuex";

export default defineComponent({
	components: {UserDashboardTemplate},
	computed: {
		...mapState('login', ['loggedInUser'])
	}
})
</script>

<template>
	<UserDashboardTemplate>
		<p>Bonjour {{ loggedInUser?.name }}</p>
	</UserDashboardTemplate>
</template>
