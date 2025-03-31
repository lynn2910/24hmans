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
		<p>{{ $t('dashboards.client.hello') }}
			<strong>{{ loggedInUser?.first_name }}</strong>
			{{ loggedInUser?.last_name?.toUpperCase() }}
		</p>
	</UserDashboardTemplate>
</template>
