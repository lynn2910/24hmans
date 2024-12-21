<!--

Page de gestion de la carte interactive admin

 -->

<template>
  <AdminDashboardTemplate current-page="map" class="h-full w-2/3">
    <div
        class="flex flex-row items-center content-center justify-start gap-5 h-[90%] mt-[2.5%] w-full overflow-y-hidden overflow-x-auto">
      <!--    Carte Interactive vue admin-->
      <div
          class="w-full justify-start gap-4 m-5 mr-0 h-full bg-blue-400 bg-opacity-5 border border-gray-700 rounded-2xl m-0 p-2">
        <CarteInteractiveAdmin width="100%" height="100%" borderRadius="0px" @zoneSelected="updateFormData"
                               :get-prestataire="getPrestataire"/>
      </div>
      <!--    Formulaire de modification d'une zone spécifique-->
      <div
          class="min-w-[400px] w-96 p-4 m-5 ml-0 bg-blue-400 bg-opacity-5 border border-gray-700 gap-4 h-full rounded-2xl">

        <div class="mt-3">
          <label for="name" class="text-xl font-bold">Nom de l'emplacement</label>
          <input type="text" id="name" v-model="formData.name"
                 class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
                 placeholder="Entrez le nom de l'emplacement"/>
        </div>
        <div class="mt-3">
          <label for="logistics" class="text-sm font-semibold">Logistique</label>
          <input type="text" id="logistics" v-model="formData.logistics"
                 class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
                 placeholder="Entrez la logistique"/>
        </div>
        <div class="mt-3">
          <label for="surface" class="text-sm font-semibold">Surface (m²)</label>
          <input type="number" id="surface" v-model="formData.surface"
                 class="w-full p-1 border rounded-md text-black border-gray-300" placeholder="Entrez la surface en m²"
                 step="1"/>
        </div>
        <div class="mt-3">
          <label for="description" class="text-sm font-semibold">Description</label>
          <textarea rows="5" id="description" v-model="formData.description"
                    class="w-full text-black p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez votre texte ici..."></textarea>
        </div>
        <div class="mt-3">
          <label for="prestataires" class="text-sm font-semibold">Prestataire</label>
          <select
              id="prestataires" v-model="formData.selectedPrestataire"
              class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
              @change="loadServices">
            <option v-for="prestataire in prestataires" :key="prestataire.id" :value="prestataire.id">
              {{ prestataire.name }}
            </option>
          </select>
        </div>
        <div class="mt-3">
          <label for="services" class="text-sm font-semibold">Services disponibles</label>
          <select
              id="services"
              v-model="formData.selectedService"
              class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm">
            <option v-for="(service, index) in selectedPrestataireServices" :key="index"
                    :value="service">
              {{ service }}
            </option>
          </select>

          <button id="save-info"
                  class="mt-6 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-xl">
            Save
          </button>
        </div>
      </div>
    </div>
  </AdminDashboardTemplate>
</template>

<script>
import AdminDashboardTemplate from "@/components/dashboard/admin/AdminDashboardTemplate.vue";
import CarteInteractiveAdmin from "@/components/carteInteractive/CarteInteractiveAdmin.vue";
import {mapGetters} from 'vuex';

export default {
  name: 'AdminMapView',
  components: {AdminDashboardTemplate, CarteInteractiveAdmin},

  data() {
    return {
      formData: {
        name: '',
        logistics: '',
        surface: '',
        description: '',
        selectedPrestataire: '',
        selectedService: '',
      }
    };
  },

  computed: {
    ...mapGetters("prestataire", ["prestataires", "getPrestataireServices"]),

    selectedPrestataireServices() {
      return this.getPrestataireServices(this.formData.selectedPrestataire) || [];
    }
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
