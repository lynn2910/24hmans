const {Router} = require("express");
let uuid = require("uuid").v4;
const BoutiqueService = require("../services/boutique.service");

const routerBoutique = new Router();
const prestataireMiddleware = require("../middlewares/prestataire.middleware");

/**
 * @swagger
 * definitions:
 *      AvailableShop:
 *          type: object
 *          properties:
 *              shop_id:
 *                  type: string
 *              prestataire_id:
 *                  type: string
 *      ShopCategory:
 *          type: object
 *          properties:
 *              category_label:
 *                  type: string
 *              category_id:
 *                  type: string
 *              shop_id:
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
 * Return all items and apply filters if necessary
 */
routerBoutique.get("/:shop_id/items", (req, res) => {
    // TODO add the filtering system in the query

    BoutiqueService.getShopItems(req.params.shop_id).then(
        (items) => {
            if (!items) res.status(404).json({message: "No shop found"});
            else res.status(200).json(items);
        },
        (err) => {
            console.error(err.message);
            res.status(500).json({message: err.message})
        }
    )
})

//
//
//  CATEGORIES
//
//


/**
 * @swagger
 * /boutique/{shop_id}/categories:
 *   get:
 *      tags:
 *          - Boutique
 *      summary: Récupère la liste des catégories d'une boutique
 *      parameters:
 *         - in: path
 *           name: shop_id
 *           required: true
 *           description: Identifiant de la boutique ou nom de référence du prestataire
 *           schema:
 *             type: string
 *      responses:
 *          200:
 *              description: "La liste des catégories de la boutique choisie"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/definitions/ShopCategory'
 *          404:
 *              description: "Si la boutique n'existe pas ou n'est pas accessible"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 */
routerBoutique.get("/:shop_id/categories", (req, res) => {
    BoutiqueService.getShopCategories(req.params.shop_id).then(
        (categories) => {
            if (!categories) res.status(404).json({message: "No shop found"});
            res.status(200).json(categories);
        },
        (err) => {
            console.error(err.message);
            res.status(500).json({message: `Cannot get the categories: ${err.message}`})
        }
    )
});

/**
 * @swagger
 * /boutique/{shop_id}/categories:
 *   post:
 *     summary: Create a new category for a shop
 *     description: "Adds a new category to the specified shop; Requires shop owner authorization."
 *     parameters:
 *       - in: path
 *         name: shop_id
 *         required: true
 *         description: "The ID of the shop"
 *         schema:
 *           type: string
 *       - in: query
 *         name: sessionId
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *     tags:
 *       - Boutique
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_label:
 *                 type: string
 *                 description: "The label or name of the new category."
 *                 required: true
 *     responses:
 *       200:
 *          description: "Category successfully created"
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                          category:
 *                              $ref: '#/definitions/ShopCategory'
 *       400:
 *          description: "Unauthorized - Missing or invalid authentication credentials"
 *       403:
 *          description: "Forbidden - Shop owner authorization required"
 *       500:
 *          description: "Internal Server Error - Unexpected error during category creation"
 */
routerBoutique.post("/:shop_id/categories", prestataireMiddleware, (req, res) => {
    BoutiqueService.addCategory(
        req.body['category_label'].trim(),
        req.params.shop_id
    ).then(
        (category) => {
            res.status(200).json({
                message: "Category created",
                category: category
            });
        },
        (err) => {
            console.error(`Cannot create category '${req.body['category_label']}' for shop '${req.body['shop_id']}': ` + err.message);
            res.status(500).json({
                message: `Cannot create category '${req.body['category_label']}' for shop '${req.body['shop_id']}': ` + err.message
            })
        }
    )
})

/**
 * Delete a category
 */
routerBoutique.delete("/:shop_id/categories/:category_id", prestataireMiddleware, (req, res) => {
    // TODO add the request query
    // TODO check if no items is linked to this query (in this case, refuse to delete)

    // code 501 = Not implemented (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501)
    res.status(501).json({message: "Not implemented yet"})
})

/**
 * Modify a category
 */
routerBoutique.patch("/:shop_id/categories/:category_id", async (req, res) => {
    // TODO add the request query

    let body = req.body
    console.log(`Edit category name: ${body['new_category_name']}`);

    res.status(501).json({message: "Not implemented yet"})
})


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