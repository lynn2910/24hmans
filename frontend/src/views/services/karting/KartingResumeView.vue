<template>
  <div class="max-w-4xl mx-auto px-4 mt-28 text-white">
    <div class="text-center mb-6">
      <h1 class="text-4xl font-bold mb-4 gradient-text">
        Résumé de votre réservation
      </h1>
      <p class="text-gray-300">Veuillez vérifier les détails de votre session</p>
    </div>

    <div class="reservation-card">
      <!-- Section Session -->
      <div class="mb-3">
        <h2 class="section-title blue">Votre session</h2>
        <div class="space-y-2">
          <div>
            <p class="font-medium">📅 {{ formattedDate }}</p>
            <p class="text-gray-400 text-sm ml-2">⏰ {{ formattedTime }}</p>
          </div>
          <div>
            <p class="font-medium">👥 Places disponibles : {{ currentSession?.maxSize }}</p>
          </div>
        </div>
      </div>

      <!-- Section Circuit -->
      <div class="mb-3">
        <h2 class="section-title purple">Détails du circuit</h2>
        <div class="space-y-2">
          <div>
            <p class="font-medium">📍 {{ circuit?.nom }}</p>
          </div>
          <div>
            <p class="font-medium">⚡ Karting {{ circuit?.cc }} CC</p>
          </div>
          <div>
            <p class="font-medium">🎯 À partir de {{ circuit?.age_minimum }} ans</p>
          </div>
        </div>
      </div>

      <!-- Bouton de confirmation -->
      <div class="mt-5 text-center">
        <router-link
            :to="{ name: 'home' }"
            class="confirm-button"
        >
          Confirmer et retour à l'accueil
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "KartingResumeView",
  computed: {
    ...mapState('karting', ['circuits', 'sessionsDate']),
    currentSession() {
      return this.sessionsDate.find(s => s.session_id === this.$route.params.sessionId);
    },
    circuit() {
      return this.circuits.find(c => c.id === this.$route.params.circuitId);
    },
    formattedDate() {
      return this.currentSession?.from_date
          ? new Date(this.currentSession.from_date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })
          : '--';
    },
    formattedTime() {
      return this.currentSession?.from_date
          ? new Date(this.currentSession.from_date).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          })
          : '--:--';
    }
  }
};
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(to right, #60a5fa, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.reservation-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #374151;
  border-radius: 0.75rem;
  padding: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid;
}

.blue {
  border-color: #60a5fa;
  color: #60a5fa;
}

.purple {
  border-color: #a855f7;
  color: #a855f7;
}

.confirm-button {
  display: inline-block;
  background: #2563eb;
  color: white;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.confirm-button:hover {
  background: #1d4ed8;
  transform: scale(1.05);
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>