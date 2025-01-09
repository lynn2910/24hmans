const { Router } = require("express");
const uuid = require("uuid").v4;
const EcurieService = require("../services/ecurie.service");

const routerEcurie = new Router();
const prestataireMiddleware = require("../middlewares/prestataire.middleware");
const UserMiddleware = require("../middlewares/user.middleware");
const {getParticipants} = require("../services/ecurie.service");

// Route pour récupérer tous les participants d'une écurie
routerEcurie.post('/:ecurie_id/participants', async (req, res) => {
    const { ecurie_id } = req.params;
    try {
        const participants = await getParticipants(ecurie_id);
        if (participants.length === 0) {
            return res.status(404).json({ message: 'Aucun participant trouvé pour cette écurie.' });
        }
        res.status(200).json(participants);
    } catch (error) {
        console.error("Erreur dans la récupération des participants :", error);
        res.status(500).json({ message: 'Erreur serveur, impossible de récupérer les participants.' });
    }
});


module.exports = routerEcurie;
