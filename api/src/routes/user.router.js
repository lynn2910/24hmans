const express = require('express');
const router = express.Router();

const userMiddleware = require("../middlewares/user.middleware");
const {createRule, Method, User, Permission} = require("../permissions");
const {getUser} = require("../services/user.service");
const {getPrestataire} = require("../services/prestataire.service");
const {getAdmin} = require("../services/admin.service");

router.get('/@me', userMiddleware, async (req, res) => {
    let user = req.session;

    switch (req.session.userType) {
        case 1: {
            getUser(user.userId).then(
                (u) => res.status(200).json(u),
                (err) => res.status(500).json({message: err.message}),
            )
            break;
        }
        case 2: {
            getPrestataire(user.userId).then(
                (u) => res.status(200).json(u),
                (err) => res.status(500).json({message: err.message}),
            );
            break;
        }
        case 3: {
            getAdmin(user.userId).then(
                (u) => res.status(200).json(u),
                (err) => res.status(500).json({message: err.message}),
            )
        }
    }
})
createRule("/users/@me", Method.All, User.User, [Permission.User, Permission.Prestataire, Permission.Admin])

module.exports = router;