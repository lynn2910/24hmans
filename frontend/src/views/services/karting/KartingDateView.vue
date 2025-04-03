<template>
  <div class="max-w-7xl mx-auto px-4 py-8 mt-28">
    <div v-if="sessionsDate.length > 0">
      <h1 class="font-extrabold text-4xl text-center py-5 mx-auto mt-4 mb-12 text-white">Choisissez votre créneau</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
            v-for="day in groupedDays"
            :key="day.date"
            class="bg-white/10 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
        >
          <div class="text-center mb-4">
            <div class="text-lg font-medium text-gray-200">{{ day.dayName }}</div>
            <div class="text-sm text-gray-400">{{ day.formattedDate }}</div>
          </div>

          <div class="space-y-3">
            <div
                v-for="session in day.sessions"
                :key="session.session_id"
                @click="navigateToResume(session.session_id)"
                class="p-3 bg-dark/50 rounded-md border border-gray-600 hover:border-blue-400 transition-colors cursor-pointer"
            >
              <div class="text-sm font-medium text-gray-200">
                {{ formatTime(session.from_date) }} - {{ formatTime(session.to_date) }}
              </div>
              <div class="text-xs text-gray-400 mt-1">
                Places disponibles : {{ session.maxSize }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-400 py-12">
      Aucune session disponible pour le moment
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: "KartingDateView",
  computed: {
    ...mapState('karting', ['sessionsDate']),

    groupedDays() {
      const daysMap = {};

      this.sessionsDate.forEach(session => {
        try {
          const date = new Date(session.from_date);
          const dateKey = date.toISOString().split('T')[0];

          if (!daysMap[dateKey]) {
            daysMap[dateKey] = {
              date: dateKey,
              dayName: date.toLocaleDateString('fr-FR', {weekday: 'long'}),
              formattedDate: date.toLocaleDateString('fr-FR'),
              sessions: []
            };
          }

          daysMap[dateKey].sessions.push(session);
        } catch (e) {
          console.error('Error parsing date:', session.from_date, e);
        }
      });

      return Object.values(daysMap).sort((a, b) => a.date.localeCompare(b.date));
    }
  },
  methods: {
    ...mapActions('karting', ['getAllSessions']),

    formatTime(dateString) {
      try {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        console.error('Error formatting time:', dateString);
        return '--:--';
      }
    },

    navigateToResume(sessionId) {
      this.$router.push({
        name: 'karting-resume',
        params: {
          prestataire_name: this.$route.params.prestataire_name,
          circuitId: this.$route.params.circuitId,
          kartingId: this.$route.params.kartingId,
          sessionId: sessionId
        }
      });
    }
  },
  async mounted() {
    const kartingId = this.$route.params.kartingId;
    const circuitId = this.$route.params.circuitId;

    if (kartingId && circuitId) {
      await this.getAllSessions({
        kartingId: parseInt(kartingId),
        circuitId: circuitId
      });
    }
  }
};
</script>

<style scoped>
/* Styles personnalisés */
.cursor-pointer {
  cursor: pointer;
}

.hover\:border-blue-400:hover {
  border-color: #60a5fa;
}

.transition-colors {
  transition-property: background-color, border-color, color;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>