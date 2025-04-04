function getHostName() {
    return process.env.PROD && process.env.PROD === 'true' ? 'https://24h.chamallow.fr' : `http://localhost:${process.env.API_PORT}`
}

const jwt = require('jsonwebtoken');

function generateToken(user, role) {
    const payload = {
        id: user.id,
        email: user.email,
        role: role,
    };
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'});
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
}

function accessStringToInt(s) {
    if (!s) return s;
    switch (s.trim().toLowerCase()) {
        case "user":
            return 1;
        case "prestataire":
            return 2;
        case "admin":
            return 3;
    }
}

/**
 * @param req
 * @param res
 * @param {("user"|"prestataire"|"admin")|Array<"user"|"prestataire"|"admin">} accessType
 */
function checkAccess(req, res, accessType) {
    const c = (s) => (req.user.role || req.user.userType) !== accessStringToInt(s)

    if (!req.user || (Array.isArray(accessType) ? accessType.some(s => c(s)) : c(accessType))) {
        res.status(403).json({message: 'Forbidden'});
        return false
    }
    return true;
}

module.exports = {
    getHostName,
    generateToken,
    verifyToken,
    checkAccess
}