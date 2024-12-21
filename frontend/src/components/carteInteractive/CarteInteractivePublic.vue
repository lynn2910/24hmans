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
  </div>
</template>

<script>
import mapMethods from '@/components/carteInteractive/mapMethodsPublic';
import initialShapes from '@/datasource/carteZones.json';
import {mapActions, mapGetters} from 'vuex';
import store from "@/store";

export default {
  name: 'CarteInteractivePublic',
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
  },
  data() {
    return {
      shapesData: [],
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
    };
  },
  mounted() {
    console.log(this.getPrestataire);
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
    ...mapMethods,
    onPopupOpen(layer) {
      console.log("popup open")
      console.log(layer)
      this.$emit('zoneSelected', layer)
      this.fillPopupWithData(layer);
    },
    loadInitialShapes() {
      this.shapesData = initialShapes;
      this.reloadShapesOnMap(this.getPrestataire);
    },

    getPrestataire(id) {
      return this.prestataires.find((prestataire) => prestataire.id === id);
    },

    ...mapActions("prestataire", ["getAllPrestataires"]),

    async beforeMount() {
      await store.dispatch("prestataire/getAllPrestataires");
    },
  },
};
</script>
