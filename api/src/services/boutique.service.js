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
            articles: {
                include: {
                    category: true,
                },
                where: {
                    deleted: false
                }
            }
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
            deleted: false,
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
            let stockParsed = stock ? (typeof stock === "string" ? Number.parseInt(stock) : stock) : stock;

            const article = await prisma.boutiqueArticles.create({
                data: {
                    name, price,
                    referencer: name.toLowerCase().trim().replace(/\s+/g, '-'),
                    stock: stockParsed && stockParsed >= 0 ? stockParsed : 0,

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
                    item_id: Number.parseInt(item_id) || -1,
                    deleted: false
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

//
//
//      STATISTIQUES
//
//

async function getBoutiqueCategoriesSellsStats(shop_id) {
    const categoriesWithArticleCounts = await prisma.boutiqueCategory.findMany({
        include: {
            _count: {
                select: {articles: true},
            },
        },
    });

    const labels = [];
    const series = [];

    categoriesWithArticleCounts.forEach(category => {
        labels.push(category.category_label)
        series.push(category._count.articles)
    });

    return {labels, series};
}


async function getBoutiqueStats() {
    const clientCount = await prisma.userOrder.aggregate({
        _count: {
            user_id: true,
        },
    });

    const orderCount = await prisma.userOrder.count();

    const totalGains = await prisma.userOrder.aggregate({
        _sum: {
            total_price: true,
        },
    });

    return {
        "clients": clientCount._count.user_id || 0,
        "commands": orderCount,
        "total_gains": totalGains._sum.total_price || 0,
    };
}

async function getBoutiqueChiffreAffaireSerie() {
    const orders = await prisma.userOrder.findMany({
        select: {
            date: true,
            total_price: true,
        },
    });

    const monthlyGains = {};

    orders.forEach(order => {
        const orderDate = new Date(order.date);
        const year = orderDate.getFullYear().toString();
        const month = (orderDate.getMonth() + 1).toString().padStart(2, '0');

        if (!monthlyGains[year]) {
            monthlyGains[year] = {};
        }

        if (!monthlyGains[year][month]) {
            monthlyGains[year][month] = 0;
        }
        monthlyGains[year][month] += Number(order.total_price);
    });

    const lastYear = Object.keys(monthlyGains).sort().pop();
    const monthlyGainsArray = [];
    const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (lastYear) {
        for (let i = 1; i <= 12; i++) {
            const month = i.toString().padStart(2, '0');
            monthlyGainsArray.push(monthlyGains[lastYear] ? (monthlyGains[lastYear][month] || 0) : 0);
        }
    } else {
        for (let i = 1; i <= 12; i++) {
            monthlyGainsArray.push(0);
        }
    }

    return {
        "serie": monthlyGainsArray,
        "categories": categories,
    };
}

async function getBoutiqueArticleSellsStats() {
    const articleSales = await prisma.userOrderArticle.findMany({
        include: {
            article: {
                select: {
                    name: true,
                },
            },
        },
    });

    const articleSalesData = [];
    const aggregatedData = {};

    articleSales.forEach(sale => {
        const articleName = sale.article.name;
        const amount = sale.amount;

        if (aggregatedData[articleName]) {
            aggregatedData[articleName] += amount;
        } else {
            aggregatedData[articleName] = amount;
        }
    });

    for (const articleName in aggregatedData) {
        articleSalesData.push({
            x: articleName,
            y: aggregatedData[articleName],
        });
    }

    return articleSalesData;
}


module.exports = {
    getAllShops, getShop, editShop,
    getShopItems, getShopItemByName,
    createItem, editItem, deleteItem,
    getShopCategories, addCategory, editCategoryLabel, deleteCategory,

    getBoutiqueCategoriesSellsStats, getBoutiqueStats, getBoutiqueChiffreAffaireSerie,
    getBoutiqueArticleSellsStats
}