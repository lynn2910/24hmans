export default [
    {
        path: '/billetterie/:prestataire_name',
        name: "billetterie",
        component: () => import('../views/services/BilletterieView.vue'),
    },
    {
        path: '/billetteries',
        name: "billeterie_list",
        component: () => import('../views/services/BilleterieListView.vue')

    },
    {
        path: "/ecuries",
        name: "ecurie_list",
        component: () => import('../views/services/EcurieListView.vue')
    },
    {
        path: "/ecurie/:prestataire_name",
        name: "visite_ecuries",
        component: () => import('../views/services/VisiteEcurie.vue')
    },
    {
        path: "/boutique/:prestataire_name",
        name: "shop_view",
        component: () => import( '../views/services/shop/ShopView.vue'),
    },
    {
        path: "/boutique/:prestataire_name/item/:item_name",
        name: "shop_item_view",
        component: () => import( '../views/services/shop/ShopItemView.vue')
    },
    {
        path: "/boutiques",
        name: "shop_list",
        component: () => import('../views/services/shop/BoutiqueListView.vue')
    },

    {
        path: "/kartings",
        name: "karting_list",
        component: () => import('../views/services/KartingListView.vue')
    },
    {
        path: "/karting/:prestataire_name",
        name: "karting_view",
        component: () => import( '../views/services/karting/KartingRegisterView.vue'),
    },
]