const {Router} = require("express");
let uuid = require("uuid").v4;
const EcurieService = require("../services/ecurie.service");

const routerEcurie = new Router();
const prestataireMiddleware = require("../middlewares/prestataire.middleware");
const UserMiddleware = require("../middlewares/user.middleware");
