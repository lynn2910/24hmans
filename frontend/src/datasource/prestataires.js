/**
 * Un prestataire des 24h du Mans
 * @typedef {Object} Prestataire
 * @property {string} id L'identifiant du prestataire. Respecte les normes des UUID v4
 * @property {string} password Le mot de passe haché avec l'algorithme [sha256](https://emn178.github.io/online-tools/sha256.html)
 * @property {string} name Le nom du prestataire
 * @property {string} icon L'icône du prestataire
 */

/**
 * @type {Prestataire[]}
 */
let prestataires = [
    {
        id: "45309281-fc24-4e02-ad47-a275c64f5327",
        icon: 'prestataires_icons/porsche_presta.jpg',
        password: "a8583ccd0f2fe6d789fda0b3ff80711c8141b543b0334f3888fc11b52914a90e", // 'Spider-Porsche'
        name: "Porsche", // Visite garage,
        links: [{name: "Site officiel", url: "https://www.porsche.com"}],
        description: "Porsche, constructeur automobile allemand de renommée mondiale, est connu pour ses voitures de sport de haute performance, synonymes de puissance, de luxe et d'ingénierie de précision. L’entreprise a été fondée en 1931 à Stuttgart par Ferdinand Porsche, ingénieur visionnaire et inventeur, d'abord sous le nom de \"Dr. Ing. h.c. F. Porsche GmbH\". Initialement, la société se consacrait à la consultation et au développement technique pour d'autres marques automobiles, notamment pour Volkswagen avec la création de la célèbre Coccinelle.\n" +
            "\n" +
            "La première voiture de la marque, la Porsche 356, est lancée en 1948 sous la direction de Ferry Porsche, fils de Ferdinand. Avec sa ligne élégante et sa légèreté, la 356 pose les bases de l'identité de Porsche : un design iconique, des performances hors normes et une maniabilité exceptionnelle. La célèbre Porsche 911, lancée en 1964, devient rapidement une légende dans le monde de l'automobile et demeure l’un des modèles les plus emblématiques de l’histoire, continuellement produit avec des évolutions pour répondre aux exigences modernes.\n" +
            "\n" +
            "À travers les décennies, Porsche diversifie sa gamme, produisant des modèles comme le Cayenne (SUV), la Panamera (berline sportive) et le Macan, tout en restant fidèle à ses racines sportives. En plus de ses véhicules de route, Porsche a également une longue histoire en compétition automobile, avec des succès dans des courses prestigieuses comme les 24 Heures du Mans. Ces victoires contribuent à renforcer la réputation de la marque comme pionnier en matière de performance et de fiabilité.\n" +
            "\n" +
            "Récemment, Porsche a franchi une nouvelle étape en se tournant vers l'électrification avec des modèles comme la Taycan, une voiture 100 % électrique qui combine l’ADN sportif de Porsche avec une technologie de pointe. Aujourd'hui, Porsche reste un symbole mondial de luxe et de sportivité, en alliant héritage, innovation et excellence technique."
    },
    {
        id: "255da203-781d-4e50-924f-0423638cdb68",
        icon: 'prestataires_icons/montgol_presta.jpg',
        password: "32de3639ca6fafb56a4b3c68f42cfe8a686c89d92b173a03becdcc02644d7511", // 'montgolfiere'
        name: "Mong'man" // Montgolfière
    },
    {
        id: "524aaa51-09c1-48f1-85d3-ac878394e1ff",
        icon: 'prestataires_icons/karting_presta.jpg',
        password: "da85e329212776cba7df7e11b396db625f4e20d8b747f99e0ccb0781b14c052e", // 'im-fast'
        name: "Kart'24" // Karting
    },
    {
        id: "af3a0f62-5b13-4b19-9d42-736870b268a0",
        icon: 'prestataires_icons/organisateurs_presta.jpg',
        password: "9f97b71bbbb848323f91335d2e8dbc635ed2c503d05b9342a8b1e93a894b783e", // 'lemans'
        name: "24h du Mans" // Billetterie + Boutique officielle
    },
]

let boutiques = [
    // Porsche
    {
        prestataire_id: "45309281-fc24-4e02-ad47-a275c64f5327",
        shop_id: '5bc1bcf2-0d5e-4adf-9402-5dafa3777413',
        categories: [
            {category_label: "Écusson", category_id: "9af710a9-9c13-43d7-b710-a99c1323d77d"},
            {category_label: "Porte-clé", category_id: "be2cff03-7d12-4369-acff-037d12a36993"}
        ],
        items: [
            {
                item_id: 1,
                name: "Porte-clé frein",
                image: null,
                category: "be2cff03-7d12-4369-acff-037d12a36993",
                stock: 79,
                price: 16.99,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                item_id: 2,
                name: "Porte-clé porsche",
                image: '/shop_images/porsche_porte_cle_ecusson.png',
                category: "be2cff03-7d12-4369-acff-037d12a36993",
                stock: 146,
                price: 24.99,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                item_id: 3,
                name: "Écusson Porsche",
                image: null,
                category: "9af710a9-9c13-43d7-b710-a99c1323d77d",
                stock: 14,
                price: 34.99,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
        ]
    },
    // 24h du Mans
    {
        prestataire_id: "af3a0f62-5b13-4b19-9d42-736870b268a0",
        shop_id: "473679fe-65b1-446e-8618-7e36c4a26a8b",
        categories: [],
        items: []
    }
]

let karting = [
    {
        prestataire_id: "524aaa51-09c1-48f1-85d3-ac878394e1ff"
    }
]

let montgolfieres = [
    {
        prestataire_id: "255da203-781d-4e50-924f-0423638cdb68"
    }
]

let garages = [
    {
        prestataire_id: "45309281-fc24-4e02-ad47-a275c64f5327",
    }
]

let billeterie = [
    {
        prestataire_id: "524aaa51-09c1-48f1-85d3-ac878394e1ff"
    }
]

module.exports = {
    prestataires,
    karting, montgolfieres, garages, billeterie, boutiques
}