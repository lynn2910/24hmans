const {Router} = require("express");
const {getPrestataireFromName, getPrestataire} = require("../services/prestataire.service");

const routerPresta = new Router();

/**
 * @swagger
 * definitions:
 *   PrestataireLink:
 *     type: Object
 *     properties:
 *      id:
 *          type: integer
 *      name:
 *          type: string
 *      url:
 *          type: string
 *
 *   Prestataire:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       accentColor:
 *          type: string
 *       banner:
 *          type: string
 *       links:
 *          type: array
 *          items:
 *             $ref: '#/definitions/PrestataireLink'
 */

/**
 * @swagger
 * /prestataire/{prestataire}:
 *     get:
 *         summary: Récupère les informations d'un prestataire à partir de son nom ou identifiant
 *         parameters:
 *           - in: path
 *             name: prestataire
 *             required: true
 *             description: Nom ou identifiant du prestataire
 *             schema:
 *               type: string
 *         responses:
 *             200:
 *                 description: Les informations sur le prestataire
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/definitions/Prestataire'
 *
 *
 */
routerPresta.get("/:prestataire_name", async (req, res) => {
    let presta = await getPrestataireFromName(req.params.prestataire_name);
    // If not with name, consider that it's the ID
    if (!presta) presta = await getPrestataire(req.params.prestataire_name);

    if (presta) {
        res.status(200).json(presta);
    } else {
        res.status(404).json({
            message: "prestataire not found.",
        });
    }
});

module.exports = routerPresta;