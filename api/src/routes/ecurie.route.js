const { Router } = require("express");
const uuid = require("uuid").v4;
const EcurieService = require("../services/ecurie.service");

const routerEcurie = new Router();
const prestataireMiddleware = require("../middlewares/prestataire.middleware");
const UserMiddleware = require("../middlewares/user.middleware");




/**
 * @swagger
 * /ecurie/{ecurie_id}/participants:
 *   post:
 *     summary: Récupère tous les participants d'une écurie
 *     tags:
 *       - Participants
 *     parameters:
 *       - name: ecurie_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'écurie
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
 *       404:
 *         description: Aucun participant trouvé
 *       500:
 *         description: Erreur serveur
 */




// Route pour récupérer tous les participants d'une écurie
routerEcurie.post('/:ecurie_id/participants', async (req, res) => {
    const { ecurie_id } = req.params;
    try {
        const participants = await EcurieService.getParticipants(ecurie_id);
        if (participants.length === 0) {
            return res.status(404).json({ message: 'Aucun participant trouvé pour cette écurie.' });
        }
        res.status(200).json(participants);
    } catch (error) {
        console.error("Erreur dans la récupération des participants :", error);
        res.status(500).json({ message: 'Erreur serveur, impossible de récupérer les participants.' });
    }
});




/**
 * @swagger
 * /ecurie/{ecurie_id}/participants:
 *   delete:
 *     summary: Supprime tous les participants d'une écurie
 *     tags:
 *       - Participants
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
routerEcurie.delete('/:ecurie_id/participants', async (req, res) => {
    const { ecurie_id } = req.params;

    try {
        await EcurieService.deleteParticipants(ecurie_id);

        res.status(200).json({ message: "Tous les participants ont été supprimés avec succès." });
    } catch (error) {
        console.error("Erreur dans la suppression des participants :", error);
        res.status(500).json({ message: "Erreur serveur, impossible de supprimer les participants." });
    }
});

/**
 * @swagger
 * /ecurie/{ecurie_id}/participants:
 *   get:
 *     summary: Récupère 10 participants aléatoires d'une écurie
 *     tags:
 *       - Participants
 *     parameters:
 *       - name: ecurie_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'écurie
 *     responses:
 *       200:
 *         description: Liste de 10 participants sélectionnés aléatoirement
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID du participant
 *                   prenom:
 *                     type: string
 *                     description: Prénom du participant
 *                   nom:
 *                     type: string
 *                     description: Nom du participant
 *                   email:
 *                     type: string
 *                     description: Email du participant
 *                   tel:
 *                     type: string
 *                     description: Numéro de téléphone du participant
 *                   num_billet:
 *                     type: string
 *                     description: Numéro de billet du participant
 *                   submitted_at:
 *                     type: string
 *                     format: date-time
 *                     description: Date de soumission du formulaire
 *       404:
 *         description: Aucun participant trouvé
 *       500:
 *         description: Erreur serveur
 */


// Route pour sélectionner les 10 participants
routerEcurie.get('/:ecurie_id/participants', async (req, res) => {
    const { ecurie_id } = req.params;

    try {
        const participants = await EcurieService.getRandomParticipants(ecurie_id);

        if (participants.length === 0) {
            return res.status(404).json({ message: "Aucun participant trouvé pour cette écurie." });
        }

        res.status(200).json(participants);
    } catch (error) {
        console.error("Erreur lors de la récupération des participants aléatoires :", error);
        res.status(500).json({ message: "Erreur serveur, impossible de récupérer les participants." });
    }
});


module.exports = routerEcurie;
