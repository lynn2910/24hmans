module.exports = function (req, res, next) {
    const sessionId = req.query.session;

    if (!sessionId) {
        return res.status(401).json({message: "Access denied"});
    }

    req.session = sessionId;

    // TODO vérifier les droits

    next();
}
