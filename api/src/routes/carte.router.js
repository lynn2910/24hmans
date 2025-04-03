const {Router} = require('express');
const CarteService = require("../services/carte.service");

const routerCarte = new Router();


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
 *     security:
 *       - bearerAuth: []
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
            type,
            coordinates,
            name,
            logistics,
            surface,
            description,
            provider,
            service,
            category,
            iconUrl
        } = req.body;

        if (!type || (type !== "shape" && type !== "marker")) {
            return res.status(400).json({message: "Le champ 'type' est requis et doit être 'shape' ou 'marker'."});
        }

        // if (
        //     (type === "shape" && (
        //         !Array.isArray(coordinates) || coordinates.length === 0 ||
        //         !coordinates.every(coordGroup =>
        //                 Array.isArray(coordGroup) && coordGroup.every(point =>
        //                     typeof point.lat === "number" && typeof point.lng === "number"
        //                 )
        //         )
        //     )) ||
        //     (type === "marker" && (
        //         !coordinates || typeof coordinates !== "object" ||
        //         typeof coordinates.lat !== "number" || typeof coordinates.lng !== "number"
        //     ))
        // ) {
        //     return res.status(400).json({
        //         message: "Les coordonnées sont incorrectes. Assurez-vous qu'elles sont correctement formatées en fonction du type."
        //     });
        // }

        const formattedCoordinates = type === "shape" ? coordinates.flat() : coordinates;

        const newArea = await CarteService.addArea(
            type,
            formattedCoordinates,
            name,
            logistics,
            surface,
            description,
            provider,
            service,
            category,
            iconUrl
        );

        if (!newArea) {
            return res.status(404).json({message: "Impossible de créer la zone. Veuillez vérifier vos données."});
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
    try {
        let {
            name,
            type,
            logistics,
            surface,
            description,
            provider,
            service,
            category,
            coordinates,
            shape_id
        } = req.body;

        coordinates = Array.isArray(coordinates[0]) ? coordinates.flat() : coordinates;

        const infos = {
            name,
            type,
            logistics,
            surface,
            description,
            provider,
            service,
            category,
            coordinates,
            shape_id
        };

        const updatedShape = await CarteService.updateArea(shape_id, infos);

        if (!updatedShape) {
            return res.status(404).json({message: "Impossible de créer la zone. Veuillez vérifier vos données."});
        }

        res.status(200).json(updatedShape);

    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Erreur lors de l'ajout de la zone : " + err.message});
    }
});

/**
 * @swagger
 * /carte/shapes/{id}:
 *   post:
 *     tags:
 *       - Carte
 *     security:
 *       - bearerAuth: []
 *     summary: "Met à jour les détails d'une zone existante"
 *     description: |
 *       Permet de mettre à jour les informations d'une zone existante sans modifier les coordonnées.
 *       - Les administrateurs (role=1) peuvent modifier tous les champs, y compris provider.
 *       - Les fournisseurs (role=2) ne peuvent modifier que les champs qui leur sont attribués.
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
 *                 nullable: true
 *               service:
 *                 type: string
 *               category:
 *                 type: string
 *               role:
 *                 type: integer
 *                 description: "Rôle de l'utilisateur (1=Admin, 2=Provider)"
 *                 enum: [1, 2]
 *               id_provider:
 *                 type: string
 *                 description: "Requis si role=2 pour vérifier les permissions"
 *             required:
 *               - role
 *           examples:
 *             adminExample:
 *               summary: "Exemple de mise à jour par un administrateur"
 *               value:
 *                 name: "Zone Admin Updated"
 *                 logistics: "Nouveau matériel"
 *                 surface: "50 m3"
 *                 description: "Description mise à jour par l'admin"
 *                 provider: "provider123"
 *                 service: "Service premium"
 *                 category: "admin_category"
 *                 role: 1
 *             providerExample:
 *               summary: "Exemple de mise à jour par un fournisseur"
 *               value:
 *                 name: "Zone Provider Updated"
 *                 logistics: "Matériel fournisseur"
 *                 surface: "30 m3"
 *                 description: "Description mise à jour par le fournisseur"
 *                 service: "Service standard"
 *                 category: "default"
 *                 role: 2
 *                 id_provider: "provider123"
 *     responses:
 *       200:
 *         description: "Détails de la zone mis à jour avec succès."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedShape:
 *                   type: object
 *                   properties:
 *                     shape_id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     logistics:
 *                       type: string
 *                     surface:
 *                       type: string
 *                     description:
 *                       type: string
 *                     provider:
 *                       type: string
 *                       nullable: true
 *                     service:
 *                       type: string
 *                     category:
 *                       type: string
 *       403:
 *         description: "Accès refusé. Permissions insuffisantes."
 *       404:
 *         description: "Aucune zone trouvée avec l'identifiant donné."
 *       500:
 *         description: "Erreur interne du serveur"
 */
routerCarte.post("/shapes/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {name, logistics, surface, description, provider, service, category, role, id_provider} = req.body;

        const isAdmin = role === 1;
        const isProvider = role === 2;

        if (isProvider) {
            const shape = await CarteService.getShapeById(id);

            if (id_provider) {
                if (!shape || shape.provider !== id_provider) {
                    return res.status(403).json({message: "Vous n'êtes pas autorisé à modifier cette zone."});
                }
            }
        }

        const updateData = {
            name,
            logistics,
            surface,
            description,
            provider: isAdmin ? provider : null,
            service,
            category,
        };

        const updatedShape = await CarteService.updateShape(id, updateData);


        if (!updatedShape) {
            return res.status(404).json({message: "Impossible de mettre à jour la zone."});
        }

        res.status(200).json(updatedShape);
    } catch (err) {
        res.status(500).json({message: "Erreur lors de la mise à jour : " + err.message});
    }
});


module.exports = routerCarte;