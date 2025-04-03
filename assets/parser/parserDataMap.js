const fs = require("fs");

async function parseJsonAndGenerateSQL() {
    const rawData = fs.readFileSync("carteZonesV2.json", "utf8");
    const jsonData = JSON.parse(rawData);

    const escapeSingleQuotes = (value) => value.replace(/'/g, "''");

    let shapeInsertSQL = "DELETE FROM Shape;\n\nINSERT INTO Shape (shape_id, name, type, logistics, surface, description, provider, service, category, iconUrl) VALUES\n";
    let pointInsertSQL = "DELETE FROM Point;\n\nINSERT INTO Point (point_id, lat, lng, shape_id) VALUES\n";

    let shapeValues = [];
    let pointValues = [];
    let shapeId = 0;
    let pointId = 0;

    jsonData.forEach((item, shapeIndex) => {
        if (item.type === "shape" || item.type === "marker") {
            const name = escapeSingleQuotes(item.name || "");
            const type = escapeSingleQuotes(item.type || "");
            const logistics = escapeSingleQuotes(item.logistics || "");
            const surface = escapeSingleQuotes(item.surface || "");
            const description = escapeSingleQuotes(item.description || "");
            const provider = item.provider ? `'${escapeSingleQuotes(item.provider)}'` : "NULL";
            const service = escapeSingleQuotes(item.service || "");
            const category = escapeSingleQuotes(item.category || "");
            const iconUrl = escapeSingleQuotes(item.iconUrl || "");

            shapeId = shapeIndex + 1;
            shapeValues.push(`(${shapeId}, '${name}', '${type}', '${logistics}', '${surface}', '${description}', ${provider}, '${service}', '${category}', '${iconUrl}')`);

            if (item.type === "shape" && Array.isArray(item.coordinates)) {
                item.coordinates.forEach((polygon) => {
                    if (Array.isArray(polygon)) {
                        polygon.forEach((coord) => {
                            pointId++;
                            pointValues.push(`(${pointId}, ${coord.lat}, ${coord.lng}, ${shapeId})`);
                        });
                    }
                });
            } else if (item.type === "marker" && item.coordinates) {
                pointId++;
                pointValues.push(`(${pointId}, ${item.coordinates.lat}, ${item.coordinates.lng}, ${shapeId})`);
            }
        }
    });

    shapeInsertSQL += shapeValues.join(",\n") + ";\n";
    pointInsertSQL += pointValues.join(",\n") + ";\n";

    console.log("-- Requêtes INSERT INTO pour Shape :\n", shapeInsertSQL);
    console.log("-- Requêtes INSERT INTO pour Point :\n", pointInsertSQL);

    fs.writeFileSync("../shapesMap.sql", shapeInsertSQL, "utf8");
    fs.writeFileSync("../pointsMap.sql", pointInsertSQL, "utf8");
}

parseJsonAndGenerateSQL().catch((error) => console.error("Erreur :", error));