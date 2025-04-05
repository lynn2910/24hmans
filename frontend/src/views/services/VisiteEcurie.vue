<template>
  <div>
    <div class="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">

      <div v-if="messageConfirmation"
           class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
        <div class="bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 shadow-xl relative lg:ml-48 lg:mr-48">
          <h2 class="text-2xl font-semibold mb-4 text-green-400">Confirmation</h2>
          <p class="text-gray-300 mb-8">{{ messageConfirmation }}</p>

          <button
              @click="messageConfirmation = ''"
              class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow transition-colors">
            Fermer
          </button>
        </div>
      </div>

      <div class="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">

        <!-- Titre -->
        <main class="container mx-auto py-12 px-6 ">
          <h1 class="font-extrabold text-4xl text-center py-5 mx-auto my-16">{{ $t('services.ecurie.title') }}</h1>

          <!-- Section des règles -->
          <section class="bg-gray-800 rounded-lg p-6 shadow-md mb-12 mx-4 lg:ml-48 lg:mr-48"><h2
              class="text-2xl font-semibold mb-4">{{ $t('services.ecurie.rules.title') }}</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-300">
              <li>{{ $t('services.ecurie.rules.one') }}</li>
              <li>{{ $t('services.ecurie.rules.two') }}</li>
              <li>{{ $t('services.ecurie.rules.three') }}</li>
              <li>{{ $t('services.ecurie.rules.four') }}</li>
              <li>{{ $t('services.ecurie.rules.five') }}</li>
            </ul>
          </section>

          <!-- Formulaire d'inscription -->
          <section class="bg-gray-800 rounded-lg p-6 shadow-md mx-4 lg:ml-48 lg:mr-48"><h2
              class="text-2xl font-semibold mb-4">{{ $t('services.ecurie.sign.title') }}</h2>
            <form @submit.prevent="inscrire" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="nom" class="block text-sm font-medium mb-2">{{
                      $t('services.ecurie.sign.lastname')
                    }}</label>
                  <input type="text" id="nom" v-model="form.nom" required
                         class="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"/>
                </div>
                <div>
                  <label for="prenom" class="block text-sm font-medium mb-2">{{
                      $t('services.ecurie.sign.firstname')
                    }}</label>
                  <input type="text" id="prenom" v-model="form.prenom" required
                         class="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"/>
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium mb-2">{{ $t('services.ecurie.sign.email') }}</label>
                <input type="email" id="email" v-model="form.email" required
                       class="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"/>
              </div>

              <div>
                <label for="tel" class="block text-sm font-medium mb-2">{{ $t('services.ecurie.sign.phone') }}</label>
                <input type="tel" id="tel" v-model="form.tel" required
                       class="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"/>
              </div>

              <div>
                <label for="billet" class="block text-sm font-medium mb-2">{{
                    $t('services.ecurie.sign.ticket_number')
                  }}</label>
                <input type="text" id="billet" v-model="form.billet" required
                       class="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"/>
              </div>

              <button
                  type="submit"
                  class="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow">
                {{ $t('global.register') }}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nom: "",
        prenom: "",
        tel: "",
        email: "",
        billet: "",
      },
      messageConfirmation: "",
    };
  },
  methods: {
    inscrire() {
      this.messageConfirmation = `Merci, ${this.form.prenom} ${this.form.nom}, pour votre inscription !
      Un e-mail de confirmation a été envoyé à ${this.form.email}.`;
      this.form = {nom: "", prenom: "", tel: "", email: "", billet: ""};

      window.scrollTo({top: 0, behavior: 'smooth'});
    },
  },
};
</script>
