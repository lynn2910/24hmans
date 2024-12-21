const {Router} = require("express");
let uuid = require("uuid").v4;
const BoutiqueService = require("../services/boutique.service");

const routerBoutique = new Router();
const prestataireMiddleware = require("../middlewares/prestataire.middleware");

/**
 * @swagger
 * definitions:
 *      AvailableShop:
 *          type: Object
 *          properties:
 *              shop_id:
 *                  type: string
 *              prestataire_id:
 *                  type: string
 */

/**
 * @swagger
 * /boutique/available_shops:
 *   get:
 *      tags:
 *          - Boutique
 *      summary: Obtient toutes les boutiques disponibles
 *      responses:
 *          200:
 *              description: "La liste des boutiques accessibles"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/definitions/AvailableShop'
 */
routerBoutique.get("/available_shops", (req, res) => {
    BoutiqueService.getAllShops().then(
        (shops) => res.status(200).json(shops),
        (err) => res.status(500).json({message: err.message})
    )
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
            "id_shop": "867fb638-7cb1-4228-a643-5c4f352f44b1",
            "item_id": "035669e3-6960-410b-92a4-7734295098e7",
            "name": "Porte-clé frein",
            "image": null,
            "category": "be2cff03-7d12-4369-acff-037d12a36993",
            "stock": 79,
            "price": 16.99,
            "description": "",
            "deleted": 0
        },
        {
            "id_shop": "867fb638-7cb1-4228-a643-5c4f352f44b1",
            "item_id": "8a3bbb62-2ba0-4b9d-b230-902ea5bcf9ce",
            "name": "Écusson Porsche",
            "image": null,
            "category": "9af710a9-9c13-43d7-b710-a99c1323d77d",
            "stock": 14,
            "price": 34.99,
            "description": "",
            "deleted": 0
        },
        {
            "id_shop": "867fb638-7cb1-4228-a643-5c4f352f44b1",
            "item_id": "9c46e6d5-a2da-488c-ba6f-b687218038e2",
            "name": "Porte-clé porsche",
            "image": null,
            "category": "be2cff03-7d12-4369-acff-037d12a36993",
            "stock": 146,
            "price": 24.99,
            "description": "",
            "deleted": 0
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
categoryRouter.delete("/:category_id", (req, res) => {
    // TODO add the request query
    // TODO check if no items is linked to this query (in this case, refuse to delete)

    // code 501 = Not implemented (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501)
    res.status(501).json({message: "Not implemented yet"})
})

/**
 * Modify a category
 */
categoryRouter.patch("/:category_id", async (req, res) => {
    // TODO add the request query

    let body = req.body
    console.log(`Edit category name: ${body['new_category_name']}`);

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

routerBoutique.use("/:shop_id/category", categoryRouter)

//
//
//  ITEMS
//
//

routerBoutique.get("/:shop_id/item/:item_id", async (req, res) => {
    res.status(501).json({message: "Not implemented yet"})
})
routerBoutique.get("/:shop_id/item/from_name", async (req, res) => {
    res.status(501).json({message: "Not implemented yet", name_wanted: req.query.name})
})

let itemRouter = new Router();
itemRouter.use("/", prestataireMiddleware);

/**
 * Delete an item
 */
itemRouter.delete("/:item_id", async (req, res) => {
    // TODO add the request query

    // code 501 = Not implemented (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501)
    res.status(501).json({message: "Not implemented yet"})
})

/**
 * Modify an item
 */
itemRouter.patch("/:item_id", async (req, res) => {
    // TODO add the request query

    let body = req.body
    console.log(`Edit item: ${JSON.stringify(body, null, 2)}`);

    res.status(501).json({message: "Not implemented yet"})
})

/**
 * Create a new item
 */
itemRouter.post("/", async (req, res) => {
    // TODO add the request query

    let body = req.body;
    console.log(`New item: ${JSON.stringify(body, null, 2)}`);

    let id = uuid();

    res.status(200).json({
        message: "Item created",
        item: {...req.body, id}
    })
})

routerBoutique.use("/:shop_id/item", itemRouter)


module.exports = routerBoutique;