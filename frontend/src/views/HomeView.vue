<template>
  <div>
    <div class="w-full overflow-x-hidden relative bg-dark">
      <video autoplay muted loop class="w-full h-screen object-cover">
        <source src="@/assets/video/mp4/24HoursofLeMans2023.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>

      <div
          class="absolute top-[35%] left-0 right-0 text-center font-semibold not-italic text-5xl text-white ml-80 mr-80">
        <h1 class="drop-shadow-all-white-700">
          {{ $t('home.title') }}
          <br><br><span class="not-italic text-4xl pt-5">{{ $t('home.dates') }}</span>
        </h1>

        <div class="mt-8 mx-auto w-fit bg-opacity-50 p-4 rounded-lg text-white text-xl z-20">
          <div class="flex flex-col items-center">
            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <span class="text-3xl font-bold mb-1 drop-shadow-all-white-700">{{ timeLeft.days }}</span>
                <span class="text-sm opacity-80 drop-shadow-all-white-700">{{ $t('home.countdown.days') }}</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="text-3xl font-bold mb-1 drop-shadow-all-white-700">{{
                    String(timeLeft.hours).padStart(2, '0')
                  }}</span>
                <span class="text-sm opacity-80 drop-shadow-all-white-700">{{ $t('home.countdown.hours') }}</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="text-3xl font-bold mb-1 drop-shadow-all-white-700">{{
                    String(timeLeft.minutes).padStart(2, '0')
                  }}</span>
                <span class="text-sm opacity-80 drop-shadow-all-white-700">{{ $t('home.countdown.minutes') }}</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="text-3xl font-bold mb-1 drop-shadow-all-white-700">{{
                    String(timeLeft.seconds).padStart(2, '0')
                  }}</span>
                <span class="text-sm opacity-80 drop-shadow-all-white-700">{{ $t('home.countdown.seconds') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img src="../assets/images/monument_prefere_francais.png" alt="Monument préféré des français"
           class="w-72 h-auto absolute top-[65%] left-10 z-10 drop-shadow-all-white-700" loading="lazy">

      <div class="absolute top-[92%] bottom-0 left-0 right-0 rounded-t-3xl h-lvh bg-dark"></div>

      <section class="absolute bg-dark text-white">
        <div class="p-5 mx-36">
          <h2 class="font-bold italic text-5xl text-center m-14">{{ $t('name') }}</h2>

          <div class="flex flex-row">
            <div class="mx-auto mt-10">
              <img
                  ref="presentationImg1"
                  class="max-w-md rounded-xl opacity-0 transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-[-3deg]"
                  src="@/assets/images/presentation1.jpeg"
                  loading="lazy"
                  alt="Présentation 1"
              >
            </div>
            <div class="flex flex-col">
              <h3 class="font-extrabold italic text-3xl text-start ml-6 mr-6 p-5 drop-shadow-all-white-700">
                {{ $t('home.tondeuse.h1') }}
              </h3>
              <p class="font-normal text-2xl text-start m-auto ml-6 mr-6 p-5 pt-0">
                {{ $t('home.tondeuse.p1') }}
              </p>
            </div>
          </div>

          <div class="flex flex-row m-auto mt-20">
            <div class="flex flex-col">
              <h3 class="font-extrabold italic text-3xl text-end ml-6 mr-6 p-5 drop-shadow-all-white-700">
                {{ $t('home.tondeuse.h2') }}
              </h3>
              <p class="font-normal text-2xl text-end m-auto ml-6 mr-6 p-5">
                {{ $t('home.tondeuse.p2') }}
              </p>
            </div>
            <div class="mx-auto mt-10">
              <img
                  ref="presentationImg2"
                  class="max-w-md rounded-xl opacity-0 transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-[-3deg]"
                  src="@/assets/images/presentation2.jpeg"
                  alt="Présentation 2"
                  loading="lazy"
              >
            </div>
          </div>

          <h2 class="font-bold italic text-5xl text-center mt-52 m-14">{{ $t('home.numbers.title') }}</h2>

          <div class="flex flex-row">
            <div class="flex flex-row">
              <img
                  ref="chiffresImg"
                  class="max-w-md opacity-0 transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-[-3deg]"
                  src="@/assets/images/chiffres.png"
                  alt="Chiffres"
                  loading="lazy"
              >
            </div>
            <div class="flex flex-col">
              <h3 class="font-extrabold italic text-3xl text-start ml-6 mr-6 p-5 drop-shadow-all-white-700">
                {{ $t('home.numbers.h1') }}
              </h3>
              <p class="font-normal text-2xl text-start m-auto ml-6 mr-6 p-5 pt-0">
                {{ $t('home.numbers.p1') }}
              </p>
            </div>
          </div>

          <div class="flex flex-row m-auto mt-20">
            <div class="flex flex-col">
              <h3 class="font-extrabold italic text-3xl text-end ml-6 mr-6 p-5 drop-shadow-all-white-700">
                {{ $t('home.thanks.title') }}
              </h3>
              <p class="font-normal text-2xl text-end m-auto ml-6 mr-6 p-5">
                {{ $t("home.thanks.p") }}
              </p>
            </div>
            <div class="mx-auto mt-10">
              <img
                  ref="tribuneImg"
                  class="max-w-md rounded-xl opacity-0 transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-[-3deg]"
                  src="@/assets/images/tribune.jpg"
                  alt="Tribune"
                  loading="lazy"
              >
            </div>
          </div>

          <h2 class="font-bold italic text-5xl text-center mt-52 m-14">{{ $t('navbar.billetteries') }}</h2>

          <p class="font-normal text-2xl text-center m-auto ml-6 mr-6 mb-10 p-5 pt-0" v-html="$t('home.services')">
          </p>
          <router-link :to="{ name: 'billetterie', params: {prestataire_name: '24hdumans'}}">
            <div class="mx-auto mt-10 content-center contain-content relative group">
              <!-- L'image avec transition pour l'opacité au hover -->
              <img
                  ref="ticketImg"
                  class="max-w-md mx-auto rounded-xl opacity-100 transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-[-3deg] group-hover:opacity-50"
                  src="@/assets/images/ticket.png"
                  alt="Ticket"
                  loading="lazy"
              >

              <!-- Texte qui apparaît au survol -->
              <div
                  class="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 ">
                <span class="font-bold text-xl">{{ $t('home.link_to_billetterie') }}</span>
              </div>
            </div>
          </router-link>

          <h2 class="font-bold italic text-5xl text-center mt-52 m-14" v-html="$t('navbar.prestataires')"></h2>

          <div ref="service_tag" id="service"></div>

          <p class="font-normal text-2xl text-center m-auto ml-6 mr-6 mb-10 p-5 pt-0"
             v-html="$t('home.prestataires.discover')"></p>

          <div class="flex flex-row content-center">
            <div class="m-5 w-max">
              <label for="filternom"
                     class="w-30 text-2xl font-semibold">{{ $t('home.prestataires.search_by_name') }}</label>
              <div>
                <input
                    class="min-w-96 m-auto my-auto h-10 py-1 px-2 bg-dark border-2 border-opacity-50 border-blue-400 blue rounded outline-none focus:border-opacity-100"
                    v-model="nameFilter" id="filternom" type="text" :placeholder="$t('home.prestataires.name_search')">
              </div>
            </div>

            <div class="m-5 ml-20 w-max">
              <label for="categorie" class="w-30 text-2xl font-semibold">
                {{ $t('home.prestataires.filter_by_ctg') }}
              </label>

              <div class="min-w-96 z-50">
                <MultipleSelect
                    :items="['Boutique', 'Billetterie', 'Visite des écuries', 'Karting', 'Montgolfière']"
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
                         :to="{name:'prestataire_profile', params:{prestataire_name: presta.referencer}}"
                         class="prestataire-item flex flex-col items-center justify-center text-center p-4 border border-gray-600 rounded shadow-lg
                        transition-all duration-700 ease-in-out transform hover:scale-105 hover:shadow-[0px_0px_15px_2px_white]">
              <img :src="presta.icon" alt="icon" loading="lazy"
                   class="prestataire-icon w-24 h-24 object-cover my-2 rounded-full"/>
              <h2 class="prestataire-name text-xl font-bold mt-3">{{ presta.name }}</h2>
            </router-link>
          </div>


          <p v-else>{{ $t('home.prestataires.no_prestataires') }}</p>

          <!--        <h1 class="font-bold italic text-5xl text-center mt-52 m-14">Services</h1>-->


          <h2 class="font-bold italic text-5xl text-center mt-52 m-14">{{ $t('home.map.title') }}</h2>

          <p class="font-normal text-2xl text-center m-auto ml-6 mr-6 mb-10 p-5 pt-0" v-html="$t('home.map.text')"></p>

          <CarteInteractivePublic width="1000px" height="550px" borderRadius="16px"/>

          <div class="flex justify-center items-center">
            <img class="flex" src="@/assets/images/descriptionServices.png" alt="description carte interactive"
                 loading="lazy"/>
          </div>

        </div>

        <FooterComponent/>
      </section>

    </div>
  </div>
</template>

<script>
import MultipleSelect from "@/components/selects/MultipleSelect.vue";
import {mapActions, mapGetters} from "vuex";
import store from "@/store";
import FooterComponent from "@/components/navigation/footer/FooterComponent.vue";
import CarteInteractivePublic from "@/components/carteInteractive/CarteInteractivePublic.vue";
import PrestataireService from "@/services/prestataire.service";

export default {
  name: 'HomeView',
  components: {FooterComponent, MultipleSelect, CarteInteractivePublic},
  data() {
    return {
      timeLeft: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      targetDate: new Date('2025-06-10T22:00:00Z'),
      timerInterval: null,
      nameFilter: '',
      selectedCategories: [],
      servicesPerPrestataire: {}
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
    updateTimer() {
      const now = Date.now();
      const difference = this.targetDate - now;

      if (difference <= 0) {
        this.timeLeft = {days: 0, hours: 0, minutes: 0, seconds: 0};
        return;
      }

      this.timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      this.timeLeft.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.timeLeft.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      this.timeLeft.seconds = Math.floor((difference % (1000 * 60)) / 1000);
    },

    updateActiveFilters(selected) {
      this.selectedCategories = selected;
    },
    isInGarages(prestataireId) {
      return this.servicesPerPrestataire[prestataireId]
          && this.servicesPerPrestataire[prestataireId]?.includes('ecuries') || false;
      // return garages.some(garage => garage.prestataire_id === prestataireId);
    },
    isInMontgolfieres(prestataireId) {
      return this.servicesPerPrestataire[prestataireId]
          && this.servicesPerPrestataire[prestataireId]?.includes('montgolfiere') || false;
      // return montgolfieres.some(montgolfiere => montgolfiere.prestataire_id === prestataireId);
    },
    isInKarting(prestataireId) {
      return this.servicesPerPrestataire[prestataireId]
          && this.servicesPerPrestataire[prestataireId]?.includes('karting') || false;
      // return karting.some(kart => kart.prestataire_id === prestataireId);
    },
    isInBilleterie(prestataireId) {
      return this.servicesPerPrestataire[prestataireId]
          && this.servicesPerPrestataire[prestataireId]?.includes('billetterie') || false;
      // return billetteries.some(billet => billet.prestataire_id === prestataireId);
    },
    isInBoutiques(prestataireId) {
      return this.servicesPerPrestataire[prestataireId]
          && this.servicesPerPrestataire[prestataireId]?.includes('boutique') || false;
      // return boutiques.some(boutique => boutique.prestataire_id === prestataireId);
    },
  },
  actions: {
    ...mapActions("prestataire", ["getAllPrestataires"]),
  },
  async beforeMount() {
    await store.dispatch("prestataire/getAllPrestataires");
    this.prestataires.forEach(p => this.servicesPerPrestataire[p.id] = []);

    const fetchActions = this.prestataires.map(async ({id}) => {
      this.servicesPerPrestataire[id] = (await PrestataireService.getPrestataireServices(id)).data || [];
    })
    await Promise.all(fetchActions)
  },
  mounted() {
    this.updateTimer();
    this.timerInterval = setInterval(this.updateTimer, 1000);
    this.$nextTick(() => {
      console.log(this.$route.hash)
      if (this.$route.hash === '#services') {
        console.log("Scrolling to #services");
        if (this.$refs.service_tag) {
          this.$refs.service_tag.scrollIntoView({
            behavior: 'smooth',
            top: 0
          });
        } else {
          console.error("Element with ref 'service_tag' not found.");
        }
      }
    });

    // Permet de gérer les animéations des images
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('opacity-100', 'scale-105', 'rotate-3');
            } else {
              entry.target.classList.remove('opacity-100', 'scale-105', 'rotate-3');
            }
          });
        },
        {threshold: 0.5} // Déclenche l'animation quand 50% de l'image est visible
    );

    const images = ['tribuneImg', 'presentationImg1', 'presentationImg2', 'chiffresImg', 'ticketImg'];

    // Observer chaque image dans le tableau
    images.forEach(refName => {
      const img = this.$refs[refName];
      if (img) {
        observer.observe(img);
      }
    });
  },

  beforeDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
</script>
