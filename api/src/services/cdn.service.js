const path = require("path");
const fs = require("fs");

const multer = require("multer");
const upload = multer({
    path: path.join(__dirname, "../../public/cdn"),
});

module.exports = {upload}