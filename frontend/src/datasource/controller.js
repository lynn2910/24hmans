import {boutiques, prestataires, billetteries, garages} from "@/datasource/prestataires";
import {shapes} from "@/datasource/shapes";

import {user_orders, users} from "@/datasource/user";
import bcrypt from "bcryptjs";
import {v4 as uuid} from "uuid";
import {admins} from "@/datasource/admin";
import {ROUNDS} from "@/utils";

/**
 * Obtiens les informations sur le prestataire, s'il existe
 * @param {string} id
 */
function getPrestataire(id) {
    let presta = prestataires.find(p => p.id === id);

    if (!presta) return {error: 1, status: 404, data: "prestataire inexistant par id"}
    return {error: 0, status: 200, data: presta};
}

function getPrestataireWithPassword(name, password) {
    let prestataire = getPrestataireFromName(name);
    if (prestataire.error) return prestataire;

    prestataire = prestataire.data;
    if (!bcrypt.compareSync(password, prestataire.password)) return {
        error: 1,
        status: 404,
        message: "Prestataire not found"
    }
    else return {error: 0, status: 200, data: prestataire};
}

function getPrestatairesServicesCount(is_presta = false) {
    let prestataires = getAllPrestataires();
    if (prestataires.error) return prestataires;
    prestataires = prestataires.data.map(p => ({id: p.id, name: p.name, nb_services: 0}))

    prestataires.forEach((p) => {
        if (boutiques.find((b) => (is_presta || b.enabled) && b.prestataire_id === p.id)) {
            p.nb_services++
        }

        if (garages.find(g => g.prestataire_id === p.id)) {
            p.nb_services++;
        }

        if (billetteries.find(b => b.prestataire_id === p.id)) {
            p.nb_services++;
        }

        // TODO : rajouter les autres services lorsqu'ils seront créés

    })
    return {error: 0, status: 200, data: prestataires};
}

function getPrestataireServices(id, is_presta = false) {
    let prestataire = getPrestataire(id);
    if (prestataire.error) return prestataire;
    else if (prestataire.error === 0) is_presta = true;


    let services = [];
    if (boutiques.find((b) => (is_presta || b.enabled) && b.prestataire_id === id)) {
        services.push("Boutique");
    }
    if (garages.find((g) => g.prestataire_id === id)) {
        services.push("Ecurie");
    }
    if (billetteries.find(b => b.prestataire_id === id)) {
        services.push("Billetterie");
    }

    // TODO : rajouter les autres services lorsqu'ils seront créés

    return {error: 0, status: 200, data: services};
}

export function getAllPrestataires() {
    return {error: 0, status: 200, data: prestataires};
}


function getPrestataireFromName(name) {
    let presta = prestataires
        .find(p =>
            p.name.toLowerCase().replace(/\W/g, '') === name.toLowerCase().replace(/\W/g, ''));

    if (!presta) return {error: 1, status: 404, data: "prestataire inexistant par name"};
    return {error: 0, status: 200, data: presta};
}

function getBoutiqueInfos(prestataire_id, is_presta = false) {
    let boutique = boutiques.find(b => (is_presta || b.enabled) && b.prestataire_id === prestataire_id);
    let prestataire = getPrestataire(prestataire_id)?.data;

    if (!boutique || !prestataire) return {error: 1, status: 404, data: "boutique inexistante"};
    return {error: 0, status: 200, data: {...boutique, prestataire}};
}

function getShopItemFromName(prestataire_name, item_name) {
    let prestataire = getPrestataireFromName(prestataire_name);
    if (prestataire.error) return {error: 1, status: 404, data: "prestataire inexistant"};
    prestataire = prestataire.data;

    let boutique = getBoutiqueInfos(prestataire.id);
    if (boutique.error) return {error: 1, status: 404, data: "boutique inexistante"};
    boutique = boutique.data;

    let item = boutique.items.find(a => a.name.trim().toLowerCase().replace(/\s+/, '-') === item_name);

    if (!item) return {error: 1, status: 404, data: "Item inexistant"};
    return {error: 0, status: 200, data: item};
}

function getShopItem(prestataire_id, item_id, is_presta = false) {
    let boutique = boutiques.find(b => (is_presta || b.enabled) && b.prestataire_id === prestataire_id);
    return {error: 0, status: 200, data: boutique.items.find(i => i.item_id === item_id)};
}

function getShopItems(prestataire_id, is_presta = false) {
    let boutique = boutiques.find(b => (is_presta || b.enabled) && b.prestataire_id === prestataire_id);
    return {error: 0, status: 200, data: boutique.items};
}

function getAllItems() {
    return {
        error: 0,
        status: 200,
        data: boutiques
            .filter(b => b.enabled)
            .map(({items, prestataire_id}) =>
                items.map(
                    ({item_id, price, name, image, stock}) => {
                        const prestataire = getPrestataire(prestataire_id)?.data || {};
                        return {
                            item_id, price, name, image, stock,
                            prestataire
                        }
                    }
                )
            ).flat()
    }
}

function loginUser(email, password) {
    let user = users.find(u => u.email === email && bcrypt.compareSync(password, u.hashed_password));

    if (user) return {error: 0, status: 200, data: user}
    else return {error: 1, status: 404, data: "User not found"};
}

/**
 * @param {string} email
 * @param password
 * @param {string} first_name
 * @param {string} last_name
 */
function signupUser(email, password, first_name, last_name) {
    let user = {
        user_id: uuid().toString(),
        created_at: Date.now(),
        hashed_password: password,
        email, first_name, last_name
    }

    users.push(user);

    return {error: 0, status: 200, data: user};
}

function loginAdmin(name, password) {
    let admin = admins.find(u => u.name === name && bcrypt.compareSync(password, u.password));

    if (admin) return {error: 0, status: 200, data: admin};
    else return {error: 1, status: 404, data: "Admin not found"};
}

function getAllUsers() {
    return {error: 0, status: 200, data: users};
}

function deletePrestataire(prestataire_id) {
    let index = prestataires.findIndex(u => u.id === prestataire_id);
    if (index === -1) return {error: 1, status: 400, data: "No prestataire found"}

    // TODO supprimer les services associés au prestataire :O
    prestataires.splice(index, 1);

    return {error: 0, status: 200, data: "Prestataire deleted"}
}

function createPrestataire(prestataire_data) {
    if (!('name' in prestataire_data) || !('password' in prestataire_data)) return {
        error: 1,
        status: 400,
        data: "Invalid data received"
    }

    return new Promise((resolve) => {
        bcrypt.hash(prestataire_data.password, ROUNDS, (err, hash) => {
            return resolve(createPrestataireInternal({...prestataire_data, password: hash}))
        })
    })
}

function createPrestataireInternal(prestataire_data) {
    let id = uuid();

    let prestataire = {
        id,
        name: prestataire_data.name,
        password: prestataire_data.password,
        description: "",
        links: [],
        accentColor: "#fff",
        banner: null
    }

    prestataires.push(prestataire);

    return ({error: 0, status: 200, data: prestataire});
}

function updatePrestataireLink(prestataire_id, {id, name, url}) {
    let p = getPrestataire(prestataire_id);
    if (!p) return p;
    let presta = p.data;

    let linkIndex = presta.links.findIndex(l => l.id === id);
    if (linkIndex < 0) return {error: 1, status: 404, message: "Link not found"}

    presta.links[linkIndex] = {id, name, url}

    return {error: 0, status: 200, message: "Link updated"}
}

function updatePrestataire(prestataire_id, {description, name}) {
    let p = getPrestataire(prestataire_id);
    if (!p) return p;
    let presta = p.data;

    if (description) presta.description = description;
    if (name) presta.name = name;

    return {
        error: 0,
        status: 200,
        data: presta
    }
}

function addPrestataireLink(prestataire_id, {name, url}) {
    let p = getPrestataire(prestataire_id);
    if (!p) return p;
    let presta = p.data;

    if (!presta.links) presta.links = []

    let newId = presta.links.length;
    presta.links.push({name, url, id: newId});

    return {
        error: 0,
        status: 200,
        data: {name, url, id: newId}
    }
}

function getAllCategoryTicket(prestataire_id) {
    let billeterie = billetteries.find(b => b.prestataire_id === prestataire_id);

    if (billeterie) return {error: 0, status: 200, data: billeterie.categories}
    else return {error: 1, status: 404, data: "billetterie not found"};
}

function getAllEcurieParticipants(presta_name) {
    let presta = getPrestataireFromName(presta_name);
    if (presta.error) return presta;
    presta = presta.data;

    let garage = garages
        .find(garage => garage.prestataire_id === presta.id)
        ?.participants;
    if (garage) return {data: garage, status: 200, error: 0}
    else return {
        data: "garage not found",
        status: 404,
        error: 1
    }
}

function addArticleToBoutique(presta_id, article) {
    let boutique = getBoutiqueInfos(presta_id, true);
    if (!boutique) return boutique.data;
    boutique = boutique.data;

    let newId = boutique.items.length;
    let a = {
        ...article,
        id: newId,
        price: article.price
    };
    console.log(a)
    boutique.items.push(a);

    return {error: 0, status: 200, data: a}
}

function removeItemFromBoutique(presta_id, article_id) {
    let boutique = getBoutiqueInfos(presta_id, true);
    if (!boutique) return boutique.data;
    boutique = boutique.data;

    const index = boutique.items.findIndex(l => l.item_id === article_id)
    if (index < 0) return {error: 1, status: 401, data: "article not found"};

    boutique.items.splice(index, 1);
    return {error: 0, status: 200, data: "Article deleted successfully"};
}

function getAllForfaitTicket(prestataire_id) {
    let billeterie = billetteries.find(b => b.prestataire_id === prestataire_id);

    if (billeterie) return {error: 0, status: 200, data: billeterie.forfaits}
    else return {error: 1, status: 404, data: "Forfait not found"};
}

function getAllPersonneTicket(prestataire_id) {
    let billeterie = billetteries.find(b => b.prestataire_id === prestataire_id);

    if (billeterie) return {error: 0, status: 200, data: billeterie.personnes}
    else return {error: 1, status: 404, data: "Personne not found"};
}

function enableOrDisableShop(prestataire_id, newStatus) {
    let shop = boutiques.find(b => b.prestataire_id === prestataire_id);
    if (!shop) return {error: 1, status: 404, data: "shop not found"};

    shop.enabled = newStatus;
    return {error: 0, status: 200, data: shop}
}

function getUserOrders(user_id) {
    let local_user_orders = user_orders
        .filter(user => user.user_id === user_id);

    if (!local_user_orders) return {error: 1, status: 404, data: "user not found"};
    else return {error: 0, status: 200, data: local_user_orders}
}

function newOrder(order) {
    let total_price = 0;

    let all_articles = boutiques.flatMap(b => b.items);

    let articles = order.articles.map((article) => {
        let {article_id, amount} = article;

        let foundArticle = all_articles.find((article) => article.item_id === article_id);

        if (foundArticle.stock < amount)
            throw new Error("Trying to buy an article where there isn't enough stock!")

        foundArticle.stock -= amount;

        total_price += foundArticle.price * amount;

        return ({
            article, article_id, amount,
            unit_price: foundArticle.price
        })
    })

    let preparedOrder = {
        user_id: order.user_id,
        order_id: uuid(),
        total_price,
        date: order.date,
        articles: articles
    }

    user_orders.push(preparedOrder);

    return {error: 0, status: 200, data: preparedOrder}
}

function getBoutiqueChiffreAffaireSerie(presta_id) {
    let boutique = boutiques.find(b => b.prestataire_id === presta_id);
    if (!boutique) return {error: 1, status: 404, data: "boutique not found"};

    let serie = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

    user_orders
        .map(order => ({
                date: order.date,
                articles: order.articles.filter((a) => a.article.shop_id === boutique.shop_id)
            })
        )
        .filter(o => o.articles.length > 0)
        .forEach((order) => {
            let month = order.date.getMonth();
            let sum = 0;
            order.articles.forEach((a) => sum += a.unit_price * a.amount);

            serie[month] += sum;
        });

    return {error: 0, status: 200, data: {serie, categories}};
}

function getBoutiqueStats(presta_id) {
    let boutique = boutiques.find(b => b.prestataire_id === presta_id);
    if (!boutique) return {error: 0, status: 404, data: "boutique not found"};

    let orders = user_orders
        .filter(o => o.articles.some(a => a.article.shop_id === boutique.shop_id));

    // Select distinct
    let clients = [...new Set(orders)].length;

    let total_amount = orders.map(o => o.total_price)
        .reduce((a, b) => a += b, 0);

    return {error: 0, status: 200, data: {clients, commands: orders.length, total_gains: total_amount}}
}

function getBoutiqueCategoriesSellsStats(presta_id) {
    let boutique = boutiques.find(b => b.prestataire_id === presta_id);
    if (!boutique) return {error: 0, status: 404, data: "boutique not found"};

    let series = []
    let labels = boutique.categories.map(c => c.category_label);
    for (let i = 0; i < labels.length; i++) {
        series[i] = 0;
    }

    user_orders.map(o => o.articles.filter(a => a.article.shop_id === boutique.shop_id))
        .flat()
        .forEach((article) => {
            let ctg_index = boutique.categories.findIndex(c => c.category_id === article.article.category_id);
            series[ctg_index] = article.amount;
        });

    console.log(JSON.stringify({labels, series}, null, 2));

    return {error: 0, status: 200, data: {labels, series}}
}

function getBoutiqueArticleSellsStats(presta_id) {
    let boutique = boutiques.find(b => b.prestataire_id === presta_id);
    if (!boutique) return {error: 1, status: 404, data: "boutique not found"};

    let series = {};
    boutique.items.forEach(({name, item_id}) => {
        series[item_id] = {x: name, y: 0}
    });

    user_orders.map(o => o.articles.filter(a => a.article.shop_id === boutique.shop_id))
        .flat()
        .forEach((article) => {
            series[article.article_id].y += article.amount;
        });

    return {error: 0, status: 200, data: [{data: Object.values(series)}]}
}

function getAllShapes() {
    return {error: 0, status: 200, data: shapes};
}

function updateArea(updatedData) {
    // const index = shapes.findIndex(shape => shape.shape_id === updatedData.shape_id);
    // if (index !== -1) {
    //     shapes[index] = {...updatedData};
    //     return {error: 0, status: 200, data: shapes[index]};
    // }
    // return {error: 1, status: 404, data: "Shape not found"};
    shapes[updatedData.shape_id] = {...updatedData};
    return {error: 0, status: 200, data: shapes[updatedData.shape_id]};
}

function addArea(newShape) {
    const maxId = shapes.length > 0 ? Math.max(...shapes.map(shape => shape.shape_id)) : 0;
    newShape.shape_id = maxId + 1;

    return {error: 0, status: 200, data: newShape};
}

function removeArea(shapeId) {
    if (!shapeId) {
        return {error: 1, status: 404, data: "Shape not found"};
    } else {
        return {error: 0, status: 200, data: shapeId};
    }
}

export default {
    addArticleToBoutique,
    removeItemFromBoutique,
    getPrestataire,
    getPrestataireFromName,
    getPrestataireWithPassword,
    getAllCategoryTicket,
    getAllForfaitTicket,
    getAllPersonneTicket,
    getBoutiqueInfos,
    getAllPrestataires,
    getShopItemFromName,
    loginUser,
    getPrestataireServices,
    signupUser,
    loginAdmin,
    getAllUsers,
    getPrestatairesServicesCount,
    deletePrestataire,
    createPrestataire,
    createPrestataireInternal,
    updatePrestataireLink,
    addPrestataireLink,
    updatePrestataire,
    getShopItem,
    getAllItems,
    getAllEcurieParticipants,
    getShopItems,
    enableOrDisableShop,
    getUserOrders,
    newOrder,
    getBoutiqueChiffreAffaireSerie,
    getBoutiqueStats,
    getBoutiqueCategoriesSellsStats,
    getBoutiqueArticleSellsStats,

    getAllShapes,
    updateArea,
    addArea,
    removeArea,
};