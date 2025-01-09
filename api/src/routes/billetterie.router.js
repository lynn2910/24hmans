const {Router} = require("express");
let uuid = require("uuid").v4;
const BilletterieService = require("../services/billetterie.service");

const routerBilletterie = new Router();

