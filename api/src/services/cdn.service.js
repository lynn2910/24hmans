const prisma = require("../db");
const path = require("path");

function createCdnFile(id, file) {
    fs.writeFileSync(
        path.join(__dirname, `../../public/cdn/${id}`),
        file,
    )
}

module.exports = {createCdnFile}