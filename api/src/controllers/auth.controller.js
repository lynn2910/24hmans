const authService = require('../services/auth.service');
const jwtUtils = require('../utils');

async function login(req, res) {
    try {
        const {login, password, role} = req.body;
        const user = await authService.authenticate(login, password, role);

        if (!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = jwtUtils.generateToken(user, {role, user});
        // On supprime le password des informations par sécurité
        delete user.password;

        res.json({token, user});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

async function register(req, res) {
    try {
        const user = await authService.registerUser(req.body);

        user.role = 1;
        user.userType = user.role;

        res.status(201).json(user);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message});
    }
}

module.exports = {login, register};