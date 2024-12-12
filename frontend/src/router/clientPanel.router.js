export default [
    {
        path: "/client/panel",
        name: "client_panel",
        component: () => import("../views/panels/user/UserDashboardView.vue"),
        meta: {hideNavbar: true}
    }
]