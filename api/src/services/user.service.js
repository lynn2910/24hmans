const prisma = require("../db")
const uuid = require("uuid")

function getUser(user_id) {
    return prisma.user.findUnique({
        where: {id: user_id}
    })
}

function getUserOrders(user_id) {
    return prisma.userOrder.findMany({
        where: {user_id},
        include: {
            articles: {
                include: {
                    article: true,
                },
            },
        }
    })
}

function createNewOrder(user_id, raw_order) {
    return new Promise(async (resolve, reject) => {
        let order_id = uuid.v4();

        const articles = await prisma.boutiqueArticles.findMany({
            where: {
                item_id: {
                    in: raw_order.articles.map(({article_id}) => article_id),
                }
            }
        })

        let total_price = 0;

        const order_articles = [];
        for (const article of raw_order.articles) {
            let dbArticle = articles.find(a => a.item_id === article.article_id);

            // Vérifier qu'on a les stocks
            if (dbArticle.stock < article.amount) {
                return resolve({message: "Not enough stock for an article", status: 406})
            }

            total_price += dbArticle.price * article.amount;

            order_articles.push({
                unit_price: dbArticle.price,
                amount: article.amount,
                article: {
                    connect: {item_id: article.article_id}
                },
                order: {
                    connect: {order_id}
                }
            });
        }

        // Créer l'order
        let order = await prisma.userOrder.create({
            data: {
                order_id,
                total_price,
                date: (new Date(raw_order.date)) || (new Date()),
                user: {
                    connect: {id: user_id}
                }
            },
            include: {
                articles: true
            }
        })

        // Enregistrer tout les articles achetés et retirer le stock des articles
        let final_articles = []
        let orders = order_articles.map(async (article) => {
            console.log(article)
            // retirer le stock
            await prisma.boutiqueArticles.update({
                where: {item_id: article.article.connect.item_id},
                data: {
                    stock: {
                        decrement: article.amount,
                    }
                }
            })

            // Enregistrer l'article
            const a = await prisma.userOrderArticle.create({
                data: article,
                include: {
                    article: true
                }
            })
            final_articles.push(a)
        })


        Promise.all(orders).then(
            () => resolve({...order, articles: final_articles}),
            (e) => {
                console.error(e);
                reject({status: 400, message: e.message})
            }
        )
    })
}

module.exports = {
    getUser,
    getUserOrders, createNewOrder
}
