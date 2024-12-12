export default [
    {
        path: "/admin/panel",
        name: "admin_dashboard",
        component: () => import( '../views/panels/admin/AdminDashboardView.vue'),
    },
    {
        path: "/admin/panel/prestataires",
        name: "admin_prestataires",
        component: () => import( '../views/panels/admin/AdminPrestataireView.vue'),
    }
]