DELETE
FROM UserMontgolfiereSession;
DELETE
FROM MontgolfiereSessionSlot;
DELETE
FROM Montgolfiere;
DELETE
FROM MontgolfiereReservationSlot;
DELETE
FROM MontgolfiereReservationApp;
DELETE
FROM UserKartingReservation;
DELETE
FROM KartingSessionSlot;
DELETE
FROM KartingCircuit;
DELETE
FROM Karting;
DELETE
FROM FormulaireEcurie;
DELETE
FROM Ecurie;
DELETE
FROM TicketBilletteriePersonnes;
DELETE
FROM TicketBilletterieForfaits;
DELETE
FROM Tickets;
DELETE
FROM BilletteriePersonnes;
DELETE
FROM BilletterieForfaits;
DELETE
FROM BilletterieCategories;
DELETE
FROM Billetteries;
DELETE
FROM Point;
DELETE
FROM Shape;
DELETE
FROM UserOrderArticle;
DELETE
FROM UserOrder;
DELETE
FROM BoutiqueArticles;
DELETE
FROM BoutiqueCategory;
DELETE
FROM Boutique;
DELETE
FROM PrestataireLink;
DELETE
FROM Prestataire;
DELETE
FROM Admin;
DELETE
FROM User;

INSERT INTO User (`id`, `email`, `first_name`, `last_name`, `password`)
VALUES ('e052f135-13db-4a0d-aa15-f9bffac00359', 'test@gmail.com', 'Test', 'Family',
        '$2y$10$UwdnOZGp863rcdvYvpkiKOB5Cc3DCt3LtYHvIILE4eWqOGINTgiQO'),
       ('e752b8f4-a2a5-46d4-84dc-1cc5d54a43ff', 'test@test.com', 'Test', 't',
        '$2a$10$/1XMkYyXXwxTUlxJtkULu.GNzj.2fztjlrHfjiWxOhgo45KLf/ney'),
       ('f4f434b3-f256-484b-8935-29e13126c9e8', 'carla@gmail.com', 'Carla', 'Wilson',
        '$2y$10$UwdnOZGp863rcdvYvpkiKOB5Cc3DCt3LtYHvIILE4eWqOGINTgiQO');
INSERT INTO Admin (`admin_id`, `name`, `password`)
VALUES (1, 'max', '$2y$10$tGQso6tm1fKzqcJyDarjbOLs9sWVYsJmv42537Kt3p7Rn.uiD3Oja'),
       (3, 'max', '$2y$10$tGQso6tm1fKzqcJyDarjbOLs9sWVYsJmv42537Kt3p7Rn.uiD3Oja'),
       (4, 'max', '$2y$10$tGQso6tm1fKzqcJyDarjbOLs9sWVYsJmv42537Kt3p7Rn.uiD3Oja'),
       (5, 'max', '$2y$10$tGQso6tm1fKzqcJyDarjbOLs9sWVYsJmv42537Kt3p7Rn.uiD3Oja'),
       (6, 'max', '$2y$10$tGQso6tm1fKzqcJyDarjbOLs9sWVYsJmv42537Kt3p7Rn.uiD3Oja'),
       (7, 'max', '$2y$10$tGQso6tm1fKzqcJyDarjbOLs9sWVYsJmv42537Kt3p7Rn.uiD3Oja'),
       (8, 'max', '$2y$10$tGQso6tm1fKzqcJyDarjbOLs9sWVYsJmv42537Kt3p7Rn.uiD3Oja');
INSERT INTO Prestataire (`id`, `icon`, `password`, `description`, `name`, `referencer`, `email`, `accentColor`,
                         `banner`)
VALUES ('0b7956e6-1262-49f7-aaab-c5ab60d16cba', '/public/prestataires_icons/codeky_presta.jpg',
        '$2a$10$eMcDHdcnvFWXlBiEYcKAy.9T9k7DrWXtkepZytO6Z9aLsisubKDYa', NULL, 'Codeky', 'codeky', 'codeky@codeky.com',
        NULL, NULL),
       ('255da203-781d-4e50-924f-0423638cdb68', '/public/prestataires_icons/montgol_presta.jpg',
        '$2y$10$GhHncEKGwYMsbC72aLNae..OUpuvCn.a7Tvyq8VkCWn7r5UNXgRim', NULL, 'Mongman', 'mongman', '24hmans@gmail.com',
        NULL, NULL),
       ('45309281-fc24-4e02-ad47-a275c64f5327', '/public/prestataires_icons/porsche_presta.png',
        '$2a$10$Jfw2HzNUl/FQk.30LkQJhOa1W3rr1RDT7KUOmTVbN.ucf44w3PlEK', '<p>&nbsp;</p>
<table style="border-collapse: collapse; width: 99.977%;" border="1">
<tbody>
<tr>
<td style="width: 39.4907%;">
<h1><strong>L\h&eacute;ritage de la course</strong></h1>
Porsche et les 24 Heures du Mans : une histoire damour qui dure depuis des d&eacute;cennies. De la l&eacute;gendaire 917 &agrave; la derni&egrave;re Hypercar, Porsche a toujours repouss&eacute; les limites de la performance et de lendurance sur ce circuit mythique. Venez vivre l&eacute;motion de la course et d&eacute;couvrez notre passion pour lexcellence.</td>
<td style="width: 2.17895%;">&nbsp;</td>
<td style="width: 58.3203%;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://www.flat6mag.com/medias/images/porsche-911-rsr-24h-du-mans-2021-7-.jpg" alt="porsche-911-rsr-24h-du-mans-2021-7" width="489" height="326" /></td>
</tr>
</tbody>
</table>
<p data-sourcepos="5:1-5:315">&nbsp;</p>
<table style="border-collapse: collapse; width: 99.977%;" border="1">
<tbody>
<tr>
<td style="width: 45.5519%;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://www.lemans.org/media/cache/component_photo_1600/assets/fileuploads/64/84/6484fed1bdab4.jpg" alt="" width="514" height="343" /></td>
<td style="width: 2.24381%;">&nbsp;</td>
<td style="width: 52.1942%;">
<h1 data-sourcepos="7:1-7:47"><strong>L\Exp&eacute;rience Porsche au Mans</strong></h1>
Plongez au c&oelig;ur de laction avec Porsche ! Visitez nos &eacute;curies et d&eacute;couvrez les coulisses de la course, o&ugrave; ing&eacute;nieurs et m&eacute;caniciens travaillent sans rel&acirc;che pour optimiser la performance de nos bolides. Notre boutique officielle vous propose une gamme exclusive de produits d&eacute;riv&eacute;s pour emporter un morceau de la l&eacute;gende avec vous.</td>
</tr>
</tbody>
</table>
<p data-sourcepos="11:1-11:49">&nbsp;</p>
<table style="border-collapse: collapse; width: 99.977%;" border="1">
<tbody>
<tr>
<td style="width: 39.5128%;">
<h1 data-sourcepos="11:1-11:49"><strong>La Boutique Officielle Porsche</strong></h1>
Que vous soyez un passionn&eacute; de longue date ou un nouveau venu dans le monde de lendurance, notre boutique officielle est lendroit id&eacute;al pour trouver le souvenir parfait des 24 Heures du Mans. Des v&ecirc;tements aux accessoires, en passant par les miniatures de collection, vous trouverez forc&eacute;ment lobjet qui fera battre votre c&oelig;ur de fan.</td>
<td style="width: 2.59764%;">&nbsp;</td>
<td style="width: 57.9657%;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://www.lemans.org/media/cache/component_photo_1600/assets/fileuploads/66/6b/666b1c165b496.jpg" alt="" width="514" height="343" /></td>
</tr>
</tbody>
</table>
<p data-sourcepos="15:1-15:46">&nbsp;</p>
<table style="border-collapse: collapse; width: 99.977%;" border="1">
<tbody>
<tr>
<td style="width: 45.1209%;"><img src="https://cdn-6.motorsport.com/images/amp/6AE1D716/s1200/4-porsche-penske-motorsport-po.webp" alt="" width="505" height="336" /></td>
<td style="width: 2.50158%;">&nbsp;</td>
<td style="width: 52.3675%;">
<h1 data-sourcepos="15:1-15:46"><strong>Rencontrez l\&Eacute;quipe Porsche</strong></h1>
Venez &agrave; la rencontre des pilotes et des membres de l&eacute;quipe Porsche ! &Eacute;changez avec eux, prenez des photos et partagez leur passion pour la course. Ils seront ravis de vous faire d&eacute;couvrir leur univers et de vous faire vivre des moments inoubliables.</td>
</tr>
</tbody>
</table>
<p data-sourcepos="19:1-19:60">&nbsp;</p>
<table style="border-collapse: collapse; width: 99.977%;" border="1">
<tbody>
<tr>
<td style="width: 39.5128%;">
<h1 data-sourcepos="19:1-19:60"><strong>L\Innovation au Service de la Performance</strong></h1>
Porsche, cest aussi un laboratoire dinnovation. Les 24 Heures du Mans sont loccasion pour nous de tester de nouvelles technologies et de repousser les limites de la performance. D&eacute;couvrez comment notre engagement en comp&eacute;tition se traduit par des avanc&eacute;es technologiques qui profitent &agrave; nos voitures de s&eacute;rie.</td>
<td style="width: 2.86086%;">&nbsp;</td>
<td style="width: 57.6162%;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://www.endurance-info.com/sites/default/files/styles/image_richtext/public/2025-03/MANTHEY%20Porsche%20911%20GT3...%20%281%29.jpg?itok=iGvc7rdD" alt="" width="425" height="283" /></td>
</tr>
</tbody>
</table>
<p data-sourcepos="23:1-23:49">&nbsp;</p>
<table style="border-collapse: collapse; width: 99.977%;" border="1">
<tbody>
<tr>
<td style="width: 45.38%;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://www.lemans.org/media/cache/component_photo_1600/assets/fileuploads/67/e1/67e17552c8b9e.jpg" alt="" width="496" height="279" /></td>
<td style="width: 2.41567%;">&nbsp;</td>
<td style="width: 52.1957%;">
<h1 data-sourcepos="23:1-23:49"><strong>Vivez l\Intensit&eacute; de la Course</strong></h1>
Les 24 Heures du Mans, cest une exp&eacute;rience unique, un m&eacute;lange dadr&eacute;naline, de passion et d&eacute;motion. Venez vibrer au rythme des moteurs et encourager l&eacute;quipe Porsche dans sa qu&ecirc;te de la victoire. Lambiance sur le circuit est &eacute;lectrique, et vous repartirez avec des souvenirs plein la t&ecirc;te.</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>', 'Porsche', 'porsche', 'porsche@gmail.com', NULL, NULL),
       ('524aaa51-09c1-48f1-85d3-ac878394e1ff', '/public/prestataires_icons/karting_presta.png',
        '$2b$12$q2TiCEKu0SDWFE2nPq45He.gXueN20nlAPHYCsS5RQ.X8Z1dG5vFG', NULL, 'Kart24', 'kart24', 'kart24@gmail.com',
        NULL, NULL),
       ('af3a0f62-5b13-4b19-9d42-736870b268a0', '/public/prestataires_icons/organisateurs_presta.png',
        '$2y$10$NXLvYYnkO8Nvz7vnuE6GVuszoBjyTFyAH2.vINZ1OinJZC6tRi6D6', NULL, '24h du Mans', '24hdumans',
        'mongman@gmail.com', NULL, NULL);
INSERT INTO PrestataireLink (`prestataire_id`, `id`, `name`, `url`)
VALUES ('45309281-fc24-4e02-ad47-a275c64f5327', 30, 'Site officiel', 'https://www.porsche.com'),
       ('255da203-781d-4e50-924f-0423638cdb68', 31, 'Nos prestations',
        'https://montgolfiere-france.com/bapteme-en-montgolfiere-pres-du-mans/'),
       ('524aaa51-09c1-48f1-85d3-ac878394e1ff', 32, 'Site officiel',
        'https://www.lemans-karting.com/karting/sessions-kart'),
       ('af3a0f62-5b13-4b19-9d42-736870b268a0', 33, 'Notre site', 'https://24h.chamallow.fr');
INSERT INTO Boutique (`prestataire_id`, `enabled`, `shop_id`)
VALUES ('45309281-fc24-4e02-ad47-a275c64f5327', 1, '867fb638-7cb1-4228-a643-5c4f352f44b1');
INSERT INTO BoutiqueCategory (`shop_id`, `category_id`, `category_label`)
VALUES ('867fb638-7cb1-4228-a643-5c4f352f44b1', '9af710a9-9c13-43d7-b710-a99c1323d77d', 'Écusson'),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', 'be2cff03-7d12-4369-acff-037d12a36993', 'Porte-clé'),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', 'fdbc099a-04f0-4dbd-bc09-9a04f04dbd49', 'Jouets');
INSERT INTO BoutiqueArticles (`shop_id`, `item_id`, `referencer`, `name`, `image`, `price`, `stock`, `description`,
                              `category_id`, `deleted`)
VALUES ('867fb638-7cb1-4228-a643-5c4f352f44b1', 1, 'porte-clé-frein', 'Porte-clé frein',
        '/public/products_images/porte_cle_frein.jpg', 16.99, 56, NULL, 'be2cff03-7d12-4369-acff-037d12a36993', 0),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', 2, 'porte-clé-porsche', 'Porte-clé porsche',
        '/public/products_images/porte_cle_ecusson.jpg', 24.99, 129, NULL, 'be2cff03-7d12-4369-acff-037d12a36993', 0),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', 3, 'écusson-porsche', 'Écusson Porsche',
        '/public/products_images/ecusson_porsche.jpg', 34.99, 3, NULL, '9af710a9-9c13-43d7-b710-a99c1323d77d', 0),
       ('867fb638-7cb1-4228-a643-5c4f352f44b1', 5, 'petite-voiture', 'Voiture miniature',
        '/public/products_images/petite_voiture.jpg', 7.46, 79, NULL, 'fdbc099a-04f0-4dbd-bc09-9a04f04dbd49', 0);
INSERT INTO UserOrder (`user_id`, `order_id`, `total_price`, `date`)
VALUES ('e052f135-13db-4a0d-aa15-f9bffac00359', 'a8d2f58f-9f64-492f-8901-0ab956450bf6', 76.97, '2025-03-03 14:16:54'),
       ('e052f135-13db-4a0d-aa15-f9bffac00359', 'dedc1ca8-25ba-4472-b079-85e0d224e9c2', 611.74, '2025-04-02 09:14:35'),
       ('e052f135-13db-4a0d-aa15-f9bffac00359', 'e17e767e-2541-435c-b13d-8eb92366d20a', 511.78, '2025-04-01 14:38:17');
INSERT INTO UserOrderArticle (`order_id`, `article_id`, `unit_price`, `amount`)
VALUES ('a8d2f58f-9f64-492f-8901-0ab956450bf6', 1, 16.99, 1),
       ('a8d2f58f-9f64-492f-8901-0ab956450bf6', 2, 24.99, 1),
       ('a8d2f58f-9f64-492f-8901-0ab956450bf6', 3, 34.99, 1),
       ('dedc1ca8-25ba-4472-b079-85e0d224e9c2', 1, 16.99, 11),
       ('dedc1ca8-25ba-4472-b079-85e0d224e9c2', 2, 24.99, 10),
       ('dedc1ca8-25ba-4472-b079-85e0d224e9c2', 3, 34.99, 5),
       ('e17e767e-2541-435c-b13d-8eb92366d20a', 1, 16.99, 11),
       ('e17e767e-2541-435c-b13d-8eb92366d20a', 2, 24.99, 6),
       ('e17e767e-2541-435c-b13d-8eb92366d20a', 3, 34.99, 5);
INSERT INTO Billetteries (`billetterie_label`, `billetterie_id`, `prestataire_id`)
VALUES ('Tribunes', 'dab91561-09f1-47cb-8d91-e21e873d6b4e', 'af3a0f62-5b13-4b19-9d42-736870b268a0');
INSERT INTO BilletterieCategories (`category_label`, `category_id`, `billetterie_id`)
VALUES ('Tribune', 1, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Tribune personne à mobilité réduite', 2, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Tribune VIP', 3, 'dab91561-09f1-47cb-8d91-e21e873d6b4e');
INSERT INTO BilletterieForfaits (`forfait_label`, `forfait_id`, `billetterie_id`)
VALUES ('Mercredi 11 juin 2025', 1, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Jeudi 12 juin 2025', 2, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Vendredi 13 juin 2025', 3, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Samedi 14 juin 2025', 4, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Dimanche 15 juin 2025', 5, 'dab91561-09f1-47cb-8d91-e21e873d6b4e');
INSERT INTO BilletteriePersonnes (`personne_label`, `personne_id`, `billetterie_id`)
VALUES ('Famille (x2 adulte) nombre denfants : ', 1, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Étudiant nombre de places : ', 2, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Sénior nombre de places : ', 3, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Adulte nombre de places : ', 4, 'dab91561-09f1-47cb-8d91-e21e873d6b4e'),
       ('Mineur nombre de places : ', 5, 'dab91561-09f1-47cb-8d91-e21e873d6b4e');
INSERT INTO Ecurie (`id`, `name`, `prestataire_id`)
VALUES ('d8d755cb-9aba-43f5-9546-14db654a1f06', 'Porsche', '45309281-fc24-4e02-ad47-a275c64f5327');
INSERT INTO Karting (`karting_id`, `prestataire_id`, `enabled`)
VALUES ('1278aadd-b56a-458b-b8aa-ddb56a258bf8', '524aaa51-09c1-48f1-85d3-ac878394e1ff', 1);
INSERT INTO KartingCircuit (`circuit_id`, `karting_id`, `minAge`, `circuit_name`, `kart_power`)
VALUES ('1a945660-cef6-4e73-9456-60cef62e734f', '1278aadd-b56a-458b-b8aa-ddb56a258bf8', 8, 'Piste Junior', 160),
       ('45e11ba5-9136-48aa-a11b-a59136b8aa38', '1278aadd-b56a-458b-b8aa-ddb56a258bf8', 16, 'Piste Amateur', 270),
       ('7c9c6893-7402-48df-9c68-937402f8df02', '1278aadd-b56a-458b-b8aa-ddb56a258bf8', 18, 'Piste Confirmé', 390);
INSERT INTO KartingSessionSlot (`session_id`, `circuit_id`, `from_date`, `to_date`, `maxSize`)
VALUES ('0a5da457-c098-499e-9da4-57c098599e06', '45e11ba5-9136-48aa-a11b-a59136b8aa38', '2025-04-03 10:15:00',
        '2025-04-03 10:30:00', 10),
       ('2f18be24-012b-479c-98be-24012b679c14', '45e11ba5-9136-48aa-a11b-a59136b8aa38', '2025-04-03 10:00:00',
        '2025-04-03 10:15:00', 10),
       ('69d8024b-1f61-4e29-9802-4b1f616e29b3', '1a945660-cef6-4e73-9456-60cef62e734f', '2025-04-03 10:00:00',
        '2025-04-03 10:15:00', 10),
       ('ad8d5dad-b159-44f9-8d5d-adb159c4f951', '7c9c6893-7402-48df-9c68-937402f8df02', '2025-04-03 10:15:00',
        '2025-04-03 10:30:00', 10),
       ('c4f6134c-d491-476c-b613-4cd491976c85', '1a945660-cef6-4e73-9456-60cef62e734f', '2025-04-03 10:15:00',
        '2025-04-03 10:30:00', 10),
       ('e641a53e-a834-4c30-81a5-3ea8342c30c8', '7c9c6893-7402-48df-9c68-937402f8df02', '2025-04-03 10:00:00',
        '2025-04-03 10:15:00', 10);
