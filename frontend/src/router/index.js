import Vue from 'vue'
import VueRouter from 'vue-router'
import servicesRouter from "@/router/services.router";
import adminPanelRouter from "@/router/adminPanel.router";
import clientPanelRouter from "@/router/clientPanel.router";
import prestatairePanelRouter from "@/router/prestatairePanel.router";
import i18nActions from "@/translation";

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
    ...servicesRouter,
    ...adminPanelRouter,
    ...clientPanelRouter,
    ...prestatairePanelRouter,
    {
        path: "/prestataire/:prestataire_name",
        name: "prestataire_profile",
        component: () => import("../views/PrestataireProfil.vue")
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
        path: "/cart",
        name: "cart",
        component: () => import("../views/services/shop/CartView.vue"),
        meta: {hideCart: true}
    },

    {
        path: "/mentions",
        name: "mentions_legales",
        component: () => import("../views/bonus/MentionsLegales.vue"),
    },
    {
        path: "/donnees",
        name: "donnees_personnelles",
        component: () => import("../views/bonus/DonneesPersonnelles.vue"),
    },
    {
        path: "/cgv",
        name: "cgv_billeterie",
        component: () => import("../views/bonus/CGVBilleterie.vue"),
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

routes.forEach(route => {
    if (route.path !== '*') {
        route.path = `/:locale${route.path.startsWith('/') ? '' : '/'}${route.path}`
    }
})

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(i18nActions.routeMiddleware)

export default router
