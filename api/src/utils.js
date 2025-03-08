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


module.exports = {
    getHostName,
    generateToken,
    verifyToken
}