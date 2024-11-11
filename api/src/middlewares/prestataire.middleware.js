module.exports = function (req, res, next) {
    // TODO ajouter le système de login (pour le moment c'est toujours true si le header "Authorization" contient "last_christmas_i_gave_you_my_heart")

    if ((req.headers.authorization || "").replace(/^Bearer /, '') !== "last_christmas_i_gave_you_my_heart") {
        return res.status(401).json({message: "You are not authorized"});
    }

    next();
}
// https://openclassrooms.com/en/courses/5614116-go-full-stack-with-node-js-express-and-mongodb/5656301-set-up-authentication-middleware