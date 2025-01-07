export default [
    {
        path: "/admin/panel",
        name: "admin_dashboard",
        component: () => import( '../views/panels/admin/AdminDashboardView.vue'),
        meta: {hideNavbar: true}
    },
    {
        path: "/admin/panel/prestataires",
        name: "admin_prestataires",
        component: () => import( '../views/panels/admin/AdminPrestataireView.vue'),
        meta: {hideNavbar: true}
    },
    {
        path: "/admin/panel/map",
        name: "admin_carte",
        component: () => import( '../views/panels/admin/AdminMapView.vue'),
        meta: {hideNavbar: true}
    }
]