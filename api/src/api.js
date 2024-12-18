const express = require("express");
const morgan = require("morgan");

require("./db");

const app = express();
require("dotenv").config();

app.use(express.json());

// Système de logger
if (process.env.PROD)
    // En production
    app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]b'));
else
    // En développement
    app.use(morgan(':method :url :status :response-time ms - :res[content-length]b'));


app.get("/", function (req, res) {
    res.send("Hello World");
});


// API swagger
require("./swagger.js").init_swagger(app);

//
//
//  ROUTEURS
//
//


// Boutique
app.use("/boutique", require("./routes/boutique.router"));


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
});
