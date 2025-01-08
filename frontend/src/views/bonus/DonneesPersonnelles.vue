<template>
	<div class="mt-36">
		<h1 class="font-bold text-3xl text-center">Mentions légales</h1>

		<div class="mx-40">
			<h2 class="text-xl font-bold my-5">1. Introduction</h2>

			<p>La présente politique de confidentialité a pour objet de vous informer sur la manière dont nous collectons,
				utilisons, stockons et protégeons les données personnelles que vous nous fournissez lorsque vous utilisez notre
				site web.</p>

			<h2 class="text-xl font-bold my-5">2. Collecte et utilisation des données</h2>

			<p><strong>Données collectées :</strong> Nous collectons les données personnelles que vous nous fournissez
				volontairement lorsque vous interagissez avec notre site (par exemple, votre nom, votre adresse électronique si
				vous nous contactez). Nous pouvons également collecter des données de navigation grâce à l'utilisation de
				cookies et de technologies similaires.</p>

			<p><strong>Utilisation des données :</strong> Les données collectées sont utilisées pour les finalités suivantes :
			</p>

			<div class="ml-5">
				<p><strong>Fonctionnalité du site :</strong> Assurer le bon fonctionnement de notre site web et vous fournir les
					services que vous demandez.</p>
				<p><strong>Personnalisation :</strong> Améliorer votre expérience utilisateur en mémorisant vos préférences
					(langue, articles dans le panier, etc.).</p>
				<!--				<p><strong>Analyse :</strong> Analyser l'utilisation de notre site web afin d'en améliorer le contenu et les-->
				<!--					fonctionnalités.</p>-->
			</div>

			<h2 class="text-xl font-bold my-5">3. Cookies</h2>

			<p>Nous utilisons des cookies fonctionnels pour améliorer votre expérience de navigation. Ces cookies ne
				collectent aucune donnée personnelle permettant de vous identifier. Vous pouvez à tout moment choisir de
				désactiver les cookies en modifiant les paramètres de votre navigateur. Toutefois, cette action peut affecter
				certaines fonctionnalités du site.</p>

			<h2 class="text-xl font-bold my-5">4. Stockage des données</h2>

			<p>Les données personnelles que nous collectons sont stockées sur des serveurs sécurisés situés au sein de l'Union
				Européenne. Nous conservons vos données personnelles uniquement le temps nécessaire à la réalisation des
				finalités pour lesquelles elles ont été collectées.</p>

			<h2 class="text-xl font-bold my-5">5. Partage des données</h2>

			<p>Nous ne partageons, ne vendons ni ne louons vos données personnelles à des tiers.</p>

			<h2 class="text-xl font-bold my-5">6. Sécurité des données</h2>

			<p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos
				données personnelles contre toute perte, altération, destruction ou accès non autorisé. </p>

			<h2 class="text-xl font-bold my-5">7. Vos droits</h2>

			<p>Conformément à la réglementation en vigueur, vous disposez des droits suivants :</p>

			<div class="ml-5 flex flex-col justify-start gap-3">
				<p><strong>Droit d'accès :</strong> Vous pouvez demander à accéder aux données personnelles que nous détenons à
					votre sujet.</p>
				<p><strong>Droit de rectification :</strong> Vous pouvez demander à rectifier toute donnée personnelle inexacte.
				</p>
				<p><strong>Droit à l'effacement :</strong> Vous pouvez demander à supprimer vos données personnelles, dans
					certaines
					conditions.</p>
				<p><strong>Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données personnelles pour
					certaines
					finalités.</p>
				<p><strong>Droit à la limitation :</strong> Vous pouvez demander à limiter le traitement de vos données
					personnelles.</p>
				<p><strong>Droit à la portabilité :</strong> Vous pouvez demander à recevoir vos données personnelles dans un
					format structuré,
					couramment utilisé et lisible par machine.</p>
			</div>

			<br>
			<p>Pour exercer vos droits, veuillez nous contacter à l'adresse suivante : <a class="underline text-blue-400"
																																										href="mailto:cedric.colin35@gmail.com">cedric.colin35@gmail.com</a>
			</p>

			<h2 class="text-xl font-bold my-5">8. Modifications de la politique de confidentialité</h2>

			<p>Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment. Toute
				modification sera effective dès sa publication sur notre site web. </p>

			<h2 class="text-xl font-bold my-5">9. Contact</h2>

			<p>Pour toute question relative à la présente politique de confidentialité, vous pouvez nous contacter à l'adresse
				suivante : <a class="underline text-blue-400"
											href="mailto:cedric.colin35@gmail.com">cedric.colin35@gmail.com</a></p>

			<hr class="my-10">
			<p>Edité le 8 Janvier 2025 à 16:53 Heure Française</p>
		</div>

		<FooterComponent></FooterComponent>
	</div>
</template>

<script>
import FooterComponent from "@/components/navigation/footer/FooterComponent.vue";

export default {
	name: "DonneesPersonnelles",
	components: {FooterComponent},
}
</script>