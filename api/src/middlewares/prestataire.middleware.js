const {checkAccess, Method, User, checkPermissions} = require("../permissions");

module.exports = async function (req, res, next) {
    const sessionId = req.query.sessionId;
    console.log("Session ID", sessionId);

    if (!sessionId) return res.status(401).json({message: "Access denied"});

    const accessRule = checkAccess(req.originalUrl, Method.fromRequest(req.method), User.Prestataire, sessionId);
    // if (!accessRule) {
    //     return next()
    //     // return res.status(500).json({message: "Internal Server Error", error: "No rule have been found"});
    // }

    const access = await checkPermissions(accessRule, sessionId, User.Prestataire);

    if (access) {
        req.session = access.infos;
        next()
    } else {
        res.status(401).json({message: "Access denied"});
    }
}