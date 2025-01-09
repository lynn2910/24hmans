const {Router} = require("express");
const {getBilletterieFromName, getBilletterie} = require("../services/billetterie.service");

const routerBilletterie = new Router();


/**
 * @swagger
 * components:
 *      schemas:
 *        BilletterieCategories:
 *          type: Object
 *          properties:
 *           category_label:
 *               type: string
 *           category_id:
 *               type: integer
 *           billetterie_id:
 *               type: string
 *
 *        Prestataire:
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
 */

/**
 * @swagger
 * billetterie/:billetterie_name:
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
 *               type: object
 *               properties:
 *                 $ref: '#/components/schemas/Billetterie'
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
routerBilletterie.get("/:billetterie_name", async (req, res) => {
    let billetterie = await getBilletterieFromName(req.params.billetterie_label);
    if(!billetterie) billetterie = await getBilletterie(req.params.billetterie_label);

    if (billetterie) {
        res.status(200).json(billetterie);
    } else {
        res.status(404).json({message: "billetterie not found"});
    }
});

module.exports = routerBilletterie;