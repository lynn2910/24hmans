<template>
	<Popup title="Vous devez être connecté" @close="$emit('close')">
		<Login hide-home-icon hide-container-decorations
					 no-redirection
					 :omit_logins="[Selected.Admin, Selected.Prestataire]"></Login>
	</Popup>
</template>

<script>
import Popup from "@/components/dashboard/Popup.vue";
import Login from "@/components/dashboard/user/Login.vue";
import {Selected} from "@/utils";

export default {
	name: "LoginPopup",
	data() {
		return {
			Selected
		}
	},
	components: {Login, Popup},
}
</script>