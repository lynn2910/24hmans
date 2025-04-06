const express = require('express');
const router = express.Router();

const MontgolfiereService = require("../services/montgolfiere.service");
const {
    get_montgolfiere,
    get_montgolfiere_sessions,
    create_session,
    update_session,
    delete_session,
    create_reservation,
} = require("../services/montgolfiere.service");
const {authenticateToken} = require("../middlewares/auth.middleware");
const {checkAccess} = require("../utils");


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
 *       - Montgolfière
 *     description: Retrieves a list of available montgolfières.
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: false
 *         description: Include if the user is authenticated and wants to view their own montgolfières.
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
 *                     type: string
 *                     description: The ID of the montgolfière.
 *                   prestataire_id:
 *                     type: string
 *                     description: The ID of the prestataire associated with the montgolfière.
 */
router.get("/available", async (req, res) => {
    try {
        if (req.query.sessionId) {
            await authenticateToken(req, res, async () => {
                const availableMontgolfieres = await MontgolfiereService.get_available_montgolfieres(req.session.userId);
                return res.status(200).json(availableMontgolfieres);
            });
        } else {
            const availableMontgolfieres = await MontgolfiereService.get_available_montgolfieres();
            return res.status(200).json(availableMontgolfieres);
        }
    } catch (err) {
        console.error("Erreur lors de la récupération des montgolfières disponibles :", err);
        return res.status(500).json({ message: "Erreur serveur." });
    }
})
/**
 * @swagger
 * /montgolfiere/{montgolfiere_id}:
 *   get:
 *     summary: Get Montgolfière Details
 *     tags:
 *       - Montgolfière
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
router.get("/:montgolfiere_id", async (req, res) => {
    if (req.headers.authorization) {
        await authenticateToken(req, res, async () => {
            MontgolfiereService.get_montgolfiere(req.params.montgolfiere_id, req.session.userId)
                .then(
                    (montgolfiere) => res.status(200).json(montgolfiere),
                    ({ status, message }) => res.status(status).json({ message })
                );
        });
    } else {
        MontgolfiereService.get_montgolfiere(req.params.montgolfiere_id)
            .then(
                (montgolfiere) => res.status(200).json(montgolfiere),
                ({ status, message }) => res.status(status).json({ message })
            );
    }
})

// Sessions
/**
 * @swagger
 * /montgolfiere/{montgolfiere_id}/sessions:
 *   get:
 *     summary: Get Montgolfière Sessions
 *     tags:
 *       - Montgolfière
 *     description: Retrieves all session slots associated with a specific montgolfière.
 *     parameters:
 *       - in: path
 *         name: montgolfiere_id
 *         required: true
 *         schema:
 *           type: string
 *         example: "1278aadd-b56a-458b-b8aa-ddb56a258bf8"
 *         description: The ID of the montgolfière.
 *     responses:
 *       200:
 *         description: Session slots retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MontgolfiereSessionSlot'
 *       404:
 *         description: Montgolfière not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "montgolfière not found"
 *       500:
 *         description: An error occurred while fetching session slots.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Error message details"
 *   post:
 *     summary: Create a Montgolfière Session
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Montgolfière
 *     description: Creates a new session slot for a specific montgolfière.
 *     parameters:
 *       - in: path
 *         name: montgolfiere_id
 *         required: true
 *         schema:
 *           type: string
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         description: The ID of the montgolfière.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-28T14:00:00.000Z"
 *               toDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-28T15:00:00.000Z"
 *               maxSize:
 *                 type: integer
 *                 example: 10
 *             required:
 *               - fromDate
 *               - toDate
 *               - maxSize
 *     responses:
 *       200:
 *         description: Session slot created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MontgolfiereSessionSlot'
 *       404:
 *         description: Montgolfière not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Missing required fields in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
    "/:montgolfiere_id/sessions",
    async (req, res) => {
        try {
            const sessions = await get_montgolfiere_sessions(req.params.montgolfiere_id);
            res.status(200).json(sessions);
        } catch (err) {
            if (err.code === 'P2025') {
                return res.status(404).json({message: "montgolfière not found"});
            }
            console.error(err);
            res.status(500).json({message: err.message});
        }
    }
);
/**
 * @swagger
 * /montgolfiere/{montgolfiere_id}/sessions:
 *   post:
 *     summary: Create a Montgolfière Session
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Montgolfière
 *     description: Creates a new session slot for a specific montgolfière.
 *     parameters:
 *       - in: path
 *         name: montgolfiere_id
 *         required: true
 *         schema:
 *           type: string
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         description: The ID of the montgolfière.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromDate:
 *                 type: string
 *                 format: date-time
 *                 description: Start date and time of the session.
 *                 example: "2024-10-28T14:00:00.000Z"
 *               toDate:
 *                 type: string
 *                 format: date-time
 *                 description: End date and time of the session.
 *                 example: "2024-10-28T15:00:00.000Z"
 *               maxSize:
 *                 type: integer
 *                 description: Maximum number of participants for the session.
 *                 example: 10
 *             required:
 *               - fromDate
 *               - toDate
 *               - maxSize
 *     responses:
 *       200:
 *         description: Session slot created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MontgolfiereSessionSlot'
 *       401:
 *         description: Access denied (montgolfière not found or unauthorized).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Montgolfière not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Missing required fields in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
    "/:montgolfiere_id/sessions",
    authenticateToken,
    async (req, res) => {
        if (!checkAccess(req, res, "prestataire")) return;

        try {
            const montgolfiere = await get_montgolfiere(req.params.montgolfiere_id, req.session?.userId || null);
            if (!montgolfiere) {
                return res.status(404).json({ message: "montgolfière not found" });
            }

            const { fromDate, toDate, maxSize } = req.body;
            if (!fromDate || !toDate || !maxSize) {
                return res.status(409).json({ message: "Missing fields" });
            }

            const session = await create_montgolfiere_session(req.params.montgolfiere_id, { fromDate, toDate, maxSize });
            res.status(200).json(session);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }
);
/**
 * @swagger
 * /montgolfiere/{montgolfiere_id}/sessions/{session_id}:
 *   patch:
 *     summary: Update a Montgolfiere Session
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Montgolfiere
 *     description: Updates an existing session slot for a specific montgolfiere.
 *     parameters:
 *       - in: path
 *         name: montgolfiere_id
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the montgolfiere.
 *       - in: path
 *         name: session_id
 *         example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the session.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromDate:
 *                 type: string
 *                 format: date-time
 *                 description: New start date and time of the session.
 *                 example: "2024-10-29T10:00:00.000Z"
 *               toDate:
 *                 type: string
 *                 format: date-time
 *                 description: New end date and time of the session.
 *                 example: "2024-10-29T11:00:00.000Z"
 *               maxSize:
 *                 type: integer
 *                 description: New maximum number of participants for the session.
 *                 example: 15
 *             required:
 *               - fromDate
 *               - toDate
 *               - maxSize
 *     responses:
 *       200:
 *         description: Session slot updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MontgolfiereSessionSlot'
 *       401:
 *         description: Access denied.
 *       409:
 *         description: Missing required fields in the request body.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete a Montgolfiere Session
 *     tags:
 *       - Montgolfiere
 *     security:
 *       - bearerAuth: []
 *     description: Deletes an existing session slot for a specific montgolfiere.
 *     parameters:
 *       - in: path
 *         name: montgolfiere_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the montgolfiere.
 *       - in: path
 *         name: session_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the session.
 *     responses:
 *       200:
 *         description: Session slot deleted successfully.
 *       401:
 *         description: Access denied.
 *       500:
 *         description: Internal server error.
 */
router.patch("/:montgolfiere_id/sessions/:session_id", authenticateToken, async (req, res) => {
    let session = await get_montgolfiere_session(req.params.montgolfiere_id, req.params.session_id);
    if (!session) {
        return res.status(401).json({message: "Access denied"});
    }

    let fields = ["fromDate", "toDate", "maxSize"];
    if (!fields.some((f) => f in req.body)) {
        return res.status(409).json({message: "Missing fields"});
    }

    let updatedSession = await update_session(
        req.params.montgolfiere_id,
        req.params.session_id,
        req.body
    );

    res.status(200).json(updatedSession);
});

router.delete("/:montgolfiere_id/sessions/:session_id", authenticateToken, async (req, res) => {
    let session = await get_montgolfiere_session(req.params.montgolfiere_id, req.params.session_id);
    if (!session) {
        return res.status(401).json({message: "Access denied"});
    }
    try {
        let deletedSession = await delete_session(req.params.montgolfiere_id, req.params.session_id);
        res.status(200).json(deletedSession);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: e.message});
    }
});


// Sessions (user)

/**
 * @swagger
 * /montgolfiere/{montgolfiere_id}/sessions/{session_id}/register:
 *   post:
 *     summary: Register for a Montgolfiere Session
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Montgolfiere
 *     description: Registers the authenticated user for a specific montgolfiere session.
 *     parameters:
 *       - in: path
 *         name: montgolfiere_id
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the montgolfiere.
 *       - in: path
 *         name: session_id
 *         example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the session.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               circuit_id:
 *                 type: string
 *                 description: The ID of the circuit to register for.
 *                 example: "circuit-123"
 *               pseudo:
 *                 type: string
 *                 description: The user's pseudo for the session.
 *                 example: "JohnDoe"
 *             required:
 *               - pseudo
 *     responses:
 *       200:
 *         description: User registered for the session successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserMontgolfiereSession'  # Or a simplified version
 *       401:
 *         description: Access denied (montgolfiere not found or unauthorized).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/:montgolfiere_id/sessions/:session_id/register", authenticateToken, async (req, res) => {
    try {
        const montgolfiere = await get_montgolfiere(req.params.montgolfiere_id, null);

        if (!montgolfiere) {
            res.status(401).json({message: "Access denied"});
            return;
        }

        const reservation = await create_reservation(
            montgolfiere.reservation_app_id,
            req.session.userId,
            req.body.pseudo
        );

        res.status(200).json(reservation);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: e.message});
    }
})


module.exports = router;

