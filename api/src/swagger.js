const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");

function init_swagger(app) {
    const swaggerOptions = {
        definition: {
            swagger: "2.0.0",
            openapi: "3.1.0",
            info: {
                title: "24h du Mans - API",
                description: "Notre API met à votre disposition un trésor de données sur la plus célèbre course d'endurance au monde. Créez des outils personnalisés pour analyser les performances des pilotes, suivre les résultats en direct et revivre les moments forts de l'histoire des 24 Heures du Mans.",
                version: "1.0.0",
            },
            servers: [
                {url: `http://localhost:${process.env.API_PORT}/`, description: "Environnement de développement"},
                {url: "https://api.24h.chamallow.fr", description: "Production - Live server"}
            ],
        },
        apis: ["./src/routes/*.js"],
    };

    const swaggerDocs = swaggerJsdoc(swaggerOptions);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

}

module.exports = {init_swagger};