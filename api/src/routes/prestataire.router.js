const {Router} = require("express");
const {
    getPrestataireFromName,
    getPrestataire,
    getPrestataireLink,
    createPrestataireLink,
    updatePrestataireLink,
    deletePrestataireLink
} = require("../services/prestataire.service");

const routerPresta = new Router();

/**
 * @swagger
 * components:
 *      schemas:
 *        PrestataireLink:
 *          type: Object
 *          properties:
 *           id:
 *               type: integer
 *               example: 1
 *           name:
 *               type: string
 *               example: "Site officiel"
 *           url:
 *               type: string
 *               name: "https://www.porsche.com"
 *        Prestataire:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              example: "0b7956e6-1262-49f7-aaab-c5ab60d16cba"
 *            name:
 *              type: string
 *              example: "Porsche"
 *            referencer:
 *              type: string
 *              example: "porsche"
 *            icon:
 *              type: string
 *              nullable: true
 *              example: "prestataires_icons/codeky_presta.jpg"
 *            email:
 *              type: string
 *              example: "porsche@gmail.com"
 *            accentColor:
 *               type: string
 *               nullable: true
 *               example: "#fff"
 *            banner:
 *               type: string
 *               nullable: true
 *               example: null
 *            links:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/PrestataireLink'
 */

/**
 * @swagger
 * /prestataire/{prestataire}:
 *     get:
 *         tags:
 *           - Prestataire
 *         summary: Récupère les informations d'un prestataire à partir de son nom ou identifiant
 *         parameters:
 *           - in: path
 *             name: prestataire
 *             example: "porsche"
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
 *                             $ref: '#/components/schemas/Prestataire'
 *             404:
 *                 description: Un message d'erreur quand le prestataire n'existe pas
 *                 content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 */
routerPresta.get(
    "/:prestataire_name",
    async (req, res) => {
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
    }
);

// liens prestas
/**
 * @swagger
 * /prestataire/{prestataire_name}/link/{link_id}:
 *   get:
 *     tags:
 *       - Prestataire
 *     summary: Récupérer un lien d'un prestataire
 *     description: Cette méthode récupère un lien spécifique associé à un prestataire, en utilisant le nom du prestataire et l'ID du lien.
 *     parameters:
 *       - in: path
 *         name: prestataire_name
 *         required: true
 *         description: Nom du prestataire
 *         example: "porsche"
 *         schema:
 *           type: string
 *       - in: path
 *         name: link_id
 *         example: 1
 *         required: true
 *         description: ID du lien à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lien récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 url:
 *                   type: string
 *       404:
 *         description: Prestataire ou lien non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Prestataire or link not found."
 */
routerPresta.get(
    "/:prestataire_name/link/:link_id",
    async (req, res) => {
        const {prestataire_name, link_id} = req.params;

        let presta = await getPrestataireFromName(prestataire_name);
        if (!presta) {
            return res.status(404).json({
                message: "Prestataire not found."
            });
        }
        const link = await getPrestataireLink(presta.id, link_id);
        if (!link) {
            return res.status(404).json({
                message: "Link not found."
            });
        }

        return res.status(200).json(link);
    }
);

/**
 * @swagger
 * /prestataire/{prestataire_name}/link:
 *   post:
 *     tags:
 *       - Prestataire
 *     summary: Créer un lien pour un prestataire
 *     description: Cette méthode crée un nouveau lien pour un prestataire, en utilisant le nom du prestataire et les données du lien.
 *     parameters:
 *       - in: path
 *         name: prestataire_name
 *         required: true
 *         description: Nom du prestataire
 *         example: "porsche"
 *         schema:
 *           type: string
 *       - in: query
 *         name: sessionId
 *         required: true
 *         description: Session ID for authentication
 *         example: "HVpYuVywN4"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Site officiel"
 *               url:
 *                 type: string
 *                 example: "https://www.porsche.com"
 *     responses:
 *       201:
 *         description: Lien créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 url:
 *                   type: string
 *       404:
 *         description: Prestataire non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Prestataire not found."
 */
routerPresta.post(
    "/:prestataire_name/link",
    async (req, res) => {
        const {prestataire_name} = req.params;
        const {sessionId} = req.query;
        const {name, url} = req.body;

        if (!sessionId) {
            return res.status(400).json({
                message: "Session ID is required."
            });
        }

        let presta = await getPrestataireFromName(prestataire_name);
        if (!presta) {
            return res.status(404).json({
                message: "Prestataire not found."
            });
        }

        const newLink = await createPrestataireLink(presta.id, {name, url});
        return res.status(201).json(newLink);
    }
);

/**
 * @swagger
 * /prestataire/{prestataire_name}/link/{link_id}:
 *   patch:
 *     tags:
 *       - Prestataire
 *     summary: Mettre à jour un lien d'un prestataire
 *     description: Cette méthode met à jour partiellement un lien spécifique associé à un prestataire, en utilisant le nom du prestataire et l'ID du lien.
 *     parameters:
 *       - in: path
 *         name: prestataire_name
 *         required: true
 *         description: Nom du prestataire
 *         example: "porsche"
 *         schema:
 *           type: string
 *       - in: path
 *         name: link_id
 *         required: true
 *         description: ID du lien à mettre à jour
 *         example: 1
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sessionId
 *         required: true
 *         description: Session ID for authentication
 *         example: "HVpYuVywN4"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Site officiel modifié"
 *               url:
 *                 type: string
 *                 example: "https://www.porsche.com"
 *     responses:
 *       200:
 *         description: Lien mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Site officiel modifié"
 *                 url:
 *                   type: string
 *                   example: "https://www.porsche.com"
 *       400:
 *         description: Session ID manquant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Session ID is required."
 *       404:
 *         description: Prestataire ou lien non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Prestataire or link not found."
 */
routerPresta.patch(
    "/:prestataire_name/link/:link_id",
    async (req, res) => {
        const {prestataire_name, link_id} = req.params;
        const {sessionId} = req.query;
        const {name, url} = req.body;

        if (!sessionId) {
            return res.status(400).json({
                message: "Session ID is required.",
            });
        }

        try {
            const prestataire = await getPrestataireFromName(prestataire_name);
            if (!prestataire) {
                return res.status(404).json({
                    message: "Prestataire not found.",
                });
            }
            const updatedLink = await updatePrestataireLink(prestataire.id, link_id, {name, url});
            if (!updatedLink) {
                return res.status(404).json({
                    message: "Link not found.",
                });
            }

            return res.status(200).json(updatedLink);
        } catch (error) {
            console.error("Error updating link:", error);
            return res.status(500).json({
                message: "An error occurred while updating the link.",
            });
        }
    }
);

/**
 * @swagger
 * /prestataire/{prestataire_name}/link/{link_id}:
 *   delete:
 *     tags:
 *       - Prestataire
 *     summary: Supprimer un lien associé à un prestataire
 *     description: Cette méthode supprime un lien d'un prestataire, en utilisant le nom du prestataire et l'ID du lien.
 *     parameters:
 *       - name: prestataire_name
 *         in: path
 *         example: "porsche"
 *         required: true
 *         description: Nom du prestataire
 *         schema:
 *           type: string
 *       - name: link_id
 *         in: path
 *         required: true
 *         description: ID du lien à supprimer
 *         example: 1
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sessionId
 *         required: true
 *         example: "HVpYuVywN4"
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lien supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Link deleted successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     url:
 *                       type: string
 *       404:
 *         description: Prestataire ou lien non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Prestataire or link not found."
 */
routerPresta.delete(
    "/:prestataire_name/link/:link_id",
    async (req, res) => {
        const {prestataire_name, link_id} = req.params;
        let presta = await getPrestataireFromName(prestataire_name);
        if (!presta) {
            return res.status(404).json({
                message: "Prestataire not found."
            });
        }
        const result = await deletePrestataireLink(presta.id, link_id);
        if (result.error) {
            return res.status(result.status).json({
                message: result.data
            });
        }
        return res.status(result.status).json({
            message: "Link deleted successfully.",
            data: result.data
        });
    }
);


module.exports = routerPresta;