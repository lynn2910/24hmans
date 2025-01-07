<template>
  <div
      id="app"
      class="relative flex items-center justify-center w-full h-full"
  >
    <!-- Carte -->
    <div
        id="map"
        :style="{ width: width, height: height }"
        :class="customRoundedClass"
        class="z-0 relative rounded-md shadow-lg border border-gray-300"
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
            @change="(d) => loadShapesFromFile(d, getPrestataire)"
            class="hidden"
        />
      </label>
    </div>

  </div>
</template>

<script>
import mapMethodsPresta from '@/components/carteInteractive/mapMethodsPresta';
import initialShapes from '@/datasource/carteZones.json';
import {mapActions, mapGetters} from 'vuex';
import store from "@/store";

export default {
  name: 'CarteInteractiveAdmin',
  props: {
    width: {
      type: String,
      default: '800px',
    },
    height: {
      type: String,
      default: '550px',
    },
    borderRadius: {
      type: String,
      default: '10px',
    },
    roundedClass: {
      type: String,
      default: '',
    },
    getPrestataire: Function,

    categories: {
      type: Object,
      default: () => ({
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
      }),
    },
  },
  data() {
    return {
      shapesData: [],
    };
  },
  mounted() {
    this.initMap(this.onPopupOpen, this.getPrestataire);
    this.loadInitialShapes();
  },
  computed: {
    ...mapGetters("prestataire", ["prestataires"]),
    customRoundedClass() {
      return this.roundedClass || '';
    },
  },
  methods: {
    ...mapMethodsPresta,
    onPopupOpen(layer) {
      this.$emit('zoneSelected', layer);
    },
    loadInitialShapes() {
      this.shapesData = initialShapes;
      this.reloadShapesOnMap(this.getPrestataire);
    },

    ...mapActions("prestataire", ["getAllPrestataires"]),

    async beforeMount() {
      await store.dispatch("prestataire/getAllPrestataires");
    },
  },
};
</script>
