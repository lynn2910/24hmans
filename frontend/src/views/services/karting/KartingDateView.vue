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
                @click="session.maxSize > 0 ? navigateToResume(session.session_id) : null"
                :class="{
                  'p-3 rounded-md border transition-colors cursor-pointer': true,
                  'bg-dark/50 border-gray-600 hover:border-blue-400': session.maxSize > 0,
                  'bg-gray-900/30 border-gray-700 text-gray-500': session.maxSize <= 0
                }"
            >
              <div class="text-sm font-medium"
                   :class="{'text-gray-200': session.maxSize > 0, 'text-gray-500': session.maxSize <= 0}">
                {{ formatTime(session.from_date) }} - {{ formatTime(session.to_date) }}
                <span v-if="session.maxSize <= 0" class="text-xs ml-2">(COMPLET)</span>
              </div>
              <div class="text-xs mt-1"
                   :class="{'text-gray-400': session.maxSize > 0, 'text-gray-500': session.maxSize <= 0}">
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
    ...mapState('karting', ['sessionsDate', 'circuits']),

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

      // Trier les jours par date réelle
      const sortedDays = Object.values(daysMap).sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB; // Tri par ordre croissant
      });

      // Trier les sessions de chaque jour par horaire (session.from_date)
      sortedDays.forEach(day => {
        day.sessions.sort((a, b) => new Date(a.from_date) - new Date(b.from_date));
      });

      return sortedDays;
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