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
                 placeholder="Entrez le nom de l'emplacement"
                 :disabled="isReadonly"
                 :class="{'bg-gray-100 opacity-70': isReadonly}"
          />
        </div>
        <div class="mt-3">
          <label for="logistics" class="text-sm font-semibold">Logistique</label>
          <input type="text" id="logistics" v-model="formData.logistics"
                 class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
                 placeholder="Entrez la logistique"
                 :disabled="forceReadonly"
                 :class="{'bg-gray-100 opacity-70': forceReadonly}"
          />
        </div>
        <div class="mt-3">
          <label for="surface" class="text-sm font-semibold">Surface (m²)</label>
          <input type="number" id="surface" v-model="formData.surface"
                 class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
                 placeholder="Entrez la surface en m²"
                 step="1"
                 :disabled="forceReadonly"
                 :class="{'bg-gray-100 opacity-70': forceReadonly}"
          />
        </div>
        <div class="mt-3">
          <label for="description" class="text-sm font-semibold">Description</label>
          <textarea rows="2" id="description" v-model="formData.description"
                    class="w-full text-black p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez votre texte ici..."
                    :readonly="isReadonly"
                    :class="{'bg-gray-100 opacity-70': isReadonly}"
          >
          </textarea>
        </div>
        <div class="mt-3">
          <label for="prestataires" class="text-sm font-semibold">Prestataire</label>
          <select
              id="prestataires" v-model="formData.provider"
              class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
              @change="loadServices($event.target.value)"
              :disabled="isReadonly"
              :class="{'bg-gray-100 opacity-70': isReadonly}"
          >

            <option v-if="isReadonly" :value="formData.provider">
              {{ getPrestataire(formData.selectedPrestataire)?.name }}
            </option>

            <template v-if="!isReadonly">
              <option v-for="prestataire in availablePrestataires" :key="prestataire.id" :value="prestataire.id">
                {{ prestataire.name }}
              </option>
            </template>
          </select>
        </div>

        <div class="mt-3">
          <label for="services" class="text-sm font-semibold">Services disponibles</label>
          <select
              id="services"
              v-model="formData.service"
              class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
              :disabled="isReadonly"
              :class="{'bg-gray-100 opacity-70': isReadonly}"
          >
            <option v-for="(service, index) in selectedPrestataireServices" :key="index"
                    :value="service">
              {{ service }}
            </option>
          </select>
        </div>

        <div class="mt-3">
          <label for="category" class="text-sm font-semibold">Catégorie</label>
          <select
              id="category"
              v-model="formData.category"
              class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
              :disabled="forceReadonly"
              :class="{'bg-gray-100 opacity-70': isReadonly}"
          >
            <option
                v-for="(color, index) in categories"
                :key="index"
                :value="index">
              {{ categoryNames[index] }}
            </option>
          </select>
        </div>

        <button @click="saveUpdatedInfos"
                :disabled="isReadonly"
                :class="isReadonly? 'bg-gray-500 cursor-not-allowed': 'bg-blue-500 hover:bg-blue-600 cursor-pointer'"
                class="mt-6 px-3 py-2 text-white rounded-md focus:outline-none text-xl"
        >
          Enregistrer
        </button>
        <button @click="deleteInfosPresta"
                :disabled="isReadonly"
                :class="isReadonly? 'bg-gray-500 cursor-not-allowed': 'bg-red-600 hover:bg-red-700'"
                class="ml-4 mt-6 px-3 py-2 text-white rounded-md focus:outline-none text-xl"
        >
          Libérer
        </button>
      </div>
    </div>
  </PrestataireDashboardTemplate>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';
import PrestataireDashboardTemplate from "@/components/dashboard/prestataire/PrestataireDashboardTemplate.vue";
import CarteInteractivePresta from "@/components/carteInteractive/CarteInteractivePresta.vue";

export default {
  name: 'AdminMapView',
  components: {PrestataireDashboardTemplate, CarteInteractivePresta},

  data() {
    return {
      isReadonly: true,
      forceReadonly: true,
      formData: {
        name: '',
        logistics: '',
        surface: '',
        description: '',
        provider: '',
        service: '',
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
    ...mapGetters("prestataire", ["prestataires", "prestataireServices"]),
    ...mapState('login', ['loggedInUser']),

    selectedPrestataireServices() {
      return this.prestataireServices(this.formData.provider) || [];
    },

    availablePrestataires() {
      return this.prestataires.filter(p => p.id === this.loggedInUser?.id);
    },
  },

  watch: {
    'formData.provider'(newPrestataireId) {
      if (newPrestataireId !== null) {
        this.loadServices(newPrestataireId);
      }
    },

    "$store.state.shapes.shapesData": {
      handler(newShapes) {
        console.log("Mise à jour :", newShapes);
        this.getShapes();
        this.refresh();
      },
      deep: true,
      // immediate: true,
    }
  },

  methods: {
    ...mapActions("prestataire", ["getAllPrestataires", "getPrestataireServices"]),
    ...mapActions("shapes", ["updateShape", "deleteInfosPost"]),

    updateFormData(layer) {
      this.formData.shape_id = layer.shape_id || -1;
      this.formData.coordinates = layer.coordinates;
      this.formData.iconUrl = layer.iconUrl ? layer.iconUrl : '';
      this.formData.name = layer.name || '';
      this.formData.logistics = layer.logistics || '';
      this.formData.surface = layer.surface || '';
      this.formData.description = layer.description || '';
      this.formData.provider = layer.provider || null;
      this.formData.service = layer.service || null;
      this.formData.category = layer.category || 'default';

      this.isReadonly = !(
          // Si l'utilisateur connecté est le prestataire
          this.formData.provider === this.loggedInUser?.id ||
          // Si aucun prestataire n'est assigné
          this.formData.provider === null
      );
    },

    async saveUpdatedInfos() {
      await this.updateShape(this.formData);
    },

    loadServices(prestataireId) {
      if (prestataireId) {
        this.getPrestataireServices(prestataireId);
      } else {
        this.formData.service = null;
      }
    },

    async deleteInfosPresta() {
      const infosShape = {
        shape_id: this.formData.shape_id,
        name: null,
        description: null,
        provider: null,
        service: null,
      };

      this.formData.name = '';
      this.formData.description = '';
      this.formData.provider = null;
      this.formData.service = null;

      await this.deleteInfosPost(infosShape);
    },

    refresh() {
      this.reloadShapesOnMap(this.getPrestataire)
    },

    getPrestataire(id) {
      return this.prestataires.find((prestataire) => prestataire.id === id);
    }
  },

  created() {
    this.getAllPrestataires();
  }
};
</script>
