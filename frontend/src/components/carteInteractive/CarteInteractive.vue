<template>
  <div class="flex flex-row align-middle justify-center content-center mx-auto z-10">
    <l-map
        ref="map"
        :zoom="zoom"
        :center="center"
        :crs="L.CRS.Simple"
        :style="{ width: width, height: height }"
        :zoomControl="false"
        class="z-10"
    >
      <!-- Image overlay insertion -->
      <l-image-overlay
          :url="imageURL"
          :bounds="imageBounds"
          class="z-10"
      ></l-image-overlay>

      <!-- Custom zoom control position (bottom left) -->
      <l-control-zoom position="bottomleft" class="leaflet-top leaflet-left z-10"></l-control-zoom>
    </l-map>
  </div>
</template>

<script>
import {LMap, LImageOverlay, LControlZoom} from 'vue2-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import carte from '@/assets/images/carte.svg'; // Import your image

export default {
  name: 'CarteInteractive',
  props: {
    width: {
      type: String,
      default: '600px' // Default width
    },
    height: {
      type: String,
      default: '600px' // Default height
    }
  },
  components: {
    LMap,
    LImageOverlay,
    LControlZoom,
  },
  data() {
    return {
      zoom: 0, // Adjust zoom level for your image scale
      center: [0, 0], // Center the map at [0, 0]
      imageURL: carte, // URL of the image
      imageBounds: [[0, 0], [1000, 1000]], // Adjust based on the actual size of the image
      L,
    };
  },
  mounted() {
    this.$nextTick(() => {
      // Disable default zoom controls
      this.$refs.map.mapObject.zoomControl.remove();
    });
  },
};
</script>

<style scoped>
/* Define styles for the map and controls */
.l-map-container {
  z-index: 10; /* Set z-index for the map */
}

.leaflet-control {
  z-index: 10 !important; /* Force controls to remain under z-index 10 */
}

.navbar {
  z-index: 20; /* Ensure the navbar has a higher z-index */
}
</style>
