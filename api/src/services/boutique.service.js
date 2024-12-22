const uuid = require("uuid").v4;
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

function getShopItems(shop_id) {
    return prisma.boutiqueArticles.findMany({
        include: {
            category: {
                omit: {
                    shop_id: true
                }
            }
        },
        omit: {
            category_id: true,
            deleted: true,
        },
        where: {
            shop: {
                enabled: true,
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
        }
    })
}

async function addCategory(category_label, shop_id) {
    let category_id = uuid();

    return new Promise(async (resolve, reject) => {
        try {
            await prisma.boutiqueCategory.create({
                data: {
                    category_id,
                    category_label,
                    shop: {
                        connect: {
                            shop_id: shop_id
                        },
                    },
                }
            });

            resolve({category_id, category_label, shop_id})
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    getAllShops,
    getShopCategories,
    getShopItems,
    addCategory
}