const jwtUtils = require('../utils');
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwtUtils.verifyToken(token);

        req.user = decoded.role.user;
        req.user.role = decoded.role.role;
        next();
    } catch (error) {
        return res.sendStatus(403);
    }
}

module.exports = {authenticateToken};