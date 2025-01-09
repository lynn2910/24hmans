const prisma = require("../db")

function getUser(user_id) {
    return prisma.user.findUnique({
        where: {id: user_id}
    })
}

module.exports = {
    getUser
}
