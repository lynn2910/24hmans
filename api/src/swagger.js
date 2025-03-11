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
                {
                    url: process.env.PROD === 'true' ? 'https://api.24h.chamallow.fr/' : `http://localhost:${process.env.API_PORT}/`,
                    description: "Environnement de développement"
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        },
        apis: ["./src/routes/*.js"],
    };

    const swaggerDocs = swaggerJsdoc(swaggerOptions);

    const jsYaml = require('js-yaml');
    require("fs").writeFileSync('swagger.yaml', jsYaml.dump(swaggerDocs));

    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(
            swaggerDocs,
            {
                explorer: true,
                customCssUrl: '/swagger_theme.css', // Slightly modified from https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-flattop.css
                deepLinking: true,
                filter: true
            }
        )
    );

}

module.exports = {init_swagger};