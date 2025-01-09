const prisma = require("../db")

function getUser(user_id) {
    return prisma.user.findUnique({
        where: {id: user_id}
    })
}

function getUserOrders(user_id) {
    return prisma.userOrder.findMany({
        where: {user_id},
        include: {
            articles: true
        }
    })
}

module.exports = {
    getUser,
    getUserOrders
}
