<template>
    <UserDashboardTemplate>
        <div class="tickets">
            <h2>Mes Tickets</h2>

            <div v-if="isLoadingTickets">Chargement des tickets...</div>
            <div v-else-if="ticketsError">Erreur : {{ ticketsError.message }}</div>
            <div v-else-if="allTickets.length === 0">Aucun ticket trouvé.</div>

            <div v-else class="ticket-list">
                <div
                        v-for="ticket in allTickets"
                        :key="ticket.ticket_id"
                        class="ticket-card"
                >
                    <h3>🎫 Ticket #{{ ticket.ticket_id }}</h3>
                    <p><strong>Catégorie :</strong> {{ ticket.category }}</p>

                    <p><strong>Jours :</strong>
                        <span v-for="(day, index) in ticket.days" :key="index">
            {{ day }}<span v-if="index < ticket.days.length - 1">, </span>
          </span>
                    </p>

                    <p><strong>Personnes :</strong></p>
                    <ul>
                        <li
                                v-for="(person, index) in ticket.persons"
                                :key="index"
                        >
                            {{ person.quantity }} × {{ person.type }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </UserDashboardTemplate>

</template>

<script>
import UserDashboardTemplate from "@/components/dashboard/user/UserDashboardTemplate.vue";
import {mapActions, mapGetters, mapState} from "vuex";

export default {

    components: {
        UserDashboardTemplate
    },


    computed: {
        ...mapState('login', ['loggedInUser']),
        ...mapGetters('billetterie', ['allTickets', 'isLoadingTickets', 'ticketsError']),
    },

    methods: {
        ...mapActions('billetterie', ['fetchTicketsByUser']),
    },

    async mounted() {
        if (this.loggedInUser?.id) {
            await this.fetchTicketsByUser(this.loggedInUser.id);
        }
    }
}

</script>

<style scoped>
div[class*="grid"] > div:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
}
</style>