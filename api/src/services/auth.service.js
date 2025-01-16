const prisma = require("../db");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const {addMailRequest} = require("./mail/mail.service");
const {getHostName} = require("../utils");

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
                    omit: {password: false},
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
                    omit: {password: false},
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
                    omit: {password: false},
                    where: {login}
                }).then((admin) => {
                    isLoginValid = true;
                    fetchedPassword = admin.password;
                    infos = admin;
                }).catch(() => null);
                break;
            }
        }

        if (!isLoginValid || !fetchedPassword) return reject({reject: 1, error: 0, data: "Login invalid"});

        bcrypt.compare(password, fetchedPassword)
            .then(async (result) => {
                if (!result) return reject({reject: 1, error: 0, data: "Login invalid"});

                // Login valide. On créé la session
                const sessionId = await createSession(userType, infos.id)

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

async function createSession(userType, userId) {
    const sessionId = generateRandomString();
    await prisma.sessions.create({
        data: {
            sessionId,
            userType,
            userId
        }
    });

    return sessionId
}

function logout(sessionId) {
    return new Promise(async (resolve, reject) => {
        prisma.sessions.deleteMany({
            where: {sessionId}
        }).then(resolve, reject)
    })
}


function signupUser(
    email,
    first_name,
    last_name,
    rawPassword
) {
    return new Promise(async (resolve, reject) => {
        let id = uuid.v4().toString();

        try {
            const tryToFindUser = await prisma.user.findFirst({
                where: {
                    email: {
                        equals: email
                    }
                },
            })

            if (tryToFindUser) {
                return reject({status: 400, message: "User already registered"})
            }

            const password = bcrypt.hashSync(rawPassword, 10);

            await prisma.user.create({
                data: {
                    email, id, password, first_name, last_name,
                }
            })

            // On crée la session
            const sessionId = await createSession(1, id);


            // Send email :D
            addMailRequest({
                subject: "Inscription",
                htmlPath: "signup/signup_html.ejs",
                plainPath: "signup/signup_plain.ejs",
                sendTo: email,
                args: {
                    user: {email, id, first_name, last_name},
                    dashboardURL: `${getHostName()}/login?sessionId=${sessionId}`,
                    host: getHostName()
                }
            })

            // Return the valid values
            resolve({
                code: sessionId,
                user: {email, id, first_name, last_name},
            })
        } catch (error) {
            console.error(`Cannot signup user: ${error.message}`);
            reject({status: 500, message: error.message})
        }
    })
}

function autoClearer(intervalInMinutes = 60, maxSessionAgeInHours = 24) {
    try {
        async function clear() {
            const dateLimit = new Date();
            dateLimit.setHours(dateLimit.getHours() - maxSessionAgeInHours);

            const result = await prisma.sessions.deleteMany({
                where: {
                    createdAt: {
                        lte: dateLimit,
                    },
                },
            });

            if (result.count > 0) {
                console.log(`Deleted ${result.count} sessions.`);
            }
        }

        clear();
        setInterval(clear, intervalInMinutes * 60 * 1000);
    } catch (error) {
        console.error('Error during session cleanup:', error);
    }
}

module.exports = {
    login,
    logout,
    autoClearer,
    createSession,
    signupUser
}

// Note: Pour y avoir accès, il faut avoir en query `?sessionId=<session_code>`