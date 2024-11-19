<!--<template>-->
<!--  <div-->
<!--      id="app"-->
<!--      class="flex items-center justify-center"-->
<!--  >-->
<!--    &lt;!&ndash; Carte &ndash;&gt;-->
<!--    <div-->
<!--        id="map"-->
<!--        :style="{ width: width, height: height }"-->
<!--        class="z-0 rounded-md shadow-lg border border-gray-300"-->
<!--    ></div>-->

<!--    &lt;!&ndash; Boutons d'actions &ndash;&gt;-->
<!--    <div class="absolute bottom-4 right-4 flex flex-col space-y-2">-->
<!--      <button-->
<!--          @click="saveAllShapes"-->
<!--          class="z-50 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition shadow-lg"-->
<!--      >-->
<!--        Save All Shapes-->
<!--      </button>-->
<!--      <label-->
<!--          for="file-input"-->
<!--          class="z-50 px-4 py-2 bg-green-600 text-white font-medium rounded-md cursor-pointer hover:bg-green-700 focus:ring focus:ring-green-300 transition shadow-lg"-->
<!--      >-->
<!--        Load Shapes-->
<!--        <input-->
<!--            id="file-input"-->
<!--            type="file"-->
<!--            @change="loadShapesFromFile"-->
<!--            class="hidden"-->
<!--        />-->
<!--      </label>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import L from 'leaflet';-->
<!--import 'leaflet/dist/leaflet.css';-->
<!--import 'leaflet-draw/dist/leaflet.draw.css';-->
<!--import 'leaflet-draw';-->

<!--// Importer le fichier JSON contenant les zones-->
<!--import initialShapes from '@/datasource/carteZones.json';-->

<!--export default {-->
<!--  name: 'CarteInteractive',-->
<!--  props: {-->
<!--    width: {-->
<!--      type: String,-->
<!--      default: '800px',-->
<!--    },-->
<!--    height: {-->
<!--      type: String,-->
<!--      default: '550px',-->
<!--    },-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      shapesData: [], // Stocker les formes et leurs données-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    this.initMap();-->
<!--    this.loadInitialShapes();-->
<!--  },-->
<!--  methods: {-->
<!--    initMap() {-->
<!--      const southWest = L.latLng(47.962299, 0.186179); // Sud-Ouest-->
<!--      const northEast = L.latLng(47.935713, 0.238761); // Nord-Est-->
<!--      const bounds = L.latLngBounds(southWest, northEast);-->

<!--      const map = L.map('map', {-->
<!--        maxBounds: bounds,-->
<!--        maxBoundsViscosity: 0.7,-->
<!--        minZoom: 12,-->
<!--        maxZoom: 18,-->
<!--        zoomControl: true-->
<!--      }).setView([47.95, 0.23], 14);-->

<!--      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {-->
<!--        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',-->
<!--      }).addTo(map);-->

<!--      map.on('drag', function () {-->
<!--        map.panInsideBounds(bounds, {animate: false});-->
<!--      });-->

<!--      map.on('zoomend', function () {-->
<!--        if (map.getZoom() < 12) {-->
<!--          map.setZoom(12);-->
<!--        }-->
<!--        if (map.getZoom() > 18) {-->
<!--          map.setZoom(18);-->
<!--        }-->
<!--      });-->

<!--      this.featureGroup = new L.FeatureGroup().addTo(map);-->
<!--      this.initDrawTools(map);-->
<!--    },-->

<!--    initDrawTools(map) {-->
<!--      const drawControl = new L.Control.Draw({-->
<!--        edit: {featureGroup: this.featureGroup},-->
<!--        draw: {-->
<!--          polygon: true,-->
<!--          circle: true,-->
<!--          marker: true,-->
<!--          polyline: true,-->
<!--          rectangle: true,-->
<!--        }-->
<!--      });-->
<!--      map.addControl(drawControl);-->

<!--      // Ajouter des événements pour gérer la création et la suppression de formes-->
<!--      map.on('draw:created', (event) => {-->
<!--        const layer = event.layer;-->
<!--        this.featureGroup.addLayer(layer);-->
<!--        this.saveShape(layer);-->
<!--        this.addPopupToShape(layer);-->
<!--      });-->

<!--      map.on('draw:deleted', (event) => {-->
<!--        event.layers.eachLayer((layer) => {-->
<!--          this.removeShape(layer);-->
<!--        });-->
<!--      });-->

<!--      map.on('popupopen', (event) => {-->
<!--        const layer = event.popup._source;-->
<!--        if (layer) {-->
<!--          this.fillPopupWithData(layer);-->
<!--        }-->
<!--      });-->
<!--    },-->

<!--    loadInitialShapes() {-->
<!--      // Charger les formes initiales depuis le fichier JSON-->
<!--      this.shapesData = initialShapes;-->
<!--      this.reloadShapesOnMap();-->
<!--    },-->

<!--    reloadShapesOnMap() {-->
<!--      this.featureGroup.clearLayers();-->

<!--      this.shapesData.forEach(shape => {-->
<!--        let layer = null;-->

<!--        if (shape.type === 'shape') {-->
<!--          if (Array.isArray(shape.coordinates[0])) {-->
<!--            layer = L.polygon(shape.coordinates);-->
<!--          } else if (shape.coordinates.lat && shape.coordinates.lng) {-->
<!--            if (shape.radius) {-->
<!--              layer = L.circle([shape.coordinates.lat, shape.coordinates.lng], {radius: shape.radius});-->
<!--            } else {-->
<!--              layer = L.marker([shape.coordinates.lat, shape.coordinates.lng]);-->
<!--            }-->
<!--          }-->

<!--          if (layer) {-->
<!--            layer.name = shape.name;-->
<!--            layer.logistics = shape.logistics;-->
<!--            layer.surface = shape.surface;-->
<!--            layer.volume = shape.volume;-->
<!--            layer.prise = shape.prise;-->
<!--            layer.water = shape.water;-->
<!--            layer.provider = shape.provider;-->

<!--            this.featureGroup.addLayer(layer);-->
<!--            this.addPopupToShape(layer);-->
<!--          }-->
<!--        }-->
<!--      });-->
<!--    },-->

<!--    addPopupToShape(layer) {-->
<!--      const popupContent = `-->
<!--        <label for="name" class="font-extrabold">Nom emplacement:</label>-->
<!--        <input type="text" id="name" value="${layer.name || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />-->
<!--        <div class="flex row gap-2 p-3 text-sm max-w-lg w-full items-center content-center">-->
<!--          <div class="ml-2 mr-2 mt-0">-->
<!--            <label for="logistics" class="font-medium">Logistique:</label>-->
<!--            <input type="text" id="logistics" value="${layer.logistics || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />-->
<!--            <label for="surface" class="font-medium">Surface (m²):</label>-->
<!--            <input type="text" id="surface" value="${layer.surface || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />-->
<!--            <label for="volume" class="font-medium">Volume (m³):</label>-->
<!--            <input type="text" id="volume" value="${layer.volume || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />-->
<!--          </div>-->
<!--          <div class="ml-2 mr-2 mt-0">-->
<!--            <label for="prise" class="font-medium">Personnes (nb):</label>-->
<!--            <input type="number" id="prise" value="${layer.prise || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />-->
<!--            <label for="water" class="font-medium">Eau disponible:</label>-->
<!--            <input type="text" id="water" value="${layer.water || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />-->
<!--            <label for="provider" class="font-medium">Prestataire:</label>-->
<!--            <input type="text" id="provider" value="${layer.provider || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="flex justify-end mt-2">-->
<!--          <button id="save-info" class="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-xs">Save</button>-->
<!--        </div>-->
<!--      `;-->
<!--      layer.bindPopup(popupContent);-->
<!--    },-->

<!--    fillPopupWithData(layer) {-->
<!--      document.getElementById('name').value = layer.name || '';-->
<!--      document.getElementById('logistics').value = layer.logistics || '';-->
<!--      document.getElementById('surface').value = layer.surface || '';-->
<!--      document.getElementById('volume').value = layer.volume || '';-->
<!--      document.getElementById('prise').value = layer.prise || '';-->
<!--      document.getElementById('water').value = layer.water || '';-->
<!--      document.getElementById('provider').value = layer.provider || '';-->

<!--      const saveButton = document.getElementById('save-info');-->
<!--      if (saveButton) {-->
<!--        saveButton.onclick = () => {-->
<!--          layer.name = document.getElementById('name').value;-->
<!--          layer.logistics = document.getElementById('logistics').value;-->
<!--          layer.surface = document.getElementById('surface').value;-->
<!--          layer.volume = document.getElementById('volume').value;-->
<!--          layer.prise = document.getElementById('prise').value;-->
<!--          layer.water = document.getElementById('water').value;-->
<!--          layer.provider = document.getElementById('provider').value;-->

<!--          this.saveShape(layer);-->
<!--          layer.closePopup();-->
<!--        };-->
<!--      }-->
<!--    },-->

<!--    saveShape(layer) {-->
<!--      let shapeData = {-->
<!--        type: 'shape',-->
<!--        coordinates: layer.getLatLngs ? layer.getLatLngs() : layer.getLatLng(),-->
<!--        name: layer.name || '',-->
<!--        logistics: layer.logistics || '',-->
<!--        surface: layer.surface || '',-->
<!--        volume: layer.volume || '',-->
<!--        prise: layer.prise || '',-->
<!--        water: layer.water || '',-->
<!--        provider: layer.provider || '',-->
<!--        radius: layer instanceof L.Circle ? layer.getRadius() : undefined-->
<!--      };-->

<!--      const index = this.shapesData.findIndex(shape => {-->
<!--        return JSON.stringify(shape.coordinates) === JSON.stringify(layer.getLatLngs ? layer.getLatLngs() : layer.getLatLng());-->
<!--      });-->

<!--      if (index !== -1) {-->
<!--        this.shapesData.splice(index, 1, shapeData);-->
<!--      } else {-->
<!--        this.shapesData.push(shapeData);-->
<!--      }-->
<!--    },-->

<!--    saveAllShapes() {-->
<!--      const dataToSave = JSON.stringify(this.shapesData);-->
<!--      const blob = new Blob([dataToSave], {type: 'application/json'});-->
<!--      const link = document.createElement('a');-->
<!--      link.href = URL.createObjectURL(blob);-->
<!--      link.download = 'shapesData.json';-->
<!--      link.click();-->
<!--    },-->

<!--    loadShapesFromFile(event) {-->
<!--      const file = event.target.files[0];-->
<!--      const reader = new FileReader();-->

<!--      reader.onload = (e) => {-->
<!--        const shapesData = JSON.parse(e.target.result);-->
<!--        this.shapesData = shapesData;-->
<!--        this.reloadShapesOnMap();-->
<!--      };-->

<!--      reader.readAsText(file);-->
<!--    },-->
<!--  }-->
<!--};-->
<!--</script>-->


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
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

// Importer le fichier JSON contenant les zones
import initialShapes from '@/datasource/carteZones.json';

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
      shapesData: [], // Stocker les formes et leurs données
      categories: {
        default: '#3388ff', // Couleur par défaut
        tribunes: '#f6a631',
        parkingsSimple: '#c60303',
        parkingsVip: '#6805a1',
        garages: '#0eca60',
        pistes: '#3ac8c8',
        emplacements: '#1b6825',
        montgolfieres: '#c35e5e',
      },
    };
  },
  mounted() {
    this.initMap();
    this.loadInitialShapes();
  },
  methods: {
    initMap() {
      const southWest = L.latLng(47.962299, 0.186179);
      const northEast = L.latLng(47.935713, 0.238761);
      const bounds = L.latLngBounds(southWest, northEast);

      const map = L.map('map', {
        maxBounds: bounds,
        maxBoundsViscosity: 0.7,
        minZoom: 12,
        maxZoom: 18,
        zoomControl: false,  // Désactive le contrôle de zoom par défaut
      }).setView([47.95, 0.23], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      map.on('drag', function () {
        map.panInsideBounds(bounds, {animate: false});
      });

      map.on('zoomend', function () {
        if (map.getZoom() < 12) {
          map.setZoom(12);
        }
        if (map.getZoom() > 18) {
          map.setZoom(18);
        }
      });

      L.control.zoom({position: 'bottomleft'}).addTo(map);

      this.featureGroup = new L.FeatureGroup().addTo(map);
      this.initDrawTools(map);
    },

    initDrawTools(map) {
      const drawControl = new L.Control.Draw({
        edit: {featureGroup: this.featureGroup},
        draw: {
          polygon: true,
          circle: true,
          marker: false,
          circlemarker: false,
          polyline: true,
          rectangle: true,
        },
      });

      // Définir la position en bas à droite
      drawControl.setPosition('bottomleft');

      // Ajouter le contrôle à la carte
      map.addControl(drawControl);

      map.on('draw:created', (event) => {
        const layer = event.layer;
        layer.category = 'default'; // Catégorie par défaut
        this.featureGroup.addLayer(layer);
        this.applyCategoryStyle(layer);
        this.saveShape(layer);
        this.addPopupToShape(layer);
      });

      map.on('draw:deleted', (event) => {
        event.layers.eachLayer((layer) => {
          this.removeShape(layer);
        });
      });

      map.on('popupopen', (event) => {
        const layer = event.popup._source;
        if (layer) {
          this.fillPopupWithData(layer);
        }
      });
    },

    loadInitialShapes() {
      this.shapesData = initialShapes;
      this.reloadShapesOnMap();
    },

    reloadShapesOnMap() {
      this.featureGroup.clearLayers();

      this.shapesData.forEach((shape) => {
        let layer = null;

        // Vérification du type de forme
        if (Array.isArray(shape.coordinates[0])) {
          // Si c'est un tableau d'array, on considère que c'est un polygone
          layer = L.polygon(shape.coordinates);
        } else if (shape.coordinates.lat && shape.coordinates.lng) {
          // Si ce sont des coordonnées de marker ou cercle
          if (shape.radius) {
            layer = L.circle([shape.coordinates.lat, shape.coordinates.lng], {radius: shape.radius});
          } else {
            layer = L.marker([shape.coordinates.lat, shape.coordinates.lng]);
          }
        } else if (Array.isArray(shape.coordinates)) {
          // Si ce sont des coordonnées d'une polyline
          layer = L.polyline(shape.coordinates);
        }

        // Vérification si la forme a été correctement créée
        if (layer) {
          // Ajouter des propriétés supplémentaires à la couche si nécessaire
          layer.category = shape.category || 'default';
          layer.name = shape.name;
          layer.logistics = shape.logistics;
          layer.surface = shape.surface;
          layer.volume = shape.volume;
          layer.prise = shape.prise;
          layer.water = shape.water;
          layer.provider = shape.provider;

          // Ajouter la couche au groupe de caractéristiques
          this.featureGroup.addLayer(layer);

          // Appliquer le style basé sur la catégorie
          this.applyCategoryStyle(layer);

          // Ajouter un popup avec les informations
          this.addPopupToShape(layer);
        }
      });
    },

    applyCategoryStyle(layer) {
      const category = layer.category || 'default';
      const color = this.categories[category] || this.categories.default;

      if (layer.setStyle) {
        layer.setStyle({color});
      } else if (layer instanceof L.Circle || layer instanceof L.Marker) {
        layer.setStyle ? layer.setStyle({color}) : (layer.options.color = color);
      }
    },

    addPopupToShape(layer) {
      const categoryOptions = Object.keys(this.categories)
          .map(
              (cat) =>
                  `<option value="${cat}" ${layer.category === cat ? 'selected' : ''}>${cat}</option>`
          )
          .join('');

      const popupContent = `
        <label for="name" class="font-extrabold">Nom emplacement:</label>
        <input type="text" id="name" value="${layer.name || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />

        <div class="flex row gap-2 p-3 text-sm max-w-lg w-full items-center content-center">
          <div class="ml-2 mr-2 mt-0">
            <label for="logistics" class="font-medium">Logistique:</label>
            <input type="text" id="logistics" value="${layer.logistics || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />
            <label for="surface" class="font-medium">Surface (m²):</label>
            <input type="text" id="surface" value="${layer.surface || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />
            <label for="volume" class="font-medium">Volume (m³):</label>
            <input type="text" id="volume" value="${layer.volume || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />
          </div>
          <div class="ml-2 mr-2 mt-0">
            <label for="prise" class="font-medium">Personnes (nb):</label>
            <input type="number" id="prise" value="${layer.prise || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />
            <label for="water" class="font-medium">Eau disponible:</label>
            <input type="text" id="water" value="${layer.water || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />
            <label for="provider" class="font-medium">Prestataire:</label>
            <input type="text" id="provider" value="${layer.provider || ''}" class="w-full p-1 border rounded-md border-gray-300 text-sm" />
          </div>
        </div>

        <label for="category" class="font-medium">Catégorie:</label>
        <select id="category" class="w-full p-1 border rounded-md border-gray-300 text-sm">
          ${categoryOptions}
        </select>

        <div class="flex justify-end mt-2">
          <button id="save-info" class="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-xs">Save</button>
        </div>
      `;
      layer.bindPopup(popupContent);
    },

    fillPopupWithData(layer) {
      document.getElementById('name').value = layer.name || '';
      document.getElementById('logistics').value = layer.logistics || '';
      document.getElementById('surface').value = layer.surface || '';
      document.getElementById('volume').value = layer.volume || '';
      document.getElementById('prise').value = layer.prise || '';
      document.getElementById('water').value = layer.water || '';
      document.getElementById('provider').value = layer.provider || '';
      document.getElementById('category').value = layer.category || 'default';

      const saveButton = document.getElementById('save-info');
      if (saveButton) {
        saveButton.onclick = () => {
          layer.name = document.getElementById('name').value;
          layer.logistics = document.getElementById('logistics').value;
          layer.surface = document.getElementById('surface').value;
          layer.volume = document.getElementById('volume').value;
          layer.prise = document.getElementById('prise').value;
          layer.water = document.getElementById('water').value;
          layer.provider = document.getElementById('provider').value;
          layer.category = document.getElementById('category').value;

          this.applyCategoryStyle(layer);
          this.saveShape(layer);
          layer.closePopup();
        };
      }
    },

    saveShape(layer) {
      // Créer un objet avec les informations de la forme à sauvegarder
      const shapeData = {
        type: 'shape',
        // Vérifier si la couche est une polyline et récupérer les bonnes coordonnées
        coordinates: layer.getLatLngs ? (Array.isArray(layer.getLatLngs()) ? layer.getLatLngs() : [layer.getLatLngs()]) : layer.getLatLng(),
        name: layer.name || '',
        logistics: layer.logistics || '',
        surface: layer.surface || '',
        volume: layer.volume || '',
        prise: layer.prise || '',
        water: layer.water || '',
        provider: layer.provider || '',
        category: layer.category || 'default',
      };

      // Vérification pour éviter de dupliquer les mêmes formes dans shapesData
      const index = this.shapesData.findIndex(
          (shape) =>
              JSON.stringify(shape.coordinates) === JSON.stringify(shapeData.coordinates)
      );

      // Si la forme existe déjà, on la remplace, sinon on l'ajoute
      if (index !== -1) {
        this.shapesData.splice(index, 1, shapeData);
      } else {
        this.shapesData.push(shapeData);
      }
    },

    saveAllShapes() {
      const dataToSave = JSON.stringify(this.shapesData);
      const blob = new Blob([dataToSave], {type: 'application/json'});
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'shapesData.json';
      link.click();
    },

    loadShapesFromFile(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const shapesData = JSON.parse(e.target.result);
        this.shapesData = shapesData;
        this.reloadShapesOnMap();
      };

      reader.readAsText(file);
    },

    removeShape(layer) {
      // Supprimer la couche de la featureGroup (la carte)
      this.featureGroup.removeLayer(layer);

      // Supprimer la forme des données shapesData
      const index = this.shapesData.findIndex(
          (shape) =>
              JSON.stringify(shape.coordinates) === JSON.stringify(layer.getLatLngs ? layer.getLatLngs() : layer.getLatLng())
      );

      if (index !== -1) {
        this.shapesData.splice(index, 1);
      }
    },
  },
};
</script>
