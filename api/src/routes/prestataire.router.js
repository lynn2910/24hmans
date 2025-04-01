const {Router} = require("express");
const {
    getPrestataireFromName,
    getPrestataire,
    updatePrestataire,
    getPrestataireLink,
    createPrestataireLink,
    updatePrestataireLink,
    deletePrestataireLink, getPrestataireService
} = require("../services/prestataire.service");
const {createRule, User, Permission, Method} = require("../permissions")
const {authenticateToken} = require("../middlewares/auth.middleware");

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

routerPresta.get(
    "/all",
    async (req, res) => {
        const prestataires = await (require("../db")).prestataire.findMany({include: {links: true}});
        res.status(200).json(prestataires);
    }
)

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

/**
 * @swagger
 * /prestataire/{prestataire_id}:
 *   patch:
 *     summary: Update Prestataire
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Prestataire
 *     description: Updates the information of a prestataire.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: prestataire_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the prestataire to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the prestataire.
 *               email:
 *                 type: string
 *                 description: The email of the prestataire.
 *               referencer:
 *                 type: string
 *                 description: The referencer of the prestataire.
 *               banner:
 *                 type: string
 *                 description: The banner URL of the prestataire.
 *               accentColor:
 *                 type: string
 *                 description: The accent color of the prestataire.
 *               description:
 *                 type: string
 *                 description: The description of the prestataire.
 *     responses:
 *       200:
 *         description: Prestataire updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   description: Error code (0 for success).
 *                 data:
 *                   type: object
 *                   description: The updated prestataire information.
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   description: Error code.
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       404:
 *         description: Prestataire not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   description: Error code.
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       500:
 *         description: An error occurred while updating the prestataire.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   description: Error code.
 *                 message:
 *                   type: string
 *                   description: The error message.
 *   delete:
 *     summary: Delete a Prestataire
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Prestataire  # Or a more specific tag if you have one
 *     description: Deletes a specific prestataire. Requires admin privileges.
 *     parameters:
 *       - in: path
 *         name: prestataire_id
 *         example: "prestataire-123"  # Replace with a real example
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the prestataire to delete.
 *     responses:
 *       200:
 *         description: Prestataire deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   $ref: '#/components/schemas/Prestataire' # Define this schema!
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: string
 *                   description: The error message.
 *                   example: "Error message details"
 */
routerPresta.patch(
    "/:prestataire_id",
    authenticateToken,
    async (req, res) => {
        const {prestataire_id} = req.params;

        try {
            const prestataireUpdated = await updatePrestataire(
                prestataire_id,
                req.body
            );

            return res.status(200).json({error: 0, data: prestataireUpdated});
        } catch (err) {
            res.status(500).json({
                error: 1,
                data: err.message,
            })
        }
    }
)
createRule("/prestataire", [Method.PATCH], User.Prestataire, [Permission.Prestataire, Permission.Admin]);

routerPresta.delete(
    "/:prestataire_id",
    authenticateToken,
    async (req, res) => {
        const {prestataire_id} = req.params;

        try {
            const prestataireDeleted = await (require("../db")).prestataire.delete({
                where: {
                    id: prestataire_id,
                }
            })

            return res.status(200).json({error: 0, data: prestataireDeleted});
        } catch (err) {
            res.status(500).json({
                error: 1,
                data: err.message,
            })
        }
    }
)

/**
 * @swagger
 * /prestataire/{prestataire_id}/services:
 *   get:
 *     summary: Get Prestataire Services
 *     tags:
 *       - Prestataire  # Or a more specific tag
 *     description: Retrieves the available services for a specific prestataire.
 *     parameters:
 *       - in: path
 *         name: prestataire_id
 *         example: "45309281-fc24-4e02-ad47-a275c64f5327"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the prestataire.
 *     responses:
 *       200:
 *         description: List of services retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "boutique"
 *       500:
 *         description: Prestataire not found or internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


routerPresta.get("/:prestataire_id/services", async (req, res) => {
    try {
        const services = await getPrestataireService(req.params.prestataire_id);
        console.log(services);

        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({message: "prestataire not found.",});
    }
})


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
 *     security:
 *       - bearerAuth: []
 *     summary: Créer un lien pour un prestataire
 *     description: Cette méthode crée un nouveau lien pour un prestataire, en utilisant le nom du prestataire et les données du lien.
 *     parameters:
 *       - in: path
 *         name: prestataire_id
 *         required: true
 *         description: ID du prestataire
 *         example: "45309281-fc24-4e02-ad47-a275c64f5327"
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
    "/:prestataire_id/link",
    async (req, res) => {
        const {prestataire_id} = req.params;
        const {sessionId} = req.query;
        const {name, url} = req.body;

        if (!sessionId) {
            return res.status(400).json({
                message: "Session ID is required."
            });
        }

        let presta = await getPrestataire(prestataire_id);
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
 *     security:
 *       - bearerAuth: []
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
    authenticateToken,
    async (req, res) => {
        const {link_id} = req.params;
        const {name, url} = req.body;

        try {
            const updatedLink = await updatePrestataireLink(req.user.id, link_id, {name, url});
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
 *     security:
 *       - bearerAuth: []
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
    authenticateToken,
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