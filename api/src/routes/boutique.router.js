const {Router} = require("express");

const routerBoutique = new Router();

routerBoutique.get("/", (req, res) => {
    res.send("Hello!")
})


module.exports = routerBoutique;