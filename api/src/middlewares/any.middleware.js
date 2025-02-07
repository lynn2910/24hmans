const {getSessionInformations} = require("../permissions");

module.exports = async function (req, res, next) {
    const sessionId = req.query.sessionId;
    if (!sessionId) return res.status(401).json({message: "Access denied"});

    const session = await getSessionInformations(sessionId);

    if (session) {
        req.session = session;
        next()
    } else {
        res.status(401).json({message: "Access denied"});
    }
}