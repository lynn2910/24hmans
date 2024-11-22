<template>
  <div
      id="app"
      class="flex items-center justify-center"
  >
    <!-- Carte -->
    <div
        id="map"
        :style="{ width: width, height: height }"
        class="z-0 rounded-md shadow-lg border border-gray-300"
    ></div>

    <!-- Boutons d'actions -->
    <div class="absolute bottom-4 right-4 mr-2 mb-6 flex flex-col space-y-2">
      <button
          @click="saveAllShapes"
          class="z-50 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition shadow-lg"
      >
        Save All Shapes
      </button>
      <label
          for="file-input"
          class="z-50 px-4 py-2 bg-green-600 text-white font-medium rounded-md cursor-pointer hover:bg-green-700 focus:ring focus:ring-green-300 transition shadow-lg"
      >
        Load Shapes
        <input
            id="file-input"
            type="file"
            @change="loadShapesFromFile"
            class="hidden"
        />
      </label>
    </div>
  </div>
</template>

<script>
import mapMethods from '@/components/carteInteractive/mapMethods';
import initialShapes from '@/datasource/carteZones.json';
import {mapActions, mapGetters} from 'vuex';
import store from '@/store';

export default {
  name: 'CarteInteractive',
  props: {
    width: {
      type: String,
      default: '800px',
    },
    height: {
      type: String,
      default: '550px',
    },
  },
  data() {
    return {
      shapesData: [],
      categories: {
        default: '#848485',
        tribunes: '#f6a631',
        parkingsRouge: '#c60303',
        parkingsBleu: '#1417bd',
        parkingsVip: '#6805a1',
        garages: '#dc6a24',
        pistes: '#3ac8c8',
        emplacements: '#1b6825',
        montgolfieres: '#67290b',
        boutique: '#dfd700'
      },
    };
  },
  mounted() {
    this.initMap();
    this.loadInitialShapes();
  },
  computed: {
    ...mapGetters("prestataire", ["prestataires"]),
  },
  methods: {
    ...mapMethods,
    loadInitialShapes() {
      this.shapesData = initialShapes;
      this.reloadShapesOnMap();
    },
  },
  action: {
    ...mapActions("prestataire", ["getAllPrestataires"]),
  },
  async beforeMount() {
    await store.dispatch("prestataire/getAllPrestataires");
  },
};
</script>