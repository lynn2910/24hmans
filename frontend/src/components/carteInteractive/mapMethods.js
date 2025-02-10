import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import {mapActions} from "vuex";

const INITIAL_SMALL_ICON_SIZE = [0, 0];
const INITIAL_LARGE_ICON_SIZE = [0, 0];


export default {
    ...mapActions("shapes", ["getAllShapes", "addShape", "deleteShape", "updateShape", "getAllShapesFromFile"]),

    initMap(onPopupOpen, getPrestataire) {
        const southWest = L.latLng(47.972299, 0.186179);
        const northEast = L.latLng(47.935713, 0.234561);
        const bounds = L.latLngBounds(southWest, northEast);

        const map = L.map('map', {
            maxBounds: bounds,
            maxBoundsViscosity: 0.7,
            minZoom: 12,
            maxZoom: 18,
            zoomControl: false,  // Désactive le contrôle de zoom par défaut
        }).setView([47.955, 0.212], 16);

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
                circle: false,
                marker: true,
                circlemarker: false,
                polyline: true,
                rectangle: true,
            },
        });

        // Définir la position en bas à gauche
        drawControl.setPosition('bottomleft');

        // Ajouter le contrôle à la carte
        map.addControl(drawControl);

        const markerIcons = {
            // SERVICES
            "ballon_service": "/markers/ballonMarker.png",
            "karting_service": "/markers/kartingMarker.png",
            "raceCar_service": "/markers/raceCarMarker.png",
            "village_service": "/markers/village_service.png",

            // DECORATIONS
            "camping": "/markers/campingMarker.png",
            "toilet": "/markers/toiletMarker.png",
            "interdit": "/markers/interditMarker.png",
            "parking": "/markers/parkingMarker.png",

            // PRESTATAIRES
            "codeky_presta": "/markers/codeky_presta.png",
            "ferrari_presta": "/markers/ferrari_presta.png",
            "karting_presta": "/markers/karting_presta.png",
            "montgolfiere_presta": "/markers/montgolfiere_presta.png",
            "organisateurs_presta": "/markers/organisateurs_presta.png",
            "porsche_presta": "/markers/porsche_presta.png",
        };

        map.on('zoomend', () => {
            this.updateMarkerIconSizes(map.getZoom());
        });

        map.on('draw:created', (event) => {
            const layer = event.layer;

            if (event.layerType === 'marker') {
                // Demander à l'utilisateur de choisir une catégorie
                const categories = Object.keys(markerIcons).join(" | ");
                const chosenCategory = prompt(`Choisissez une catégorie d'icône pour le marker : \n\n ${categories}`);

                // Vérifier la catégorie choisie et définir l'icône par défaut
                const iconUrl = markerIcons[chosenCategory] || markerIcons["village"];

                // Déterminer si l'icône doit être petite ou grande
                const isShortIcon = [
                    "porsche_presta", "organisateurs_presta", "montgolfiere_presta",
                    "karting_presta", "ferrari_presta", "codeky_presta"
                ].some(keyword => iconUrl.includes(keyword));

                const isSmallIcon = [
                    "parking", "camping", "interdit"
                ].some(keyword => iconUrl.includes(keyword));

                const isLargeIcon = [
                    "ballon_service", "karting_service",
                    "raceCar_service", "village_service"
                ].some(keyword => iconUrl.includes(keyword));

                // Appliquer la bonne taille d'icône dès la création
                const iconSize = isShortIcon ? [15, 15] : isSmallIcon ? [30, 30] : isLargeIcon ? [50, 50] : [0, 0];
                const icon = L.icon({iconUrl, iconSize});

                // Appliquer l'icône au marqueur
                layer.setIcon(icon);
                layer.iconUrl = iconUrl;
            }

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

        map.on('draw:edited', (event) => {
            event.layers.eachLayer((layer) => {
                this.updatedShape(layer, getPrestataire);
            })
        })

        map.on('popupopen', (event) => {
            const layer = event.popup._source;
            if (layer) {
                onPopupOpen(layer);
                this.fillPopupWithData(layer, getPrestataire);
            }
        });
    },

    updateMarkerIconSizes(zoomLevel) {
        const shortSizes = {
            12: [0, 0], 13: [0, 0], 14: [0, 0], 15: [0, 0],
            16: [15, 15], 17: [25, 25], 18: [35, 35]
        };

        const smallSizes = {
            12: [0, 0], 13: [0, 0], 14: [8, 8], 15: [15, 15],
            16: [30, 30], 17: [50, 50], 18: [60, 60]
        };

        const largeSizes = {
            12: [10, 10], 13: [20, 20], 14: [40, 40], 15: [50, 50],
            16: [60, 60], 17: [80, 80], 18: [100, 100]
        };

        this.featureGroup.eachLayer((layer) => {
            if (layer instanceof L.Marker && layer.iconUrl) {
                const iconUrl = layer.iconUrl;

                const isShortIcon = [
                    "porsche_presta", "organisateurs_presta", "montgolfiere_presta",
                    "karting_presta", "ferrari_presta", "codeky_presta"
                ].some(keyword => iconUrl.includes(keyword));

                const isSmallIcon = [
                    "parking", "camping", "interdit"
                ].some(keyword => iconUrl.includes(keyword));

                const isLargeIcon = [
                    "ballon_service", "karting_service",
                    "raceCar_service", "village_service"
                ].some(keyword => iconUrl.includes(keyword));

                let iconSize;

                if (isShortIcon) {
                    iconSize = shortSizes[zoomLevel] || [10, 10];
                } else if (isSmallIcon) {
                    iconSize = smallSizes[zoomLevel] || [15, 15];
                } else {
                    iconSize = largeSizes[zoomLevel] || [25, 25];
                }

                const newIcon = L.icon({
                    iconUrl: layer.iconUrl,
                    iconSize: iconSize,
                });

                layer.setIcon(newIcon);
            }
        });
    },

    reloadShapesOnMap(getPrestataire) {
        this.featureGroup.clearLayers();

        this.getShapes.forEach((shape) => {
            let layer = null;


            if (shape.type === 'marker') {
                const isShortIcon = ["porsche_presta", "organisateurs_presta", "montgolfiere_presta", "karting_presta", "ferrari_presta", "codeky_presta"].some(keyword => shape.iconUrl.includes(keyword));
                const isSmallIcon = ["parking", "camping", "interdit"].some(keyword => shape.iconUrl.includes(keyword));
                const isLargeIcon = ["ballon_service", "karting_service", "raceCar_service", "village_service"].some(keyword => shape.iconUrl.includes(keyword));

                const initialSize = isShortIcon ? [15, 15] : isSmallIcon ? [30, 30] : isLargeIcon ? [50, 50] : [0, 0];

                const icon = L.icon({
                    iconUrl: shape.iconUrl || "/markers/toiletMarker.png",
                    iconSize: initialSize,
                });
                layer = L.marker(shape.coordinates, {icon});

                // Vérification du type de forme
            } else if (Array.isArray(shape.coordinates[0])) {
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
                layer.iconUrl = shape.iconUrl || '';
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
        if (!layer.iconUrl && layer.iconUrl === "") {
            const popupContent = `
                <h2 class="w-full p-1 text-sm font-extrabold"> ${layer.name || 'Emplacement vide'} </h2>
            
                <div class="ml-2 mr-2 mt-0">
                  <p class="w-full text-sm">Logistique : ${layer.logistics || 'Aucune logistique'}  </p>
                  <p class="w-full text-sm">Surface (m²) : ${layer.surface || 'Aucune surface'}  </p>
                  <p class="w-full text-sm">Description : ${layer.description || 'Aucune description'}  </p>
                  <p class="w-full text-sm">Prestataire : ${layer?.provider ? getPrestataire(layer.provider)?.name || "ERROR" : 'Aucun prestataire'}  </p>
                  <p class="w-full text-sm">Service associé : ${layer.service || 'Aucun service'}  </p>
                  <p class="w-full text-sm">Catégorie : ${layer.category || 'default'}  </p>
                </div>
            `;
            layer.bindPopup(popupContent);
        }
    },

    fillPopupWithData(layer) {
        const fields = [
            {id: 'name', property: 'name'},
            {id: 'logistics', property: 'logistics'},
            {id: 'surface', property: 'surface'},
            {id: 'description', property: 'description'},
            {id: 'prestataires', property: 'provider'},
            {id: 'services', property: 'service'},
            {id: 'category', property: 'category'},
        ];

        fields.forEach(({id, property}) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = layer[property];
            }
        });
    },

    saveShape(layer) {
        const shapeData = {
            type: layer instanceof L.Marker ? 'marker' : layer instanceof L.Circle ? 'circle' : 'polygon',
            coordinates: layer.getLatLng ? layer.getLatLng() : layer.getLatLngs(),
            iconUrl: layer.iconUrl || '',
            radius: layer instanceof L.Circle ? layer.getRadius() : undefined,
        };
        this.addShape(shapeData);
    },

    async updatedShape(layer, getPrestataire) {
        let updatedShape;
        if (layer.iconUrl !== '') {
            // "type":"marker","coordinates":{"lat":47.953072376516126,"lng":0.2018051144841593},"iconUrl":"/markers/villageMarker.png","shape_id":70}
            updatedShape = {
                type: 'marker',
                coordinates: layer.getLatLng(),
                iconUrl: layer.iconUrl,
                shape_id: layer.shape_id,
            };

        } else {
            // {"shape_id":62,"type":"shape","coordinates":[[{"lat":47.953746553497886,"lng":0.2087509632110596},{"lat":47.953746553497886,"lng":0.20850419998168948},{"lat":47.953484284757586,"lng":0.20850956439971924},{"lat":47.95348069202586,"lng":0.20857930183410647},{"lat":47.95353099024711,"lng":0.2085953950881958},{"lat":47.95352739751865,"lng":0.20874023437500003}]],"name":"Boutique Codeky","logistics":"Aire de jeu, Boutique, Fast Food","surface":"125","description":"Retrouvez tous ce qu'il vous faut au sein du village des 24H du Mans, boutique, fast food, aire de repos et de jeux.","provider":"0b7956e6-1262-49f7-aaab-c5ab60d16cba","service":"","category":"boutique"}
            updatedShape = {
                shape_id: layer.shape_id,
                coordinates: layer.getLatLngs ?
                    (Array.isArray(layer.getLatLngs())
                        ? layer.getLatLngs()
                        : [layer.getLatLngs()])
                    : layer.getLatLng(),
                iconUrl: layer.iconUrl || '',
                name: layer.name || '',
                logistics: layer.logistics || '',
                surface: layer.surface || '',
                description: layer.description || '',
                provider: layer.provider || '',
                service: layer.service || '',
                category: layer.category || 'default',
            };
        }

        try {
            await this.updateShape(updatedShape);
            this.reloadShapesOnMap(getPrestataire)
        } catch (error) {
            console.error('Erreur lors de la mise à jour des coordonnées de la shape:', error);
        }
    },

    saveAllShapes() {
        const dataToSave = JSON.stringify(this.getShapes);
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
            this.getAllShapesFromFile(JSON.parse(e.target.result));
            this.reloadShapesOnMap(getPrestataire);
        };

        reader.readAsText(file);
    },

    removeShape(layer) {
        this.featureGroup.removeLayer(layer);
        const shapeId = layer.shape_id || null;
        if (shapeId) {
            this.deleteShape(shapeId);
        }
    }
};
