const express = require('express');
const router = express.Router();

const prestataireMiddleware = require('../middlewares/prestataire.middleware');
const KartingService = require("../services/karting.service");
const {createRule, Method, Permission, User} = require("../permissions");

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

//
//
//       Circuit
//
//

/**
 * @swagger
 * /karting/{karting_id}/circuit:
 *   post:
 *     summary: "Create Circuit for Karting"
 *     tags:
 *       - Karting
 *     description: "Creates a new circuit for a specific karting."
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         example: "sdkhd4Kcr8"
 *         schema:
 *           type: string
 *         description: The session ID of the authenticated prestataire.
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
router.post("/:karting_id/circuit", prestataireMiddleware, async (req, res) => {
    let fields = ['minAge', 'circuit_name', 'kart_power'];
    if (typeof req.body !== "object" || Array.isArray(req.body) || fields.some(k => !(k in req.body))) {
        res.status(400).json({message: "Invalid body field"});
        return;
    }

    KartingService.create_circuit(req.params.karting_id, req.session.userId, req.body).then(
        (circuit) => res.status(200).json(circuit),
        ({status, message}) => res.status(status).json({message})
    )
})
createRule("/karting/:karting_id/circuit", Method.All, User.Prestataire, [Permission.Prestataire]);

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
 *       - in: query
 *         name: sessionId
 *         example: "sdkhd4Kcr8"
 *         schema:
 *           type: string
 *         description: The session ID of the authenticated prestataire.
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
router.get("/:karting_id/circuit/:circuit_id", async (req, res) => {
    if (req.query.sessionId) {
        await prestataireMiddleware(req, res, async () => {
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
})

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