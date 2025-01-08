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
        password: "$2a$10$lqWLtDJk2CWRxnN8UH22qOvwCTPFNXMR8lhzWAQftMBzt6HY.VBOm", // 'Spider-Porsche'
        name: "Porsche", // Visite garage,
        email: "porsche@gmail.com",
        links: [{
            id: 0,
            name: "Site officiel",
            url: "https://www.porsche.com"
        }],
        referencer: 'porsche',
        accentColor: '#9E8980',
        banner: '45309281-fc24-4e02-ad47-a275c64f5327.jpg',
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
        password: "$2y$10$GhHncEKGwYMsbC72aLNae..OUpuvCn.a7Tvyq8VkCWn7r5UNXgRim", // 'montgolfiere'
        name: "Mong'man", // Montgolfière,
        email: "mongman@gmail.com",
        links: [{
            id: 0,
            name: "Site officiel",
            url: "https://montgolfiere-france.com/bapteme-en-montgolfiere-pres-du-mans/"
        }],
        referencer: 'mongman',
        accentColor: '#0A8799',
        banner: '255da203-781d-4e50-924f-0423638cdb68.jpg',
        description: "Fondée en 2010, Mong'Man est une entreprise passionnée de montgolfières, spécialisée dans les vols au-dessus de l'emblématique circuit des 24 Heures du Mans. Basée au cœur de la Sarthe, Mong'Man est née d'un rêve partagé par ses fondateurs, anciens pilotes amateurs de montgolfière, qui souhaitaient offrir aux amoureux de l'aviation légère une expérience unique et exaltante : découvrir la magie des 24 Heures du Mans depuis les airs.\n" +
            "\n" +
            "Chaque année, Mong'Man attire des centaines de curieux et d'amateurs de sensations fortes, leur permettant de flotter au-dessus de ce circuit mythique et de vivre la course sous un angle exceptionnel. Les passagers peuvent observer les voitures de course filant en contrebas, capturer des vues spectaculaires du circuit et de la campagne environnante, et admirer la beauté du Mans dans une atmosphère paisible, bien loin du bruit et de l’agitation.\n" +
            "\n" +
            "Pour assurer une sécurité et une qualité de service irréprochables, Mong'Man investit dans des équipements de pointe et compte sur une équipe de pilotes chevronnés. Tous les vols sont accompagnés d’un briefing complet, permettant aux passagers de découvrir les bases de l’aérostation, l’histoire des montgolfières, et les anecdotes propres au circuit des 24 Heures.\n" +
            "\n" +
            "Au fil des ans, Mong'Man a élargi son offre pour inclure des vols en soirée, permettant aux passagers de voir les lumières scintillantes du circuit sous un ciel étoilé. L'entreprise propose également des événements privés, des séances photo et même des vols personnalisés pour les entreprises ou les groupes.\n" +
            "\n" +
            "Chez Mong'Man, chaque vol est conçu pour être bien plus qu’une simple expérience aérienne : c’est une immersion dans la beauté naturelle et mécanique de cette région légendaire. Que vous soyez passionné de courses automobiles ou simplement en quête d'une vue imprenable sur le Mans, Mong'Man vous invite à monter à bord pour un voyage inoubliable."


    },
    {
        id: "524aaa51-09c1-48f1-85d3-ac878394e1ff",
        icon: 'prestataires_icons/karting_presta.jpg',
        password: "$2y$10$GnxVPi3XmfkM.2MKgJNLfe/v3Qj7sLgVx1mqUC/vxeZXS7IE56j8i", // 'im-fast'
        name: "Kart'24", // Karting
        email: "kart24@gmail.com",
        links: [{
            id: 0,
            name: "Site officiel",
            url: "https://www.lemans-karting.com/karting/sessions-kart/?utm_source=google&utm_medium=cpc&utm_campaign=grp_marque&gad_source=1&gclid=CjwKCAiAudG5BhAREiwAWMlSjHrQwH3UEysrGgUOpWB5_tLZgToKz4d76wx4Xy4PBAZFkhhmq8ifGRoCvskQAvD_BwE"
        }],
        referencer: 'kart24',
        accentColor: '#C8B791',
        banner: '524aaa51-09c1-48f1-85d3-ac878394e1ff.jpg',
        description: "Au cœur du légendaire circuit des 24 Heures du Mans, Karting 24 vous invite à vivre la passion du sport automobile sous une nouvelle forme. Avec une piste conçue pour reproduire les sensations des grandes courses et des karts de dernière génération, cet espace est devenu une référence incontournable pour les amateurs de vitesse et de sensations fortes.\n" +
            "\n" +
            "L'histoire de Karting 24 est ancrée dans le désir de rendre l'expérience des 24 Heures accessible à tous, novices comme pilotes expérimentés. Chaque virage et chaque ligne droite de notre circuit de karting rappellent les défis techniques du grand circuit, offrant une immersion totale dans l'univers de la compétition. Ici, vous pouvez vous mesurer à vos amis, à votre famille ou à d'autres passionnés dans des courses palpitantes, allant des sessions individuelles aux épreuves d'endurance.\n" +
            "\n" +
            "Karting 24 met à disposition une équipe de passionnés, dédiée à assurer un encadrement professionnel et une sécurité optimale. Les équipements de sécurité modernes et le suivi technique des karts font de chaque course une aventure exaltante mais sans risque. En parallèle, les infrastructures sur place offrent un confort maximal avec des zones de détente, un espace de restauration et une vue imprenable sur la piste.\n" +
            "\n" +
            "Les entreprises et les groupes peuvent profiter d'offres spéciales pour organiser des séminaires, des compétitions privées et des événements sur mesure. De nombreux adeptes du karting et amateurs de sensations fortes affluent à Karting 24 pour célébrer anniversaires, team-building et rassemblements sportifs dans une ambiance authentique et sportive.\n" +
            "\n" +
            "Plus qu’un simple centre de karting, Karting 24 est une immersion dans l'esprit de compétition et de camaraderie, où chaque participant peut ressentir l'adrénaline de la course tout en créant des souvenirs inoubliables. Venez découvrir le frisson de la piste et révélez le pilote qui est en vous !"
    },
    {
        id: "af3a0f62-5b13-4b19-9d42-736870b268a0",
        icon: 'prestataires_icons/organisateurs_presta.png',
        password: "$2y$10$NXLvYYnkO8Nvz7vnuE6GVuszoBjyTFyAH2.vINZ1OinJZC6tRi6D6", // 'lemans'
        name: "24h du Mans", // Billetterie + Boutique officielle
        email: "24hmans@gmail.com",
        links: [{
            id: 0,
            name: "Site officiel",
            url: "https://www.24h-lemans.com/"
        }],
        referencer: '24hdumans',
        accentColor: '#AEC6C4',
        banner: 'af3a0f62-5b13-4b19-9d42-736870b268a0.jpg',
        description: "Les 24 Heures du Mans sont bien plus qu’une course automobile : c’est un défi d’endurance, un rendez-vous incontournable de l’innovation et une célébration de la passion automobile. Organisée chaque année depuis 1923 par l'Automobile Club de l'Ouest (ACO), cette course mythique se déroule sur le Circuit de la Sarthe, près de la ville du Mans, et rassemble des pilotes, des équipes et des constructeurs du monde entier pour une épreuve intense de 24 heures consécutives.\n" +
            "\n" +
            "Conçue pour tester les limites de la vitesse, de la fiabilité et de l'endurance humaine et mécanique, la course impose aux pilotes de maintenir un rythme effréné jour et nuit, en partageant le volant de voitures de pointe qui doivent résister aux rigueurs de la piste pendant une journée entière. Les prototypes et les GT, conçus spécialement pour cette compétition, poussent les ingénieurs et les constructeurs à innover constamment en matière de performance, d’aérodynamisme et d'efficacité énergétique.\n" +
            "\n" +
            "Les 24 Heures du Mans sont devenues un véritable laboratoire technologique, où des avancées telles que l'hybridation, les matériaux légers et les systèmes de sécurité ont vu le jour avant de rejoindre les véhicules de série. Au-delà de l’aspect technologique, cette course incarne des valeurs fortes : le courage, la ténacité et l'esprit d'équipe, avec des pilotes et des équipes qui se relaient sans cesse pour maintenir une vitesse de pointe tout en gérant l'usure de la voiture et la fatigue.\n" +
            "\n" +
            "Chaque année, des milliers de spectateurs affluent pour vivre cet événement unique, profitant d’une ambiance festive et électrisante, entre concerts, feux d’artifice et animations sur le circuit. Avec des pilotes légendaires et des voitures emblématiques ayant marqué l’histoire de la course, les 24 Heures du Mans continuent de captiver les passionnés de sport automobile et de renforcer leur place parmi les compétitions les plus prestigieuses au monde.\n" +
            "\n" +
            "Les 24 Heures du Mans ne sont pas simplement une course, mais une véritable épopée où la machine et l’humain repoussent leurs limites, écrivant chaque année un nouveau chapitre d’une légende vivante."

    },
    {
        id: "0b7956e6-1262-49f7-aaab-c5ab60d16cba",
        icon: "prestataires_icons/codeky_presta.jpg",
        password: "$2a$10$eMcDHdcnvFWXlBiEYcKAy.9T9k7DrWXtkepZytO6Z9aLsisubKDYa", //zeky#codeky
        name: "Codeky",
        email: "codeky@codeky.com",
        links: [{id: 0, name: "Site officiel", url: "https://codeky.fr/"}],
        referencer: "codeky",
        accentColor: '#AEC6C4',
        banner: '0b7956e6-1262-49f7-aaab-c5ab60d16cba.jpg',
        description: "Belforaine, la fête foraine du futur, réinvente l’expérience du divertissement en mêlant innovation, sensations fortes et découvertes technologiques, un peu comme les 24 Heures du Mans transforment chaque année l’univers du sport automobile. Tout comme cette course emblématique, Belforaine met en avant l’excitation, l’audace et l’innovation. Les visiteurs peuvent se plonger dans des aventures immersives qui rappellent la vitesse et la précision des bolides sur le circuit, avec des attractions palpitantes comme les montagnes russes futuristes ou les simulateurs de réalité virtuelle.\n" +
            "\n" +
            "À l’image des 24H du Mans qui ne cessent de repousser les limites de la performance humaine et technologique, Belforaine invite chacun à dépasser ses propres frontières à travers des activités aussi variées qu'intenses. La LAN Fest, véritable paradis pour les gamers, évoque l’ambiance compétitive et collaborative des équipes de course, tandis que les spectacles et animations du parc célèbrent la créativité et l'esprit d'innovation.\n" +
            "\n" +
            "Même les plaisirs culinaires ne sont pas en reste : tout comme les 24 Heures du Mans offrent une immersion totale avec des expériences gastronomiques pour les passionnés de sport et de vitesse, Belforaine propose un voyage culinaire futuriste avec des plats innovants et des saveurs inédites.\n" +
            "\n" +
            "Belforaine et les 24 Heures du Mans partagent une philosophie commune : offrir à chaque visiteur ou spectateur des moments inoubliables, où la magie, l’audace et l’émerveillement se rencontrent. Que vous soyez amateur de sensations fortes, passionné par la technologie ou simple curieux, Belforaine est l’écrin idéal pour prolonger l’esprit captivant des 24 Heures du Mans et vivre une aventure hors du commun.",

    },
]

let boutiques = [
    // Porsche
    {
        prestataire_id: "45309281-fc24-4e02-ad47-a275c64f5327",
        shop_id: '5bc1bcf2-0d5e-4adf-9402-5dafa3777413',
        enabled: true,
        categories: [
            {category_label: "Écusson", category_id: "9af710a9-9c13-43d7-b710-a99c1323d77d"},
            {category_label: "Porte-clé", category_id: "be2cff03-7d12-4369-acff-037d12a36993"}
        ],
        items: [
            {
                item_id: 1,
                name: "Porte-clé frein",
                image: null,
                category_id: "be2cff03-7d12-4369-acff-037d12a36993",
                stock: 79,
                price: 16.99,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                item_id: 2,
                name: "Porte-clé porsche",
                image: '/shop_images/porsche_porte_cle_ecusson.png',
                category_id: "be2cff03-7d12-4369-acff-037d12a36993",
                stock: 146,
                price: 24.99,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                item_id: 3,
                name: "Écusson Porsche",
                image: null,
                category_id: "9af710a9-9c13-43d7-b710-a99c1323d77d",
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
        prestatire_name: "Porsche",
        garage_id: "d8d755cb-9aba-43f5-9546-14db654a1f06",
        participants: [
            {
                lastname: "Oneill",
                name: "toto",
                email: "toto@gmail.com",
                phone: "07 72 50 20 32",
                time: "2024-11-28T12:40:24.868Z"
            },
            {
                lastname: "Morrow",
                name: "leila",
                email: "leila@gmail.com",
                phone: "+07 88 55 02 07",
                time: "2024-11-28T12:40:24.868Z"
            },
            {
                lastname: "Terry",
                name: "nao",
                email: "nao@gmail.com",
                phone: "07 15 10 20 00",
                time: "2024-11-28T12:40:24.868Z"
            },
            {lastname: "Beck", name: "titi", email: "titi@gmail.com", phone: "08", time: "2024-11-28T12:40:24.868Z"},
            {lastname: "Peters", name: "jack", email: "jack@gmail.com", phone: "09", time: "2024-11-28T12:40:24.868Z"},
            {lastname: "Rojas", name: "mary", email: "mary@gmail.com", phone: "10", time: "2024-11-28T12:40:24.868Z"},
            {lastname: "Glen", name: "loris", email: "loris@gmail.com", phone: "20", time: "2024-11-28T12:40:24.868Z"},
            {lastname: "Black", name: "felix", email: "felix@gmail.com", phone: "30", time: "2024-11-28T12:40:24.868Z"},
            {
                lastname: "kaiser",
                name: "denis",
                email: "denis@gmail.com",
                phone: "40",
                time: "2024-11-28T12:40:24.868Z"
            },
            {
                lastname: "Lumineas",
                name: "jean",
                email: "jean@gmail.com",
                phone: "50",
                time: "2024-11-28T12:40:24.868Z"
            },
            {
                lastname: "Mcdowell",
                name: "sebastien",
                email: "sebastien@gmail.com",
                phone: "60",
                time: "2024-11-28T12:40:24.868Z"
            },
            {lastname: "Cross", name: "anais", email: "anais@gmail.com", phone: "70", time: "2024-11-28T12:40:24.868Z"}
        ]
    },

    {
        prestataire_id: "255da203-781d-4e50-924f-0423638cdb68",
        prestatire_name: "Mong'man",
        garage_id: "d8d755cb-9aba-43f5-9546-14db654a1f06",
        participants: [
            {
                lastname: "Test",
                name: "Montgolfière",
                email: "mongol@gmail.com",
                phone: "80",
                time: "2024-11-28T12:40:24.868Z"
            }
        ]
    }
]

let billetteries = [
    {
        prestataire_id: "af3a0f62-5b13-4b19-9d42-736870b268a0",
        categories: [
            {category_label: "Tribune", category_id: 1},
            {category_label: "Tribune personne à mobilité réduite", category_id: 2},
            {category_label: "Tribune VIP", category_id: 3}
        ],
        forfaits: [
            {forfait_label: "Mercredi 11 juin 2025", forfait_id: 1},
            {forfait_label: "Jeudi 12 juin 2025", forfait_id: 2},
            {forfait_label: "Vendredi 13 juin 2025", forfait_id: 3},
            {forfait_label: "Samedi 14 juin 2025", forfait_id: 4},
            {forfait_label: "Dimanche 15 juin 2025", forfait_id: 5}
        ],
        personnes: [
            {personne_label: "Famille (x2 adulte) nombre d'enfants :", personne_id: 1},
            {personne_label: "Étudiant nombre de places : ", personne_id: 2},
            {personne_label: "Sénior nombre de places : ", personne_id: 3}
        ]
    }
]

module.exports = {
    prestataires,
    karting, montgolfieres, garages, billetteries, boutiques
}