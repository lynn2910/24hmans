<template>
  <div class="w-full overflow-x-hidden relative bg-dark">
    <video autoplay muted loop class="w-full h-screen object-cover">
      <source src="@/assets/video/mp4/24HoursofLeMans2023.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>

    <div class="absolute top-[35%] left-0 right-0 text-center font-semibold not-italic text-5xl text-white ml-80 mr-80">
      <h1 class="drop-shadow-all-white-700">
        24h du Mans, prenez le départ du plus grand évènement automobile de France
        <br><br><span class="not-italic text-4xl pt-5">11 AU 15 JUIN 2025</span>
      </h1>
    </div>

    <div class="absolute top-[92%] bottom-0 left-0 right-0 rounded-t-3xl h-24 bg-dark"></div>

    <section class="absolute bg-dark text-white">
      <div class="p-5 mx-36">
        <h2 class="font-bold italic text-5xl text-center m-14">24 Heures du Mans</h2>

        <div class="flex flex-row">
          <div class="mx-auto mt-10">
            <img
                ref="presentationImg1"
                class="max-w-md rounded-xl opacity-0 transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-[-3deg]"
                src="@/assets/images/presentation1.jpeg"
                alt="Présentation 1"
            >
          </div>
          <div class="flex flex-col">
            <h3 class="font-extrabold italic text-3xl text-start ml-6 mr-6 p-5 drop-shadow-all-white-700">
              Une course emblématique</h3>
            <p class="font-normal text-2xl text-start m-auto ml-6 mr-6 p-5 pt-0">Bienvenue aux 24 Heures du Mans,
              l'épreuve d'endurance mythique ! Chaque année depuis 1923, les meilleurs pilotes s'affrontent pendant 24
              heures sur un circuit unique combinant tracé Bugatti et routes publiques. Vitesse, stratégie et
              performance au rendez-vous !</p>
          </div>
        </div>

        <div class="flex flex-row m-auto mt-20">
          <div class="flex flex-col">
            <h3 class="font-extrabold italic text-3xl text-end ml-6 mr-6 p-5 drop-shadow-all-white-700">Un circuit
              unique à la Sarthe</h3>
            <p class="font-normal text-2xl text-end m-auto ml-6 mr-6 p-5">Que vous soyez passionné ou curieux, les 24
              Heures du Mans sont une des trois courses les plus prestigieuses avec Monaco et Indianapolis. Vivez la
              passion des fans, la vitesse et la stratégie des bolides en action.</p>
          </div>
          <div class="mx-auto mt-10">
            <img
                ref="presentationImg2"
                class="max-w-md rounded-xl opacity-0 transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-[-3deg]"
                src="@/assets/images/presentation2.jpeg"
                alt="Présentation 2"
            >
          </div>
        </div>

        <h2 class="font-bold italic text-5xl text-center mt-52 m-14">Quelques chiffres</h2>

        <div class="flex flex-row">
          <div class="flex flex-row">
            <img
                ref="chiffresImg"
                class="max-w-md opacity-0 transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-[-3deg]"
                src="@/assets/images/chiffres.png"
                alt="Chiffres"
            >
          </div>
          <div class="flex flex-col">
            <h3 class="font-extrabold italic text-3xl text-start ml-6 mr-6 p-5 drop-shadow-all-white-700">
              Un grand pas</h3>
            <p class="font-normal text-2xl text-start m-auto ml-6 mr-6 p-5 pt-0">Fréquentation record pour le centenaire
              des 24 Heures du Mans 2023 ! Rejoignez des centaines de milliers de passionnés et vivez l’ambiance unique
              de cette course légendaire. Ne manquez pas le prochain rendez-vous et faites partie de l'histoire !</p>
          </div>
        </div>

        <div class="flex flex-row m-auto mt-20">
          <div class="flex flex-col">
            <h3 class="font-extrabold italic text-3xl text-end ml-6 mr-6 p-5 drop-shadow-all-white-700">Et un grand
              merci</h3>
            <p class="font-normal text-2xl text-end m-auto ml-6 mr-6 p-5">Merci à tous les passionnés venus célébrer les
              24 Heures du Mans ! Votre présence et votre enthousiasme font de cet événement une expérience inoubliable.
              Nous avons hâte de vous retrouver pour vibrer ensemble à chaque nouvelle édition !</p>
          </div>
          <div class="mx-auto mt-10">
            <img
                ref="tribuneImg"
                class="max-w-md rounded-xl opacity-0 transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-[-3deg]"
                src="@/assets/images/tribune.jpg"
                alt="Tribune"
            >
          </div>
        </div>

        <h2 class="font-bold italic text-5xl text-center mt-52 m-14">Billeterie</h2>

        <p class="font-normal text-2xl text-center m-auto ml-6 mr-6 mb-10 p-5 pt-0">Découvrez nos <strong>offres de
          billetterie</strong>,
          pour garantir votre place lors de cet événement emblématique. Que vous soyez passionné de sport automobile ou
          simplement curieux de vivre une expérience unique, nos billets vous <strong>donneront accès aux meilleures
            places</strong> et
          services pour profiter pleinement des 24 Heures du Mans.</p>
        <router-link to="/billeterie">
          <div class="mx-auto mt-10 content-center contain-content relative group">
            <!-- L'image avec transition pour l'opacité au hover -->
            <img
                ref="ticketImg"
                class="max-w-md mx-auto rounded-xl opacity-100 transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-[-3deg] group-hover:opacity-50"
                src="@/assets/images/ticket.png"
                alt="Ticket"
            >

            <!-- Texte qui apparaît au survol -->
            <div
                class="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="font-bold text-xl">Lien vers la boutique</span>
            </div>
          </div>
        </router-link>


        <h2 class="font-bold italic text-5xl text-center mt-52 m-14">Prestataires</h2>

        <p class="font-normal text-2xl text-center m-auto ml-6 mr-6 mb-10 p-5 pt-0">Découvrez nos prestataires, qui
          proposent
          une large gamme de services pour enrichir <strong>votre expérience</strong>. Chacun
          d’eux est ravi de partager son savoir-faire et de contribuer à faire de votre événement <strong>un moment
            inoubliable.</strong></p>

        <div class="flex flex-row content-center">
          <div class="m-5 w-max">
            <label for="filternom" class="w-30 text-2xl font-semibold">Rechercher par nom</label>
            <div>
              <input
                  class="min-w-96 m-auto my-auto h-10 py-1 px-2 bg-dark border-2 border-opacity-50 border-blue-400 blue rounded outline-none focus:border-opacity-100"
                  v-model="nameFilter" id="filternom" type="text" placeholder="Aucun mot ajouté.">
            </div>
          </div>
          <div class="m-5 ml-20 w-max">
            <label for="categorie" class="w-30 text-2xl font-semibold">Filtrer par catégorie</label>
            <div class="min-w-96 z-50">
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
          <router-link v-for="presta in filteredPrestataires" :key="presta.id"
                       :to="`/prestataire/${presta.name.toLowerCase().replace(/\W/g, '')}`"
                       class="prestataire-item flex flex-col items-center justify-center text-center p-4 border border-gray-600 rounded shadow-lg
                      transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0px_0px_15px_2px_white]">
            <img :src="presta.icon" alt="icon" class="prestataire-icon w-24 h-24 object-cover my-2 rounded-full"/>
            <h2 class="prestataire-name text-xl font-bold mt-3">{{ presta.name }}</h2>
          </router-link>
        </div>


        <p v-else>Aucun prestataire trouvé</p>

        <!--        <h1 class="font-bold italic text-5xl text-center mt-52 m-14">Services</h1>-->


        <h2 class="font-bold italic text-5xl text-center mt-52 m-14">Carte Interactive</h2>

        <p class="font-normal text-2xl text-center m-auto ml-6 mr-6 mb-10 p-5 pt-0">Retrouvez toutes les informations
          sur l'événement <strong>grâce à notre carte interactive</strong>. Explorez facilement les lieux, services et
          points d'intérêt <strong>pour une expérience optimale</strong> sur place.</p>

        <CarteInteractive width="1000px" height="550px"/>

        <img src="@/assets/images/descriptionServices.png" alt="description carte interactive"/>

      </div>

      <FooterComponent/>
    </section>

  </div>
</template>

<script>
// TODO A changer quand on aura les X.service.js associés
import {billeterie, boutiques, garages, karting, montgolfieres} from "@/datasource/prestataires";
import MultipleSelect from "@/components/selects/MultipleSelect.vue";
import CarteInteractive from "@/components/carteInteractive/CarteInteractive.vue";
import {mapActions, mapGetters} from "vuex";
import store from "@/store";
import FooterComponent from "@/components/navigation/footer/FooterComponent.vue";

export default {
  name: 'HomeView',
  components: {FooterComponent, MultipleSelect, CarteInteractive},
  data() {
    return {
      nameFilter: '',
      selectedCategories: [], // Utilisé pour stocker les catégories sélectionnées
    };
  },
  computed: {
    ...mapGetters("prestataire", ["prestataires"]),
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
  },
  actions: {...mapActions("prestataire", ["getAllPrestataires"]),},
  async beforeMount() {
    await store.dispatch("prestataire/getAllPrestataires");
  },
  mounted() {
    // Crée un observateur d'intersection
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            // Si l'image est visible à l'écran
            if (entry.isIntersecting) {
              entry.target.classList.add('opacity-100', 'scale-105', 'rotate-3');
            } else {
              // Si l'image sort de l'écran, on la réinitialise
              entry.target.classList.remove('opacity-100', 'scale-105', 'rotate-3');
            }
          });
        },
        {threshold: 0.5} // Déclenche l'animation quand 50% de l'image est visible
    );

    // Crée un tableau de références d'images
    const images = ['tribuneImg', 'presentationImg1', 'presentationImg2', 'chiffresImg', 'ticketImg'];

    // Observer chaque image dans le tableau
    images.forEach(refName => {
      const img = this.$refs[refName];
      if (img) {
        observer.observe(img);
      }
    });
  }
}
</script>
