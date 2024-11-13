const swaggerUi = require('swagger-ui-express');

function init_swagger(app) {
    const swaggerOption = {
        swagger: "2.0",
        info: {
            title: "24h du mans",
            description: "Description",
            version: "0.0.1"
        },
        host: process.env.PROD ? "24h.chamallow.fr" : `https://localhost:${process.env.API_PORT}`,
        baseUrl: "/",
        paths: {
            "/posts": {
                "get": {
                    "description": "List all posts",
                    "responses": {}
                }
            }
        }
    };

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOption, {explorer: true}));
}

module.exports = {init_swagger};