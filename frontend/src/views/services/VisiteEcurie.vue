<template>
	<div class="tirage-au-sort text-white">

		<!-- Titre de la page -->
		<h1>Tirage au sort</h1>

		<!-- Section des règles -->
		<section class="regles">
			<h2>Règles pour participer au tirage au sort</h2>
			<ul>
				<li>Le participant doit être majeur pour participer.</li>
				<li>Un seul billet par participant.</li>
				<li>Les informations fournies doivent être exactes et vérifiables.</li>
				<li>La participation au tirage au sort est ouverte jusqu'au <strong>25 juin 2025</strong>.</li>
				<li>Les gagnants seront informés par mail le <strong>26 juin 2025</strong></li>
			</ul>
		</section>

		<!-- Formulaire d'inscription -->
		<section class="inscription">
			<h2>Inscription au tirage au sort</h2>
			<form @submit.prevent="inscrire">
				<div>
					<label for="nom">Nom :</label>
					<input type="text" id="nom" v-model="form.nom" required class="text-black"/>
				</div>

				<div>
					<label for="prenom">Prénom :</label>
					<input type="text" id="prenom" v-model="form.prenom" required class="text-black"/>
				</div>

				<div>
					<label for="email">E-mail :</label>
					<input type="email" id="email" v-model="form.email" required class="text-black"/>
				</div>

				<div>
					<label for="billet">Numéro de billet :</label>
					<input type="text" id="billet" v-model="form.billet" required class="text-black"/>
				</div>

				<button type="submit">S'inscrire</button>
			</form>
		</section>

		<!-- Confirmation de participation -->
		<section v-if="messageConfirmation">
			<h2>Confirmation</h2>
			<p>{{ messageConfirmation }}</p>
		</section>

		<!-- Notification des gagnants par mail -->
	</div>
</template>!nb

<script>
//test
import PrestataireService from "@/services/prestataire.service";

export default {
	components: {},
	data() {
		return {
			form: {
				nom: '',
				prenom: '',
				email: '',
				billet: ''
			},
			messageConfirmation: ''
		};
	},
	async beforeMount() {
		let res = await PrestataireService.getPrestataireFromName(this.$route.params['prestataire_name']);
		if (!res.error){
			this.prestataire = res.data;
		} else {
			console.error(`Cannot get prestataire: ${res.data}`)
		}
	},
	methods: {
		inscrire() {
			// Simule l'envoi des données et la confirmation par mail
			this.messageConfirmation = `Merci, ${this.form.prenom} ${this.form.nom}, pour votre inscription !
       Un e-mail de confirmation a été envoyé à ${this.form.email}.`;

			// Réinitialiser le formulaire après l'inscription
			this.form.nom = '';
			this.form.prenom = '';
			this.form.email = '';
			this.form.billet = '';
		}
	}
};
</script>

<style scoped>
.tirage-au-sort {
	margin-top: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

form {
	margin-top: 20px;
	text-align: left;
	width: 300px;
}

h1, h2 {
	font-size: 32px;
	text-align: center;
}

.regles ul {
	list-style-type: disc;
	margin-left: 20px;
	font-size: 18px;
}

form div {
	margin-bottom: 10px;
}

label {
	display: inline-block;
	width: 100px;
}

input {
	padding: 5px;
	font-size: 16px;
}

button {
	display: block;
	margin: 20px auto;
	background-color: #0D64FF;
	color: white;
	border: none;
	padding: 10px 20px;
	cursor: pointer;
}

button:hover {
	background-color: #07327F;
}
</style>
