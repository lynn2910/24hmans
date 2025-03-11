const path = require("path");
const fs = require("fs");
const CdnService = require("../services/cdn.service");
const {upload} = require("../services/cdn.service");
const anyLoginMiddleware = require("../middlewares/any.middleware");

const router = new (require("express").Router)();

/**
 * @ swagger
 * tags:
 *   - name: CDN
 *     description: Gestion des fichiers CDN
 */

/**
 * @ swagger
 * /cdn/{id}:
 *   get:
 *     summary: Récupérer un fichier CDN
 *     tags: [CDN]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du fichier (chemin relatif)
 *     responses:
 *       200:
 *         description: Fichier renvoyé
 *       404:
 *         description: Fichier non trouvé
 *     security:
 *       - bearerAuth: []
 */

/**
 * @ swagger
 * /cdn/{id}:
 *   post:
 *     summary: Upload un fichier vers le CDN
 *     tags: [CDN]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du fichier (chemin relatif)
 *       - in: formData
 *         name: uploadFile
 *         type: file
 *         required: true
 *         description: Le fichier à uploader
 *     responses:
 *       200:
 *         description: Fichier uploadé avec succès
 *         schema:
 *           type: object
 *           properties:
 *             path:
 *               type: string
 *               description: Chemin relatif du fichier
 *             url:
 *               type: string
 *               description: URL du fichier
 *       400:
 *         description: Mauvaise requête (fichier non fourni, type incorrect)
 *       413:
 *         description: Fichier trop volumineux
 *       500:
 *         description: Erreur serveur
 *     security:
 *       - bearerAuth: [] # Si vous utilisez une authentification Bearer
 */

router.get("/:id(*)",
    anyLoginMiddleware,
    async (req, res) => {
        try {
            let file = CdnService.getCdnFile(req.params.id);

            if (!file) {
                return res.status(404).json({error: 1, message: "File not found"});
            } else {
                return res.status(200).sendFile(file);
            }
        } catch (err) {
            res.status(500).json({
                message: err.message,
                error: 1
            });
        }
    }
)

router.post("/:id(*)",
    anyLoginMiddleware,
    upload.single("file"),
    async (req, res) => {
        try {
            const file = req.file;

            if (!file) {
                return res.status(400).json({error: 1, message: "Aucun fichier fourni."});
            }

            if (!file.mimetype.startsWith("image/")) {
                fs.unlinkSync(file.path);
                return res.status(400).json({error: 1, message: "Type de fichier non autorisé."});
            }

            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const filePath = `/uploads/${file.filename}`;
            const fileUrl = `${baseUrl}${filePath}`;

            return res.status(200).json({path: filePath, url: fileUrl});

        } catch (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(413).json({error: 1, message: "Fichier trop volumineux."});
            }

            console.error("Erreur lors de l'upload :", err);
            res.status(500).json({message: err.message || "Erreur serveur.", error: 1});
        }
    }
);

module.exports = router;