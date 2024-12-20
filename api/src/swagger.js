const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
const jsYaml = require("js-yaml");

function init_swagger(app) {
    const swaggerOptions = {
        definition: {
            swagger: "2.0.0",
            openapi: "3.1.0",
            info: {
                title: "24h du Mans - API",
                description: "Notre API met à votre disposition un trésor de données sur la plus célèbre course d'endurance au monde.",
                version: "1.0.0",
            },
            servers: [
                {url: `http://localhost:${process.env.API_PORT}/`, description: "Environnement de développement"},
                // {url: "https://api.24h.chamallow.fr", description: "Production - Live server"}
                // TODO Impossible de faire fonctionner swagger avec l'API en production O_o
            ],
        },
        apis: ["./src/routes/*.js"],
    };

    const swaggerDocs = swaggerJsdoc(swaggerOptions);

    const jsYaml = require('js-yaml');
    require("fs").writeFileSync('swagger.yaml', jsYaml.dump(swaggerDocs));

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

}

module.exports = {init_swagger};