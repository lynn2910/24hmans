<template>
  <div v-if="loading" class="text-center p-8 text-gray-400">
    Chargement des sessions en cours...
  </div>
  <div v-else>
    <PrestataireDashboardTemplate current-page="karting" class="h-full w-2/3">
      <div class="p-6 text-white">
        <!-- En-tête -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2">Planning des circuits</h1>
          <p class="text-gray-300">Semaine du {{ currentWeek }}</p>
        </div>

        <!-- Grille des calendriers -->
        <div class="grid grid-cols-1 gap-6">
          <div v-for="circuit in circuits" :key="circuit.id" class="circuit-calendar">
            <!-- En-tête du circuit -->
            <div class="mb-4 p-4 bg-gray-800 rounded-t-lg">
              <h3 class="text-xl font-bold text-blue-400">{{ circuit.nom }}</h3>
              <p class="text-sm text-gray-400">Karting {{ circuit.cc }} CC</p>
            </div>

            <vue-cal
                ref="vuecal"
                class="vuecal--circuit-theme"
                active-view="week"
                :time="true"
                :time-from="10 * 60"
                :time-to="23 * 60"
                :time-step="15"
                :time-cell-height="40"
                :disable-days="[]"
                :events="circuitEvents(circuit.id)"
                :special-hours="specialHours"
                @event-click="showEventDetails"
                style="height: 60vh"
                :disable-views="['years', 'year', 'month', 'day']"
                hide-view-selector
                selected-date="2025-04-03"> <!-- Force la date de départ -->

              <template #event="{ event }">
                <div class="event-content p-1 text-xs">
                  <div class="font-bold">Session {{ event.session_id.slice(-4) }}</div>
                  <div>{{ event.maxSize }} places</div>
                </div>
              </template>
            </vue-cal>
          </div>
        </div>

        <!-- Modal Détails -->
        <div v-if="selectedSession" class="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div class="bg-gray-800 text-white p-6 rounded-lg max-w-md w-full">
            <h3 class="text-xl font-bold mb-4">Détails de la session</h3>

            <div class="space-y-2">
              <p>🆔 ID: {{ selectedSession.session_id }}</p>
              <p>📅 Date: {{ formatDate(selectedSession.start) }}</p>
              <p>⏰ Horaires: {{ formatTime(selectedSession.start) }} - {{ formatTime(selectedSession.end) }}</p>
              <p>🎫 Capacité: {{ selectedSession.maxSize }} places</p>
            </div>

            <button
                @click="selectedSession = null"
                class="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </PrestataireDashboardTemplate>
  </div>
</template>

<script>
import PrestataireDashboardTemplate from "@/components/dashboard/prestataire/PrestataireDashboardTemplate.vue";
import VueCal from 'vue-cal';
import PrestataireService from "@/services/prestataire.service";
import {mapActions, mapState} from "vuex";

export default {
  components: {
    PrestataireDashboardTemplate,
    VueCal
  },

  data: () => ({
    loading: true,
    selectedSession: null,
    startDate: new Date('2025-04-01'),
    endDate: new Date('2025-04-07'),
    circuitsSessions: {},
    specialHours: {
      0: {from: 7 * 60, to: 20 * 60, class: 'opening-hours'}, // Dimanche
      1: {from: 8 * 60, to: 22 * 60, class: 'opening-hours'},  // Lundi
      2: {from: 8 * 60, to: 22 * 60, class: 'opening-hours'},  // Mardi
      3: {from: 8 * 60, to: 22 * 60, class: 'opening-hours'},  // Mercredi
      4: {from: 8 * 60, to: 22 * 60, class: 'opening-hours'},  // Jeudi
      5: {from: 8 * 60, to: 22 * 60, class: 'opening-hours'},  // Vendredi
      6: {from: 8 * 60, to: 22 * 60, class: 'opening-hours'}   // Samedi
    }
  }),

  computed: {
    ...mapState('karting', ['circuits', 'sessionsDate']),
    ...mapState('login', ['loggedInUser']),

    circuits() {
      return this.$store.state.karting.circuits;
    },

    circuitEvents() {
      return circuitId => this.circuitsSessions[circuitId] || [];
    },

    currentWeek() {
      return this.startDate.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long'
      }) + ' - ' + this.endDate.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long'
      });
    }
  },

  methods: {
    ...mapActions('karting', ['getAllCircuits', 'getAllSessions']),

    async loadSessions() {
      this.loading = false;
      console.log("id user conect: ", this.loggedInUser.id);
      try {
        const prestaRes = await PrestataireService.getPrestataireFromName(this.loggedInUser.id);
        const kartingId = prestaRes.data.id;

        await this.getAllCircuits(kartingId);

        this.circuitsSessions = {};

        for (const circuit of this.circuits) {
          await this.getAllSessions({
            kartingId: parseInt(kartingId),
            circuitId: circuit.id
          });

          const sessions = this.$store.state.karting.sessionsDate;
          console.log("Sessions brutes:", sessions);

          this.$set(this.circuitsSessions, circuit.id, this.formatSessions(sessions));
          console.log('Sessions pour le circuit', circuit.id, ':', this.circuitsSessions[circuit.id]);
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        this.loading = false;
      }
    },

    formatSessions(sessions) {
      const formatted = sessions.map(session => {
        console.log('Raw session dates:', session.from_date, session.to_date);

        const start = new Date(session.from_date);
        const end = new Date(session.to_date);

        console.log('Parsed dates:', start, end);

        if (isNaN(start) || isNaN(end)) {
          console.log("invalides dates")
          console.error('Date invalide:', session);
          return null;
        }

        return {
          ...session,
          start: start,
          end: end,
          title: `Session ${session.session_id.slice(-4)}`,
          class: `session-event ${this.getSessionColor(session)}`
        };
      }).filter(session => session !== null);

      console.log('Événements formatés:', JSON.parse(JSON.stringify(formatted)));
      return formatted;
    },

    showEventDetails(event) {
      this.selectedSession = event;
    },

    formatDate(date) {
      return new Intl.DateTimeFormat('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'}).format(date);
    },
    formatTime(date) {
      return date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'});
    },

    getSessionColor(session) {
      if (session.maxSize >= 8) {
        return 'session-blue';
      } else if (session.maxSize >= 4) {
        return 'session-yellow';
      } else if (session.maxSize >= 1) {
        return 'session-orange';
      } else {
        return 'session-red';
      }
    }
  },

  async mounted() {
    await this.loadSessions();
  }
};
</script>

<style>
@import 'vue-cal/dist/vuecal.css';

.vuecal--circuit-theme {
  --vuecal-color: #cbd5e1;
  --vuecal-bg-color: #1e293b;
  --vuecal-border-color: #334155;
}

.circuit-calendar {
  @apply bg-gray-800 rounded-lg overflow-hidden shadow-xl;
}

.event-content {
  @apply p-1 text-xs leading-tight overflow-hidden;
}

.opening-hours {
  background: rgba(59, 130, 246, 0.05);
  border-left: 3px solid #3b82f6;
}

.session-event {
  background: #3b82f6 !important;
  border: 1px solid #2563eb !important;
  border-radius: 4px;
  color: white !important;
  padding: 2px;
  font-size: 0.9em;
  transition: transform 0.2s;
  z-index: 2;
  position: relative;
}

.session-event:hover {
  transform: scale(1.02);
  z-index: 1;
}

.vuecal__time-cell {
  border-bottom: 1px solid #4a5568 !important;
}

.vuecal__time-column {
  @apply bg-gray-800;
}

.vuecal__heading {
  @apply bg-gray-800 text-gray-200;
}

.vuecal__weekday {
  @apply text-gray-300;
}

.vuecal__time-column {
  width: 80px !important;
}

.vuecal__event-time {
  display: block !important;
  font-size: 0.8em;
  opacity: 0.8;
}

.vuecal__event-title {
  white-space: normal !important;
}

.vuecal__bg-content {
  z-index: 1;
}

.vuecal__event {
  z-index: 2 !important;
}

.session-blue {
  background-color: #3b82f6 !important;
  border-color: #2563eb !important;
}

.session-yellow {
  background-color: #facc15 !important;
  border-color: #eab308 !important;
}

.session-orange {
  background-color: #fa8f15 !important;
  border-color: #ea6e08 !important;
}

.session-red {
  background-color: #ef4444 !important;
  border-color: #dc2626 !important;
}

</style>