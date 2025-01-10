const { Router } = require("express");
const uuid = require("uuid").v4;
const EcurieService = require("../services/ecurie.service");

const routerEcurie = new Router();
const prestataireMiddleware = require("../middlewares/prestataire.middleware");
const UserMiddleware = require("../middlewares/user.middleware");

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


// Route pour supprimer tous les participants d'une écurie
routerEcurie.delete('/:ecurie_id/supprParticipants', async (req, res) => {
    const { ecurie_id } = req.params;

    try {
        await EcurieService.deleteParticipants(ecurie_id);

        res.status(200).json({ message: "Tous les participants ont été supprimés avec succès." });
    } catch (error) {
        console.error("Erreur dans la suppression des participants :", error);
        res.status(500).json({ message: "Erreur serveur, impossible de supprimer les participants." });
    }
});

// Route pour sélectionner les 10 participants
routerEcurie.get('/Select_Participants', async (req, res) => {
    try {
        const participants = await EcurieService.getRandomParticipants();

        if (participants.length === 0) {
            return res.status(404).json({ message: "Aucun participant trouvé." });
        }

        res.status(200).json(participants);
    } catch (error) {
        console.error("Erreur lors de la récupération des participants aléatoires :", error);
        res.status(500).json({ message: "Erreur serveur, impossible de récupérer les participants." });
    }
});


module.exports = routerEcurie;
