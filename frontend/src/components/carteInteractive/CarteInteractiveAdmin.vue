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

    <CategoryModal
        v-model="showCategoryModal"
        :categories="markerIcons"
        @selected="applyMarkerCategory"
    />

    <!-- Boutons d'actions -->
    <div class="absolute bottom-4 right-4 flex flex-col space-y-2">
      <button
          @click="saveAllShapes"
          class="z-50 pt-2 pb-2 pl-2 pr-2 w-9 border-neutral-400 border bg-white font-medium rounded-md hover:bg-gray-200 transition shadow-lg"
          title="Exporter les shapes"
          aria-label="Exporter les shapes"
      >
        <svg width="18" height="18" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 8H56V24" stroke="black" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M29.3333 34.6667L55.9999 8" stroke="black" stroke-width="5.33333" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path
              d="M56 34.6667V53.3333C56 54.0406 55.7191 54.7189 55.219 55.219C54.7189 55.7191 54.0406 56 53.3333 56H10.6667C9.95942 56 9.28115 55.7191 8.78105 55.219C8.28095 54.7189 8 54.0406 8 53.3333V10.6667C8 9.95942 8.28095 9.28115 8.78105 8.78105C9.28115 8.28095 9.95942 8 10.6667 8H29.3333"
              stroke="black" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <label
          for="file-input"
          class="z-50 pt-2 pb-2 pl-2 pr-2 w-9 border-neutral-400 border bg-white font-medium rounded-md hover:bg-gray-200 transition shadow-lg"
          title="Importer les shapes"
          aria-label="Importer les shapes"
      >
        <svg width="18" height="18" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.3333 34.6667H29.3333V18.6667" stroke="black" stroke-width="5.33333" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M55.9999 8L29.3333 34.6667" stroke="black" stroke-width="5.33333" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path
              d="M56 34.6667V53.3333C56 54.0406 55.7191 54.7189 55.219 55.219C54.7189 55.7191 54.0406 56 53.3333 56H10.6667C9.95942 56 9.28115 55.7191 8.78105 55.219C8.28095 54.7189 8 54.0406 8 53.3333V10.6667C8 9.95942 8.28095 9.28115 8.78105 8.78105C9.28115 8.28095 9.95942 8 10.6667 8H29.3333"
              stroke="black" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
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
import mapMethods from '@/components/carteInteractive/mapMethods';
// import initialShapes from '@/datasource/carteZones.json';
import {mapActions, mapGetters} from 'vuex';
import CategoryModal from "@/components/carteInteractive/CategoryModal.vue";

export default {
  name: 'CarteInteractiveAdmin',
  components: {CategoryModal},
  data() {
    return {
      showCategoryModal: false,
      pendingMarker: null,
      markerIcons: {
        ballon_service: "/markers/ballonMarker.png",
        karting_service: "/markers/kartingMarker.png",
        raceCar_service: "/markers/raceCarMarker.png",
        village_service: "/markers/village_service.png",
        camping: "/markers/campingMarker.png",
        toilet: "/markers/toiletMarker.png",
        interdit: "/markers/interditMarker.png",
        parking: "/markers/parkingMarker.png",
        codeky_presta: "/markers/codeky_presta.png",
        ferrari_presta: "/markers/ferrari_presta.png",
        karting_presta: "/markers/karting_presta.png",
        montgolfiere_presta: "/markers/montgolfiere_presta.png",
        organisateurs_presta: "/markers/organisateurs_presta.png",
        porsche_presta: "/markers/porsche_presta.png",
      },
    }
  },

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

    addMarker(event) {
      this.pendingMarker = event.layer;
      this.showCategoryModal = true;
    },

    applyMarkerCategory(category) {
      if (!this.pendingMarker) return;

      const iconUrl = this.markerIcons[category] || this.markerIcons["village_service"];
      const iconSize = [30, 30];
      const icon = L.icon({ iconUrl, iconSize });

      this.pendingMarker.setIcon(icon);
      this.pendingMarker.iconUrl = iconUrl;

      this.featureGroup.addLayer(this.pendingMarker);
      this.applyCategoryStyle(this.pendingMarker);
      this.saveShape(this.pendingMarker);
      this.addPopupToShape(this.pendingMarker, this.getPrestataire);

      this.pendingMarker = null;
    },

    ...mapActions("prestataire", ["getAllPrestataires"]),
    ...mapActions("shapes", ["getAllShapes"]),

    async beforeMount() {
      await this.getAllPrestataires();
    },
  },
};
</script>
