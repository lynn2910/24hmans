const {Router} = require("express");
let uuid = require("uuid").v4;
const BoutiqueService = require("../services/boutique.service");

const routerBoutique = new Router();
const prestataireMiddleware = require("../middlewares/prestataire.middleware");
const {createRule, Permission, Method, User} = require("../permissions");

/**
 * @swagger
 * components:
 *      schemas:
 *           AvailableShop:
 *               type: object
 *               properties:
 *                   shop_id:
 *                       type: string
 *                       example: "867fb638-7cb1-4228-a643-5c4f352f44b1"
 *                   prestataire_id:
 *                       type: string
 *                       example: "45309281-fc24-4e02-ad47-a275c64f5327"
 *                   enabled:
 *                       type: boolean
 *                       example: 1
 *           ShopCategory:
 *               type: object
 *               required:
 *                  - category_label
 *                  - category_id
 *                  - shop_id
 *               properties:
 *                   category_label:
 *                       type: string
 *                       example: "Porte-clé"
 *                   category_id:
 *                       type: string
 *                       format: uuid
 *                       example: "be2cff03-7d12-4369-acff-037d12a36993"
 *                   shop_id:
 *                       type: string
 *                       format: uuid
 *                       example: "867fb638-7cb1-4228-a643-5c4f352f44b1"
 *           ShopItem:
 *               type: object
 *               required:
 *                  - shop_id
 *                  - item_id
 *                  - name
 *                  - price
 *                  - stock
 *                  - category
 *                  - referencer
 *               properties:
 *                   shop_id:
 *                       type: string
 *                       example: "867fb638-7cb1-4228-a643-5c4f352f44b1"
 *                       format: uuid
 *                   item_id:
 *                       type: integer
 *                       example: 1
 *                   name:
 *                       type: string
 *                       example: "Porte-clé frein"
 *                   referencer:
 *                       type: string
 *                       example: "porte-clé-frein"
 *                   image:
 *                       type: string
 *                       nullable: true
 *                       format: uri
 *                   price:
 *                       type: number
 *                       example: "16.99"
 *                   stock:
 *                       type: integer
 *                       example: 58
 *                   description:
 *                       type: string
 *                       nullable: true
 *                   category_id:
 *                      type: string
 *                      example: "be2cff03-7d12-4369-acff-037d12a36993"
 *                   category:
 *                       $ref: '#/components/schemas/ShopCategory'
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
 *                              $ref: '#/components/schemas/AvailableShop'
 */
routerBoutique.get("/available_shops", (req, res) => {
    BoutiqueService.getAllShops().then(
        (shops) => res.status(200).json(shops),
        (err) => res.status(500).json({message: err.message})
    )
})

/**
 * @swagger
 * /boutique/{shop_id}:
 *   get:
 *     summary: Get Shop Details
 *     tags:
 *       - Boutique
 *     description: Retrieves details of a specific shop.
 *     parameters:
 *       - in: path
 *         name: shop_id
 *         example: "867fb638-7cb1-4228-a643-5c4f352f44b1"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shop.
 *     responses:
 *       200:
 *         description: Shop details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop' # Define this schema!
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: "Error message details"
 *   patch:
 *     summary: Update Shop Details
 *     tags:
 *       - Boutique
 *     description: Updates details of a specific shop. Requires prestataire privileges.
 *     parameters:
 *       - in: path
 *         name: shop_id
 *         example: "867fb638-7cb1-4228-a643-5c4f352f44b1"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shop.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enabled:
 *                 type: boolean
 *                 description: Whether the shop is enabled or not.
 *                 example: true
 *     responses:
 *       200:
 *         description: Shop details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'  # Define this schema!
 *       400: # Bad Request if no data is sent.
 *         description: Bad Request. No data provided for update.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: "Error message details"
 */

routerBoutique.get("/:shop_id", (req, res) => {
    BoutiqueService.getShop(req.params.shop_id).then(
        (shop) => {
            if (!shop.enabled && req.session?.userId !== req.params.shop_id) res.status(401).json({message: "Access denied"})
            else res.status(200).json(shop)
        },
        (err) => res.status(500).json({message: err.message})
    )
})


routerBoutique.patch("/:shop_id", prestataireMiddleware, (req, res) => {
    console.log("Editing shop")
    console.log(req.params.shop_id)
    console.log(req.session)
    BoutiqueService.editShop(req.params.shop_id, req.session.userId, req.body).then(
        (shop) => res.status(200).json(shop),
        (err) => res.status(500).json({message: err.message})
    )
})
createRule("/boutique/{shop_id}", Method.PATCH, User.Prestataire, [Permission.Prestataire, Permission.Admin])

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
 *         - Boutique
 *      summary: Récupère la liste des catégories d'une boutique
 *      parameters:
 *         - in: path
 *           name: shop_id
 *           required: true
 *           example: "porsche"
 *           description: Identifiant de la boutique ou nom de référence du prestataire
 *           schema:
 *             type: string
 *      responses:
 *         200:
 *             description: "La liste des catégories de la boutique choisie"
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: array
 *                         items:
 *                             $ref: '#/components/schemas/ShopCategory'
 *         404:
 *             description: "Si la boutique n'existe pas ou n'est pas accessible"
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             message:
 *                                 type: string
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
 *         example: "867fb638-7cb1-4228-a643-5c4f352f44b1"
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
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
 *         description: "Category successfully created"
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         message:
 *                             type: string
 *                         category:
 *                             $ref: '#/components/schemas/ShopCategory'
 *       400:
 *         description: "Unauthorized - Missing or invalid authentication credentials"
 *       403:
 *         description: "Forbidden - Shop owner authorization required"
 *       500:
 *         description: "Internal Server Error - Unexpected error during category creation"
 */
routerBoutique.post("/:shop_id/categories", prestataireMiddleware, (req, res) => {
    BoutiqueService.addCategory(
        req.session.userId,
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
                message: `Cannot create category '${req.body['category_label']}' for shop '${req.params.shop_id}': ` + err.message
            })
        }
    )
})
createRule("/boutique/:shop_id/categories", [Method.PATCH, Method.DELETE, Method.POST], User.Prestataire, [Permission.Prestataire])

/**
 * @swagger
 * /boutique/{shop_id}/categories/{category_id}:
 *      parameters:
 *          - in: query
 *            name: token
 *            example: "HVpYuVywN4"
 *            required: true
 *            description: Session ID for authentication
 *            schema:
 *              type: string
 *      patch:
 *          summary: "Update the label of a category"
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Boutique
 *          parameters:
 *              - in: path
 *                name: shop_id
 *                required: true
 *                description: "The ID of the shop"
 *                example: "867fb638-7cb1-4228-a643-5c4f352f44b1"
 *                schema:
 *                  type: string
 *              - in: path
 *                name: category_id
 *                required: true
 *                example: "9af710a9-9c13-43d7-b710-a99c1323d77d"
 *                description: "The ID of the category to delete"
 *                schema:
 *                  type: string
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    category_label:
 *                      type: string
 *                      description: "The new label of the category."
 *                      required: true
 *          responses:
 *              200:
 *                  description: "Category successfully updated"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                  category:
 *                                      $ref: '#/components/schemas/ShopCategory'
 *              400:
 *                 description: "Unauthorized - Missing or invalid authentication credentials"
 *              403:
 *                 description: "Forbidden - Shop owner authorization required"
 *              500:
 *                 description: "Internal Server Error - Unexpected error during category update"
 *      delete:
 *          summary: Delete a category from the shop
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Boutique
 *          parameters:
 *              - in: path
 *                name: shop_id
 *                required: true
 *                description: "The ID of the shop"
 *                example: "867fb638-7cb1-4228-a643-5c4f352f44b1"
 *                schema:
 *                  type: string
 *              - in: path
 *                name: category_id
 *                required: true
 *                description: "The ID of the category to delete"
 *                example: "9af710a9-9c13-43d7-b710-a99c1323d77d"
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: "Category successfully deleted"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                  category:
 *                                      $ref: '#/components/schemas/ShopCategory'
 *              400:
 *                 description: "Unauthorized - Missing or invalid authentication credentials"
 *              403:
 *                 description: "Forbidden - Shop owner authorization required"
 *              500:
 *                 description: "Internal Server Error - Unexpected error during category deletion"
 */
routerBoutique.delete("/:shop_id/categories/:category_id", prestataireMiddleware, (req, res) => {
    BoutiqueService.deleteCategory(req.params.category_id, req.params.shop_id).then(
        (ctg) => res.status(200).json({message: "Category deleted", category: ctg}),
        (err) => {
            console.error(err.message);
            res.status(500).json({
                message: `Cannot delete category: '${err.message}'`
            })
        }
    )
})

routerBoutique.patch("/:shop_id/categories/:category_id", prestataireMiddleware, async (req, res) => {
    BoutiqueService.editCategoryLabel(req.body['category_label'], req.params.category_id, req.params.shop_id).then(
        (category) => res.status(200).json({message: "Category updated", category: category}),
        (err) => {
            console.error(err.message);
            res.status(500).json({
                message: `Cannot update category: ${err.message}`
            })
        }
    )
})


//
//
//  ITEMS
//
//


/**
 * @swagger
 * /boutique/{shop_id}/items:
 *      parameters:
 *          - in: path
 *            name: shop_id
 *            example: "867fb638-7cb1-4228-a643-5c4f352f44b1"
 *            required: true
 *            description: "L'ID de la boutique"
 *            schema:
 *              type: string
 *      get:
 *          tags:
 *              - Boutique
 *          summary: "Get all items from the shop with potential filters to apply"
 *          parameters:
 *              - in: query
 *                name: search
 *                required: false
 *                description: "Search if the following string is in the name or description"
 *                schema:
 *                  type: string
 *              - in: query
 *                name: category_id
 *                required: false
 *                description: "Search all items with the category"
 *                schema:
 *                  type: array
 *                  items:
 *                      schema:
 *                          type: string
 *          responses:
 *              200:
 *                  description: "La liste des items"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/ShopItem'
 */
routerBoutique.get("/:shop_id/items", (req, res) => {
    BoutiqueService.getShopItems(req.params.shop_id, req.query).then(
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

/**
 * @swagger
 * /boutique/{shop_id}/items/{item_id}/:
 *      parameters:
 *          - in: path
 *            name: shop_id
 *            required: true
 *            description: "L'ID de la boutique"
 *            example: "867fb638-7cb1-4228-a643-5c4f352f44b1"
 *            schema:
 *              type: string
 *          - in: path
 *            name: item_id
 *            example: 2
 *            required: true
 *            description: "L'ID de l'article ou son identifiant de référencement"
 *            schema:
 *              type: string
 *      get:
 *          tags:
 *              - Boutique
 *          summary: "Get the informations of a specific article"
 *          responses:
 *              200:
 *                  description: "The article"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ShopItem'
 *              404:
 *                  description: "If the article doesn't exist"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 */

/**
 * @swagger
 * /boutique/{shop_id}/items:
 *   post:
 *     summary: Create a Shop Item
 *     tags:
 *       - Boutique
 *     description: Creates a new item for a specific shop. Requires prestataire privileges.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shop_id
 *         example: "867fb638-7cb1-4228-a643-5c4f352f44b1"
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shop.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item.
 *                 example: "T-Shirt"
 *               price:
 *                 type: number
 *                 description: The price of the item.
 *                 example: 29.99
 *               stock:
 *                 type: integer
 *                 description: The stock quantity of the item.
 *                 example: 100
 *               category_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the category the item belongs to.
 *                 example: "be2cff03-7d12-4369-acff-037d12a36993"
 *             required:
 *               - name
 *               - price
 *               - category_id
 *     responses:
 *       200:
 *         description: Shop item created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShopItem'  # Or a simplified version
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                   example: "Error message details"
 */

/**
 * @swagger
 * /boutique/{shop_id}/items/{item_id}/:
 *      parameters:
 *          - in: path
 *            name: shop_id
 *            required: true
 *            description: "L'ID de la boutique"
 *            example: "867fb638-7cb1-4228-a643-5c4f352f44b1"
 *            schema:
 *              type: string
 *          - in: path
 *            name: item_id
 *            example: 2
 *            required: true
 *            description: "L'ID de l'article ou son identifiant de référencement"
 *            schema:
 *              type: string
 *      patch:
 *          tags:
 *              - Boutique
 *          summary: "Update the fields of an article"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: query
 *                name: token
 *                example: "HVpYuVywN4"
 *                required: true
 *                description: Session ID for authentication
 *                schema:
 *                  type: string
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  example:
 *                      {
 *                          "name": "Porte-clé licorne",
 *                          "image": null,
 *                          "price": 1024.32,
 *                          "stock": 1,
 *                          "description": "Lorem ipsum",
 *                          "category_id": "be2cff03-7d12-4369-acff-037d12a36993"
 *                      }
 *                  properties:
 *                    name:
 *                      type: string
 *                      required: false
 *                    image:
 *                      type: string
 *                      format: uri
 *                    price:
 *                      type: number
 *                      required: false
 *                    stock:
 *                      type: integer
 *                      required: false
 *                    description:
 *                      type: string
 *                      required: false
 *                    category_id:
 *                      type: string
 *                      format: uuid
 *                      required: false
 *          responses:
 *              200:
 *                  description: "The updated article"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ShopItem'
 *              404:
 *                  description: "If the article doesn't exist"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *              400:
 *                  description: "No valid fields to update have been given."
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *      delete:
 *          tags:
 *              - Boutique
 *          summary: "Delete a specific article"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: query
 *                name: token
 *                example: "HVpYuVywN4"
 *                required: true
 *                description: Session ID for authentication
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: "The deleted article"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ShopItem'
 *              404:
 *                  description: "If the article doesn't exist"
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *
 */
routerBoutique.get("/:shop_id/items/:item_id", async (req, res) => {
    BoutiqueService.getShopItemByName(req.params.shop_id, req.params.item_id).then(
        (item) => {
            if (item) res.status(200).json(item)
            else res.status(404).json({message: "No item found"});
        },
        (err) => {
            console.error(err.message);
            res.status(500).json({message: err.message})
        }
    )
})

routerBoutique.post("/:shop_id/items/", prestataireMiddleware, async (req, res) => {
    BoutiqueService.createItem(
        req.params.shop_id,
        req.body
    ).then(
        (created_article) => res.status(200).json(created_article),
        (err) => {
            console.error(err)
            res.status(500).json({message: err.message})
        }
    )
})

routerBoutique.patch("/:shop_id/items/:item_id", prestataireMiddleware, async (req, res) => {
    BoutiqueService.editItem(
        req.params.shop_id,
        req.params.item_id,
        req.body
    ).then(
        (updated_item) => res.status(200).json(updated_item),
        (err) => {
            console.error(err.message);
            res.status(err.status).json({message: err.message})
        }
    )
})

routerBoutique.delete("/:shop_id/items/:item_id", prestataireMiddleware, async (req, res) => {
    BoutiqueService.deleteItem(
        req.params.shop_id,
        req.params.item_id,
    ).then(
        (deleted_item) => res.status(200).json(deleted_item),
        (err) => {
            console.error(err.message);
            res.status(500).json({message: err.message})
        }
    )
})


module.exports = routerBoutique;