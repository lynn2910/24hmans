<template>
	<PrestataireDashboardTemplate current-page="profil">
		<PrestataireEditPage v-if="loggedInUser && prestataire" :prestataire="prestataire || {}"></PrestataireEditPage>
	</PrestataireDashboardTemplate>
</template>

<script>
import PrestataireDashboardTemplate from "@/components/dashboard/prestataire/PrestataireDashboardTemplate.vue";
import PrestataireEditPage from "@/components/dashboard/PrestataireEditPage.vue";
import {mapState} from "vuex";
import PrestataireService from "@/services/prestataire.service";

export default {
	name: "PrestataireEdit",
	components: {PrestataireDashboardTemplate, PrestataireEditPage},
	computed: {
		...mapState('login', ['loggedInUser']),
		...mapState('prestataire', ['prestataires'])
	},
	data() {
		return {
			prestataire: null
		}
	},
	methods: {},
	async mounted() {
		const presta = await PrestataireService.getPrestataire(this.loggedInUser.id);
		if (!presta.error) {
			this.prestataire = presta.data;
		}
		await PrestataireEditPage.methods.setDescription(this.loggedInUser.description || '');
	},
	watch: {
		loggedInUser(newValue) {
			this.prestataire = newValue;
		},
		prestataires(newValue) {
			let myPresta = newValue.find(p => p.id === this.prestataire.id);
			if (myPresta) {
				this.prestataire = myPresta;
			}
		}
	}
}
</script>