<template>
  <UserDashboardTemplate>
    <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
      {{ $t('dashboards.client.karting') }}
    </h1>

    <div v-if="userSessions.length > 0" class="overflow-y-auto max-h-[calc(100vh-200px)]">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-5 pb-4">
        <div
            v-for="reservation in sortedReservations"
            :key="reservation.reservation_id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow"
        >
          <div class="p-5">
            <!-- En-tête avec nom du circuit -->
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                {{ reservation.circuit.circuit_name }}
              </h3>
              <span class="px-3 py-1 rounded-full text-xs font-semibold"
                    :class="reservation.circuit.kart_power < 200 ? 'bg-blue-100 text-blue-800' :
                           reservation.circuit.kart_power < 300 ? 'bg-purple-100 text-purple-800' :
                           'bg-red-100 text-red-800'">
                {{ reservation.circuit.kart_power }} CC
              </span>
            </div>

            <!-- Détails de la session -->
            <div class="space-y-3">
              <div class="text-gray-600 dark:text-gray-300">
                <span class="font-medium">Date:</span> {{ formatDate(reservation.session.from_date) }}
              </div>
              <div class="text-gray-600 dark:text-gray-300">
                <span class="font-medium">Horaire:</span> {{ formatTime(reservation.session.from_date) }} -
                {{ formatTime(reservation.session.to_date) }}
              </div>
              <div class="text-gray-600 dark:text-gray-300">
                <span class="font-medium">Durée:</span>
                {{ calculateDuration(reservation.session.from_date, reservation.session.to_date) }} min
              </div>

              <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div class="text-gray-600 dark:text-gray-300">
                  <span class="font-medium">Pseudo:</span> {{ reservation.pseudo || 'Non spécifié' }}
                </div>
                <div class="text-gray-600 dark:text-gray-300">
                  <span class="font-medium">Âge minimum:</span> {{ reservation.circuit.minAge }} ans
                </div>
                <div class="text-gray-600 dark:text-gray-300">
                  <span class="font-medium">Places restantes:</span> {{ reservation.session.maxSize }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300">
        Aucune réservation de karting trouvée
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Vous n'avez pas encore de réservation
      </p>
    </div>
  </UserDashboardTemplate>
</template>

<script>
import UserDashboardTemplate from "@/components/dashboard/user/UserDashboardTemplate.vue";
import {mapState, mapActions} from "vuex";

export default {
  components: {
    UserDashboardTemplate
  },
  computed: {
    ...mapState('login', ['loggedInUser']),
    ...mapState('karting', ['userSessions']),

    sortedReservations() {
      return [...this.userSessions].sort((a, b) =>
          new Date(b.session.from_date) - new Date(a.session.from_date)
      );
    }
  },
  methods: {
    ...mapActions('karting', ['getAllReservations']),

    formatDate(dateString) {
      if (!dateString) return 'Date inconnue';
      return new Date(dateString).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    },

    formatTime(dateString) {
      if (!dateString) return '--:--';
      return new Date(dateString).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    calculateDuration(start, end) {
      const diff = new Date(end) - new Date(start);
      return Math.round(diff / (1000 * 60));
    }
  },

  async mounted() {
    if (this.loggedInUser?.id) {
      await this.getAllReservations(this.loggedInUser.id);
    }
  }
};
</script>

<style scoped>
div[class*="grid"] > div:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}
</style>