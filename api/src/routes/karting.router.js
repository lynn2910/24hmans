const express = require('express');
const router = express.Router();

const KartingService = require("../services/karting.service");
const {createRule, Method, Permission, User} = require("../permissions");
const {
    get_karting,
    update_circuit,
    get_karting_circuit,
    delete_circuit,
    get_karting_sessions,
    create_session,
    get_karting_session,
    update_session,
    delete_session,
    create_reservation
} = require("../services/karting.service");
const {authenticateToken} = require("../middlewares/auth.middleware");


/**
 * @swagger
 * components:
 *   schemas:
 *     KartingSessionSlot:
 *       type: object
 *       properties:
 *         session_id:
 *           type: string
 *           description: The ID of the session.
 *           example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *         karting_id:
 *           type: string
 *           description: The ID of the karting.
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
 *         - karting_id
 *         - session_slot_id
 *         - from
 *         - to
 *         - maxSize
 *     Circuit:  # Example Circuit schema
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the circuit.
 *           example: "circuit-123"
 *         name:
 *           type: string
 *           description: The name of the circuit.
 *           example: "Monza"
 *         minAge:
 *           type: integer
 *           description: Minimum age for the circuit.
 *           example: 8
 *         kart_power:
 *           type: string
 *           description: Required kart power.
 *           example: "medium"
 *         #... other circuit properties
 *       required:
 *         - id
 *         - name
 *     Error: # Generic error schema
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message.
 *           example: "Karting not found"
 */

/**
 * @swagger
 * /karting/available:
 *   get:
 *     summary: Get Available Kartings
 *     tags:
 *       - Karting
 *     description: Retrieves a list of available kartings.
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
        await authenticateToken(req, res, async () => {
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
router.get(
    "/:karting_id/",
    async (req, res) => {
        if (req.headers.authorization) {
            await authenticateToken(req, res, async () => {
                KartingService.get_karting(req.params.karting_id, req.session.userId)
                    .then(
                        (karting) => res.status(200).json(karting),
                        ({status, message}) => res.status(status).json({message})
                    );
            })
        } else {
            KartingService.get_karting(req.params.karting_id)
                .then(
                    (d) => res.status(200).json(d),
                    ({status, message}) => res.status(status).json({message})
                );
        }
    }
)

//
//
//       Circuit
//
//

router.get("/:presta_id/circuits",
    async (req, res) => {
        await KartingService.get_all_circuits(req.params.presta_id).then(
            (circuit) => res.status(200).json(circuit),
            ({status, message}) => res.status(status).json({message})
        );
    }
)

/**
 * @swagger
 * /karting/{karting_id}/circuit:
 *   post:
 *     summary: "Create Circuit for Karting"
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Karting
 *     description: "Creates a new circuit for a specific karting."
 *     parameters:
 *       - in: path
 *         name: karting_id
 *         required: true
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         schema:
 *           type: string
 *         description: The ID of the karting.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               {
 *                 "minAge": 18,
 *                 "circuit_name": "Adultes",
 *                 "kart_power": 270
 *               }
 *             properties:
 *               minAge:
 *                 type: integer
 *                 description: The minimum age requirement for the circuit.
 *               circuit_name:
 *                 type: string
 *                 description: The name of the circuit.
 *               kart_power:
 *                 type: string
 *                 description: The power of the karts used on the circuit.
 *     responses:
 *       200:
 *         description: Circuit created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Circuit'
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       500:
 *         description: An error occurred while creating the circuit.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */
router.post("/:karting_id/circuit",
    authenticateToken,
    async (req, res) => {
        let fields = ['minAge', 'circuit_name', 'kart_power'];
        if (typeof req.body !== "object" || Array.isArray(req.body) || fields.some(k => !(k in req.body))) {
            res.status(400).json({message: "Invalid body field"});
            return;
        }

        KartingService.create_circuit(req.params.karting_id, req.session.userId, req.body).then(
            (circuit) => res.status(200).json(circuit),
            ({status, message}) => res.status(status).json({message})
        )
    }
)

/**
 * @swagger
 * /karting/{karting_id}/circuit/{circuit_id}:
 *   get:
 *     summary: Get Circuit Details
 *     tags:
 *       - Karting
 *     description: Retrieves detailed information about a specific circuit for a given karting.
 *     parameters:
 *       - in: path
 *         name: karting_id
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the karting.
 *       - in: path
 *         name: circuit_id
 *         required: true
 *         example: "4db3c4e0-0504-4ac4-902a-dfc98d6455de"
 *         schema:
 *           type: string
 *         description: The ID of the circuit.
 *     responses:
 *       200:
 *         description: Circuit details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Circuit'
 *       404:
 *         description: Circuit not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       500:
 *         description: An error occurred while fetching circuit details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */
router.get("/:karting_id/circuit/:circuit_id",
    async (req, res) => {
        if (req.query.sessionId) {
            await authenticateToken(req, res, async () => {
                await KartingService.get_karting_circuit(req.params.karting_id, req.params.circuit_id, req.session.userId).then(
                    (circuit) => res.status(200).json(circuit),
                    ({status, message}) => res.status(status).json({message})
                );
            })
        } else {
            await KartingService.get_karting_circuit(req.params.karting_id, req.params.circuit_id).then(
                (circuit) => res.status(200).json(circuit),
                ({status, message}) => res.status(status).json({message})
            );
        }
    }
)

/**
 * @swagger
 * /karting/{karting_id}/circuit/{circuit_id}:
 *   patch:
 *     summary: Update Circuit Details
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Karting
 *     description: Updates details of a specific circuit for a given karting.
 *     parameters:
 *       - in: path
 *         name: karting_id
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the karting.
 *       - in: path
 *         name: circuit_id
 *         example: "4db3c4e0-0504-4ac4-902a-dfc98d6455de"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the circuit.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               minAge:
 *                 type: integer
 *                 description: The minimum age required for the circuit.
 *               circuit_id:
 *                 type: string
 *                 description: The ID of the circuit.
 *               kart_power:
 *                 type: string
 *                 description: The required kart power for the circuit.
 *             example:
 *               minAge: 10
 *               circuit_id: "4db3c4e0-0504-4ac4-902a-dfc98d6455de"
 *               kart_power: "medium"
 *     responses:
 *       200:
 *         description: Circuit details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Circuit'
 *       401:
 *         description: Access denied.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *               example:
 *                 message: "Access denied"
 *
 *   delete:
 *     summary: Delete Circuit
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Karting
 *     description: Deletes a specific circuit for a given karting.
 *     parameters:
 *       - in: path
 *         name: karting_id
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the karting.
 *       - in: path
 *         name: circuit_id
 *         example: "4db3c4e0-0504-4ac4-902a-dfc98d6455de"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the circuit.
 *     responses:
 *       200:
 *         description: Circuit deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Circuit'
 *       404:
 *         description: Circuit not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *               example:
 *                 message: "Circuit not found"
 */
router.patch("/:karting_id/circuit/:circuit_id",
    authenticateToken,
    async (req, res) => {
        let karting = await get_karting_circuit(req.params.karting_id, req.params.circuit_id, req.session.userId);
        if (!karting) {
            // access denied
            res.status(401).json({message: "Access denied"});
            return;
        }

        let new_circuit = await update_circuit(
            req.params.karting_id,
            req.params.circuit_id,
            req.body
        );

        res.status(200).json(new_circuit);
    }
)

// TODO: SWAGGER
router.delete(
    "/:karting_id/circuit/:circuit_id",
    authenticateToken,
    async (req, res) => {
        let karting = await get_karting_circuit(req.params.karting_id, req.params.circuit_id, req.session.userId);

        if (!karting) {
            // access denied
            res.status(404).json({message: "Circuit not found"});
            return;
        }

        let deleted_circuit = await delete_circuit(req.params.karting_id, req.params.circuit_id);
        res.status(200).json(deleted_circuit);
    }
)


// Sessions
/**
 * @swagger
 * /karting/{karting_id}/circuit/{circuit_id}/sessions:
 *   get:
 *     summary: Get Karting Sessions
 *     tags:
 *       - Karting
 *     description: Retrieves all session slots associated with a specific karting.
 *     parameters:
 *       - in: path
 *         name: karting_id
 *         example: "1278aadd-b56a-458b-b8aa-ddb56a258bf8"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the karting.
 *       - in: path
 *         name: circuit_id
 *         example: "7c9c6893-7402-48df-9c68-937402f8df02"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the circuit.
 *     responses:
 *       200:
 *         description: Session slots retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/KartingSessionSlot'
 *       404:
 *         description: Karting not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *               example:
 *                 message: "karting not found"
 *       500:
 *         description: An error occurred while fetching session slots.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *               example:
 *                 message: "Error message details"
 *   post:
 *     summary: Create a Karting Session
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Karting
 *     description: Creates a new session slot for a specific karting.
 *     parameters:
 *       - in: path
 *         name: karting_id
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the karting.
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
 *                 example: 12
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
 *               $ref: '#/components/schemas/KartingSessionSlot'
 *       404:
 *         description: Karting not found.
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
 *       500: # It's good practice to include a 500 for general errors
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
    "/:karting_id/circuit/:circuit_id/sessions",
    async (req, res) => {
        try {
            const kart = await get_karting_sessions(req.params.circuit_id);
            res.status(200).json(kart);
        } catch (err) {
            if (err.code === 'P2025') {
                return res.status(404).json({message: "karting not found"});
            }

            console.error(err);
            res.status(500).json({message: err.message});
        }
    }
)

// TODO: SWAGGER
router.post(
    "/:karting_id/circuit/:circuit_id/sessions",
    authenticateToken,
    async (req, res) => {
        let karting = await get_karting(req.params.karting_id, req.session?.userId || null);
        if (!karting) {
            res.status(404).json({message: "karting not found"});
        }

        let fields = ["fromDate", "toDate", "maxSize"];
        if (!fields.some((f) => f in req.body)) {
            return res.status(409).json({message: "Missing fields"});
        }

        const session = await create_session(req.params.circuit_id, req.body);
        res.status(200).json(session);
    })

/**
 * @swagger
 * /karting/{karting_id}/sessions/{session_id}:
 *   patch:
 *     summary: Update a Karting Session
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Karting
 *     description: Updates an existing session slot for a specific karting.
 *     parameters:
 *       - in: path
 *         name: karting_id
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the karting.
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
 *             required:  # Important: List required fields for the update
 *               - fromDate
 *               - toDate
 *               - maxSize
 *     responses:
 *       200:
 *         description: Session slot updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KartingSessionSlot'
 *       401:
 *         description: Access denied.
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
 *       500: # It's good practice to include a 500 for general errors
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Delete a Karting Session
 *     tags:
 *       - Karting
 *     security:
 *       - bearerAuth: []
 *     description: Deletes an existing session slot for a specific karting.
 *     parameters:
 *       - in: path
 *         name: karting_id
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the karting.
 *       - in: path
 *         name: session_id
 *         example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the session.
 *     responses:
 *       200:
 *         description: Session slot deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KartingSessionSlot' # Or a simplified version
 *       401:
 *         description: Access denied.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: An error occurred while deleting the session slot.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch(
    "/:karting_id/circuit/:circuit_id/sessions/:session_id",
    authenticateToken,
    async (req, res) => {
        let karting = await get_karting_session(req.params.circuit_id, req.params.circuit_id);
        if (!karting) {
            // access denied
            res.status(401).json({message: "Access denied"});
            return;
        }

        let fields = ["fromDate", "toDate", "maxSize"];
        if (!fields.some((f) => f in req.body)) {
            return res.status(409).json({message: "Missing fields"});
        }

        let new_session = await update_session(
            req.params.circuit_id,
            req.params.session_id,
            req.body
        );

        res.status(200).json(new_session);
    }
)

// TODO: SWAGGER
router.delete(
    "/:karting_id/circuit/:circuit_id/sessions/:session_id",
    authenticateToken,
    async (req, res) => {
        let karting = await get_karting_session(req.params.circuit_id, req.params.session_id);
        if (!karting) {
            // access denied
            res.status(401).json({message: "Access denied"});
            return;
        }

        try {
            let old_session = await delete_session(req.params.circuit_id, req.params.session_id);
            res.status(200).json(old_session);
        } catch (e) {
            console.error(e);
            res.status(500).json({message: e.message});
        }
    }
)

// Registrations (user)

/**
 * @swagger
 * /karting/{karting_id}/sessions/{session_id}/register:
 *   post:
 *     summary: Register for a Karting Session
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Karting
 *     description: Registers the authenticated user for a specific karting session.
 *     parameters:
 *       - in: path
 *         name: karting_id
 *         example: "29e11c0e-ee8f-4ab2-91a0-31486c5aeb19"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the karting.
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
 *               - circuit_id
 *               - pseudo
 *     responses:
 *       200:
 *         description: User registered for the session successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserKartingSession'  # Or a simplified version
 *       401:
 *         description: Access denied (karting not found or unauthorized).
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
    "/:karting_id/circuit/:circuit_id/sessions/:session_id/register",
    authenticateToken,
    async (req, res) => {
        try {
            const karting = await get_karting(req.params.karting_id, null);
            if (!karting) {
                res.status(401).json({message: "Access denied"});
                return;
            }

            const reservation = await create_reservation(
                req.params.circuit_id,
                req.params.session_id,
                req.user.id,
                req.body.pseudo
            );

            res.status(200).json(reservation);
        } catch (e) {
            console.error(e);
            res.status(500).json({message: e.message});
        }
    }
)

module.exports = router;