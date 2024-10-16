DROP TABLE IF EXISTS prestataires;

CREATE TABLE prestataires
(
    prestataire_id CHAR(36)    NOT NULL,
    icon           VARCHAR(256),
    password       CHAR(64)    NOT NULL,
    name           VARCHAR(64) NOT NULL,

    PRIMARY KEY (prestataire_id)
);

INSERT INTO prestataires (name, prestataire_id, icon, password)
VALUES ('Porsche', '45309281-fc24-4e02-ad47-a275c64f5327', 'prestataires_icons/porsche_presta.jpg',
        'a8583ccd0f2fe6d789fda0b3ff80711c8141b543b0334f3888fc11b52914a90e'),
       ('24h du Mans', 'af3a0f62-5b13-4b19-9d42-736870b268a0', 'prestataires_icons/organisateurs_presta.jpg',
        '9f97b71bbbb848323f91335d2e8dbc635ed2c503d05b9342a8b1e93a894b783e'),
       ('Kart\'24', '524aaa51-09c1-48f1-85d3-ac878394e1ff', 'prestataires_icons/karting_presta.jpg',
        'da85e329212776cba7df7e11b396db625f4e20d8b747f99e0ccb0781b14c052e'),
       ('Mong\'man', '255da203-781d-4e50-924f-0423638cdb68', 'prestataires_icons/montgol_presta.jpg',
        '32de3639ca6fafb56a4b3c68f42cfe8a686c89d92b173a03becdcc02644d7511');