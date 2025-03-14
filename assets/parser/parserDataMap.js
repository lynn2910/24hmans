const fs = require("fs");

async function parseJsonAndGenerateSQL() {
    // Charger le fichier JSON
    const rawData = fs.readFileSync("carteZones.json", "utf8");
    const jsonData = JSON.parse(rawData);

    // Fonction pour échapper les apostrophes
    const escapeSingleQuotes = (value) => {
        return value.replace(/'/g, "''");
    };

    // Initialisation des requêtes SQL
    let shapeInsertSQL = "DELETE\n" +
        "FROM Shape;\n\n";
    let pointInsertSQL = "DELETE\n" +
        "FROM Point;\n\n";
    let shapeId = 0;
    let pointId = 0;

    // Parcourir les objets dans le JSON
    jsonData.forEach((item, shapeIndex) => {
        if (item.type === "shape") {
            const name = escapeSingleQuotes(item.name || "");
            const logistics = escapeSingleQuotes(item.logistics || "");
            const surface = escapeSingleQuotes(item.surface || "");
            const description = escapeSingleQuotes(item.description || "");
            const provider = item.provider ? `'${escapeSingleQuotes(item.provider)}'` : "NULL";
            const service = escapeSingleQuotes(item.service || "");
            const category = escapeSingleQuotes(item.category || "");

            shapeId = shapeIndex + 1;

            // Générer la requête INSERT INTO pour Shape
            shapeInsertSQL += `INSERT INTO Shape (shape_id, name, logistics, surface, description, provider, service,
                                                  category)
                               VALUES (${shapeId}, '${name}', '${logistics}', '${surface}', '${description}',
                                       ${provider}, '${service}', '${category}');  `;


            // Vérifier si `coordinates` est un tableau de tableaux (polygones)
            if (Array.isArray(item.coordinates)) {
                item.coordinates.forEach((polygon, polygonIndex) => {

                    // Vérifier si chaque polygone est un tableau valide de coordonnées
                    if (Array.isArray(polygon)) {
                        polygon.forEach((coord) => {
                            const lat = coord.lat;
                            const lng = coord.lng;

                            pointId = pointId + 1;

                            // Générer la requête INSERT INTO pour chaque Point
                            pointInsertSQL += `INSERT INTO Point (point_id, lat, lng, shape_id)
                                               VALUES (${pointId}, ${lat}, ${lng}, ${shapeId});  `;
                        });
                    } else {
                        console.error(`Le polygone à l'index ${polygonIndex} pour shape_id ${shapeId} n'est pas valide.`);
                    }
                });
            } else {
                console.error(`Les coordonnées ne sont pas valides pour l'élément avec shape_id: ${shapeId}`);
            }
        }
    });

    // Afficher les requêtes SQL générées
    console.log("-- Requêtes INSERT INTO pour Shape :");
    console.log(shapeInsertSQL);
    console.log("-- Requêtes INSERT INTO pour Point :");
    console.log(pointInsertSQL);

    // Écrire les requêtes SQL dans un fichier
    fs.writeFileSync("../shapesMap.sql", shapeInsertSQL, "utf8");
    fs.writeFileSync("../pointsMap.sql", pointInsertSQL, "utf8");
}

// Exécuter la fonction
parseJsonAndGenerateSQL()
    .catch((error) => console.error("Erreur :", error));
