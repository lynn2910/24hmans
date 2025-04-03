const {Router} = require("express");
const {getBilletterieFromName, getBilletterie} = require("../services/billetterie.service");

const routerBilletterie = new Router();
const {createRule, Method, User, Permission} = require("../permissions");
const {authenticateToken} = require("../middlewares/auth.middleware");
const {getUserOrders, createNewOrder} = require("../services/user.service");


/**
 * @swagger
 * components:
 *      schemas:
 *        BilletteriePersonnes:
 *          type: Object
 *          properties:
 *           personnet_label:
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
    if(!billetterie) billetterie = await getBilletterie(req.params.prestataire_id);

    if (billetterie) {
        res.status(200).json(billetterie);
    } else {
        res.status(404).json({message: "billetterie not found"});
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

routerBilletterie.post("/:billetterie_name/@me/orders", authenticateToken, async (req, res) => {
    // On attend d'avoir ces infos dans le body:
    //{
    //  "user_id":"6c0996c1-d692-4051-9cf5-25cc91e0eb7b",
    //  "category":
    //      {
    //          "category_label":"Tribune",
    //          "category_id":1
    //       },
    //   "date":
    //      [
    //          {
    //              "forfait_label":"Jeudi 12 juin 2025",
    //              "forfait_id":2
    //           }
    //       ],
    //   "nbPersonnes":["5","","","",""],
    //}

    if (req.user?.userType !== User.User) {
        res.status(401).json({message: "You are not a user"});
        return;
    }

    let raw_order = req.body;

    // Check that the body corresponds to what we want
    let is_body_invalid = ['user_id', 'category', 'date',"nbPersonnes","created_at"].some(k => !(k in raw_order))
        || !Array.isArray(raw_order.articles)
        || raw_order.articles.some((a) => !(('article_id' in a) && ('amount' in a)));

    if (is_body_invalid) {
        res.status(400).json({code: "INVALID_BODY", message: "The body doesn't have the proper required structure"});
        return;
    }

    createNewOrder(req.user.id, raw_order)
        .then((order) => res.status(200).json({order}))
        .catch((err) => res.status(err.status).json({message: err.message}))
})

module.exports = routerBilletterie;