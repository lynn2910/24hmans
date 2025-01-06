export default [
    {
        path: '/billetterie/:prestataire_name',
        name: "billetterie",
        component: () => import('../views/services/BilletterieView.vue'),
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
    }
]