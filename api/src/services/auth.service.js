const prisma = require("../db");
const bcrypt = require("bcryptjs");

function generateRandomString(size = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

function login(login, password, userType) {
    return new Promise(async (resolve, reject) => {
        let isLoginValid = false;
        let fetchedPassword;
        let infos;
        switch (userType) {
            // User
            case 1: {
                await prisma.user.findUnique({
                    select: {password: true, first_name: true, last_name: true, email: true, id: true},
                    where: {email: login}
                }).then((user) => {
                    isLoginValid = true;
                    fetchedPassword = user.password;
                    infos = user;
                }).catch(() => null);
                break;
            }
            // Prestataire
            case 2: {
                await prisma.prestataire.findUnique({
                    select: {
                        password: true,
                        referencer: true,
                        id: true,
                        email: true,
                        name: true,
                        links: true,
                        icon: true,
                        banner: true,
                        accentColor: true
                    },
                    include: {links: true},
                    where: {referencer: login}
                }).then((presta) => {
                    isLoginValid = true;
                    fetchedPassword = presta.password;
                    infos = presta;
                }).catch(() => null);
                break;
            }
            // Admin
            case 3: {
                await prisma.admin.findUnique({
                    select: {password: true, name: true, admin_id: true},
                    where: {login}
                }).then((admin) => {
                    isLoginValid = true;
                    fetchedPassword = admin.password;
                    infos = admin;
                }).catch(() => null);
                break;
            }
        }

        console.log("Informations: ", infos);
        if (!isLoginValid || !fetchedPassword) return reject({reject: 1, error: 0, data: "Login invalid"});

        bcrypt.compare(password, fetchedPassword)
            .then(async (result) => {
                if (!result) return reject({reject: 1, error: 0, data: "Login invalid"});

                // Login valide. On créé la session
                const sessionId = generateRandomString();
                await prisma.sessions.create({
                    data: {
                        sessionId,
                        userType,
                        userId: infos.id,
                    }
                });

                // On retire le password des infos, on ne veut pas l'avoir
                delete infos["password"];

                return resolve({
                    code: sessionId,
                    user: infos
                })
            })
            .catch((err) => {
                return reject({reject: 0, error: 1, data: err.message});
            });
    })
}

module.exports = {
    login
}

// Note: Pour y avoir accès, il faut avoir en query `?sessionId=<session_code>`