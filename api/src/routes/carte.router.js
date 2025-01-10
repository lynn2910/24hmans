const {Router} = require('express');
// let uuidv4 = require("uuid").v4;
const CarteService = require("../services/carte.service");

const routerCarte = new Router();
// const userMildelware = require("../middlewares/user.middleware");
// const prestataireMildelware = require("../middlewares/prestataire.middleware");
// const adminMildelware = require("../middlewares/admin.middleware");


//
//
//    CARTE INTERACTIVE
//
//

/**
 * @swagger
 * components:
 *      schemas:
 *           Shape:
 *               type: object
 *               properties:
 *                   shape_id:
 *                       type: integer
 *                       description: The unique identifier of the shape.
 *                   name:
 *                       type: string
 *                       nullable: true
 *                       description: The name of the shape.
 *                   logistics:
 *                       type: string
 *                       nullable: true
 *                       description: The logistics of the shape.
 *                   surface:
 *                       type: string
 *                       nullable: true
 *                       description: The surface area of the shape.
 *                   description:
 *                       type: string
 *                       nullable: true
 *                       description: A description of the shape.
 *                   provider:
 *                       type: string
 *                       nullable: true
 *                       description: The provider identifier related to the shape.
 *                   service:
 *                       type: string
 *                       nullable: true
 *                       description: The service related to the shape.
 *                   category:
 *                       type: string
 *                       nullable: true
 *                       description: The category of the shape.
 *                   point:
 *                       type: array
 *                       items:
 *                           $ref: '#/components/schemas/Point'
 *                       description: List of points related to this shape.
 *                   prestataire:
 *                       $ref: '#/components/schemas/Prestataire'
 *                       nullable: true
 *                       description: The provider (prestataire) related to this shape.
 *
 *           Point:
 *               type: object
 *               required:
 *                   - point_id
 *                   - lat
 *                   - lng
 *                   - shape_id
 *               properties:
 *                   point_id:
 *                       type: integer
 *                       description: The unique identifier of the point.
 *                   lat:
 *                       type: number
 *                       format: decimal
 *                       description: The latitude of the point.
 *                   lng:
 *                       type: number
 *                       format: decimal
 *                       description: The longitude of the point.
 *                   shape_id:
 *                       type: integer
 *                       description: The identifier of the associated shape.
 *                   shape:
 *                       $ref: '#/components/schemas/Shape'
 *                       description: The shape that this point belongs to.
 */

/**
 * @swagger
 * /carte/shapes:
 *   get:
 *     tags:
 *       - Carte
 *     summary: Obtient toutes les zones disponibles sur la carte
 *     description: "Retourne la liste des zones et leurs informations associées (points, logistique, description, etc.)."
 *     responses:
 *       200:
 *         description: "Liste des zones disponibles"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   shape_id:
 *                     type: integer
 *                     description: "Identifiant unique de la zone (shape)"
 *                   type:
 *                     type: string
 *                     description: "Type de la donnée (par exemple : 'shape')"
 *                   coordinates:
 *                     type: array
 *                     description: "Liste des ensembles de points définissant la zone"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           lat:
 *                             type: number
 *                             format: float
 *                             description: "Latitude du point"
 *                           lng:
 *                             type: number
 *                             format: float
 *                             description: "Longitude du point"
 *                   name:
 *                     type: string
 *                     description: "Nom de la zone"
 *                   logistics:
 *                     type: string
 *                     description: "Ressources logistiques disponibles dans la zone"
 *                   surface:
 *                     type: string
 *                     description: "Surface de la zone en mètres carrés"
 *                   description:
 *                     type: string
 *                     description: "Description détaillée de la zone"
 *                   provider:
 *                     type: string
 *                     description: "Identifiant du fournisseur ou responsable de la zone"
 *                   service:
 *                     type: string
 *                     description: "Services disponibles dans la zone"
 *                   category:
 *                     type: string
 *                     description: "Catégorie de la zone"
 *       404:
 *         description: "Aucune zone trouvée pour la requête"
 *       500:
 *         description: "Erreur interne du serveur - Impossible de récupérer les données des zones"
 */
routerCarte.get("/shapes", async (req, res) => {
    try {
        const areas = await CarteService.getAllAreas();

        if (!areas || areas.length === 0) {
            return res.status(404).json({message: "Aucune zone trouvée."});
        }

        res.status(200).json(areas)
    } catch (err) {
        res.status(500).json({message: "Error while getting all areas: " + err.message});
    }
});

/**
 * @swagger
 * /carte/shapes:
 *   post:
 *     tags:
 *       - Carte
 *     summary: "Ajoute une nouvelle zone"
 *     description: "Permet d'ajouter une nouvelle zone en fournissant ses informations complètes, telles que les coordonnées, le nom, la logistique, la surface, la description, le fournisseur, le service et la catégorie."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coordinates
 *               - name
 *               - logistics
 *               - surface
 *               - description
 *               - provider
 *               - service
 *               - category
 *             properties:
 *               coordinates:
 *                 type: array
 *                 description: "Liste des ensembles de points définissant la zone (latitude, longitude)."
 *                 items:
 *                   type: object
 *                   properties:
 *                     lat:
 *                       type: number
 *                       format: float
 *                       description: "Latitude du point"
 *                     lng:
 *                       type: number
 *                       format: float
 *                       description: "Longitude du point"
 *               name:
 *                 type: string
 *                 description: "Nom de la zone"
 *               logistics:
 *                 type: string
 *                 description: "Ressources logistiques disponibles dans la zone"
 *               surface:
 *                 type: string
 *                 description: "Surface de la zone en mètres carrés"
 *               description:
 *                 type: string
 *                 description: "Description détaillée de la zone"
 *               provider:
 *                 type: string
 *                 nullable: true
 *                 description: "Identifiant du fournisseur ou responsable de la zone (peut être null)"
 *               service:
 *                 type: string
 *                 description: "Services disponibles dans la zone (peut être vide)"
 *               category:
 *                 type: string
 *                 description: "Catégorie de la zone"
 *           examples:
 *             example1:
 *               summary: "Exemple de JSON"
 *               value:
 *                 coordinates:
 *                   - [
 *                       { "lat": 47.94976405693712, "lng": 0.2070558071136475 },
 *                       { "lat": 47.949426314751214, "lng": 0.20706117153167725 },
 *                       { "lat": 47.94942990776481, "lng": 0.2071630954742432 },
 *                       { "lat": 47.94977124291711, "lng": 0.2071577310562134 }
 *                     ]
 *                 name: "Zone ajoutée"
 *                 logistics: "Pas encore défini"
 *                 surface: "X m2"
 *                 description: "Description initialisé."
 *                 provider: null
 *                 service: ""
 *                 category: "default"
 *     responses:
 *       200:
 *         description: "La zone a été ajoutée avec succès."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shape_id:
 *                   type: integer
 *                   description: "Identifiant unique de la zone"
 *                 coordinates:
 *                   type: array
 *                   description: "Liste des ensembles de points définissant la zone"
 *                   items:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         description: "Latitude du point"
 *                       lng:
 *                         type: number
 *                         description: "Longitude du point"
 *                 name:
 *                   type: string
 *                   description: "Nom de la zone"
 *                 logistics:
 *                   type: string
 *                   description: "Ressources logistiques disponibles dans la zone"
 *                 surface:
 *                   type: string
 *                   description: "Surface de la zone en mètres carrés"
 *                 description:
 *                   type: string
 *                   description: "Description détaillée de la zone"
 *                 provider:
 *                   type: string
 *                   nullable: true
 *                   description: "Identifiant du fournisseur ou responsable de la zone (peut être null)"
 *                 service:
 *                   type: string
 *                   description: "Services disponibles dans la zone"
 *                 category:
 *                   type: string
 *                   description: "Catégorie de la zone"
 *         examples:
 *           success:
 *             value:
 *               shape_id: 1
 *               coordinates:
 *                 - { "lat": 47.94976405693712, "lng": 0.2070558071136475 }
 *                 - { "lat": 47.949426314751214, "lng": 0.20706117153167725 }
 *                 - { "lat": 47.94942990776481, "lng": 0.2071630954742432 }
 *                 - { "lat": 47.94977124291711, "lng": 0.2071577310562134 }
 *               name: "Zone ajoutée"
 *               logistics: "Pas encore défini"
 *               surface: "X m2"
 *               description: "Description initialisé."
 *               provider: null
 *               service: ""
 *               category: "default"
 *       400:
 *         description: "Données manquantes ou incorrectes dans la requête (par exemple, coordonnées invalides ou champs requis manquants)."
 *       404:
 *         description: "Impossible de créer la zone. Vérifiez vos données."
 *       500:
 *         description: "Erreur interne du serveur - Impossible d'ajouter la zone."
 */
routerCarte.post("/shapes", async (req, res) => {
    try {
        const {
            coordinates,
            name,
            logistics,
            surface,
            description,
            provider,
            service,
            category
        } = req.body;

        if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0 ||
            !coordinates.every(coordGroup => Array.isArray(coordGroup) && coordGroup.every(point =>
                point.lat && point.lng && typeof point.lat === "number" && typeof point.lng === "number"
            )) ||
            !name || !logistics || !surface || !description || !category) {
            return res.status(400).json({
                message: "Données manquantes ou incorrectes. Assurez-vous que tous les champs requis sont remplis et que les coordonnées sont correctement formatées."
            });
        }

        const flattenedCoordinates = coordinates.flat();

        const newArea = await CarteService.addArea(flattenedCoordinates, name, logistics, surface, description, provider, service, category);

        if (!newArea) {
            return res.status(404).json({
                message: "Impossible de créer la zone. Veuillez vérifier vos données."
            });
        }
        res.status(200).json(newArea);
    } catch (err) {
        res.status(500).json({message: "Erreur lors de l'ajout de la zone : " + err.message});
    }
});

/**
 * @swagger
 * /carte/shapes/{id}:
 *   get:
 *     tags:
 *       - Carte
 *     summary: Récupère les détails d'une zone spécifique par ID
 *     description: "Retourne les informations complètes d'une zone (points, logistique, description, etc.) en fonction de son identifiant unique (shape_id)."
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "Identifiant unique de la zone (shape_id)"
 *         schema:
 *            type: integer
 *            example: 42
 *     responses:
 *       200:
 *         description: "Détails de la zone demandée"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shape_id:
 *                   type: integer
 *                   description: "Identifiant unique de la zone"
 *                 type:
 *                   type: string
 *                   description: "Type de la donnée (par exemple : 'shape')"
 *                 coordinates:
 *                   type: array
 *                   description: "Liste des ensembles de points définissant la zone"
 *                   items:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         format: float
 *                         description: "Latitude du point"
 *                       lng:
 *                         type: number
 *                         format : float
 *                         description: "Longitude du point"
 *                 name:
 *                   type: string
 *                   description: "Nom de la zone"
 *                 logistics:
 *                   type: string
 *                   description: "Ressources logistiques disponibles dans la zone"
 *                 surface:
 *                   type: string
 *                   description: "Surface de la zone en mètres carrés"
 *                 description:
 *                   type: string
 *                   description: "Description détaillée de la zone"
 *                 provider:
 *                   type: string
 *                   description: "Identifiant du fournisseur ou responsable de la zone"
 *                 service:
 *                   type: string
 *                   description: "Services disponibles dans la zone"
 *                 category:
 *                   type: string
 *                   description: "Catégorie de la zone"
 *           examples:
 *             success:
 *               value:
 *                 shape_id: 1
 *                 type: "shape"
 *                 coordinates:
 *                   - point_id: 1
 *                     lat: "47.94976405693712"
 *                     lng: "0.2070558071136475"
 *                   - point_id: 2
 *                     lat: "47.949426314751214"
 *                     lng: "0.20706117153167725"
 *                   - point_id: 3
 *                     lat: "47.94942990776481"
 *                     lng: "0.2071630954742432"
 *                   - point_id: 4
 *                     lat: "47.94977124291711"
 *                     lng: "0.2071577310562134"
 *                 name: "Tribune 22"
 *                 logistics: "Sièges, Personnel"
 *                 surface: "100"
 *                 description: "Tribune accueillant les spectateurs des 24H du Mans."
 *                 provider: "af3a0f62-5b13-4b19-9d42-736870b268a0"
 *                 service: "Billetterie"
 *                 category: "tribunes"
 *       400:
 *         description: "Identifiant invalide. Assurez-vous de fournir un ID valide."
 *       404:
 *         description: "Zone non trouvée pour l'identifiant donné."
 *       500:
 *         description: "Erreur interne du serveur - Impossible de récupérer les données"
 */
routerCarte.get("/shapes/:id", async (req, res) => {
    const areaId = parseInt(req.params.id);

    if (isNaN(areaId) || areaId <= 0) {
        return res.status(400).json({
            message: "Identifiant de la zone invalide. Veuillez fournir un ID valide."
        });
    }

    try {
        const area = await CarteService.getAreaFromId(parseInt(req.params.id));

        if (!area) {
            return res.status(404).json({
                message: "Aucune zone trouvée pour l'identifiant donné."
            });
        }

        res.status(200).json(area)
    } catch (err) {
        res.status(500).json({message: "Error while getting area: " + err.message});
    }
});

/**
 * @swagger
 * /carte/shapes/{id}:
 *   delete:
 *     tags:
 *       - Carte
 *     summary: "Supprime une zone par son identifiant"
 *     description: "Permet de supprimer une zone en fournissant son identifiant unique (shape_id)."
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "Identifiant unique de la zone à supprimer"
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: "La zone a été supprimée avec succès."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Message de succès"
 *                 deletedArea:
 *                   type: object
 *                   description: "Les détails de la zone supprimée"
 *                   properties:
 *                     shape_id:
 *                       type: integer
 *                       description: "Identifiant unique de la zone"
 *                     name:
 *                       type: string
 *                       description: "Nom de la zone"
 *                     logistics:
 *                       type: string
 *                       description: "Ressources logistiques disponibles dans la zone"
 *                     surface:
 *                       type: string
 *                       description: "Surface de la zone en mètres carrés"
 *                     description:
 *                       type: string
 *                       description: "Description détaillée de la zone"
 *                     provider:
 *                       type: string
 *                       description: "Identifiant du fournisseur ou responsable de la zone"
 *                     service:
 *                       type: string
 *                       description: "Services disponibles dans la zone"
 *                     category:
 *                       type: string
 *                       description: "Catégorie de la zone"
 *       400:
 *         description: "L'identifiant de la zone est manquant ou incorrect"
 *       404:
 *         description: "Aucune zone trouvée avec l'identifiant donné"
 *       500:
 *         description: "Erreur interne du serveur - Impossible de supprimer la zone"
 */
routerCarte.delete("/shapes/:id", async (req, res) => {
    try {
        const areaId = parseInt(req.params.id);

        if (isNaN(areaId)) {
            return res.status(400).json({
                message: "L'identifiant de la zone est manquant ou incorrect. Veuillez fournir un ID valide."
            });
        }

        const deletedArea = await CarteService.deleteArea(parseInt(req.params.id));

        if (!deletedArea) {
            return res.status(404).json({
                message: "Aucune zone trouvée avec l'identifiant donné."
            });
        }

        res.status(200).json({
            message: "Area successfully deleted",
            deletedArea: deletedArea,
        });

    } catch (err) {
        res.status(500).json({message: "Error while deleting area: " + err.message});
    }
});

/**
 * @swagger
 * /carte/shapes/{id}:
 *   put:
 *     tags:
 *       - Carte
 *     summary: "Met à jour une zone existante"
 *     description: "Permet de mettre à jour une zone avec de nouvelles informations. Les coordonnées peuvent être mises à jour si fournies."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "Identifiant unique de la zone à mettre à jour"
 *         schema:
 *           type: integer
 *           example: 42
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               logistics:
 *                 type: string
 *               surface:
 *                 type: string
 *               description:
 *                 type: string
 *               provider:
 *                 type: string
 *               service:
 *                 type: string
 *               category:
 *                 type: string
 *               coordinates:
 *                 type: array
 *                 description: "Liste des ensembles de points définissant la zone"
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         format: float
 *                       lng:
 *                         type: number
 *                         format: float
 *           examples:
 *             example1:
 *               summary: "Exemple de mise à jour avec coordonnées"
 *               value:
 *                 coordinates:
 *                  - [
 *                       { "lat": 47.94976405693712, "lng": 0.2070558071136475 },
 *                       { "lat": 47.949426314751214, "lng": 0.20706117153167725 },
 *                       { "lat": 47.94942990776481, "lng": 0.2071630954742432 },
 *                       { "lat": 47.94977124291711, "lng": 0.2071577310562134 }
 *                     ]
 *                 name: "Mise à jour de la Zone"
 *                 logistics: "Matériel1, Matériel2"
 *                 surface: "X m3"
 *                 description: "Ma nouvelle description."
 *                 provider: null
 *                 service: ""
 *                 category: "default"
 *             example2:
 *               summary: "Exemple de mise à jour sans coordonnées"
 *               value:
 *                 name: "Mise à jour de la Zone"
 *                 logistics: "Matériel1, Matériel2"
 *                 surface: "X m3"
 *                 description: "Ma nouvelle description."
 *                 provider: null
 *                 service: ""
 *                 category: "default"
 *     responses:
 *       200:
 *         description: "La zone a été mise à jour avec succès."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedArea:
 *                   type: object
 *                   properties:
 *                     shape_id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     coordinates:
 *                       type: array
 *                       description: "Liste des ensembles de points définissant la zone"
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             lat:
 *                               type: number
 *                               format: float
 *                             lng:
 *                               type: number
 *                               format: float
 *                     logistics:
 *                       type: string
 *                     surface:
 *                       type: string
 *                     description:
 *                       type: string
 *                     provider:
 *                       type: string
 *                     service:
 *                       type: string
 *                     category:
 *                       type: string
 *       400:
 *         description: "Données manquantes ou incorrectes"
 *       404:
 *         description: "Aucune zone trouvée avec l'identifiant donné."
 *       500:
 *         description: "Erreur interne du serveur"
 */
routerCarte.put("/shapes/:id", async (req, res) => {
    const {
        name,
        logistics,
        surface,
        description,
        provider,
        service,
        category,
        coordinates
    } = req.body;

    // Vérification de la présence des champs obligatoires
    if (!name || !logistics || !surface || !description || !category) {
        return res.status(400).json({
            message: "Données manquantes ou incorrectes. Assurez-vous que tous les champs requis sont remplis."
        });
    }

    if (coordinates) {
        try {
            const transformedCoordinates = coordinates.flat();
            req.body.coordinates = transformedCoordinates;

        } catch (err) {
            return res.status(400).json({
                message: "Erreur dans le format des coordonnées: " + err.message
            });
        }
    }

    try {
        // Construction des données de mise à jour
        const updatedData = {
            name,
            logistics,
            surface,
            description,
            provider,
            service,
            category,
            coordinates: req.body.coordinates,
        };

        // Tentative de mise à jour de la zone
        const updatedArea = await CarteService.updateArea(parseInt(req.params.id), updatedData);

        // Vérification si la mise à jour a échoué
        if (!updatedArea) {
            return res.status(404).json({
                message: "Aucune zone trouvée avec l'identifiant donné."
            });
        }

        // Retour de la réponse avec la zone mise à jour
        res.status(200).json(updatedArea);

    } catch (err) {
        // Gestion des erreurs serveur
        console.error("Error while updating area:", err);
        res.status(500).json({
            message: "Error while updating area: " + err.message
        });
    }
});


module.exports = routerCarte;