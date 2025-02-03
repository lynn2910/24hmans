const path = require("path");
const fs = require("fs");

function createCdnFile(id, file) {
    if (!fs.existsSync(path.join(__dirname, `../../public/cdn`)))
        fs.mkdirSync(path.join(__dirname, `../../public/cdn`));

    fs.writeFileSync(
        path.join(__dirname, `../../public/cdn/${id}`),
        file,
    );

    const isProd = process.env.PROD === "true";
    return isProd ? `https://api.24h.chamallow.fr/cdn/${id}` : `https://localhost:${process.env.API_PORT}/cdn/${id}`;
}

module.exports = {createCdnFile}