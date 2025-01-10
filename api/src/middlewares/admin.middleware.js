const {checkAccess, Method, User, checkPermissions} = require("../permissions");

module.exports = async function (req, res, next) {
    const sessionId = req.query.sessionId;

    if (!sessionId) return res.status(401).json({message: "Access denied"});

    const accessRule = checkAccess(req.originalUrl, Method.fromRequest(req.method), User.Admin, sessionId);
    if (!accessRule) {
        return next()
        // return res.status(500).json({message: "Internal Server Error", error: "No rule have been found"});
    }

    const access = await checkPermissions(accessRule, sessionId, User.Admin);

    if (access) {
        req.session = access.infos;
        next()
    } else {
        res.status(401).json({message: "Access denied"});
    }
}