<template>
	<div class="mt-36">
		<h1 class="font-bold text-3xl text-center mb-10">Mentions légales</h1>

		<div class="mx-10 md:mx-40">
			<h2 class="text-xl font-bold mb-5">Éditeur du site</h2>

			<p>
				Ce site est édité par un groupe d'étudiants de <strong>L'Institut Universitaire Technologique de Nord
				Franche-Comté</strong> dans le cadre d'un projet universitaire.
				<br>
				Les responsables de la publication sont :
			</p>
			<div class="grid grid-cols-2 grid-rows-5 w-40 mt-3 ml-5">
				<p>Cédric</p>
				<p>COLIN</p>

				<p>Marvyn</p>
				<p>LEVIN</p>

				<p>Leslie</p>
				<p>MERAT</p>

				<p>Sugdenaz</p>
				<p>EKICI</p>

				<p>Anna</p>
				<p>GAIFFE</p>
			</div>

			<hr class="my-10">

			<h2 class="text-xl font-bold mb-5">Hébergeur</h2>

			<p><strong>Nom de l'hébergeur :</strong> Cédric COLIN</p>
			<p><strong>Adresse:</strong></p>
			<div class="ml-5">
				<p>19 avenue du Maréchal Juin</p>
				<p>BP 527</p>
				<p>90016 Belfort cedex</p>
			</div>

			<hr class="my-10">

			<h2 class="text-xl font-bold mb-5">Propriété intellectuelle</h2>

			<p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la
				propriété intellectuelle.</p>
			<p>Les images et vidéos présentes sur ce site sont la propriété de leurs auteurs respectifs et sont utilisées dans
				un but strictement informatif et non commercial.</p>
			<p>Les marques citées sur ce site sont la propriété de leurs détenteurs respectifs. Tous les droits de
				reproduction sont réservés, y compris les documents téléchargeables et les représentations iconographiques et
				photographiques.</p>
			<p>La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement
				interdite, sauf autorisation expresse du responsable de la publication.</p>

			<br><br>

			<p>Toute personne souhaitant contester l'utilisation d'une image ou d'une vidéo est priée de contacter le
				responsable de la publication à l'adresse suivante :
				<a class="underline text-blue-400" href="mailto:cedric.colin35@gmail.com">cedric.colin35@gmail.com</a>
			</p>

			<hr class="my-10">

			<h2 class="text-xl font-bold mb-5">Données personnelles</h2>

			<router-link class="underline text-blue-400" :to="{name: 'donnees_personnelles'}">Voir la page</router-link>

			<hr class="my-10">

			<h2 class="text-xl font-bold mb-5">Liens hypertextes</h2>

			<p>Ce site peut contenir des liens hypertextes vers d'autres sites web. Nous ne sommes pas responsables du contenu
				de ces sites et ne pouvons en garantir la disponibilité.</p>

			<hr class="my-10">

			<h2 class="text-xl font-bold mb-5">Avertissement</h2>

			<p>Les informations contenues sur ce site sont fournies à titre indicatif et ne sauraient engager la
				responsabilité des étudiants</p>
			<p>Nous nous efforçons de maintenir ce site à jour, mais ne pouvons garantir l'exactitude, la complétude et
				l'actualité des informations qui y sont diffusées.</p>

			<hr class="my-10">

			<h2 class="text-xl font-bold mb-5">Loi applicable</h2>

			<p>Le présent site est soumis à la loi française. En cas de litige, seuls les tribunaux français seront
				compétents.</p>
		</div>


		<FooterComponent></FooterComponent>
	</div>
</template>

<script>
import FooterComponent from "@/components/navigation/footer/FooterComponent.vue";

export default {
	name: "MentionsLegales",
	components: {FooterComponent}
}
</script>
