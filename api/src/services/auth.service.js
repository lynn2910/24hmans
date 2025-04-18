const bcrypt = require('bcryptjs');
const prisma = require("../db");
const uuid = require("uuid");

async function authenticate(id, password, role) {
    let user;

    if (role === 1) {
        user = await prisma.user.findFirst({omit: {password: false}, where: {email: id}});
    } else if (role === 2) {
        user = await prisma.prestataire.findFirst({omit: {password: false}, where: {referencer: id}});
    } else if (role === 3) {
        user = await prisma.admin.findFirst({where: {name: id}});
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
    }

    user.role = role;
    // Legacy
    user.userType = role;

    return user;
}

async function registerUser(userData) {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.id = uuid.v4();

    await prisma.user.create({data: userData});

    return prisma.user.findFirst({where: {id: userData.id}});
}

module.exports = {authenticate, registerUser};