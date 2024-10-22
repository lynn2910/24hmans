<template>
	<div class="w-full overflow-x-hidden relative bg-dark">
		<video autoplay muted loop class="w-full h-screen object-cover">
			<source src="@/assets/video/mp4/24HoursofLeMans2023.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video>

		<p class="absolute top-[42%] left-0 right-0 text-center font-semibold italic text-4xl text-white ml-80 mr-80">
			Les 24h du Mans, l’une des courses les plus emblématiques du sport auto
		</p>

		<div class="absolute top-[88%] pb-auto left-0 right-0 rounded-t-3xl h-24 bg-dark"></div>

		<section class="absolute bg-dark text-white p-5 ml-36 mr-36">
			<h1 class="font-bold italic text-4xl text-center m-14">24 Heures du Mans</h1>

			<div class="flex flex-row">
				<img class="max-w-md" src="@/assets/images/presentation1.jpeg">
				<p class="font-normal text-base text-start m-auto ml-6 mr-6 p-5">Bienvenue aux 24 Heures du Mans, la plus
					célèbre course d'endurance automobile au monde ! Depuis 1923, cette compétition emblématique, qui se déroule
					chaque année au mois de juin, attire les meilleurs pilotes, équipes et constructeurs pour 24 heures de défis
					techniques et physiques sur le mythique circuit des 24 Heures. Situé près de la ville du Mans, ce circuit
					unique combine des portions du circuit Bugatti et des routes publiques, offrant un cadre exceptionnel pour une
					épreuve d'endurance à couper le souffle.</p>
			</div>

			<br>
			<div class="flex flex-row m-auto">
				<p class="font-normal text-base text-end m-auto ml-6 mr-6 p-5">Que vous soyez passionné de sport automobile ou
					curieux de vivre une expérience inoubliable, les 24 Heures du Mans sont l'occasion rêvée de découvrir l'une
					des trois courses les plus prestigieuses au monde, aux côtés du Grand Prix de Monaco et des 500 miles
					d'Indianapolis. Préparez-vous à vibrer au rythme des bolides, à partager la passion des fans et à assister à
					un véritable spectacle de vitesse, de stratégie et de performance.</p>
				<img class="max-w-md" src="@/assets/images/presentation2.jpeg">
			</div>

			<h1 class="font-bold italic text-4xl text-center mt-28 m-14">Prestataires</h1>

			<div class="flex flex-row">
				<div class="m-5 w-max">
					<label for="filternom" class="w-20">Rechercher par nom</label>
					<div class="w-96">
						<input
								class="m-auto my-auto h-10 py-1 px-2 bg-dark border-2 border-opacity-50 rounded outline-none focus:border-opacity-100"
								v-model="nameFilter" id="filternom" type="text" placeholder="Aucun mot ajouté.">
					</div>
				</div>
				<div class="m-5 w-max">
					<label for="categorie" class="w-20">Filtrer par catégorie</label>
					<div class="w-96">
						<MultipleSelect
								:items="['Boutique', 'Billeterie', 'Visite des écuries', 'Karting', 'Montgolfière']"
								v-on:selectionChange="updateActiveFilters"
						/>
					</div>
				</div>
				<!--        <div class="m-5">-->
				<!--          <label for="categorie">Filtrer par catégorie</label>-->
				<!--          <select class="text-white ml-3 my-auto h-10 py-1 px-2 bg-dark border-2 border-blue-400 border-opacity-50 rounded outline-none focus:border-opacity-100" v-model="selectedCategory" id="categorie">-->
				<!--            <option value="">Toutes les catégories</option>-->
				<!--            <option value="garages">Garages</option>-->
				<!--            <option value="montgolfieres">Montgolfières</option>-->
				<!--            <option value="karting">Karting</option>-->
				<!--            <option value="billeterie">Billetterie</option>-->
				<!--            <option value="boutiques">Boutiques</option>-->
				<!--          </select>-->
				<!--        </div>-->
			</div>

			<!-- Liste des prestataires -->
			<div v-if="filteredPrestataires.length" class="mt-5 grid grid-cols-1 md:grid-cols-4 gap-6">
				<div v-for="presta in filteredPrestataires" :key="presta.id"
						 class="prestataire-item flex flex-col items-center justify-center text-center p-4 border border-gray-600 rounded shadow-lg">
					<img :src="presta.icon" alt="icon" class="prestataire-icon w-24 h-24 object-cover my-2 rounded-full"/>
					<h2 class="prestataire-name text-xl font-bold mt-3">{{ presta.name }}</h2>
				</div>
			</div>

			<p v-else>Aucun prestataire trouvé</p>


			<h1 class="font-bold italic text-4xl text-center mt-28 m-14">Carte Interactive</h1>

			<div class="w-96">
				<CarteInteractive/>
			</div>
		</section>
	</div>
</template>

<script>
// Importer directement les données
import {prestataires, garages, montgolfieres, karting, billeterie, boutiques} from "@/datasource/prestataires";
import MultipleSelect from "@/components/selects/MultipleSelect.vue";
import CarteInteractive from "@/components/carteInteractive/CarteInteractive.vue";

export default {
	name: 'HomeView',
	components: {MultipleSelect, CarteInteractive},
	data() {
		return {
			nameFilter: '',
			selectedCategories: [], // Utilisé pour stocker les catégories sélectionnées
			prestataires: [], // Stockage des prestataires
		};
	},
	computed: {
		filteredPrestataires() {
			// Filtres appliqués sur les prestataires
			let filtered = this.prestataires;

			// Filtrer par nom
			if (this.nameFilter) {
				filtered = filtered.filter(presta =>
						presta.name.toLowerCase().includes(this.nameFilter.toLowerCase())
				);
			}

			// Filtrer par catégories
			if (this.selectedCategories.length > 0) {
				filtered = filtered.filter(presta => {
					return this.selectedCategories.some(category => {
						switch (category) {
							case 'Boutique':
								return this.isInBoutiques(presta.id);
							case 'Billeterie':
								return this.isInBilleterie(presta.id);
							case 'Visite des écuries':
								return this.isInGarages(presta.id);
							case 'Karting':
								return this.isInKarting(presta.id);
							case 'Montgolfière':
								return this.isInMontgolfieres(presta.id);
							default:
								return false;
						}
					});
				});
			}

			return filtered;
		}
	},
	methods: {
		updateActiveFilters(selected) {
			this.selectedCategories = selected; // Met à jour les catégories sélectionnées
		},
		isInGarages(prestataireId) {
			return garages.some(garage => garage.prestataire_id === prestataireId);
		},
		isInMontgolfieres(prestataireId) {
			return montgolfieres.some(montgolfiere => montgolfiere.prestataire_id === prestataireId);
		},
		isInKarting(prestataireId) {
			return karting.some(kart => kart.prestataire_id === prestataireId);
		},
		isInBilleterie(prestataireId) {
			return billeterie.some(billet => billet.prestataire_id === prestataireId);
		},
		isInBoutiques(prestataireId) {
			return boutiques.some(boutique => boutique.prestataire_id === prestataireId);
		},
		getAllPrestataires() {
			// Charger les prestataires directement depuis les données importées
			this.prestataires = prestataires;
		}
	},
	mounted() {
		this.getAllPrestataires(); // Charger les prestataires au montage du composant
	}
}
</script>