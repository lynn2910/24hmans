export default [
    {
        path: "/client/panel",
        name: "client_panel",
        component: () => import("../views/panels/user/UserDashboardView.vue"),
        meta: {hideNavbar: true}
    },
    {
        path: "/client/panel/orders",
        name: "client_panel_orders",
        component: () => import( '../views/panels/user/UserDashboardOrders.vue'),
        meta: {hideNavbar: true}
    },
    {
        path: "/client/panel/races",
        name: "client_panel_karting",
        component: () => import( '../views/panels/user/UserDashboardKarting.vue'),
        meta: {hideNavbar: true}
    }
]