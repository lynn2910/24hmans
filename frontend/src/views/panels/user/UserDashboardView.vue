<template>
    <UserDashboardTemplate>
        <div class="p-6">
            <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                {{ $t('dashboards.client.hello') }},
                <span class="text-blue-600 dark:text-blue-400 mr-2">{{ loggedInUser?.first_name }}</span>
                <span class="uppercase text-gray-700 dark:text-gray-300">{{ loggedInUser?.last_name }}</span>
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
                Bienvenue sur votre tableau de bord personnalisé. Ici, vous pouvez consulter un aperçu de vos activités
                récentes.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                        class="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg p-4 flex flex-col">
                    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Derniers Billets</h2>
                    <ul v-if="latestTickets.length > 0" class="space-y-2">
                        <li v-for="ticket in latestTickets" :key="ticket.id"
                            class="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h3 class="text-md font-medium text-gray-800 dark:text-gray-100">{{
                                        ticket.title
                                        }}</h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Date: {{
                                        formatDate(ticket.date)
                                        }}</p>
                                </div>
                                <span :class="[
                                    'px-2 py-1 rounded text-xs font-semibold',
                                    ticket.status === 'Open' ? 'bg-green-200 text-green-700 dark:bg-green-700 dark:text-green-200' : 'bg-red-200 text-red-700 dark:bg-red-700 dark:text-red-200'
                                ]">
                                    {{ ticket.status }}
                                </span>
                            </div>
                        </li>
                    </ul>
                    <p v-else class="text-sm text-gray-500 dark:text-gray-400">Aucun billet récent.</p>
                    <div class="mt-auto">
                        <router-link :to="{name:'client_panel_billetterie'}"
                                     class="text-blue-600 dark:text-blue-400 hover:underline text-sm">Voir tous les
                            billets
                        </router-link>
                    </div>
                </div>

                <div
                        class="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg p-4 flex flex-col">
                    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Derniers Achats</h2>
                    <ul v-if="latestPurchases.length > 0" class="space-y-2">
                        <li v-for="purchase in latestPurchases" :key="purchase.id"
                            class="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h3 class="text-md font-medium text-gray-800 dark:text-gray-100">{{
                                        purchase.item
                                        }}</h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Date:
                                        {{ formatDate(purchase.date) }}</p>
                                </div>
                                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{
                                    purchase.amount
                                    }}€</span>
                            </div>
                        </li>
                    </ul>
                    <p v-else class="text-sm text-gray-500 dark:text-gray-400">Aucun achat récent.</p>
                    <div class="mt-auto">
                        <router-link :to="{ name: 'client_panel_orders'}"
                                     class="text-blue-600 dark:text-blue-400 hover:underline text-sm">Voir tous les
                            achats
                        </router-link>
                    </div>
                </div>

                <div
                        class="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg p-4 flex flex-col">
                    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Dernières Courses</h2>
                    <ul v-if="latestRaces.length > 0" class="space-y-2">
                        <li v-for="race in latestRaces" :key="race.id"
                            class="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h3 class="text-md font-medium text-gray-800 dark:text-gray-100">{{
                                        race.event
                                        }}</h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Date: {{
                                        formatDate(race.date)
                                        }}</p>
                                </div>
                                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
									Position: {{ race.position }}
								</span>
                            </div>
                        </li>
                    </ul>
                    <p v-else class="text-sm text-gray-500 dark:text-gray-400">Aucune course récente.</p>
                    <div class="mt-auto">
                        <router-link :to="{name:'client_panel_karting'}"
                                     class="text-blue-600 dark:text-blue-400 hover:underline text-sm">Voir toutes les
                            courses
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 mt-5 p-4 rounded-lg border-2 border-blue-600 dark:border-blue-400">
                <p>Les données de la page d'accueil, comme <strong>Derniers Billets</strong>
                    , <strong>Derniers Achats</strong> et <strong>Dernières Courses</strong>
                    ne sont pas encore 100% fonctionnels. Les données de ces trois catégories sont fictives.

                    Cependant les données dans <strong>Mes Billets</strong>, <strong>Mes Courses</strong> et <strong>Mes
                        Achats</strong> sont fonctionnels.
                </p>
            </div>
        </div>
    </UserDashboardTemplate>
</template>


<script>
import UserDashboardTemplate from "@/components/dashboard/user/UserDashboardTemplate.vue";
import {mapState} from "vuex";
import UsersService from "@/services/users.service";

export default {
    components: {UserDashboardTemplate},
    computed: {
        ...mapState('login', ['loggedInUser'])
    },
    data() {
        return {
            latestTickets: [
                {id: 1, title: "Ticket #123", date: "2024-07-28", status: "Open"},
                {id: 2, title: "Ticket #124", date: "2024-07-27", status: "Closed"},
            ],
            latestPurchases: [
                {id: 101, item: "Achat #501", date: "2024-07-26", amount: 25.00},
                {id: 102, item: "Achat #502", date: "2024-07-25", amount: 12.50},
            ],
            latestRaces: [
                {id: 201, event: "Course #101", date: "2024-07-29", position: 1},
                {id: 202, event: "Course #102", date: "2024-07-29", position: 3},
            ],
        };
    },
    async beforeMount() {
        let actions = [this.fetchLastUserOrders].map(async (f) => await f());

        await Promise.all(actions)
    },
    methods: {
        async fetchLastUserOrders() {
            const res = await UsersService.getUserOrders();
            if (!res.error) {
                this.latestPurchases = res.data.sort((a, b) => a.date - b.date)
                    .map((order) => ({
                        id: order.order_id,
                        item: `Achat #${order.order_id.split(/-/g)[0].slice(0, 4)}`,
                        date: new Date(order.date),
                        amount: Number.parseFloat(order.total_price)
                    }))
                    .slice(0, 4)
            } else {
                console.error(res)
            }
        },
        formatDate(dateString) {
            const options = {year: 'numeric', month: 'long', day: 'numeric'};
            return new Date(dateString).toLocaleDateString('fr-FR', options);
        },
    }
}
</script>