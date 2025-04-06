const {Router} = require("express");
const {
    getBilletterie,
    getBilletterieCategories,
    getBilletterieForfaits,
    getBilletteriePersonnes,
    getTicketsByUserId
} = require("../services/billetterie.service");

const routerBilletterie = new Router();
const {authenticateToken} = require("../middlewares/auth.middleware");
const {createNewOrder} = require("../services/billetterie.service");
const {checkAccess} = require("../utils");


/**
 * @swagger
 * components:
 *      schemas:
 *        BilletteriePersonnes:
 *          type: Object
 *          properties:
 *           personne_label:
 *               type: string
 *           personne_id:
 *               type: integer
 *           billetterie_id:
 *               type: string
 *        BilletterieForfaits:
 *          type: Object
 *          properties:
 *           forfait_label:
 *               type: string
 *           forfait_id:
 *               type: integer
 *           billetterie_id:
 *               type: string
 *        BilletterieCategories:
 *          type: Object
 *          properties:
 *           category_label:
 *               type: string
 *           category_id:
 *               type: integer
 *           billetterie_id:
 *               type: string
 *        Billetterie:
 *          type: object
 *          properties:
 *            billetterie_label:
 *              type: string
 *            billetterie_id:
 *              type: string
 *            BilletterieCategories:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/BilletterieCategories'
 *            BilletterieForfaits:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/BilletterieForfaits'
 *            BilletteriePersonnes:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/BilletteriePersonnes'
 */

/**
 * @swagger
 * /billetterie/:billetterie_name:
 *   get:
 *     tags:
 *          - Billetterie
 *     summary: Récupère les détails d'une billetterie par son nom.
 *     description: Retourne les informations sur une billetterie en fonction de son nom. Si la billetterie n'existe pas, retourne un message d'erreur.
 *     parameters:
 *       - in: path
 *         name: billetterie_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Le nom de la billetterie à rechercher.
 *     responses:
 *       200:
 *         description: Détails de la billetterie récupérés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Billetterie'
 *       404:
 *         description: La billetterie n'a pas été trouvée.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: billetterie not found*/
routerBilletterie.get("/:prestataire_name", async (req, res) => {
    let billetterie = await getBilletterie(req.params.prestataire_id);
    if (!billetterie) billetterie = await getBilletterie(req.params.prestataire_id);
    if (billetterie) {
        res.status(200).json(billetterie);
    } else {
        res.status(404).json({message: "billetterie not found"});
    }
});

/**
 * @swagger
 * /billetterie/{prestataire_name}/categories:
 *   get:
 *     tags:
 *       - Billetterie
 *     summary: Récupère les catégories d'une billetterie par nom de prestataire.
 *     description: Retourne la liste des catégories associées à une billetterie en fonction du nom du prestataire.
 *     parameters:
 *       - in: path
 *         name: prestataire_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Le nom du prestataire dont on veut récupérer les catégories.
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BilletterieCategory'
 *       500:
 *         description: Erreur serveur lors de la récupération des catégories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

routerBilletterie.get("/:prestataire_name/categories", async (req, res) => {
    try {
        const categories = await getBilletterieCategories(req.params.prestataire_id);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});

/**
 * @swagger
 * /billetterie/{prestataire_name}/forfaits:
 *   get:
 *     tags:
 *       - Billetterie
 *     summary: Récupère les forfaits d'une billetterie par nom de prestataire.
 *     description: Retourne la liste des forfaits associés à une billetterie en fonction du nom du prestataire.
 *     parameters:
 *       - in: path
 *         name: prestataire_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Le nom du prestataire dont on veut récupérer les forfaits.
 *     responses:
 *       200:
 *         description: Liste des forfaits récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BilletterieForfait'
 *       500:
 *         description: Erreur serveur lors de la récupération des forfaits.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

routerBilletterie.get("/:prestataire_name/forfaits", async (req, res) => {
    try {
        const forfaits = await getBilletterieForfaits(req.params.prestataire_id);
        res.status(200).json(forfaits);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});

/**
 * @swagger
 * /billetterie/{prestataire_name}/personnes:
 *   get:
 *     tags:
 *       - Billetterie
 *     summary: Récupère les types de personnes d'une billetterie par nom de prestataire.
 *     description: Retourne la liste des types de personnes associés à une billetterie en fonction du nom du prestataire.
 *     parameters:
 *       - in: path
 *         name: prestataire_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Le nom du prestataire dont on veut récupérer les types de personnes.
 *     responses:
 *       200:
 *         description: Liste des types de personnes récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BilletteriePersonne'
 *       500:
 *         description: Erreur serveur lors de la récupération des types de personnes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

routerBilletterie.get("/:prestataire_name/personnes", async (req, res) => {
    try {
        const personnes = await getBilletteriePersonnes(req.params.prestataire_id);
        res.status(200).json(personnes);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});


/**
 * @swagger
 * /billetterie/{billetterie_name}/@me/orders:
 *   post:
 *     tags:
 *       - Billetterie
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new order in the billetterie
 *     description: Creates a new order for the authenticated user in the specified billetterie.
 *     parameters:
 *       - in: path
 *         name: billetterie_name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the billetterie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               {
 *                 "user_id": "6c0996c1-d692-4051-9cf5-25cc91e0eb7b",
 *                 "category": {
 *                   "category_label": "Tribune",
 *                   "category_id": 1
 *                 },
 *                 "date": [
 *                   {
 *                     "forfait_label": "Jeudi 12 juin 2025",
 *                     "forfait_id": 2
 *                   }
 *                 ],
 *                 "nbPersonnes": [
 *                   "5", "", "", "", ""
 *                 ],
 *                 "created_at": "2025-04-03T10:54:19.651Z"
 *               }
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user creating the order.
 *               category:
 *                 type: object
 *                 properties:
 *                   category_label:
 *                     type: string
 *                     description: The label of the category.
 *                   category_id:
 *                     type: integer
 *                     description: The ID of the category.
 *               date:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     forfait_label:
 *                       type: string
 *                       description: The label of the forfait.
 *                     forfait_id:
 *                       type: integer
 *                       description: The ID of the forfait.
 *               nbPersonnes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The number of persons included in the order.
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the order was created.
 *     responses:
 *       200:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 {
 *                   "user_id": "6c0996c1-d692-4051-9cf5-25cc91e0eb7b",
 *                   "category": {
 *                     "category_label": "Tribune",
 *                     "category_id": 1
 *                   },
 *                   "date": [
 *                     {
 *                       "forfait_label": "Jeudi 12 juin 2025",
 *                       "forfait_id": 2
 *                     }
 *                   ],
 *                   "nbPersonnes": [
 *                     "5", "", "", "", ""
 *                   ],
 *                   "created_at": "2025-04-03T10:54:19.651Z"
 *                 }
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: The error code.
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       500:
 *         description: An error occurred while creating the order.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */

routerBilletterie.post("/:billetterie_id/@me/orders", authenticateToken, async (req, res) => {
    if (!checkAccess(req, res, 'user')) return;

    let raw_order = req.body;
    const billetterieId = req.params.billetterie_id;

    let is_body_invalid = (
        typeof billetterieId !== 'number' ||
        typeof raw_order.category !== 'object' ||
        typeof raw_order.category.category_id !== 'number' ||
        !Array.isArray(raw_order.date) ||
        raw_order.date.some(d => typeof d.forfait_id !== 'object') ||
        !Array.isArray(raw_order.nbPersonnes) ||
        raw_order.nbPersonnes.some(p => typeof p.personne_type_id !== 'object' || typeof p.quantity !== 'number')
    );

    if (!is_body_invalid) {
        return res.status(400).json({
            code: "INVALID_BODY",
            message: "The body doesn't have the proper required structure"
        });
    }

    try {
        raw_order.billetterie_id = billetterieId;
        const order = await createNewOrder(req.user.id, {...raw_order, billetterie_id: billetterieId});
        res.status(200).json(order);
    } catch (err) {
        res.status(err.status || 500).json({message: err.message || "Internal Server Error"});
    }
});

/**
 * @swagger
 * /billetterie/users/{userId}/tickets:
 *   get:
 *     tags:
 *       - Billetterie
 *     summary: Récupère les tickets d'un utilisateur.
 *     description: Retourne la liste des tickets associés à un utilisateur donné par son ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'utilisateur.
 *     responses:
 *       200:
 *         description: Liste des tickets de l'utilisateur récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ticket_id:
 *                     type: integer
 *                     example: 1
 *                   category:
 *                     type: string
 *                     example: "Adulte"
 *                   days:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Samedi", "Dimanche"]
 *                   persons:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                           example: "Enfant"
 *                         quantity:
 *                           type: integer
 *                           example: 2
 *       500:
 *         description: Erreur serveur lors de la récupération des tickets.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

routerBilletterie.get('/users/:userId/tickets', async (req, res) => {
    try {
        const userId = req.params.userId;
        const tickets = await getTicketsByUserId(userId);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});


module.exports = routerBilletterie;