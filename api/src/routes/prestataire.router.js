const {Router} = require("express");
const {getPrestataireFromName, getPrestataire} = require("../services/prestataire.service");

const routerPresta = new Router();

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