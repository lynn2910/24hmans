export default [
    {
        path: "/prestataire/panel",
        name: "prestataire_dashboard",
        component: () => import( '@/views/panels/prestataire/PrestataireDashboardView.vue'),
        meta: {hideNavbar: true}
    },
    {
        path: "/prestataire/panel/statistiques",
        name: "prestataire_dashboard_stats",
        component: () => import( '@/views/panels/prestataire/PrestataireDashboardStatsView.vue'),
        meta: {hideNavbar: true}
    },
    {
        path: "/prestataire/panel/service/shop",
        name: "prestataire_dashboard_shop",
        component: () => import( '@/views/panels/prestataire/PrestataireDashboardShopView.vue'),
        meta: {hideNavbar: true}
    },
    {
        path: "/prestataire/panel/service/ecuries",
        name: "visite_ecuries_panel",
        component: () => import( '../views/panels/prestataire/PrestataireDashboardVisiteEcuries.vue'),
        meta: {hideNavbar: true}
    },
    {
        path: "/prestataire/panel/service/karting",
        name: "karting_panel",
        component: () => import( '../views/panels/prestataire/PrestataireDashboardKarting.vue'),
        meta: {hideNavbar: true}
    },
    {
        path: "/prestataire/panel/map",
        name: "presta_carte",
        component: () => import( '../views/panels/prestataire/PrestataireMapView.vue'),
        meta: {hideNavbar: true}
    },
    {
        path: "/prestataire/panel/editProfile",
        name: "presta_edit_profile",
        component: () => import( '../views/panels/prestataire/PrestataireEdit.vue'),
        meta: {hideNavbar: true}
    }
]