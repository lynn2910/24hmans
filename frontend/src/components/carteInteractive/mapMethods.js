import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import * as turf from '@turf/turf';

import {mapActions} from "vuex";


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
            zoomControl: false,
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
                polyline: false,
                rectangle: true,
            },
        });

        drawControl.setPosition('bottomleft');

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

        let originalEditStates = new Map();

        map.on('draw:editstart', () => {
            originalEditStates.clear();
            this.featureGroup.eachLayer(layer => {
                if (layer.shape_id) {
                    originalEditStates.set(layer.shape_id, {
                        latlngs: layer instanceof L.Marker ?
                            layer.getLatLng() :
                            JSON.parse(JSON.stringify(layer.getLatLngs()))
                    });
                }
            });
        });

        map.on('draw:created', (event) => {
            const layer = event.layer;

            if (event.layerType === 'marker') {
                this.addMarker(event);
            }

            if (event.layerType !== 'marker') {
                try {
                    layer.getBounds();
                } catch (e) {
                    console.error("Nouvelle layer invalide:", e);
                    map.removeLayer(layer);
                    return;
                }

                let hasOverlap = false;
                this.featureGroup.eachLayer((existingLayer) => {
                    if (existingLayer && existingLayer.getBounds &&
                        this.checkOverlap(layer, existingLayer)) {
                        hasOverlap = true;
                    }
                });

                if (hasOverlap) {
                    map.removeLayer(layer);
                    this.showStyledAlert("Les formes ne peuvent pas se chevaucher !");
                    return;
                }
            }

            this.featureGroup.addLayer(layer);
            this.applyCategoryStyle(layer);
            this.saveShape(layer, getPrestataire);
            this.addPopupToShape(layer, getPrestataire);
        });

        map.on('draw:deleted', (event) => {
            event.layers.eachLayer((layer) => {
                this.removeShape(layer, getPrestataire);
            });
        });

        map.on('draw:edited', (event) => {
            let hasInvalidEdit = false;

            event.layers.eachLayer((editedLayer) => {
                let hasOverlap = false;

                // Vérifier avec toutes les autres couches
                this.featureGroup.eachLayer((otherLayer) => {
                    if (otherLayer !== editedLayer && this.checkOverlap(editedLayer, otherLayer)) {
                        hasOverlap = true;
                    }
                });

                if (hasOverlap) {
                    hasInvalidEdit = true;
                    const original = originalEditStates.get(editedLayer.shape_id);

                    if (original) {
                        if (editedLayer instanceof L.Marker) {
                            editedLayer.setLatLng(original.latlngs);
                        } else {
                            editedLayer.setLatLngs(original.latlngs);
                        }

                        editedLayer.redraw();

                        this.applyCategoryStyle(editedLayer);
                    }
                }
            });

            if (hasInvalidEdit) {
                this.showStyledAlert("Modification impossible - chevauchement détecté");
                this.featureGroup.fire('update');
            } else {
                event.layers.eachLayer((layer) => {
                    this.updatedShape(layer, getPrestataire);
                });
            }
        });

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
        console.log("featureGroup", this.featureGroup)
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

            } else if (Array.isArray(shape.coordinates[0])) {
                layer = L.polygon(shape.coordinates);
            } else if (shape.coordinates.lat && shape.coordinates.lng) {
                if (shape.radius) {
                    layer = L.circle([shape.coordinates.lat, shape.coordinates.lng], {radius: shape.radius});
                } else {
                    layer = L.marker([shape.coordinates.lat, shape.coordinates.lng]);
                }
            } else if (Array.isArray(shape.coordinates)) {
                layer = L.polyline(shape.coordinates);
            }

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

                this.featureGroup.addLayer(layer);
                this.applyCategoryStyle(layer);
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
        if (!getPrestataire) throw new Error("getPrestataire must be a function");

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

    async saveShape(layer, getPrestataire) {
        const shapeData = {
            type: layer instanceof L.Marker ? 'marker' : 'shape',
            coordinates: layer.getLatLng ? layer.getLatLng() : layer.getLatLngs(),
            iconUrl: layer.iconUrl || '',
        };
        await this.addShape(shapeData);
        await this.getAllShapes();
        this.reloadShapesOnMap(getPrestataire);
    },

    async updatedShape(layer, getPrestataire) {
        let updatedShape;
        if (layer.iconUrl !== '') {
            updatedShape = {
                type: 'marker',
                coordinates: layer.getLatLng(),
                iconUrl: layer.iconUrl,
                shape_id: layer.shape_id,
                name: layer.name || '',
                logistics: layer.logistics || '',
                surface: layer.surface || '',
                description: layer.description || '',
                provider: layer.provider || null,
                service: layer.service || '',
                category: layer.category || '',
            };

        } else {
            updatedShape = {
                type: 'shape',
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
                provider: layer.provider || null,
                service: layer.service || '',
                category: layer.category || 'default',
            };
        }

        try {
            await this.updateShape(updatedShape)
            await this.getAllShapes();
            this.reloadShapesOnMap(getPrestataire);
        } catch (error) {
            console.error('Erreur lors de la mise à jour des coordonnées de la shape:', error);
        }
    },

    saveAllShapes() {
        this.getAllShapes();
        const dataToSave = JSON.stringify(this.getShapes);
        const blob = new Blob([dataToSave], {type: 'application/json'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'shapesData.json';
        link.click();
    },

    // TODO: non fonctionnel car on envoie pas les data a l'api
    //  (permet seulement la visualisation car si on touche a un
    //  shape alors on va reload l'api)
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
    },

    layerToTurfFeature(layer) {
        if (!layer) return null;

        try {
            if (layer instanceof L.Polygon) {
                const latLngs = layer.getLatLngs();
                if (!latLngs || latLngs.length === 0) return null;

                // Valider et corriger chaque anneau
                const coordinates = latLngs.map(ring => {
                    let points = ring.map(ll => [ll.lng, ll.lat]);

                    // Fermer l'anneau si nécessaire
                    if (points.length > 0 && !turf.booleanEqual(
                        turf.point(points[0]),
                        turf.point(points[points.length - 1])
                    )) {
                        points.push(points[0]);
                    }

                    // Vérifier le nombre minimum de points
                    if (points.length < 4) {
                        console.warn("Polygone invalide - moins de 4 points. Ajout de points fictifs.");
                        while (points.length < 4) {
                            points.push(points[0]);
                        }
                    }

                    return points;
                });

                return turf.polygon(coordinates);
            }
        } catch (e) {
            console.error("Erreur de conversion en feature Turf:", e);
            return null;
        }
    },

    checkOverlap(newLayer, existingLayer) {
        // Vérifier d'abord si les layers sont valides
        if (!newLayer || !existingLayer ||
            !newLayer.getBounds || !existingLayer.getBounds) {
            return false;
        }

        // Vérification rapide des bounding boxes
        try {
            if (!newLayer.getBounds().intersects(existingLayer.getBounds())) {
                return false;
            }
        } catch (e) {
            console.error("Erreur lors de la vérification des bounds:", e);
            return false;
        }

        // Conversion en features Turf.js
        const newFeature = this.layerToTurfFeature(newLayer);
        const existingFeature = this.layerToTurfFeature(existingLayer);

        if (!newFeature || !existingFeature) return false;

        // Vérification précise du chevauchement
        return turf.booleanOverlap(newFeature, existingFeature) ||
            turf.booleanContains(newFeature, existingFeature) ||
            turf.booleanContains(existingFeature, newFeature);
    },
};
