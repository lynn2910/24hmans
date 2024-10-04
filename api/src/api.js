const express = require("express");
const app = express();

app.use(express.json());
require("dotenv").config();

app.get("/", function (req, res) {
  res.send("Hello World");
});

//
//
//  ROUTEURS
//
//


// ...


//
//
//  GESTION DES ERREURS
//
//

function errorHandler(error, req, res, next) {
  res.status(error.status || 500).json({ error: { message: error.message } });
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
