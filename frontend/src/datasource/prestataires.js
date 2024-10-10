/**
 * Un prestataire des 24h du Mans
 * @typedef {Object} Prestataire
 * @property {string} id L'identifiant du prestataire. Respecte les normes des UUID v4
 * @property {string} password Le mot de passe haché avec l'algorithme [sha256](https://emn178.github.io/online-tools/sha256.html)
 * @property {string} name Le nom du prestataire
 */

/**
 * @type {Prestataire[]}
 */
let prestataires = [
    {
        id: "45309281-fc24-4e02-ad47-a275c64f5327",
        password: "a8583ccd0f2fe6d789fda0b3ff80711c8141b543b0334f3888fc11b52914a90e", // 'Spider-Porsche'
        name: "Porsche" // Visite garage
    },
    {
        id: "255da203-781d-4e50-924f-0423638cdb68",
        password: "32de3639ca6fafb56a4b3c68f42cfe8a686c89d92b173a03becdcc02644d7511", // 'montgolfiere'
        name: "Mong'man" // Montgolfière
    },
    {
        id: "524aaa51-09c1-48f1-85d3-ac878394e1ff",
        password: "da85e329212776cba7df7e11b396db625f4e20d8b747f99e0ccb0781b14c052e", // 'im-fast'
        name: "Kart'24" // Karting
    },
    {
        id: "524aaa51-09c1-48f1-85d3-ac878394e1ff",
        password: "9f97b71bbbb848323f91335d2e8dbc635ed2c503d05b9342a8b1e93a894b783e", // lemans
        name: "24h du Mans" // Billetterie + Boutique officielle
    },
]

let boutiques = [
    {
        prestataire_id: "45309281-fc24-4e02-ad47-a275c64f5327",
    },
    {
        prestataire_id: "524aaa51-09c1-48f1-85d3-ac878394e1ff"
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
    karting, montgolfieres: montgolfieres, garages, billeterie, boutiques
}