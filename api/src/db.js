const {PrismaClient} = require('@prisma/client')

module.exports = new PrismaClient()

// prisma.user.create({
//     data: {
//         id: "hello",
//         email: "marvyn.levin@gmail.com",
//         first_name: "Marvyn",
//         last_name: "LEVIN",
//         password: "azerty"
//     }
// }).then(() => {
//     console.log("Création de l'utilisateur Marvyn");
//
//     prisma.user.findMany().then(console.log)
// })