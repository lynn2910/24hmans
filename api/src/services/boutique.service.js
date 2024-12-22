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

/**
 * @param shop_id
 * @param {{ search: string?, category_id: string[] }} filters
 * @return {Promise<any>} Items
 */
function getShopItems(shop_id, filters = {}) {
    const {search, category_id} = filters;

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
            name: {
                search: search,
            },
            category: {
                category_id: {
                    in: Array.isArray(category_id) ? category_id : [category_id],
                }
            },
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

async function deleteCategory(category_id, shop_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await prisma.boutiqueCategory.delete({
                where: {
                    category_id,
                    shop_id
                }
            })

            resolve(category)
        } catch (e) {
            reject({message: `An error occurred: ${e.message}`});
        }
    })
}

async function editCategoryLabel(category_label, category_id, shop_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await prisma.boutiqueCategory.update({
                data: {
                    category_label
                },
                where: {
                    category_id, shop_id
                }
            });

            resolve(category)
        } catch (err) {
            reject({message: `An error occurred: ${err.message}`});
        }
    })
}

module.exports = {
    getAllShops,
    getShopCategories, addCategory, editCategoryLabel, deleteCategory,
    getShopItems,
}