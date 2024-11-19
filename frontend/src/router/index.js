import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("../views/HomeView.vue"),
    },
    {
        path: '/carte',
        name: "Carte",
        component: () => import("../views/CarteView.vue"),
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: "/prestataire/panel",
        name: "prestataire_dashboard",
        component: () => import( '@/views/panels/prestataire/PrestataireDashboardView.vue'),
        meta: {hideNavbar: true}
    },
    {
        path: "/prestataire/panel/statistiques",
        name: "prestataire_dashboard_stats",
        component: () => import( '@/views/panels/prestataire/PrestataireDashboardStatsView.vue')
    },
    {
        path: "/prestataire/:prestataire_name",
        name: "prestataire_profile",
        component: () => import("../views/PrestataireProfil.vue")
    },
    {
        path: "/ecuries",
        name: "visite ecuries",
        component: () => import('../views/services/VisiteEcurie.vue')
    },
    {
        path: "/boutique/:prestataire_name",
        name: "shop_view",
        component: () => import( '../views/services/shop/ShopView.vue')
    },
    {
        path: "/boutique/:prestataire_name/item/:item_name",
        name: "shop_view",
        component: () => import( '../views/services/shop/ShopItemView.vue')
    },
    {
        path: "/dance",
        redirect: () => {
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
            return '/'
        },
    },
    {
        path: '/login',
        name: "login",
        component: () => import( '../views/LoginView.vue'),
        meta: {hideNavbar: true}
    },
    {
        path: "/admin/panel",
        name: "admin_dashboard",
        component: () => import( '../views/panels/admin/AdminDashboardView.vue'),
    },


    // DERNIERE PAGE
    {
        path: "*",
        name: "404",
        component: () => import("../views/Error404.vue"),
        meta: {
            hideNavbar: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
