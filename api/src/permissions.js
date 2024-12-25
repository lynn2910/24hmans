const prisma = require("./db");
const req = require("express/lib/request");

/**
 * @enum User
 */
const User = {
    User: 1,
    Prestataire: 2,
    Admin: 3,
    // Les utilisateurs non-connectés
    None: 4,
    // Tout les types d'utilisateurs
    All: 5
}

/**
 * @enum Method
 */
const Method = {
    GET: 0,
    POST: 1,
    PUT: 2,
    PATCH: 3,
    DELETE: 4,
    All: 5,
}

/**
 * Return a Method enumerator value from a String
 * @param {string} s The method given by Express.js
 * @returns {Method} The Method found
 * @throws {Error} Throw an error if the method doesn't exist or hasn't been implemented
 */
Method.fromRequest = function (s) {
    switch (s) {
        case "GET":
            return Method.GET;
        case "POST":
            return Method.POST;
        case "PUT":
            return Method.PUT;
        case "PATCH":
            return Method.PATCH;
        case "DELETE":
            return Method.DELETE;
        default:
            throw new Error(`The method '${s}' is not implemented in the authentification system.`);
    }
}

/**
 * Get the type of User from an integer
 * @param {number} n
 * @returns {User}
 * @throws {Error} If the integer isn't a user type
 */
User.fromInteger = function (n) {
    switch (n) {
        case 1:
            return User.User;
        case 2:
            return User.Prestataire;
        case 3:
            return User.Admin;
        default:
            throw new Error("Unknown user type: " + n);
    }
}

/**
 * @enum Permission
 */
const Permission = {
    // Allowed to everyone
    Public: 1,
    Prestataire: 2,
    User: 3,
    Admin: 4,
    NoAccess: 5
}

/**
 * @type {[{match: string, user_type: User, permissions: Permission[], methods: Method[], preparation: string[]}]}
 */
const RULES = []

/**
 *
 * @param {string} match
 * @param {Method[]|Method} methods
 * @param {User} user_type
 * @param {Permission[]} permissions
 */
function createRule(match, methods, user_type, permissions) {
    RULES.push({
        match,
        user_type,
        permissions,
        methods: Array.isArray(methods) ? methods : [methods],
        preparation: cookUrl(match),
    })
}

function cookUrl(url) {
    return url.replace(/\?.*$/, '')
        .replace(/\/$/, '')
        .split(/\//gi)
        // On ignore le premier '/' (devenu '') pour ne pas avoir de chemin vide, ca serait bête
        .slice(1)
}

function searchInRules(preparation, method, user_type) {
    for (const rule of RULES) {
        if (rule.preparation.length !== preparation.length || (rule.user_type !== user_type && rule.user_type !== User.All)) continue;

        // Check on each index
        let isValid = true;
        for (const [index, p] of rule.preparation.entries()) {
            // Si ce n'est pas un argument libre, on casse tout
            // Si ce n'est pas un argument libre, on vérifie qu'ils sont égaux (avec la casse incluse).
            if ((/^:[^/]+$/).test(p) || p === preparation[index]) continue;

            isValid = false;
            break;
        }

        // Check allowed methods
        if (isValid)
            isValid = rule.methods.some((m) => m === Method.All || m === method);

        if (isValid) return rule;
    }
    return null;
}

/**
 * Check if any rule matches the current request and returns if found
 * @param {string} route
 * @param {Method} method
 * @param {User} wanted_user_type
 * @param {string} sessionId
 * @returns
 */
function checkAccess(route, method, wanted_user_type, sessionId) {
    return searchInRules(cookUrl(route), method, wanted_user_type);
}

/**
 * Check if the given rule allows the user to access
 * @param rule
 * @param {string} sessionId
 * @param {User} user_type
 * @returns {Promise<boolean>}
 */
async function checkPermissions(rule, sessionId, user_type) {
    let sessionInformations = null;
    let allowedUsers = []

    for (const permission of rule.permissions) {
        if (permission === Permission.NoAccess)
            return false;

        if (permission === Permission.Public)
            return true;

        if (!sessionInformations) {
            sessionInformations = await getSessionInformations(sessionId, user_type);
            // Si c'est toujours null, alors ça veut dire que la session n'existe pas
            // Comme les permissions vérifiées après cette ligne nécessitent les informations de session,
            // on refuse l'accès, car l'utilisateur n'est pas login (ou sa session a expiré)
            if (!sessionInformations) return false;
        }

        console.log(sessionInformations)

        switch (permission) {
            case Permission.Prestataire: {
                allowedUsers.push(User.Prestataire);
                break
            }
            case Permission.Admin: {
                allowedUsers.push(User.Admin);
                break;
            }
            case Permission.User: {
                allowedUsers.push(User.User);
                break;
            }
            default: {
                console.warn("Unknown permission type: " + permission);
            }
        }
    }

    return sessionInformations && allowedUsers.some(type => type === sessionInformations.userType);
}

async function getSessionInformations(sessionId, userType) {
    try {
        return await prisma.sessions.findUnique({
            where: {
                sessionId,
                userType
            }
        })
    } catch (e) {
        return null;
    }
}

module.exports = {
    User, Permission, Method,
    createRule,
    checkAccess,
    checkPermissions
}