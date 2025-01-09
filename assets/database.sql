#
#
#   JEU DE TESTS
#
#

DELETE
FROM Prestataire;
DELETE
FROM User;
DELETE
FROM Shape;
DELETE
FROM Billetteries;
DELETE
FROM Tickets;
DELETE
FROM Point;
DELETE
FROM Shape;
DELETE
FROM Ecurie;
DELETE
FROM FormulaireEcurie;
DELETE
FROM Sessions;

INSERT INTO Admin (name, password)
VALUES ('max', '$2y$10$tGQso6tm1fKzqcJyDarjbOLs9sWVYsJmv42537Kt3p7Rn.uiD3Oja');

INSERT INTO Prestataire (name, id, icon, password, email, referencer)
VALUES ('Porsche', '45309281-fc24-4e02-ad47-a275c64f5327', 'prestataires_icons/porsche_presta.jpg',
        '$2a$10$Jfw2HzNUl/FQk.30LkQJhOa1W3rr1RDT7KUOmTVbN.ucf44w3PlEK', 'porsche@gmail.com',
        'porsche'),                                                                                        -- "Spider-Porsche"
       ('24h du Mans', 'af3a0f62-5b13-4b19-9d42-736870b268a0', 'prestataires_icons/organisateurs_presta.jpg',
        '$2y$10$NXLvYYnkO8Nvz7vnuE6GVuszoBjyTFyAH2.vINZ1OinJZC6tRi6D6', 'mongman@gmail.com', '24hdumans'), -- 'lemans'
       ('Kart\'24', '524aaa51-09c1-48f1-85d3-ac878394e1ff', 'prestataires_icons/karting_presta.jpg',
        '$2y$10$GnxVPi3XmfkM.2MyKgJNLfe/v3Qj7sLgVx1mqUC/vxeZXS7IE56j8i', 'kart24@gmail.com', 'kart24'),    -- 'im-fast'
       ('Mong\'man', '255da203-781d-4e50-924f-0423638cdb68', 'prestataires_icons/montgol_presta.jpg',
        '$2y$10$GhHncEKGwYMsbC72aLNae..OUpuvCn.a7Tvyq8VkCWn7r5UNXgRim', '24hmans@gmail.com', 'mongman'),   -- montgolfiere
       ('Codeky', '0b7956e6-1262-49f7-aaab-c5ab60d16cba', 'prestataires_icons/codeky_presta.jpg',
        '$2a$10$eMcDHdcnvFWXlBiEYcKAy.9T9k7DrWXtkepZytO6Z9aLsisubKDYa', 'codeky@codeky.com', 'codeky'); -- 'zeky#codeky'

INSERT INTO PrestataireLink (prestataire_id, name, url)
VALUES ('45309281-fc24-4e02-ad47-a275c64f5327', 'Site officiel', 'https://www.porsche.com'),
       ('255da203-781d-4e50-924f-0423638cdb68', 'Nos prestations',
        'https://montgolfiere-france.com/bapteme-en-montgolfiere-pres-du-mans/'),
       ('524aaa51-09c1-48f1-85d3-ac878394e1ff', 'Site officiel',
        'https://www.lemans-karting.com/karting/sessions-kart'),
       ('af3a0f62-5b13-4b19-9d42-736870b268a0', 'Notre site', 'https://24h.chamallow.fr');

INSERT INTO User (id, email, password, first_name, last_name)
VALUES ('e052f135-13db-4a0d-aa15-f9bffac00359 ', 'test@gmail.com',
        '$2y$10$UwdnOZGp863rcdvYvpkiKOB5Cc3DCt3LtYHvIILE4eWqOGINTgiQO', 'Test', 'Family'),
       ('f4f434b3-f256-484b-8935-29e13126c9e8', 'carla@gmail.com',
        '$2y$10$UwdnOZGp863rcdvYvpkiKOB5Cc3DCt3LtYHvIILE4eWqOGINTgiQO', 'Carla', 'Wilson');


INSERT INTO Sessions (sessionId, userType, userId)
VALUES ('sdkhd4Kcr8', 1, 'e052f135-13db-4a0d-aa15-f9bffac00359');

# -- Pour générer des personnes : https://www.name-generator.org.uk/last/
#
# INSERT INTO admin (admin_id, name, password)
# VALUES (1, 'max', '$2y$10$tGQso6tm1fKzqcJyDarjbOLs9sWVYsJmv42537Kt3p7Rn.uiD3Oja');


#
#
#   BOUTIQUE
#
#

INSERT INTO Boutique (shop_id, prestataire_id, enabled)
    VALUE ('867fb638-7cb1-4228-a643-5c4f352f44b1', '45309281-fc24-4e02-ad47-a275c64f5327', true);

INSERT INTO BoutiqueCategory (shop_id, category_id, category_label)
VALUES ('867fb638-7cb1-4228-a643-5c4f352f44b1', 'be2cff03-7d12-4369-acff-037d12a36993', 'Porte-clé'),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', '9af710a9-9c13-43d7-b710-a99c1323d77d', 'Écusson');

INSERT INTO BoutiqueArticles (item_id, shop_id, name, category_id, stock, price, referencer)
VALUES (1, '867fb638-7cb1-4228-a643-5c4f352f44b1', 'Porte-clé frein',
        'be2cff03-7d12-4369-acff-037d12a36993', 79,
        16.99, 'porte-clé-frein'),
       (2, '867fb638-7cb1-4228-a643-5c4f352f44b1', 'Porte-clé porsche',
        'be2cff03-7d12-4369-acff-037d12a36993', 146,
        24.99, 'porte-clé-porsche'),
       (3, '867fb638-7cb1-4228-a643-5c4f352f44b1', 'Écusson Porsche',
        '9af710a9-9c13-43d7-b710-a99c1323d77d', 14,
        34.99, 'écusson-porsche');



#
#
#   CARTE INTERACTIVE
#
#

# Voir parserDataMap.js

#
#
#   BILLETTERIE
#
#

INSERT INTO Billetteries(billetterie_label, billetterie_id, prestataire_id)
VALUES ('Tribunes', 'dab91561-09f1-47cb-8d91-e21e873d6b4e', 'af3a0f62-5b13-4b19-9d42-736870b268a0');

INSERT INTO BilletterieCategories (category_label, category_id, billetterie_id)
VALUES ('Tribune', 1, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Tribune personne à mobilité réduite', 2, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Tribune VIP', 3, 'dab91561-09f1-47cb-8d91-e21e873d6b4e');

INSERT INTO BilletterieForfaits (forfait_label, forfait_id, billetterie_id)
VALUES ('Mercredi 11 juin 2025', 1, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Jeudi 12 juin 2025', 2, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Vendredi 13 juin 2025', 3, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Samedi 14 juin 2025', 4, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Dimanche 15 juin 2025', 5, 'dab91561-09f1-47cb-8d91-e21e873d6b4e');

INSERT INTO BilletteriePersonnes(personne_label, personne_id, billetterie_id)
VALUES ('Famille (x2 adulte) nombre d''enfants : ', 1, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Étudiant nombre de places : ', 2, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Sénior nombre de places : ', 3, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Adulte nombre de places : ', 4, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Mineur nombre de places : ', 5, 'dab91561-09f1-47cb-8d91-e21e873d6b4e');

#INSERT INTO Tickets(user_id, ticket_id, billetterie_id, category_id)
#   VALUES
#
#INSERT INTO TicketBilletterieForfaits(forfait_id, ticket_id)
#   VALUES
#
#INSERT INTO TicketBilletteriePersonnes(ticket_id, personne_type_id, quantity)
#   VALUES

#
#
#     ECURIE
#
#

INSERT INTO Ecurie(id, name, prestataire_id)
    VALUE ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Porsche', '45309281-fc24-4e02-ad47-a275c64f5327');

INSERT INTO FormulaireEcurie(ecurie_id, email, nom, num_billet, prenom, tel, submitted_at)
VALUES ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Yanis", "Blanc", "Yanis@gmail.com", "07 72 50 20 32", '01',
        "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Juliette", "Richard", "Juliette.Richard@gmail.com", "+07 88 55 02 07",
        '02', "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Ethan", "Durand", "DurandEthan@gmail.com", "07 15 10 20 00", '03',
        "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Sasha", "LeFevre", "Sasha.Lefevre@gmail.com", "08 53 69 85 65", '04',
        "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Sarah", "Henry", "sarah.Henry@gmail.com", "09 98 56 25 46", '05',
        "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Mary", "Guerin", "mary@gmail.com", "07 10 12 15 14", '06',
        "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Loris", "Michel", "loris@gmail.com", "07 20 12 23 50", '07',
        "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Felix", "Mercier", "felix@gmail.com", "03 42 15 78 89", '08',
        "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Lea", "Andre", "Lea.Andre@gmail.com", "08 45 95 86 54", '09',
        "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Camille", "Rousseau", "camille.Rousseau@gmail.com", "05 15 50 00 15",
        '10', "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Sebastien", "Mcdowell", "sebastien@gmail.com", "06 66 66 66 66", '11',
        "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Martin", "Fournier", "martin.Fournier@gmail.com", "08 58 65 53 65",
        '12', "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Marie", "Jean", "Marie@gmail.com", "07 82 53 33 33", '13',
        "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Adrien", "Bonnet", "AdrienBonnet@gmail.com", "07 78 95 86 85", '14',
        "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Quentin", "Masson", "Quentin@gmail.com", "08 89 56 87 55", '15',
        "2024-11-28 12:40:24"),
       ("d8d755cb-9aba-43f5-9546-14db654a1f06", "Gabriel", "Morin", "gabriel.morin@gmail.com", "09 65 85 96 85", '16',
        "2024-11-28 12:40:24");
