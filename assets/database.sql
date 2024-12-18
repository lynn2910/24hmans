-- DEPRECATED fez

DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS shop_items;
DROP TABLE IF EXISTS shop_items_category;
DROP TABLE IF EXISTS shop CASCADE;²
DROP TABLE IF EXISTS user CASCADE;
DROP TABLE IF EXISTS admin CASCADE;

DROP TABLE IF EXISTS prestataires;

CREATE TABLE prestataires
(
    prestataire_id CHAR(36)    NOT NULL,
    icon           VARCHAR(256),
    password       VARCHAR(64) NOT NULL,
    name           VARCHAR(64) NOT NULL,

    PRIMARY KEY (prestataire_id)
);

CREATE TABLE admin
(
    admin_id INT AUTO_INCREMENT NOT NULL,
    name     VARCHAR(64),
    password VARCHAR(64),

    PRIMARY KEY (admin_id)
);

CREATE TABLE user
(
    user_id         CHAR(36)     NOT NULL,
    email           VARCHAR(320) NOT NULL, -- https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
    hashed_password VARCHAR(64)  NOT NULL,

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
        '$2a$10$Jfw2HzNUl/FQk.30LkQJhOa1W3rr1RDT7KUOmTVbN.ucf44w3PlEK'), -- "Spider-Porsche"
       ('24h du Mans', 'af3a0f62-5b13-4b19-9d42-736870b268a0', 'prestataires_icons/organisateurs_presta.jpg',
        '$2y$10$NXLvYYnkO8Nvz7vnuE6GVuszoBjyTFyAH2.vINZ1OinJZC6tRi6D6'), -- 'lemans'
       ('Kart\'24', '524aaa51-09c1-48f1-85d3-ac878394e1ff', 'prestataires_icons/karting_presta.jpg',
        '$2y$10$GnxVPi3XmfkM.2MKgJNLfe/v3Qj7sLgVx1mqUC/vxeZXS7IE56j8i'),-- 'im-fast'
       ('Mong\'man', '255da203-781d-4e50-924f-0423638cdb68', 'prestataires_icons/montgol_presta.jpg',
        '$2y$10$GhHncEKGwYMsbC72aLNae..OUpuvCn.a7Tvyq8VkCWn7r5UNXgRim'); -- montgolfiere

INSERT INTO user (user_id, email, hashed_password, first_name, last_name)
VALUES ('e052f135-13db-4a0d-aa15-f9bffac00359 ', 'test@gmail.com',
        '$2y$10$UwdnOZGp863rcdvYvpkiKOB5Cc3DCt3LtYHvIILE4eWqOGINTgiQO', 'Test', 'Family'),
       ('f4f434b3-f256-484b-8935-29e13126c9e8', 'carla@gmail.com',
        '$2y$10$UwdnOZGp863rcdvYvpkiKOB5Cc3DCt3LtYHvIILE4eWqOGINTgiQO', 'Carla', 'Wilson');
-- Pour générer des personnes : https://www.name-generator.org.uk/last/

INSERT INTO admin (admin_id, name, password)
VALUES (1, 'max', '$2y$10$tGQso6tm1fKzqcJyDarjbOLs9sWVYsJmv42537Kt3p7Rn.uiD3Oja');

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
