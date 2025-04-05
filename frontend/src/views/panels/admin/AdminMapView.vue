<!--

Page de gestion de la carte interactive admin

 -->

<template>
  <AdminDashboardTemplate current-page="map" class="h-full w-2/3">
    <div
        class="flex flex-row items-center content-center justify-start gap-5 h-[100%] w-full overflow-y-hidden overflow-x-auto">

      <!--    Carte Interactive vue presta-->
      <div
          class="relative w-full justify-start gap-4 m-2 mr-0 h-full bg-white dark:bg-gray-800 shadow-md rounded-lg m-0 p-2">
        <CarteInteractiveAdmin
            ref="mapComponent"
            width="100%"
            height="100%"
            borderRadius="0px"
            class="relative z-0"
            @zoneSelected="updateFormData"
            :categories="categories"
            :get-prestataire="getPrestataire"
        />

        <!-- Image en superposition -->
        <div class="absolute top-5 left-0 right-0 z-50 flex justify-center">
          <img
              src="@/assets/images/descriptionServices.png"
              alt="description carte interactive"
              class="w-4/5 object-contain mx-auto"
              loading="lazy"
          />
        </div>
      </div>

      <!--    Formulaire de modification d'une zone spécifique-->
      <div
          class="min-w-[400px] w-96 p-4 m-2 ml-0 bg-white dark:bg-gray-800 shadow-md rounded-lg gap-4 h-full">

        <div class="mt-3">
          <label for="name" class="text-xl font-bold">{{ $t('dashboards.presta_admin.map_editing.place_name') }}</label>
          <input type="text" id="name" v-model="formData.name"
                 class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
                 :placeholder="$t('dashboards.presta_admin.map_editing.place_placeholder')"/>
        </div>
        <div class="mt-3">
          <label for="logistics" class="text-sm font-semibold">{{
              $t('dashboards.presta_admin.map_editing.logistic')
            }}</label>
          <input type="text" id="logistics" v-model="formData.logistics"
                 class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
                 :placeholder="$t('dashboards.presta_admin.map_editing.logistic_placeholder')"/>
        </div>
        <div class="mt-3">
          <label for="surface" class="text-sm font-semibold">{{
              $t('dashboards.presta_admin.map_editing.surface')
            }}</label>
          <input type="number" id="surface" v-model="formData.surface"
                 class="w-full p-1 border rounded-md text-black border-gray-300"
                 :placeholder="$t('dashboards.presta_admin.map_editing.surface_placeholder')"
                 step="1"/>
        </div>
        <div class="mt-3">
          <label for="description"
                 class="text-sm font-semibold">{{ $t('dashboards.presta_admin.map_editing.description') }}</label>
          <textarea rows="2" id="description" v-model="formData.description"
                    class="w-full text-black p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :placeholder="$t('dashboards.presta_admin.map_editing.description_placeholder')"></textarea>
        </div>
        <div class="mt-3">
          <label for="prestataires" class="text-sm font-semibold">{{ $t('dashboards.presta') }}</label>
          <select
              id="prestataires" v-model="formData.provider"
              class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm"
              @change="loadServices($event.target.value)">
            <option v-for="prestataire in prestataires" :key="prestataire.id" :value="prestataire.id">
              {{ prestataire.name }}
            </option>
          </select>
        </div>
        <div class="mt-3">
          <label for="services" class="text-sm font-semibold">{{ $t('dashboards.available_services') }}</label>
          <select
              id="services"
              v-model="formData.service"
              class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm">
            <option v-for="(service, index) in selectedPrestataireServices" :key="index"
                    :value="service">
              {{ service }}
            </option>
          </select>

          <div class="mt-3">
            <label for="category" class="text-sm font-semibold">{{
                $t('dashboards.presta_admin.map_editing.category')
              }}</label>
            <select
                id="category"
                v-model="formData.category"
                class="w-full p-1 border rounded-md text-black border-gray-300 shadow-sm">
              <option
                  v-for="(color, index) in categories"
                  :key="index"
                  :value="index">
                {{ categoryNames[index] }}
              </option>
            </select>
          </div>


          <button
              @click="saveUpdatedInfos"
              class="mt-6 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-xl">
            {{ $t('global.save') }}
          </button>

          <button
              @click="deleteInfosPresta"
              class="ml-4 mt-6 px-3 py-2 text-white rounded-md focus:outline-none text-xl bg-red-600 hover:bg-red-700">
            {{ $t('global.free_zone') }}
          </button>
        </div>
      </div>
    </div>
  </AdminDashboardTemplate>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';
import AdminDashboardTemplate from "@/components/dashboard/admin/AdminDashboardTemplate.vue";
import CarteInteractiveAdmin from "@/components/carteInteractive/CarteInteractiveAdmin.vue";
import mapMethods from "@/components/carteInteractive/mapMethods";
import CarteInteractivePresta from "@/components/carteInteractive/CarteInteractivePresta.vue";

export default {
  name: 'AdminMapView',
  components: {CarteInteractivePresta, AdminDashboardTemplate, CarteInteractiveAdmin},

  data() {
    return {
      formData: {
        name: '',
        logistics: '',
        surface: '',
        description: '',
        provider: '',
        service: '',
        category: '',
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
    ...mapState("login", ["loggedInUser"]),

    selectedPrestataireServices() {
      return this.prestataireServices(this.formData.provider) || [];
    },
  },

  watch: {
    'formData.provider'(newPrestataireId) {
      if (newPrestataireId) {
        this.loadServices(newPrestataireId);
      }
    },
  },

  methods: {
    ...mapMethods,
    ...mapActions("prestataire", ["getAllPrestataires", "getPrestataireServices"]),
    ...mapActions("shapes", ["updateShape", "modifyingInfosPost", "getAllShapes"]),

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
    },

    async saveUpdatedInfos() {
      await this.updateShape(this.formData);
      await this.getAllShapes();
      this.$refs.mapComponent.publicReloadShapes();
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
        logistics: null,
        surface: null,
        description: null,
        provider: null,
        service: null,
        category: null,
        role: 1,
        id_provider: this.loggedInUser.id,
      };

      this.formData.name = '';
      this.formData.logistics = '';
      this.formData.surface = '';
      this.formData.description = '';
      this.formData.provider = null;
      this.formData.service = null;
      this.formData.category = 'default';

      await this.modifyingInfosPost(infosShape);
      await this.getAllShapes();
      this.$refs.mapComponent.publicReloadShapes();
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
