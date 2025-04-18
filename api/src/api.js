const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser")

// Initialize the database
require("./db");
const {registerMailService} = require("./services/mail/mail.service");

const app = express();
require("dotenv").config();

app.use(express.static('public'));
app.use(express.json());
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // Pour les formulaires

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Système de logger
if (process.env.PROD)
    // En production
    app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]b'));
else
    // En développement
    app.use(morgan(':method :url :status :response-time ms - :res[content-length]b'));


// API swagger
require("./swagger.js").init_swagger(app);


app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/hello/:name", function (req, res) {
    res.send(`Hello ${req.params.name}`);
});

//
//
//  ROUTEURS
//
//

app.use("/ecurie", require("./routes/ecurie.route"))
app.use("/boutique", require("./routes/boutique.router"));
app.use("/billetterie", require("./routes/billetterie.router"));
app.use("/prestataire", require("./routes/prestataire.router"));
app.use("/users", require("./routes/user.router"));
app.use("/auth", require("./routes/auth.router"));
app.use("/carte", require("./routes/carte.router"));
app.use("/karting", require("./routes/karting.router"));
app.use("/montgolfiere", require("./routes/montgolfiere.router"));


//
//
//  GESTION DES ERREURS
//
//

function errorHandler(error, req, res, _next) {
    res.status(error.status || 500).json({error: {message: error.message}});
}

app.use("*", (req, res, next) => {
    if (res.closed) return next();

    const error = new Error("Route non trouvée");
    error.status = 404;
    next(error);
});

app.use(errorHandler);

// On démarre l'API
// Mettre le hostname sur '0.0.0.0' permet d'écouter toutes les adresses, utile pour le déploiement en production
// et n'impacte pas l'environnement de développement.
app.listen(process.env.API_PORT, "0.0.0.0", () => {
    console.log(`Server running on http://127.0.0.1:${process.env.API_PORT}`);
    console.log(`Swagger running on http://127.0.0.1:${process.env.API_PORT}/api-docs/`);

    // Configurer le service mail :o
    registerMailService()

    // autoClearer()
});


// Fermer proprement le serveur
process.on("SIGINT", () => {
    console.log("\nArrêt du serveur...");
    app.close(() => {
        console.log("Serveur arrêté proprement. Port libéré.");
        process.exit(0);
    });
});

process.on("SIGTERM", () => {
    console.log("\nArrêt demandé (SIGTERM)...");
    app.close(() => {
        console.log("Serveur arrêté proprement. Port libéré.");
        process.exit(0);
    });
});