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
        'porsche'),                                                                                        -- 'Spider-Porsche'
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
VALUES ('sdkhd4Kcr8', 1, 'e052f135-13db-4a0d-aa15-f9bffac00359'),
       ('HVpYuVywN4', 2, '45309281-fc24-4e02-ad47-a275c64f5327');

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
    select  * from Ecurie;
DELETE FROM FormulaireEcurie WHERE ecurie_id= 'd8d755cb-9aba-43f5-9546-14db654a1f06';
SELECT * FROM FormulaireEcurie;
INSERT INTO FormulaireEcurie(ecurie_id, prenom, nom, year, email, tel, num_billet, submitted_at, is_winner)
VALUES ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Yanis', 'Blanc', 2024, 'Yanis.Blanc@gmail.com', '07 72 50 20 32', '01',
        '2024-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Juliette', 'Richard', 2024, 'Juliette.Richard@edu.univ-fcomte.fr', '+07 88 55 02 07',
        '02', '2024-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Ethan', 'Durand', 2024, 'ethan.durand@gmail.com', '07 15 10 20 00', '03',
        '2024-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Sasha', 'LeFevre', 2024, 'sasha.lefevre@gmail.com', '08 53 69 85 65',
        '04',
        '2024-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Sarah', 'Henry', 2024, 'sarah@gmail.com', '09 98 56 25 46', '05',
        '2024-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Mary', 'Guerin', 2024, 'mary@gmail.com', '07 10 12 15 14', '06',
        '2024-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Loris', 'Michel', 2024, 'lorsi@gmail.com', '07 20 12 23 50', '07',
        '2024-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Felix', 'Mercier', 2024, 'felix@gmail.com', '03 42 15 78 89', '08',
        '2024-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Lea', 'Andre', 2024, 'lea@gmail.com', '08 45 95 86 54', '09',
        '2024-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Camille', 'Rousseau', 2024, 'camille@gmail.com', '05 15 50 00 15',
        '10', '2024-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Lucas', 'Martin', 2025, 'lucas.martin@gmail.com', '07 45 20 30 10', '01',
        '2025-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Emma', 'Dubois', 2025, 'emma.dubois@gmail.com', '06 88 55 02 07',
        '02', '2025-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Noah', 'Moreau', 2025, 'noah.moreau@gmail.com', '07 15 10 20 00', '03',
        '2025-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Alice', 'Lemoine', 2025, 'alice.lemoine@gmail.com', '08 53 69 85 65',
        '04', '2025-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Hugo', 'Leroy', 2025, 'hugo@gmail.com', '09 98 56 25 46', '05',
        '2025-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Manon', 'Garcia', 2025, 'maon@gmail.com', '07 10 12 15 14', '06',
        '2025-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Nathan', 'Robin', 2025, 'nathan.robin@gmail.com', '07 20 12 23 50', '07',
        '2025-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Clara', 'Bertrand', 2025, 'clara.bertrand@gmail.com', '03 42 15 78 89', '08',
        '2025-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Thomas', 'Perrin', 2025, 'thomas.perrin@gmail.com', '08 45 95 86 54', '09',
        '2025-11-28 12:40:24', false),
       ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Julie', 'Collet', 2025, 'julie.collet@gmail.com', '05 15 50 00 15',
        '10', '2025-11-28 12:40:24', false);

SELECT * FROM FormulaireEcurie;
select  * from Boutique;