const prisma = require("../db")

function getAllShops() {
    return prisma.boutique.findMany({
        select: {
            prestataire_id: true,
            shop_id: true,
        },
        where: {
            enabled: true
        }
    })
}

function getShopCategories(shop_id) {
    return prisma.boutiqueCategory.findMany({
        select: {
            category_id: true,
            category_label: true,
            shop_id: true,
        },
        where: {
            shop: {
                enabled: true
            },
            OR: [
                {
                    shop_id: {
                        equals: shop_id,
                    },
                },
                {
                    shop: {
                        prestataire: {
                            referencer: {
                                equals: shop_id,
                            },
                        },
                    },
                },
            ],
        },
    });
}

module.exports = {
    getAllShops,
    getShopCategories
}