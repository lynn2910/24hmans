const prisma = require("../db")

function getAllShops() {
    return prisma.boutique.findMany({
        select: {
            prestataire_id: true,
            shop_id: true,
        }
    })
}

module.exports = {
    getAllShops,
}