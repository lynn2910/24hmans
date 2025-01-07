<!--

Page de gestion de la carte interactive presta

 -->

<template>
  <PrestataireDashboardTemplate current-page="map" class="h-full w-2/3">
    <div
        class="flex flex-row items-center content-center justify-start gap-5 h-[90%] mt-[2.5%] w-full overflow-y-hidden overflow-x-auto">

      <!--    Carte Interactive vue admin-->
      <div
          class="w-full justify-start gap-4 m-5 mr-0 h-full bg-blue-400 bg-opacity-5 border border-gray-700 rounded-2xl m-0 p-2">
        <CarteInteractivePresta
            width="100%"
            height="100%"
            borderRadius="0px"
            @zoneSelected="updateFormData"
            :categories="categories"
            :get-prestataire="getPrestataire"
        />
      </div>

      <!--    Formulaire de modification d'une zone spécifique-->
      <div
          class="min-w-[400px] w-96 p-4 m-5 ml-0 bg-blue-400 bg-opacity-5 border border-gray-700 gap-4 h-full rounded-2xl">

        <div class="mt-3">
          <label for="name" class="text-xl font-bold">Nom de l'emplacement</label>
          <input type="text" id="name" v-model="formData.name"
                 class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
                 placeholder="Entrez le nom de l'emplacement"/>
          :disabled="isReadonly"
        </div>
        <div class="mt-3">
          <label for="logistics" class="text-sm font-semibold">Logistique</label>
          <div class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm bg-gray-100 opacity-90">
            {{ formData.logistics || 'Aucune logistique' }}
          </div>
        </div>
        <div class="mt-3">
          <label for="surface" class="text-sm font-semibold">Surface (m²)</label>
          <div class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm bg-gray-100 opacity-90">
            {{ formData.surface || 'Aucune surface' }}
          </div>
        </div>
        <div class="mt-3">
          <label for="description" class="text-sm font-semibold">Description</label>
          <textarea rows="2" id="description" v-model="formData.description"
                    class="w-full text-black p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez votre texte ici...">
            :readonly="isReadonly"
          </textarea>
        </div>
        <div class="mt-3">
          <label for="prestataires" class="text-sm font-semibold">Prestataire</label>
          <select
              id="prestataires" v-model="formData.selectedPrestataire"
              class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
              @change="loadServices"
              :disabled="isReadonly"
          >
            <option v-for="prestataire in availablePrestataires" :key="prestataire.id" :value="prestataire.id">
              {{ prestataire.name }}
            </option>
          </select>
        </div>

        <div class="mt-3">
          <label for="category" class="text-sm font-semibold">Catégorie</label>
          <div class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm bg-gray-100 opacity-90">
            {{ categoryNames[formData.category] || 'Aucune catégorie' }}
          </div>
        </div>

        <button id="save-info"
                :disabled="isReadonly"
                class="mt-6 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-xl">
          Enregistrer
        </button>
      </div>
    </div>
  </PrestataireDashboardTemplate>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import PrestataireDashboardTemplate from "@/components/dashboard/prestataire/PrestataireDashboardTemplate.vue";
import CarteInteractivePresta from "@/components/carteInteractive/CarteInteractivePresta.vue";

export default {
  name: 'AdminMapView',
  components: {PrestataireDashboardTemplate, CarteInteractivePresta},

  data() {
    return {
      formData: {
        name: '',
        logistics: '',
        surface: '',
        description: '',
        selectedPrestataire: '',
        selectedService: '',
        category: '', // default
      },
      categories: {
        default: '#848485',
        tribunes: '#e3b424',
        parkingsRouge: '#1417bd',
        parkingsBleu: '#1417bd',
        parkingsVip: '#1417bd',
        garages: '#cd5707',
        pistes: '#0b000b',
        emplacements: '#1b6825',
        montgolfieres: '#67290b',
        boutique: '#bf1102',
      },
      categoryNames: {
        default: 'Default',
        tribunes: 'Tribunes',
        parkingsRouge: 'Parkings Rouge',
        parkingsBleu: 'Parkings Bleu',
        parkingsVip: 'Parkings VIP',
        garages: 'Garages',
        pistes: 'Pistes',
        emplacements: 'Emplacements',
        montgolfieres: 'Montgolfières',
        boutique: 'Boutique',
      },
    }
  },
  computed: {
    ...mapGetters("prestataire", ["prestataires", "getPrestataireServices"]),
    ...mapState('login', ['loggedInUser']),

    isReadonly() {
      return this.formData.selectedPrestataire != null;
    },
    selectedPrestataireServices() {
      return this.getPrestataireServices(this.formData.selectedPrestataire) || [];
    },
    availablePrestataires() {
      console.log("Connexion: ", this.prestataires.filter(p => p.id === this.loggedInUser?.id));
      return this.prestataires.filter(p => p.id === this.loggedInUser?.id);
    },
  },

  watch: {
    'formData.selectedPrestataire'(newPrestataireId) {
      if (newPrestataireId) {
        this.loadServices(newPrestataireId);
      }
    }
  },

  methods: {
    updateFormData(layer) {
      this.formData.name = layer.name || '';
      this.formData.logistics = layer.logistics || '';
      this.formData.surface = layer.surface || '';
      this.formData.description = layer.description || '';
      this.formData.selectedPrestataire = layer.provider || null;
      this.formData.selectedService = layer.service || null;
      this.formData.category = layer.category || 'default';
    },

    loadServices(prestataireId) {
      if (prestataireId) {
        this.$store.dispatch("prestataire/getPrestataireServices", prestataireId);
      } else {
        this.formData.selectedService = null;
      }
    },

    getPrestataire(id) {
      return this.prestataires.find((prestataire) => prestataire.id === id);
    }
  },

  created() {
    this.$store.dispatch("prestataire/getAllPrestataires");
  }
};
</script>
