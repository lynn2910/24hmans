const path = require("path");
const fs = require("fs");

const router = new (require("express").Router)();

router.get("/:id", async (req, res) => {
    try {
        let files = fs.readdirSync(path.join(__dirname, "../../public/cdn"));
        let file = files.find(f => f === req.params.id);

        if (!file) {
            return res.status(404);
        } else {
            res.status(200).sendFile(file);
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            error: 1
        });
    }
})

module.exports = router;