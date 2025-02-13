const { Router } = require("express");
const uuid = require("uuid").v4;
const EcurieService = require("../services/ecurie.service");

const routerEcurie = new Router();
const prestataireMiddleware = require("../middlewares/prestataire.middleware");
const UserMiddleware = require("../middlewares/user.middleware");
const {registerWinner, registerWinners} = require("../services/ecurie.service");




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
 * /ecurie/{ecurie_id}/winner:
 *   post:
 *     summary: Sélectionne 10 gagnants aléatoires parmi les participants d'une écurie, les enregistre et envoie un email aux gagnants et aux participants sélectionnés.
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
 *         description: Les gagnants ont été sélectionnés, enregistrés et les emails envoyés.
 *       404:
 *         description: Aucun participant trouvé pour cette écurie.
 *       500:
 *         description: Erreur serveur.
 */
routerEcurie.post('/:ecurie_id/winner', async (req, res) => {
    const { ecurie_id } = req.params;

    try {
        const participants = await EcurieService.getRandomParticipants(ecurie_id);
        if (participants.length < 10) {
            return res.status(404).json({ message: "Pas assez de participants pour sélectionner 10 gagnants." });
        }
        const winners = participants.sort(() => Math.random() - 0.5).slice(0, 10);  // Mélange aléatoire et sélection des 10 premiers

        await registerWinners(winners, ecurie_id);  // Passer les gagnants à la fonction registerWinners

        res.status(200).json({ message: "Les gagnants ont été sélectionnés et notifiés." });
    } catch (error) {
        console.error("Erreur lors de la sélection des gagnants :", error);
        res.status(500).json({ message: "Erreur serveur, impossible d'enregistrer les gagnants." });
    }
});


module.exports = routerEcurie;
