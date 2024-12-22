#
#
#   JEU DE TESTS
#
#


INSERT INTO prestataire (name, id, icon, password, email, referencer)
VALUES ('Porsche', '45309281-fc24-4e02-ad47-a275c64f5327', 'prestataires_icons/porsche_presta.jpg',
        '$2a$10$Jfw2HzNUl/FQk.30LkQJhOa1W3rr1RDT7KUOmTVbN.ucf44w3PlEK', 'porsche@gmail.com',
        'porsche'),                                                                                        -- "Spider-Porsche"
       ('24h du Mans', 'af3a0f62-5b13-4b19-9d42-736870b268a0', 'prestataires_icons/organisateurs_presta.jpg',
        '$2y$10$NXLvYYnkO8Nvz7vnuE6GVuszoBjyTFyAH2.vINZ1OinJZC6tRi6D6', 'mongman@gmail.com', '24hdumans'), -- 'lemans'
       ('Kart\'24', '524aaa51-09c1-48f1-85d3-ac878394e1ff', 'prestataires_icons/karting_presta.jpg',
        '$2y$10$GnxVPi3XmfkM.2MyKgJNLfe/v3Qj7sLgVx1mqUC/vxeZXS7IE56j8i', 'kart24@gmail.com', 'kart24'),-- 'im-fast'
       ('Mong\'man', '255da203-781d-4e50-924f-0423638cdb68', 'prestataires_icons/montgol_presta.jpg',
        '$2y$10$GhHncEKGwYMsbC72aLNae..OUpuvCn.a7Tvyq8VkCWn7r5UNXgRim', '24hmans@gmail.com', 'mongman');
-- montgolfiere

INSERT INTO prestatairelink (prestataire_id, name, url)
VALUES ('45309281-fc24-4e02-ad47-a275c64f5327', 'Site officiel', 'https://www.porsche.com'),
       ('255da203-781d-4e50-924f-0423638cdb68', 'Nos prestations',
        'https://montgolfiere-france.com/bapteme-en-montgolfiere-pres-du-mans/'),
       ('524aaa51-09c1-48f1-85d3-ac878394e1ff', 'Site officiel',
        'https://www.lemans-karting.com/karting/sessions-kart'),
       ('af3a0f62-5b13-4b19-9d42-736870b268a0', 'Notre site', 'https://24h.chamallow.fr');

INSERT INTO user (id, email, password, first_name, last_name)
VALUES ('e052f135-13db-4a0d-aa15-f9bffac00359 ', 'test@gmail.com',
        '$2y$10$UwdnOZGp863rcdvYvpkiKOB5Cc3DCt3LtYHvIILE4eWqOGINTgiQO', 'Test', 'Family'),
       ('f4f434b3-f256-484b-8935-29e13126c9e8', 'carla@gmail.com',
        '$2y$10$UwdnOZGp863rcdvYvpkiKOB5Cc3DCt3LtYHvIILE4eWqOGINTgiQO', 'Carla', 'Wilson');
# -- Pour générer des personnes : https://www.name-generator.org.uk/last/
#
# INSERT INTO admin (admin_id, name, password)
# VALUES (1, 'max', '$2y$10$tGQso6tm1fKzqcJyDarjbOLs9sWVYsJmv42537Kt3p7Rn.uiD3Oja');
#
# #
# #       BOUTIQUE
# #
#
INSERT INTO boutique (shop_id, prestataire_id, enabled)
    VALUE ('867fb638-7cb1-4228-a643-5c4f352f44b1', '45309281-fc24-4e02-ad47-a275c64f5327', true);

INSERT INTO boutiquecategory (shop_id, category_id, category_label)
VALUES ('867fb638-7cb1-4228-a643-5c4f352f44b1', 'be2cff03-7d12-4369-acff-037d12a36993', 'Porte-clé'),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', '9af710a9-9c13-43d7-b710-a99c1323d77d', 'Écusson');

INSERT INTO boutiquearticles (shop_id, name, category_id, stock, price, referencer)
VALUES ('867fb638-7cb1-4228-a643-5c4f352f44b1', 'Porte-clé frein',
        'be2cff03-7d12-4369-acff-037d12a36993', 79,
        16.99, 'porte-clé-frein'),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', 'Porte-clé porsche',
        'be2cff03-7d12-4369-acff-037d12a36993', 146,
        24.99, 'porte-clé-porsche'),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', 'Écusson Porsche',
        '9af710a9-9c13-43d7-b710-a99c1323d77d', 14,
        34.99, 'écusson-porsche');