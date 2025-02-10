const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: The ID of the user who placed the order.
 *           example: e052f135-13db-4a0d-aa15-f9bffac00359
 *         order_id:
 *           type: string
 *           description: The unique ID of the order.
 *           example: 665cbf43-6f55-4679-ad4c-d6be8d9a9551
 *         total_price:
 *           type: string
 *           format: decimal
 *           description: The total price of the order.
 *           example: 118.93
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time the order was placed.
 *           example: 2025-01-09T13:18:30.884Z
 *         articles:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *                 description: The ID of the order to which this article belongs.
 *               article_id:
 *                 type: integer
 *                 description: The ID of the article.
 *               unit_price:
 *                 type: string
 *                 format: decimal
 *                 description: The unit price of the article.
 *               amount:
 *                 type: integer
 *                 description: The quantity of the article.
 *               article:
 *                 $ref: '#/components/schemas/ShopItem'
 *       required:
 *         - user_id
 *         - order_id
 *         - total_price
 *         - date
 *         - articles
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the user.
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address.
 *           unique: true
 *         first_name:
 *           type: string
 *           description: User's first name.
 *         last_name:
 *           type: string
 *           description: User's last name.
 *       required:
 *         - id
 *         - email
 *         - first_name
 *         - last_name
 *     Admin:
 *       type: object
 *       properties:
 *         admin_id:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the admin.
 *         name:
 *           type: string
 *           description: Admin's name.
 *         password:
 *           type: string
 *           format: password
 *           description: Admin's password.
 *       required:
 *         - admin_id
 *         - name
 *         - password
 */

const userMiddleware = require("../middlewares/user.middleware");
const {createRule, Method, User, Permission} = require("../permissions");
const {getUser, getUserOrders, createNewOrder} = require("../services/user.service");
const {getPrestataire} = require("../services/prestataire.service");
const {getAdmin} = require("../services/admin.service");
const {get_user_reservations, delete_reservation} = require("../services/karting.service");

/**
 * @swagger
 * /users/@me:
 *   get:
 *     summary: Get Current User Information
 *     tags: [User]
 *     description: Retrieves information about the currently authenticated user.
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         schema:
 *           example: "sdkhd4Kcr8"
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
 *         example: "sdkhd4Kcr8"
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
 *         example: "sdkhd4Kcr8"
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID of the authenticated user.
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

    if (req.session?.userType !== User.User) {
        res.status(401).json({message: "You are not a user"});
        return;
    }

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


/**
 * @swagger
 * components:
 *   schemas:
 *     UserKartingSession:  # Example schema - MUST be defined
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: The ID of the user.
 *           example: "user-456"
 *         session_id:
 *           type: string
 *           description: The ID of the session.
 *           example: "session-789"
 *         reservation_slot:  # Include nested objects!
 *           $ref: '#/components/schemas/ReservationSlot' # Define this schema!
 *         circuit:
 *           $ref: '#/components/schemas/Circuit' # And this one!
 *         # ... other properties
 *       required:
 *         - user_id
 *         - session_id
 *     ReservationSlot:  # Example schema - MUST be defined
 *       type: object
 *       properties:
 *         reservation_id:
 *           type: string
 *           description: The ID of the reservation slot
 *           example: "slot-123"
 *         from:
 *           type: string
 *           format: date-time
 *           description: Start time of the session slot.
 *           example: "2024-10-30T10:00:00.000Z"
 *         to:
 *           type: string
 *           format: date-time
 *           description: End time of the session slot.
 *           example: "2024-10-30T11:00:00.000Z"
 *         maxSize:
 *           type: integer
 *           description: Maximum number of people for the session slot.
 *           example: 10
 *         # ... other properties
 *       required:
 *         - reservation_id
 *         - from
 *         - to
 *         - maxSize
 *     Circuit:  # Example Circuit schema - MUST be defined
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
 *         # ... other circuit properties
 *       required:
 *         - id
 *         - name
 *     Error:  # Re-using the Error schema from previous examples
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message.
 *           example: "Karting not found"
 */

/**
 * @swagger
 * /users/@me/karting:
 *   get:
 *     summary: Get User Karting Reservations
 *     tags: [User]
 *     description: Retrieves all karting reservations for the authenticated user.
 *     responses:
 *       200:
 *         description: User karting reservations retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserKartingSession' # Define this schema!
 *       500:  # Include a 500 for potential server errors
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /users/@me/karting/{reservation_id}:
 *   delete:
 *     summary: Delete a User Karting Reservation
 *     tags: [User]
 *     description: Deletes a specific karting reservation for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: reservation_id
 *         example: "reservation-123" # Replace with a real example
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the reservation to delete.
 *     responses:
 *       200:
 *         description: User karting reservation deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserKartingSession' # Or a simplified version
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/@me/karting", userMiddleware, async (req, res) => {
    const reservations = await get_user_reservations(req.session.userId);
    res.status(200).json(reservations);
})
router.delete("/@me/karting/:reservation_id", userMiddleware, async (req, res) => {
    const reservation = await delete_reservation(req.session.userId, req.params.reservation_id);
    res.status(200).json(reservation);
})


module.exports = router;