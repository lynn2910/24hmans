<template>
  <div class="max-w-4xl mx-auto px-4 w-full mt-28 text-white">
    <!-- Popup de connexion -->
    <LoginPopup v-if="showLoginPopup" @close="showLoginPopup = false"/>

    <div class="text-center mb-6">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Résumé de votre réservation
      </h1>
      <p class="text-gray-300">Veuillez vérifier les détails de votre session</p>
    </div>

    <div class="bg-white/5 border border-gray-700 rounded-xl p-8">
      <!-- Pseudo -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-6 pb-2 border-b-2 border-pink-500 text-pink-500">
          Votre identité
        </h2>
        <div class="group">
          <div class="bg-gradient-to-r from-blue-400 to-purple-500 p-0.5 rounded-lg">
            <input
                v-model="pseudo"
                type="text"
                required
                class="w-full bg-gray-800 border-pink-500 text-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                placeholder="Pseudo"
                @input="validatePseudo"
            />
          </div>
          <p v-if="pseudoError" class="text-rose-400 text-sm mt-1">{{ pseudoError }}</p>
        </div>
      </div>

      <div class="bg-white/5 border border-gray-700 rounded-xl p-8">
        <!-- Section Session -->
        <div class="mb-3">
          <h2 class="text-xl font-semibold mb-6 pb-2 border-b-2 border-blue-400 text-blue-400">
            Votre session
          </h2>
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
          <h2 class="text-xl font-semibold mb-6 pb-2 border-b-2 border-purple-500 text-purple-500">
            Détails du circuit
          </h2>
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
          <button
              @click="handleConfirmation"
              class="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-blue-700 hover:scale-105"
          >
            Confirmer la réservation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import LoginPopup from "@/components/dashboard/LoginPopup.vue";

export default {
  name: "KartingResumeView",
  components: {LoginPopup},
  data() {
    return {
      pseudo: '',
      pseudoError: '',
      showLoginPopup: false,
      awaitingConfirmation: false,
    };
  },
  computed: {
    ...mapState('karting', ['circuits', 'sessionsDate']),
    ...mapState('login', ['loggedInUser']),
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
  },

  watch: {
    loggedInUser: {
      handler(newVal) {
        if (newVal && this.awaitingConfirmation) {
          this.completeReservation();
        }
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions('karting', ['getAllSessions', 'getAllCircuits', 'putSession', 'addUserSession']),

    validatePseudo() {
      if (this.pseudo.length < 3) {
        this.pseudoError = "Le pseudo doit contenir au moins 3 caractères";
        return false;
      }
      this.pseudoError = "";
      return true;
    },

    async handleConfirmation() {
      if (!this.validatePseudo()) return;

      if (!this.loggedInUser) {
        this.awaitingConfirmation = true;

        this.showLoginPopup = true;
        return;
      }

      await this.completeReservation();
    },

    async completeReservation() {
      try {
        console.log("before");
        console.log(this.$route.params.kartingId,
            this.$route.params.sessionId,
            this.$route.params.circuitId)
        await this.putSession({
          kartingId: this.$route.params.kartingId,
          sessionId: this.$route.params.sessionId,
          circuitId: this.$route.params.circuitId
        });
        console.log("after");

        await this.addUserSession({
          karting_id: this.$route.params.kartingId,
          sessionId: this.$route.params.sessionId,
          userId: this.loggedInUser.id,
          circuitId: this.$route.params.circuitId,
          newSessionUser: this.pseudo
        });

        this.$router.push({name: 'client_panel_karting'});
      } catch (error) {
        console.error("Erreur lors de la réservation:", error);
      } finally {
        this.awaitingConfirmation = false;
      }
    }
  },

  async mounted() {
    const kartingId = this.$route.params.kartingId;
    const circuitId = this.$route.params.circuitId;

    if (kartingId && circuitId) {
      await this.getAllCircuits(kartingId);
      await this.getAllSessions({
        kartingId: parseInt(kartingId),
        circuitId: circuitId
      });
    }
  }
};
</script>