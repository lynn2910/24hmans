const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login API
 *     tags:
 *        - Auth
 *     description: "Login API to authenticate user and generate session"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: "The login email or reference depending on the userType"
 *               password:
 *                 type: string
 *                 description: The user password
 *               userType:
 *                 type: integer
 *                 description: "The type of user (1: User, 2: Prestataire, 3: Admin)"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: The session ID
 *                 user:
 *                   type: object
 *                   description: The user information
 *       400:
 *         description: Login failed due to invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: The error code
 *                 message:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: The error code
 *                 message:
 *                   type: string
 *                   description: The error message
 */
router.post("/login", authController.login)

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign Up User
 *     tags:
 *       - Auth
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               first_name:
 *                 type: string
 *                 description: The first name of the user.
 *               last_name:
 *                 type: string
 *                 description: The last name of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: The session ID.
 *                 user:
 *                   type: object
 *                   description: The user information.
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
 *         description: An error occurred while creating the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */
router.post('/signup', authController.register);

module.exports = router;