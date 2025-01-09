const express = require('express');
const router = express.Router();

const userMiddleware = require("../middlewares/user.middleware");
const {createRule, Method, User, Permission} = require("../permissions");
const {getUser, getUserOrders, createNewOrder} = require("../services/user.service");
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

/**
 * @swagger
 * /users/@me/orders:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new order
 *     description: Creates a new order for the authenticated user.
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               {
 *                 "user_id": "e052f135-13db-4a0d-aa15-f9bffac00359",
 *                 "date": "2025-01-09T13:18:30.884Z",
 *                 "articles": [
 *                   {
 *                     "article_id": 1,
 *                     "amount": 7
 *                   }
 *                 ]
 *               }
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user creating the order.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of the order.
 *               articles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     article_id:
 *                       type: integer
 *                       description: The ID of the article.
 *                     amount:
 *                       type: integer
 *                       description: The quantity of the article.
 *     responses:
 *       200:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: The error code.
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       500:
 *         description: An error occurred while creating the order.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */
router.post("/@me/orders", userMiddleware, async (req, res) => {
    // On attend d'avoir ces infos dans le body:
    // {
    //     user_id: string,
    //     date: Date,
    //     articles: [
    //         {
    //             article_id: int,
    //             amount: int,
    //         }
    //     ]
    // }

    let raw_order = req.body;

    // Check that the body corresponds to what we want
    let is_body_invalid = ['user_id', 'date', 'articles'].some(k => !(k in raw_order))
        || !Array.isArray(raw_order.articles)
        || raw_order.articles.some((a) => !(('article_id' in a) && ('amount' in a)));

    if (is_body_invalid) {
        res.status(400).json({code: "INVALID_BODY", message: "The body doesn't have the proper required structure"});
        return;
    }

    createNewOrder(req.session.userId, raw_order)
        .then((order) => res.status(200).json({order}))
        .catch((err) => res.status(err.status).json({message: err.message}))
})


module.exports = router;