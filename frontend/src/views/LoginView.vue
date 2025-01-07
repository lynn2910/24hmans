<script>
import Login from "@/components/dashboard/user/Login.vue";

export default {
	name: "LoginView",
	components: {Login},
}
</script>

<template>
	<div class="w-screen h-screen">
		<div class="fixed top-0 left-0 bg-login bg-cover bg-bottom w-screen h-screen"></div>

		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-5/6">
			<Login></Login>
		</div>
	</div>
</template>