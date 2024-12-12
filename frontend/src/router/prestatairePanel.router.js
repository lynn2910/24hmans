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
        name: "visite_ecuries",
        component: () => import( '../views/panels/prestataire/PrestataireDashboardVisiteEcuries.vue'),
        meta: {hideNavbar: true}
    }
]