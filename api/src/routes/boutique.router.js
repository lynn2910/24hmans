const {Router} = require("express");
let uuid = require("uuid").v4;

const routerBoutique = new Router();
const prestataireMiddleware = require("../middlewares/prestataire.middleware");

/**
 * Get all available shops and the corresponding prestataire
 */
routerBoutique.get("/available_shops", (req, res) => {
    // TODO add the request to the db

    let shops = [{
        shop_id: '867fb638-7cb1-4228-a643-5c4f352f44b1',
        prestataire_id: '45309281-fc24-4e02-ad47-a275c64f5327'
    }]

    res.status(200).json(shops);
})

/**
 * Get all categories from a shop
 */
routerBoutique.get("/:shop_id/categories", (req, res) => {
    // TODO add the request to the db

    if (req.params.shop_id !== "867fb638-7cb1-4228-a643-5c4f352f44b1") {
        res.status(404)
            .json({
                message: "No shop found"
            });
        return;
    }

    let categories = [
        {
            "category_id": "9af710a9-9c13-43d7-b710-a99c1323d77d",
            "category_label": "Écusson"
        },
        {
            "category_id": "be2cff03-7d12-4369-acff-037d12a36993",
            "category_label": "Porte-clé"
        }
    ]

    res.status(200).json(categories)
})

/**
 * Return all items and apply filters if necessary
 */
routerBoutique.get("/:shop_id/items", (req, res) => {
    // TODO add the db request
    // TODO add the filtering system in the query


    if (req.params.shop_id !== "867fb638-7cb1-4228-a643-5c4f352f44b1") {
        res.status(404)
            .json({
                message: "No shop found"
            });
        return;
    }

    let items = [
        {
            "item_id": 1,
            "name": "Porte-clé frein",
            "image": null,
            "category": "be2cff03-7d12-4369-acff-037d12a36993",
            "stock": 79,
            "price": 16.99,
            "description": ""
        },
        {
            "item_id": 2,
            "name": "Porte-clé porsche",
            "image": null,
            "category": "be2cff03-7d12-4369-acff-037d12a36993",
            "stock": 146,
            "price": 24.99,
            "description": ""
        },
        {
            "item_id": 3,
            "name": "Écusson Porsche",
            "image": null,
            "category": "9af710a9-9c13-43d7-b710-a99c1323d77d",
            "stock": 14,
            "price": 34.99,
            "description": ""
        }
    ];

    res.status(200).json(items)
})

//
//
//  CATEGORIES
//
//

let categoryRouter = new Router();
categoryRouter.use("/", prestataireMiddleware)

/**
 * Delete a category
 */
categoryRouter.delete("/", (req, res) => {
    // TODO add the request query
    // TODO check if no items is linked to this query (in this case, refuse to delete)

    // code 501 = Not implemented (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501)
    res.status(501).json({message: "Not implemented yet"})
})

/**
 * Modify a category
 */
categoryRouter.patch("/", async (req, res) => {
    // TODO add the request query

    let body = req.body
    console.log(`New category name: ${body['new_category_name']}`);

    res.status(501).json({message: "Not implemented yet"})
})

/**
 * Create a new category
 */
categoryRouter.post("/", async (req, res) => {
    // TODO add the request query

    let body = req.body;
    console.log(`New category: ${body['category_name']} in the shop ${body['shop_id']}`);

    let id = uuid();

    res.status(200).json({
        message: "Category created",
        category: {
            category_label: body['category_name'],
            category_id: id.toString(),
            shop_id: body['shop_id'],
        }
    })
})

routerBoutique.use("/:shop_id/:category_id", categoryRouter)


module.exports = routerBoutique;