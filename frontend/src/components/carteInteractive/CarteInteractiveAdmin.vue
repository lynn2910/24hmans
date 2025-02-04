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
<!--    <div class="absolute bottom-4 right-4 flex flex-col space-y-2">-->
<!--      <button-->
<!--          @click="saveAllShapesInStore"-->
<!--          class="z-50 pt-2 pb-2 pl-2 pr-2 w-9 border-neutral-400 border bg-white font-medium rounded-md hover:bg-gray-200 transition shadow-lg"-->
<!--          title="Sauvegarder les shapes"-->
<!--          aria-label="Sauvegarder les shapes"-->
<!--      >-->
<!--        <svg width="18" height="18" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--          <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                d="M48.4577 2.66666C49.8721 2.66666 51.2286 3.22855 52.2289 4.22876L59.7713 11.7712C60.7715 12.7714 61.3334 14.128 61.3334 15.5425V53.3333C61.3334 57.7517 57.7518 61.3333 53.3334 61.3333H10.6667C6.24848 61.3333 2.66675 57.7517 2.66675 53.3333V10.6667C2.66675 6.24839 6.24848 2.66666 10.6667 2.66666H48.4577ZM10.6667 7.99999C9.194 7.99999 8.00008 9.19391 8.00008 10.6667V53.3333C8.00008 54.8061 9.194 56 10.6667 56H13.3334V40C13.3334 35.5816 16.9151 32 21.3334 32H42.6667C47.0851 32 50.6667 35.5816 50.6667 40V56H53.3334C54.8062 56 56.0001 54.8061 56.0001 53.3333V18.2091C56.0001 16.7946 55.4382 15.4381 54.4379 14.4379L49.5622 9.5621C48.5619 8.56188 47.2054 7.99999 45.791 7.99999H45.3334V13.3333C45.3334 17.7516 41.7518 21.3333 37.3334 21.3333H26.6667C22.2485 21.3333 18.6667 17.7516 18.6667 13.3333V7.99999H10.6667ZM45.3334 56V40C45.3334 38.5272 44.1395 37.3333 42.6667 37.3333H21.3334C19.8607 37.3333 18.6667 38.5272 18.6667 40V56H45.3334ZM24.0001 7.99999H40.0001V13.3333C40.0001 14.8061 38.8062 16 37.3334 16H26.6667C25.194 16 24.0001 14.8061 24.0001 13.3333V7.99999Z"-->
<!--                fill="black"/>-->
<!--        </svg>-->
<!--      </button>-->
<!--      <button-->
<!--          @click="saveAllShapes"-->
<!--          class="z-50 pt-2 pb-2 pl-2 pr-2 w-9 border-neutral-400 border bg-white font-medium rounded-md hover:bg-gray-200 transition shadow-lg"-->
<!--          title="Exporter les shapes"-->
<!--          aria-label="Exporter les shapes"-->
<!--      >-->
<!--        <svg width="18" height="18" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--          <path d="M40 8H56V24" stroke="black" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--          <path d="M29.3333 34.6667L55.9999 8" stroke="black" stroke-width="5.33333" stroke-linecap="round"-->
<!--                stroke-linejoin="round"/>-->
<!--          <path-->
<!--              d="M56 34.6667V53.3333C56 54.0406 55.7191 54.7189 55.219 55.219C54.7189 55.7191 54.0406 56 53.3333 56H10.6667C9.95942 56 9.28115 55.7191 8.78105 55.219C8.28095 54.7189 8 54.0406 8 53.3333V10.6667C8 9.95942 8.28095 9.28115 8.78105 8.78105C9.28115 8.28095 9.95942 8 10.6667 8H29.3333"-->
<!--              stroke="black" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--        </svg>-->
<!--      </button>-->
<!--      <label-->
<!--          for="file-input"-->
<!--          class="z-50 pt-2 pb-2 pl-2 pr-2 w-9 border-neutral-400 border bg-white font-medium rounded-md hover:bg-gray-200 transition shadow-lg"-->
<!--          title="Importer les shapes"-->
<!--          aria-label="Importer les shapes"-->
<!--      >-->
<!--        <svg width="18" height="18" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--          <path d="M45.3333 34.6667H29.3333V18.6667" stroke="black" stroke-width="5.33333" stroke-linecap="round"-->
<!--                stroke-linejoin="round"/>-->
<!--          <path d="M55.9999 8L29.3333 34.6667" stroke="black" stroke-width="5.33333" stroke-linecap="round"-->
<!--                stroke-linejoin="round"/>-->
<!--          <path-->
<!--              d="M56 34.6667V53.3333C56 54.0406 55.7191 54.7189 55.219 55.219C54.7189 55.7191 54.0406 56 53.3333 56H10.6667C9.95942 56 9.28115 55.7191 8.78105 55.219C8.28095 54.7189 8 54.0406 8 53.3333V10.6667C8 9.95942 8.28095 9.28115 8.78105 8.78105C9.28115 8.28095 9.95942 8 10.6667 8H29.3333"-->
<!--              stroke="black" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--        </svg>-->
<!--        <input-->
<!--            id="file-input"-->
<!--            type="file"-->
<!--            @change="(d) => loadShapesFromFile(d, getPrestataire)"-->
<!--            class="hidden"-->
<!--        />-->
<!--      </label>-->
<!--    </div>-->

  </div>
</template>

<script>
import mapMethods from '@/components/carteInteractive/mapMethods';
// import initialShapes from '@/datasource/carteZones.json';
import {mapActions, mapGetters} from 'vuex';

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

  watch: {
    shapes: {
      handler(newShapes) {
        console.log("Shapes have changed:", newShapes);
        this.reloadShapesOnMap(this.getPrestataire);
      },
      deep: true,
    },
  },

  async mounted() {
    this.initMap(this.onPopupOpen, this.getPrestataire);
    if (this.getShapes.length === 0) {
      await this.getAllShapes();
    }
    this.reloadShapesOnMap(this.getPrestataire);
  },

  computed: {
    ...mapGetters("prestataire", ["prestataires"]),
    ...mapGetters("shapes", ["getShapes"]),

    shapes() {
      return this.getShapes;
    },

    customRoundedClass() {
      return this.roundedClass || '';
    },
  },
  methods: {
    ...mapMethods,
    onPopupOpen(layer) {
      this.$emit('zoneSelected', layer);
    },

    ...mapActions("prestataire", ["getAllPrestataires"]),
    ...mapActions("shapes", ["getAllShapes"]),

    async beforeMount() {
      await this.getAllPrestataires();
    },
  },
};
</script>
