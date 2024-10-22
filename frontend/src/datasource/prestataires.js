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
        name: "Porsche" // Visite garage
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
                description: null
            },
            {
                item_id: 2,
                name: "Porte-clé porsche",
                image: null,
                category: "be2cff03-7d12-4369-acff-037d12a36993",
                stock: 146,
                price: 24.99,
                description: null
            },
            {
                item_id: 3,
                name: "Écusson Porsche",
                image: null,
                category: "9af710a9-9c13-43d7-b710-a99c1323d77d",
                stock: 14,
                price: 34.99,
                description: null
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