const uuid = require("uuid").v4;
const prisma = require("../db")
const e = require("express");

function getAllShops() {
    return prisma.boutique.findMany({
        select: {
            prestataire_id: true,
            shop_id: true,
            enabled: true,
        },
        where: {
            enabled: true
        }
    })
}

function getShop(prestataire_id) {
    return prisma.boutique.findFirst({
        where: {
            prestataire_id,
        },
        include: {
            categories: true,
            prestataire: true,
            articles: true
        }
    })
}

function editShop(shop_id, presta_id, data) {
    return prisma.boutique.update({
        data: {
            enabled: data.enabled,
        },
        where: {
            shop_id,
            prestataire_id: presta_id,
        }
    })
}

//
//
//  CATEGORIES
//
//


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

async function addCategory(prestataire_id, category_label, shop_id) {
    let category_id = uuid();

    return new Promise(async (resolve, reject) => {
        try {
            let boutique = await prisma.boutique.findUnique({
                where: {shop_id}
            })

            if (!boutique || boutique.prestataire_id !== prestataire_id)
                return reject({message: 'You are not the shop owner'})

            await prisma.boutiqueCategory.create({
                data: {
                    category_id,
                    category_label,
                    shop: {
                        connect: {shop_id},
                    },
                },
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


//
//
//  ARTICLES
//
//


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
            deleted: false,
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
                contains: search,
            },
            ...(category_id && {
                category: {
                    category_id: {
                        in: Array.isArray(category_id) ? category_id : [category_id],
                    }
                },
            })
        }
    })
}

function getShopItemByName(shop_id, item_id) {
    return prisma.boutiqueArticles.findFirst({
        include: {
            category: {
                omit: {
                    shop_id: true,
                },
            },
        },
        omit: {
            category_id: true,
            deleted: true,
        },
        where: {
            OR: [
                {
                    referencer: {
                        equals: item_id,
                    },
                },
                {
                    item_id: {
                        equals: isNaN(item_id) ? -1 : Number.parseInt(item_id),
                    }
                }
            ]
        },
    });
}

function createItem(shop_id, {name, price, stock, category_id}) {
    return new Promise(async (resolve, reject) => {
        try {
            const article = await prisma.boutiqueArticles.create({
                data: {
                    name, price,
                    referencer: name.toLowerCase().trim().replace(/\s+/g, '-'),
                    stock: stock && stock >= 0 ? stock : 0,

                    shop: {
                        connect: {shop_id,}
                    },
                    category: {
                        connect: {category_id,}
                    }
                }
            });

            resolve(article)
        } catch (e) {
            reject({message: `An error occurred: ${e.message}`});
        }
    })
}

function editItem(shop_id, item_id, patch) {
    const {name, image, price, stock, description, category_id} = patch;


    return new Promise(async (resolve, reject) => {
        if (!name && !image && (!price && price !== 0) && (!stock && stock !== 0) && !description && !category_id)
            return reject({status: 400, message: "No fields to update, what are you trying to do?"})

        try {
            const updatedArticle = await prisma.boutiqueArticles.update({
                where: {
                    item_id: Number.parseInt(item_id) || -1
                },
                data: {
                    // On met à jour ce champ que si le nom change :)
                    referencer: name ?
                        name.toLowerCase().trim().replace(/\s+/g, '-')
                        : undefined,
                    name: name || undefined,
                    image: image || undefined,
                    price: price || undefined,
                    stock: stock || undefined,
                    description: description || undefined,
                    category_id: category_id || undefined,
                },
            });

            resolve(updatedArticle)
        } catch (e) {
            console.error('Error updating article:', e);
            reject({status: 500, message: `An error occurred: ${e.message}`});
        }
    })
}

function deleteItem(shop_id, item_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const deletedItem = await prisma.boutiqueArticles.update({
                data: {
                    deleted: true
                },
                where: {
                    shop_id,
                    item_id: Number.parseInt(item_id) || -1
                }
            });

            resolve(deletedItem)
        } catch (e) {
            reject({message: `An error occurred: ${e.message}`});
        }
    })
}

module.exports = {
    getAllShops, getShop, editShop,
    getShopItems, getShopItemByName,
    createItem, editItem, deleteItem,
    getShopCategories, addCategory, editCategoryLabel, deleteCategory,
}