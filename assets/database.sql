DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS shop_items;
DROP TABLE IF EXISTS shop_items_category;
DROP TABLE IF EXISTS shop CASCADE;
DROP TABLE IF EXISTS user CASCADE;

DROP TABLE IF EXISTS prestataires;

CREATE TABLE prestataires
(
    prestataire_id CHAR(36)    NOT NULL,
    icon           VARCHAR(256),
    password       CHAR(64)    NOT NULL,
    name           VARCHAR(64) NOT NULL,

    PRIMARY KEY (prestataire_id)
);

CREATE TABLE user
(
    user_id         CHAR(36)     NOT NULL,
    email           VARCHAR(320) NOT NULL, -- https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
    hashed_password CHAR(64)     NOT NULL,

    first_name      VARCHAR(64)  NOT NULL,
    last_name       VARCHAR(64)  NOT NULL,

    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),

    PRIMARY KEY (user_id)
);


#
#
# BOUTIQUE
#
#

CREATE TABLE shop
(
    shop_id        CHAR(36) NOT NULL,
    prestataire_id CHAR(36) NOT NULL,

    FOREIGN KEY (prestataire_id) REFERENCES prestataires (prestataire_id),
    PRIMARY KEY (shop_id)
);

CREATE TABLE shop_items_category
(
    shop_id        CHAR(36)    NOT NULL,
    category_id    CHAR(36)    NOT NULL,

    category_label VARCHAR(64) NOT NULL,

    FOREIGN KEY (shop_id) REFERENCES shop (shop_id),
    PRIMARY KEY (category_id)
);

CREATE TABLE shop_items
(
    id_shop     CHAR(36)      NOT NULL,
    item_id     CHAR(36)      NOT NULL,

    name        VARCHAR(128)  NOT NULL,
    image       VARBINARY(256),

    created_at  TIMESTAMP              DEFAULT CURRENT_TIMESTAMP,

    category    CHAR(36),

    stock       INT           NOT NULL DEFAULT 0,
    price       DECIMAL(6, 2) NOT NULL,
    description VARCHAR(4096) NOT NULL DEFAULT '',

    -- Permet de garder l'item pour les infos sur les produits achetés
    deleted     BOOLEAN                DEFAULT FALSE,


    FOREIGN KEY (category) REFERENCES shop_items_category (category_id),
    PRIMARY KEY (item_id, id_shop)
);

#
#   PANIER
#

CREATE TABLE carts
(
    id_user CHAR(64)           NOT NULL,
    cart_id INT AUTO_INCREMENT NOT NULL,

    PRIMARY KEY (cart_id),
    FOREIGN KEY (id_user) REFERENCES user (user_id)
);

CREATE TABLE cart_items
(
    cart_item_id INT AUTO_INCREMENT NOT NULL,
    cart_id      INT                NOT NULL,

    product_id   CHAR(36)           NOT NULL,
    quantity     INT                NOT NULL DEFAULT 1,

    created_at   TIMESTAMP          NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    -- Permet de voir quand ça a été modifié
    changed_at   TIMESTAMP                   DEFAULT NULL,

    CHECK (quantity > 0),
    FOREIGN KEY (cart_id) REFERENCES carts (cart_id),
    FOREIGN KEY (product_id) REFERENCES shop_items (item_id),

    PRIMARY KEY (cart_item_id)
);

#
#
#   JEU DE TESTS
#
#


INSERT INTO prestataires (name, prestataire_id, icon, password)
VALUES ('Porsche', '45309281-fc24-4e02-ad47-a275c64f5327', 'prestataires_icons/porsche_presta.jpg',
        'a8583ccd0f2fe6d789fda0b3ff80711c8141b543b0334f3888fc11b52914a90e'),
       ('24h du Mans', 'af3a0f62-5b13-4b19-9d42-736870b268a0', 'prestataires_icons/organisateurs_presta.jpg',
        '9f97b71bbbb848323f91335d2e8dbc635ed2c503d05b9342a8b1e93a894b783e'),
       ('Kart\'24', '524aaa51-09c1-48f1-85d3-ac878394e1ff', 'prestataires_icons/karting_presta.jpg',
        'da85e329212776cba7df7e11b396db625f4e20d8b747f99e0ccb0781b14c052e'),
       ('Mong\'man', '255da203-781d-4e50-924f-0423638cdb68', 'prestataires_icons/montgol_presta.jpg',
        '32de3639ca6fafb56a4b3c68f42cfe8a686c89d92b173a03becdcc02644d7511');

INSERT INTO user (user_id, email, hashed_password, first_name, last_name)
VALUES ('e052f135-13db-4a0d-aa15-f9bffac00359 ', 'test@gmail.com',
        '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Test', 'Family'),
       ('f4f434b3-f256-484b-8935-29e13126c9e8', 'carla@gmail.com',
        '5da148e1e6cd5cbfcd9b4ff36a2dc009a8d4559af51af63e6ed08930b6b17195', 'Carla', 'Wilson');
-- Pour générer des personnes : https://www.name-generator.org.uk/last/

#
#       BOUTIQUE
#

INSERT INTO shop (shop_id, prestataire_id)
    VALUE ('867fb638-7cb1-4228-a643-5c4f352f44b1', '45309281-fc24-4e02-ad47-a275c64f5327');

INSERT INTO shop_items_category (shop_id, category_id, category_label)
VALUES ('867fb638-7cb1-4228-a643-5c4f352f44b1', 'be2cff03-7d12-4369-acff-037d12a36993', 'Porte-clé'),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', '9af710a9-9c13-43d7-b710-a99c1323d77d', 'Écusson');

INSERT INTO shop_items (id_shop, item_id, name, category, stock, price)
VALUES ('867fb638-7cb1-4228-a643-5c4f352f44b1', '035669e3-6960-410b-92a4-7734295098e7', 'Porte-clé frein',
        'be2cff03-7d12-4369-acff-037d12a36993', 79,
        16.99),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', '9c46e6d5-a2da-488c-ba6f-b687218038e2', 'Porte-clé porsche',
        'be2cff03-7d12-4369-acff-037d12a36993', 146,
        24.99),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', '8a3bbb62-2ba0-4b9d-b230-902ea5bcf9ce', 'Écusson Porsche',
        '9af710a9-9c13-43d7-b710-a99c1323d77d', 14,
        34.99);
