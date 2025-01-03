import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

export default {
    initMap(onPopupOpen, getPrestataire) {
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
        this.initDrawTools(map, onPopupOpen, getPrestataire);
    },

    initDrawTools(map, onPopupOpen, getPrestataire) {
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

        // Définir la position en bas à gauche
        drawControl.setPosition('bottomleft');

        // Ajouter le contrôle à la carte
        map.addControl(drawControl);

        map.on('draw:created', (event) => {
            const layer = event.layer;
            layer.category = 'default'; // Catégorie par défaut
            this.featureGroup.addLayer(layer);
            this.applyCategoryStyle(layer);
            this.saveShape(layer);
            this.addPopupToShape(layer, getPrestataire);
        });

        map.on('draw:deleted', (event) => {
            event.layers.eachLayer((layer) => {
                this.removeShape(layer);
            });
        });

        map.on('popupopen', (event) => {
            const layer = event.popup._source;
            if (layer) {
                onPopupOpen(layer);
                this.fillPopupWithData(layer, getPrestataire);
            }
        });
    },

    reloadShapesOnMap(getPrestataire) {
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
                layer.description = shape.description;
                layer.provider = shape.provider;
                layer.service = shape.service;


                // Ajouter la couche au groupe de caractéristiques
                this.featureGroup.addLayer(layer);

                // Appliquer le style basé sur la catégorie
                this.applyCategoryStyle(layer);

                // Ajouter un popup avec les informations
                this.addPopupToShape(layer, getPrestataire);
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

    addPopupToShape(layer, getPrestataire) {
        console.log("OUOUAUA" + layer.provider)
        const popupContent = `
      <h2 class="w-full p-1 text-sm font-extrabold"> ${layer.name || 'Emplacement vide'} </h2>

      <div class="ml-2 mr-2 mt-0">
        <p class="w-full text-sm">Logistique : ${layer.logistics || 'Aucune logistique'}  </p>
        <p class="w-full text-sm">Surface (m²) : ${layer.surface || 'Aucune surface'}  </p>
        <p class="w-full text-sm">Description : ${layer.description || 'Aucune description'}  </p>
        <p class="w-full text-sm">Prestataire : ${layer?.provider ? getPrestataire(layer.provider)?.name || "ERROR" : 'Aucun prestataire'}  </p>
        <p class="w-full text-sm">Service associé : ${layer.service || 'Aucun service'}  </p>
      </div>
    `;
        layer.bindPopup(popupContent);
    },

    fillPopupWithData(layer) {
        const fields = [
            {id: 'name', property: 'name'},
            {id: 'logistics', property: 'logistics'},
            {id: 'surface', property: 'surface'},
            {id: 'description', property: 'description'},
            {id: 'prestataires', property: 'provider'},
            {id: 'services', property: 'service'},
        ];

        fields.forEach(({id, property}) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = layer[property];
            }
        });

        const saveButton = document.getElementById('save-info');
        if (saveButton) {
            saveButton.onclick = () => {
                fields.forEach(({id, property}) => {
                    const element = document.getElementById(id);
                    if (element) {
                        layer[property] = element.value;
                    }
                });

                this.applyCategoryStyle(layer);
                this.saveShape(layer);
                layer.closePopup();
            };
        }
    },

    saveShape(layer) {
        const shapeData = {
            type: 'shape',
            coordinates: layer.getLatLngs ? (Array.isArray(layer.getLatLngs()) ? layer.getLatLngs() : [layer.getLatLngs()]) : layer.getLatLng(),
            name: layer.name || '',
            logistics: layer.logistics || '',
            surface: layer.surface || '',
            description: layer.description || '',
            provider: layer.provider || '',
            service: layer.service || '',
            category: layer.category || 'default',
        };

        const index = this.shapesData.findIndex(
            (shape) =>
                JSON.stringify(shape.coordinates) === JSON.stringify(shapeData.coordinates)
        );

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

    loadShapesFromFile(event, getPrestataire) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const shapesData = JSON.parse(e.target.result);
            this.shapesData = shapesData;
            this.reloadShapesOnMap(getPrestataire);
        };

        reader.readAsText(file);
    },

    removeShape(layer) {
        this.featureGroup.removeLayer(layer);

        const index = this.shapesData.findIndex(
            (shape) =>
                JSON.stringify(shape.coordinates) === JSON.stringify(layer.getLatLngs ? layer.getLatLngs() : layer.getLatLng())
        );

        if (index !== -1) {
            this.shapesData.splice(index, 1);
        }
    }
}
;
