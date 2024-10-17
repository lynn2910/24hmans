DROP TABLE IF EXISTS shop_items;
DROP TABLE IF EXISTS shop_items_category;
DROP TABLE IF EXISTS shop;

DROP TABLE IF EXISTS prestataires;

CREATE TABLE prestataires
(
    prestataire_id CHAR(36)    NOT NULL,
    icon           VARCHAR(256),
    password       CHAR(64)    NOT NULL,
    name           VARCHAR(64) NOT NULL,

    PRIMARY KEY (prestataire_id)
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

    PRIMARY KEY (category_id)
);

CREATE TABLE shop_items
(
    id_shop     CHAR(36)           NOT NULL,
    item_id     INT AUTO_INCREMENT NOT NULL,

    name        VARCHAR(128)       NOT NULL,
    image       VARBINARY(256),

    category    CHAR(36),

    stock       INT                NOT NULL DEFAULT 0,
    price       DECIMAL(6, 2)      NOT NULL,
    description VARCHAR(4096)      NOT NULL DEFAULT '',

    FOREIGN KEY (category) REFERENCES shop_items_category (category_id),
    PRIMARY KEY (item_id, id_shop)
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

INSERT INTO shop (shop_id, prestataire_id)
    VALUE ('867fb638-7cb1-4228-a643-5c4f352f44b1', '45309281-fc24-4e02-ad47-a275c64f5327');

INSERT INTO shop_items_category (shop_id, category_id, category_label)
VALUES ('867fb638-7cb1-4228-a643-5c4f352f44b1', 'be2cff03-7d12-4369-acff-037d12a36993', 'Porte-clé'),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', '9af710a9-9c13-43d7-b710-a99c1323d77d', 'Écusson');

INSERT INTO shop_items (id_shop, item_id, name, category, stock, price)
VALUES ('867fb638-7cb1-4228-a643-5c4f352f44b1', 1, 'Porte-clé frein', 'be2cff03-7d12-4369-acff-037d12a36993', 79,
        16.99),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', 2, 'Porte-clé porsche', 'be2cff03-7d12-4369-acff-037d12a36993', 146,
        24.99),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', 3, 'Porte-clé frein', '9af710a9-9c13-43d7-b710-a99c1323d77d', 14,
        16.99);
