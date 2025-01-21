const express = require('express');
const router = express.Router();

const prestataireMiddleware = require('../middlewares/prestataire.middleware');
const KartingService = require("../services/karting.service");

/**
 * @swagger
 * /karting/available:
 *   get:
 *     summary: Get Available Kartings
 *     tags:
 *       - Karting
 *     description: Retrieves a list of available kartings.
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         example: "sdkhd4Kcr8"
 *         schema:
 *           type: string
 *         description: The session ID of the authenticated prestataire.
 *     responses:
 *       200:
 *         description: List of available kartings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   karting_id:
 *                     type: integer
 *                     description: The ID of the karting.
 *                   prestataire_id:
 *                     type: string
 *                     description: The ID of the prestataire associated with the karting.
 */
router.get("/available", async (req, res) => {
    if (req.query.sessionId) {
        await prestataireMiddleware(req, res, async () => {
            let available_karts = await KartingService.get_available_kartings(req.session.userId)
            res.status(200).json(available_karts);
        })
    } else {
        let available_karts = await KartingService.get_available_kartings()
        res.status(200).json(available_karts);
    }
})

/**
 * @swagger
 * /karting/{karting_id}:
 *   get:
 *     summary: Get Karting Details
 *     tags:
 *       - Karting
 *     description: Retrieves detailed information about a specific karting.
 *     parameters:
 *       - in: path
 *         name: karting_id
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the karting.
 *       - in: query
 *         name: sessionId
 *         example: "sdkhd4Kcr8"
 *         schema:
 *           type: string
 *         description: The session ID of the authenticated prestataire.
 *     responses:
 *       200:
 *         description: Karting details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Karting'
 *       401:
 *         description: Unauthorized access to the karting.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       500:
 *         description: An error occurred while fetching karting details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */
router.get("/:karting_id/", async (req, res) => {
    if (req.query.sessionId) {
        await prestataireMiddleware(req, res, async () => {
            KartingService.get_karting(req.params.karting_id, req.session.userId)
                .then(
                    (karting) => res.status(200).json(karting),
                    ({status, message}) => res.status(status).json({message})
                );
        })
    } else {
        KartingService.get_karting(req.params.karting_id)
            .then(
                (res) => res.status(200).json(res),
                ({status, message}) => res.status(status).json({message})
            );
    }
})

// Circuit
router.get("/:karting_id/circuit")
router.post("/:karting_id/circuit")
router.patch("/:karting_id/circuit/:circuit_id")
router.delete("/:karting_id/circuit/:circuit_id")

// Sessions
router.get("/:karting_id/sessions")

router.post("/:karting_id/sessions")
router.patch("/:karting_id/sessions/:session_id")
router.delete("/:karting_id/sessions/:session_id")

// Sessions (user)

// Register to the session
router.post("/:karting_id/sessions/:session_id/register")

// Remove his participation to the session
router.delete("/:karting_id/sessions/:session_id/register")


module.exports = router;