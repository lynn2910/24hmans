const express = require("express");
const {login, logout} = require("../services/auth.service");
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
router.post('/login', async (req, res) => {
    login(req.body?.login, req.body?.password, req.body?.userType)
        .then((answer) => res.status(200).json(answer))
        .catch(({reject}) => {
            if (reject) res.status(400).json({code: "LOGIN_INVALID", message: "The login is invalid"})
            else res.status(500).json({code: "INTERNAL_ERROR", message: "An error occurred"})
        })
})

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout API
 *     tags:
 *        - Auth
 *     description: Logout API to destroy user session
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: The session ID to be destroyed
 *     responses:
 *       202:
 *         description: Logout successful
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
router.post("/logout", async (req, res) => {
    logout(req.body?.sessionId)
        .then(() => res.status(202).send())
        .catch((err) => {
            console.error(err);
            res.status(500).json({message: "An error occurred"})
        })
})

module.exports = router;