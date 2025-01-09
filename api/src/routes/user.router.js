const express = require('express');
const router = express.Router();

const userMiddleware = require("../middlewares/user.middleware");
const {createRule, Method, User, Permission} = require("../permissions");

router.get('/@me', userMiddleware, async (req, res) => {
    let user = req.session;

    console.log(user);

    res.status(500).send("FUck")
})
createRule("/users/@me", Method.All, User.User, [Permission.User])

module.exports = router;