const {Router} = require("express");
const EcurieService = require("../services/ecurie.service");

const routerEcurie = new Router();
const {registerWinners} = require("../services/ecurie.service");
const {authenticateToken} = require("../middlewares/auth.middleware");
const {checkAccess} = require("../utils");


/**
 * @swagger
 * /ecurie/{presta_id}/participants:
 *   get:
 *     summary: Récupère tous les participants d'une écurie pour une année spécifique
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Ecurie
 *     parameters:
 *       - name: presta_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'écurie
 *       - name: year
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *         description: Année des participants
 *         example: 2025
 *     responses:
 *       200:
 *         description: Liste des participants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   prenom:
 *                     type: string
 *                   nom:
 *                     type: string
 *                   email:
 *                     type: string
 *                   tel:
 *                     type: string
 *                   num_billet:
 *                     type: string
 *                   submitted_at:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Année non fournie ou invalide
 *       404:
 *         description: Aucun participant trouvé pour cette écurie et cette année
 *       500:
 *         description: Erreur serveur
 */

routerEcurie.get('/:presta_id/participants', authenticateToken, async (req, res) => {
    if (!checkAccess(req, res, "prestataire")) return;

    const {presta_id} = req.params;
    const year = Number.parseInt(req.query.year);

    if (!year || isNaN(year)) {
        return res.status(400).json({message: 'Veuillez fournir une année valide.'});
    }

    try {
        const participants = await EcurieService.getParticipants(presta_id, year);

        if (participants.length === 0) {
            return res.status(404).json({message: 'Aucun participant trouvé pour cette écurie et cette année.'});
        }

        res.status(200).json(participants);
    } catch (error) {
        console.error("Erreur dans la récupération des participants :", error);
        res.status(500).json({message: 'Erreur serveur, impossible de récupérer les participants.'});
    }
});


/**
 * @swagger
 * /ecurie/{ecurie_id}/participants:
 *   delete:
 *     summary: Supprime tous les participants d'une écurie
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Ecurie
 *     parameters:
 *       - name: ecurie_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'écurie
 *     responses:
 *       200:
 *         description: Tous les participants ont été supprimés
 *       500:
 *         description: Erreur serveur
 */


// Route pour supprimer tous les participants d'une écurie
routerEcurie.delete('/:ecurie_id/participants', authenticateToken, async (req, res) => {
    if (!checkAccess(req, res, "prestataire")) return;

    const {ecurie_id} = req.params;

    try {
        await EcurieService.deleteParticipants(ecurie_id);

        res.status(200).json({message: "Tous les participants ont été supprimés avec succès."});
    } catch (error) {
        console.error("Erreur dans la suppression des participants :", error);
        res.status(500).json({message: "Erreur serveur, impossible de supprimer les participants."});
    }
});
/**
 * @swagger
 * /ecurie/{presta_id}/winner:
 *   post:
 *     summary: Sélectionne 10 gagnants aléatoires parmi les participants d'un prestataire, les enregistre et envoie un email aux gagnants et aux participants sélectionnés.
 *     tags:
 *       - Ecurie
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: presta_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du prestataire
 *     responses:
 *       200:
 *         description: Les gagnants ont été sélectionnés, enregistrés et les emails envoyés.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 winners:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       prenom:
 *                         type: string
 *                       nom:
 *                         type: string
 *                       email:
 *                         type: string
 *       404:
 *         description: Aucun participant trouvé pour ce prestataire ou pas assez de participants.
 *       500:
 *         description: Erreur serveur.
 */
routerEcurie.post('/:presta_id/winner', authenticateToken, async (req, res) => {
    if (!checkAccess(req, res, "prestataire")) return;

    const {presta_id} = req.params;

    try {
        // Utilisation de `presta_id` pour récupérer les participants
        const participants = await EcurieService.getRandomParticipants(presta_id);

        // Vérification qu'il y a suffisamment de participants
        if (participants.length < 10) {
            return res.status(404).json({message: "Pas assez de participants pour sélectionner 10 gagnants."});
        }

        // Sélection aléatoire des 10 gagnants
        const winners = participants.sort(() => Math.random() - 0.5).slice(0, 10);

        // Enregistrement des gagnants
        await registerWinners(winners, presta_id);

        // Réponse après la sélection, avec les gagnants inclus dans la réponse
        res.status(200).json({
            message: "Les gagnants ont été sélectionnés et notifiés.",
            winners: winners.map(winner => ({
                id: winner.id,
                prenom: winner.prenom,
                nom: winner.nom,
                email: winner.email
            }))
        });
    } catch (error) {
        console.error("Erreur lors de la sélection des gagnants :", error);
        res.status(500).json({message: "Erreur serveur, impossible d'enregistrer les gagnants."});
    }
});


/**
 * @swagger
 * /ecurie/participants/years:
 *   get:
 *     summary: Récupère toutes les années archivée
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Ecurie
 *     responses:
 *       200:
 *         description: Liste des années archivée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: integer
 *       500:
 *         description: Erreur serveur
 */
routerEcurie.get('/participants/years', authenticateToken, async (req, res) => {
    if (!checkAccess(req, res, "prestataire")) return;

    try {
        const years = await EcurieService.getAllYears();
        res.status(200).json(years);
    } catch (error) {
        console.error("Erreur lors de la récupération des années :", error);
        res.status(500).json({message: "Erreur serveur, impossible de récupérer les années disponibles."});
    }
});


module.exports = routerEcurie;
