import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import {mapActions} from "vuex";

export default {
    ...mapActions("shapes", ["getAllShapes"]),

    initMap(onPopupOpen, getPrestataire, locale) {
        const southWest = L.latLng(47.972299, 0.186179);
        const northEast = L.latLng(47.935713, 0.234561);
        const bounds = L.latLngBounds(southWest, northEast);

        const map = L.map('map', {
            maxBounds: bounds,
            maxBoundsViscosity: 0.7,
            minZoom: 15,
            maxZoom: 18,
            zoomControl: false,  // Désactive le contrôle de zoom par défaut
        }).setView([47.95, 0.23], 15);

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
        this.initDrawTools(map, onPopupOpen, getPrestataire, locale);
    },

    initDrawTools(map, onPopupOpen, getPrestataire, locale) {
        const drawControl = new L.Control.Draw({
            edit: false,
            draw: {
                polygon: false,
                circle: false,
                marker: false,
                circlemarker: false,
                polyline: false,
                rectangle: false,
            },
        });

        // Définir la position en bas à gauche
        drawControl.setPosition('bottomleft');

        // Ajouter le contrôle à la carte
        map.addControl(drawControl);

        // map.on('draw:created', (event) => {
        //     const layer = event.layer;
        //     layer.category = 'default'; // Catégorie par défaut
        //     this.featureGroup.addLayer(layer);
        //     this.applyCategoryStyle(layer);
        //     this.saveShape(layer);
        //     this.addPopupToShape(layer, getPrestataire);
        // });
        //
        // map.on('draw:deleted', (event) => {
        //     event.layers.eachLayer((layer) => {
        //         this.removeShape(layer);
        //     });
        // });

        map.on('popupopen', (event) => {
            const layer = event.popup._source;
            if (layer) {
                onPopupOpen(layer);
                this.fillPopupWithData(layer, getPrestataire);
            }
        });
    },

    reloadShapesOnMap(getPrestataire, locale) {
        this.featureGroup.clearLayers();

        this.getShapes.forEach((shape) => {
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
                layer.shape_id = shape.shape_id || -1;
                layer.coordinates = shape.coordinates;
                layer.category = shape.category || 'default';
                layer.name = shape.name || '';
                layer.logistics = shape.logistics || '';
                layer.surface = shape.surface || '';
                layer.description = shape.description || '';
                layer.provider = shape.provider || '';
                layer.service = shape.service || '';

                // Ajouter la couche au groupe de caractéristiques
                this.featureGroup.addLayer(layer);

                // Appliquer le style basé sur la catégorie
                this.applyCategoryStyle(layer);

                // Ajouter un popup avec les informations
                this.addPopupToShape(layer, getPrestataire, locale);
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

    addPopupToShape(layer, getPrestataire, locale) {
        let popupContent = '';
        const presta = layer?.provider ? getPrestataire(layer.provider) : null;

        // Vérifiez si presta.name est une chaîne avant d'appliquer toLowerCase et replace
        let prestaLink = '';
        if (presta?.name && typeof presta.name === 'string') {
            prestaLink = encodeURIComponent(presta.name.toLowerCase().replace(/\W/g, ''));

            popupContent = `
                <div>
                    <h2 class="w-full p-1 text-sm font-extrabold"> ${layer.name || 'Emplacement vide'} </h2>
                    <p class="w-full text-sm">${layer.description || 'Aucune'}  </p>
                    <p class="w-full text-sm"><span class="text-sm font-bold">Logistique :</span> ${layer.logistics || 'Aucune logistique'}  </p>
                    <p class="w-full text-sm"><span class="text-sm font-bold">Surface :</span> ${layer.surface || 'Aucune surface'} m² </p>
                    <p class="w-full text-sm"><span class="text-sm font-bold">Prestataire :</span> ${presta?.name || 'Aucun prestataire'}  </p>
                    <p class="w-full text-sm"><span class="text-sm font-bold">Service :</span> ${layer.service || 'Aucun service'}  </p>
                    <a href="/${locale}/prestataire/${prestaLink}" class="text-blue-500">
                        <button class="bg-blue-500 text-sm text-gray-100 rounded-md px-6 py-2 hover:bg-blue-400 transition-opacity duration-700 hover:opacity-100">
                            Voir la page associée
                        </button>
                    </a>
                </div>
            `;
        } else {
            popupContent = `
                <div>
                    <h2 class="w-full p-1 text-sm font-extrabold"> ${layer.name || 'Emplacement vide'} </h2>
                    <p class="w-full text-sm">${layer.description || 'Aucune description'}  </p>
                    <p class="w-full text-sm"><span class="text-sm font-bold">Logistique :</span> ${layer.logistics || 'Aucune logistique'}  </p>
                    <p class="w-full text-sm"><span class="text-sm font-bold">Surface :</span> ${layer.surface || 'Aucune surface'} </p>
                    <p class="w-full text-sm"><span class="text-sm font-bold">Prestataire :</span> ${presta?.name || 'Aucun prestataire'}  </p>
                    <p class="w-full text-sm"><span class="text-sm font-bold">Service :</span> ${layer.service || 'Aucun service'}  </p>
                </div>
            `;
        }
        layer.bindPopup(popupContent);
    },

    fillPopupWithData(layer) {
        const fields = [
            {id: 'name', property: 'name'},
            {id: 'logistics', property: 'logistics'},
            {id: 'surface', property: 'surface'},
            {id: 'description', property: 'description'},
            {id: 'provider', property: 'provider'},
            {id: 'service', property: 'service'},
            {id: 'category', property: 'category'},
        ];

        fields.forEach(({id, property}) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = layer[property];
            }
        });
    },
};
