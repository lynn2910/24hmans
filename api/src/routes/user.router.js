const express = require('express');
const router = express.Router();

const userMiddleware = require("../middlewares/user.middleware");
const {createRule, Method, User, Permission} = require("../permissions");
const {getUser, getUserOrders} = require("../services/user.service");
const {getPrestataire} = require("../services/prestataire.service");
const {getAdmin} = require("../services/admin.service");

/**
 * @swagger
 * /users/@me:
 *   get:
 *     summary: Get Current User Information
 *     tags:
 *       - User
 *     description: Retrieves information about the currently authenticated user.
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - $ref: '#/components/schemas/Prestataire'
 *                 - $ref: '#/components/schemas/Admin'
 *       500:
 *         description: An error occurred while fetching user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */
router.get('/@me', userMiddleware, async (req, res) => {
    let user = req.session;

    switch (req.session.userType) {
        case 1: {
            getUser(user.userId).then(
                (u) => res.status(200).json(u),
                (err) => res.status(500).json({message: err.message}),
            )
            break;
        }
        case 2: {
            getPrestataire(user.userId).then(
                (u) => res.status(200).json(u),
                (err) => res.status(500).json({message: err.message}),
            );
            break;
        }
        case 3: {
            getAdmin(user.userId).then(
                (u) => res.status(200).json(u),
                (err) => res.status(500).json({message: err.message}),
            )
        }
    }
})
createRule("/users/@me", Method.All, User.User, [Permission.User, Permission.Prestataire, Permission.Admin])

/**
 * @swagger
 * /users/@me/orders:
 *   get:
 *     summary: Get User Orders
 *     tags:
 *       - User
 *     description: Retrieves a list of orders for the currently authenticated user.
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: An error occurred while fetching orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */
router.get('/@me/orders', userMiddleware, async (req, res) => {
    let user = req.session?.user_id;

    getUserOrders(user).then(
        (u) => res.status(200).json(u),
        (err) => res.status(500).json({message: err.message}),
    )
})
createRule("/users/@me/orders", Method.All, User.User, [Permission.User])

module.exports = router;