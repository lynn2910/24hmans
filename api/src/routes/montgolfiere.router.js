const express = require ('express');
const router = express.Router();

const MontgolfiereService = require("../services/montgolfiere.service");
const {createRule, Method, Permission, User} = require("../permissions");
const {
    get_montgolfiere
} = require("../services/montgolfiere.service");
const {authenticateToken} = require("../middlewares/auth.middleware");


/**
 * @swagger
 * components:
 *   schemas:
 *     MontgolfiereSessionSlot:
 *       type: object
 *       properties:
 *         session_id:
 *           type: string
 *           description: The ID of the session.
 *           example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *         montgolfiere_id:
 *           type: string
 *           description: The ID of the montgolfiere.
 *           example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         session_slot_id:
 *           type: string
 *           description: The ID of the session slot.
 *           example: "4db3c4e0-0504-4ac4-902a-dfc98d6455de"
 *         from:
 *           type: string
 *           format: date-time
 *           description: Start time of the session slot.
 *           example: "2024-10-27T10:00:00.000Z"
 *         to:
 *           type: string
 *           format: date-time
 *           description: End time of the session slot.
 *           example: "2024-10-27T11:00:00.000Z"
 *         maxSize:
 *           type: integer
 *           description: Maximum number of people for the session slot.
 *           example: 10
 *       required:
 *         - session_id
 *         - montgolfiere_id
 *         - session_slot_id
 *         - from
 *         - to
 *         - maxSize
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message.
 *           example: "Montgolfière not found"
 */

/**
 * @swagger
 * /montgolfiere/available:
 *   get:
 *     summary: Get Available Montgolfieres
 *     tags:
 *       - Montgolfiere
 *     description: Retrieves a list of available montgolfières.
 *     responses:
 *       200:
 *         description: List of available montgolfières retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   montgolfiere_id:
 *                     type: integer
 *                     description: The ID of the montgolfiere.
 *                   prestataire_id:
 *                     type: string
 *                     description: The ID of the prestataire associated with the montgolfiere.
 */
router.get("/available", async (req, res) => {
    if (req.query.sessionId) {
        await authenticateToken(req, res, async () => {
            let available_montgolfieres = await MontgolfiereService.get_available_montgolfieres(req.session.userId);
            res.status(200).json(available_montgolfieres);
        });
    } else {
        let available_montgolfieres = await MontgolfiereService.get_available_montgolfieres();
        res.status(200).json(available_montgolfieres);
    }
})

/**
 * @swagger
 * /montgolfiere/{montgolfiere_id}:
 *   get:
 *     summary: Get Montgolfière Details
 *     tags:
 *       - Montgolfiere
 *     description: Retrieves detailed information about a specific montgolfière.
 *     parameters:
 *       - in: path
 *         name: montgolfiere_id
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the montgolfière.
 *     responses:
 *       200:
 *         description: Montgolfière details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Montgolfiere'
 *       401:
 *         description: Unauthorized access to the montgolfière.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       500:
 *         description: An error occurred while fetching montgolfière details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */
router.get("/:montgolfiere_id/", async (req, res) => {
    if (req.query.sessionId) {
        await authenticateToken(req, res, async () => {
            MontgolfiereService.get_montgolfiere(req.params.montgolfiere_id, req.session.userId)
                .then(
                    (montgolfiere) => res.status(200).json(montgolfiere),
                    ({status, message}) => res.status(status).json({message})
                );
        })
    } else {
        MontgolfiereService.get_montgolfiere(req.params.montgolfiere_id)
            .then(
                (montgolfiere) => res.status(200).json(montgolfiere),
                ({status, message}) => res.status(status).json({message})
            );
    }
})


module.exports = router;

