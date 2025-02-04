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
import mapMethodsPublic from '@/components/carteInteractive/mapMethodsPublic';
import {mapActions, mapGetters} from 'vuex';

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
    };
  },

  watch: {
    shapes: {
      handler(newShapes) {
        console.log("Shapes have changed:", newShapes);
        this.reloadShapesOnMap(this.getPrestataire, this.$route.params.locale);
      },
      deep: true,
    },
  },

  async mounted() {
    await this.getAllPrestataires();
    this.initMap(this.onPopupOpen, this.getPrestataire, this.$route.params.locale);
    if (this.getShapes.length === 0) {
      await this.getAllShapes();
    }
    this.reloadShapesOnMap(this.getPrestataire, this.$route.params.locale);
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
    ...mapMethodsPublic,
    onPopupOpen(layer) {
      this.$emit('zoneSelected', layer);
    },

    ...mapActions("prestataire", ["getAllPrestataires"]),
    ...mapActions("shapes", ["getAllShapes"]),

    // async beforeMount() {
    //   await this.getAllPrestataires();
    // },

    getPrestataire(id) {
      if (!this.prestataires || this.prestataires.length === 0){
        this.getAllPrestataires().then(() => {
          return this.getPrestataire(id)
        });
      } else {
        return this.prestataires.find((prestataire) => prestataire.id === id);
      }
    }
  },
};
</script>
