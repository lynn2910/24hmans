<template>
  <AdminDashboardTemplate current-page="prestataires">
    <div class="space-y-6 h-full overflow-auto flex flex-row gap-6">
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold text-white">
            {{ $t("dashboards.presta_multi") }}
          </h2>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-left">
            <thead class="bg-gray-800 rounded-t-lg">
            <tr>
              <th class="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                {{ $t("global.name") }}
              </th>
              <th class="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                {{ $t("global.services") }}
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
            </thead>
            <tbody class="bg-gray-900 divide-y divide-gray-700">
            <tr v-for="(prestataire, index) in prestataires" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                {{ prestataire.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                <strong>
                  {{
                    services.find((s) => s.id === prestataire.id)?.nb_services || 0
                  }}
                </strong>
                {{ $t("global.services_lowercase") }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                <router-link
                    :to="`/fr/prestataire/${prestataire.referencer}`"
                    target="_blank"
                    class="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                >
                  <span class="sr-only">View</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" width="24" height="24"
                       viewBox="0 0 24 24">
                    <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
                  </svg>
                </router-link>
                <button
                    @click="openEditPopup(prestataire)"
                    class="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <span class="sr-only">Edit</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                    <path
                        d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
                  </svg>
                </button>
                <button
                    @click="openDeletePopup(prestataire)"
                    class="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  <span class="sr-only">Delete</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path
                        d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
                  </svg>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="w-2/5 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-0" style="margin-top: 0 !important;">
        <h2 class="text-2xl font-semibold text-white mb-6">Ajouter un prestataire</h2>

        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Nom</label>
          <input
              id="name"
              v-model="presta_creation.name"
              type="text"
              placeholder="Nom du prestataire"
              minlength="1"
              class="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
          <PasswordField
              id="password"
              @levelUpdate="(i) => presta_creation.passwordLevel = i"
              @passwordChange="(p) => presta_creation.password = p"
          ></PasswordField>
        </div>

        <div class="flex flex-col gap-3 justify-between items-center mb-6">
          <button
              @click="createPrestataire"
              class="w-full bg-green-600 hover:bg-green-800 text-white rounded-md py-2 px-4 transition-colors duration-200"
          >
            Ajouter ce prestataire
          </button>
          <button
              @click="resetPrestaCreationForm"
              class="w-full bg-gray-700 hover:bg-gray-800 text-white rounded-md py-2 px-4 transition-colors duration-200"
          >
            Réinitialiser
          </button>
        </div>

        <div
            v-if="old_presta_creation.show && !old_presta_creation.error"
            class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
        >
          <strong class="font-bold">Succès!</strong>
          <span class="block sm:inline">
            Le prestataire
            <strong class="font-semibold">{{ old_presta_creation.name }}</strong>
            a été créé avec succès.
          </span>
        </div>

        <div
            v-if="old_presta_creation.show && old_presta_creation.error && !old_presta_creation.invalidForm"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
        >
          <strong class="font-bold">Erreur!</strong>
          <span class="block sm:inline">
            Une erreur est survenue lors de la création du prestataire
            <strong class="font-semibold">{{ old_presta_creation.name }}</strong>.
          </span>
        </div>

        <div
            v-else-if="old_presta_creation.show && old_presta_creation.error && old_presta_creation.invalidForm"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
        >
          <strong class="font-bold">Erreur!</strong>
          <span class="block sm:inline">
            Une erreur est survenue lors de la création du prestataire
            <strong class="font-semibold">{{ old_presta_creation.name }}</strong>
            : Le nom et le mot de passe doivent être précisés.
          </span>
        </div>
      </div>
    </div>

    <Popup title="Modifier un prestataire" full-page v-if="showEditPopup" @close="closePopup" bg="bg-transparent">
      <div class="w-full h-[90vh]">
        <PrestataireEditPage :prestataire="popupPrestataire"></PrestataireEditPage>
      </div>
    </Popup>

    <Popup title="Supprimer un prestataire" v-if="showDeletePopup" @close="closePopup">
      <p class="text-gray-700">
        {{ $t("confirmation_text") }}
        <strong class="text-black">{{ popupPrestataire.name }}</strong>.
      </p>
      <p class="mt-2 text-gray-700">
        {{ $t("dashboards.presta_admin.prestataires.delete.text") }}?
      </p>

      <div class="flex justify-end mt-6 gap-4">
        <button
            @click="deletePrestataire(popupPrestataire.id)"
            class="bg-red-500 hover:bg-red-700 text-white rounded-md py-2 px-4 transition-colors duration-200"
        >
          {{ $t("global.delete") }}
        </button>
        <button
            @click="closePopup"
            class="bg-gray-500 hover:bg-gray-700 text-white rounded-md py-2 px-4 transition-colors duration-200"
        >
          {{ $t("cancel") }}
        </button>
      </div>
    </Popup>

    <Popup title="Copie des prestataires" v-if="showCopyPopup" @close="showCopyPopup = false">
      <p class="text-gray-700 mb-4">
        {{ $t("dashboards.presta_admin.prestataires.copy_success") }}
      </p>
      <div class="flex justify-end">
        <button
            @click="showCopyPopup = false"
            class="bg-gray-500 hover:bg-gray-700 text-white rounded-md py-2 px-4 transition-colors duration-200"
        >
          {{ $t("global.close") }}
        </button>
      </div>
    </Popup>

    <Loading
        v-if="showImportLoadingAnimation"
        title="Création des nouveaux prestataires..."
        indicator="prestataires créés"
        :step="importingLoader.step"
        :max-step="importingLoader.max"
    ></Loading>
  </AdminDashboardTemplate>
</template>

<script>
import AdminDashboardTemplate from "@/components/dashboard/admin/AdminDashboardTemplate.vue";
import {mapActions, mapGetters} from "vuex";
import store from "@/store";
import Popup from "@/components/dashboard/Popup.vue";
import Loading from "@/components/dashboard/Loading.vue";
import PrestataireService from "@/services/prestataire.service";
import PrestataireEditPage from "@/components/dashboard/PrestataireEditPage.vue";
import PasswordField from "@/components/dashboard/PasswordField.vue";

export default {
  name: "AdminDashboardView",
  components: {PasswordField, PrestataireEditPage, Loading, Popup, AdminDashboardTemplate},
  data() {
    return {
      services: [],
      showEditPopup: false,
      showDeletePopup: false,
      popupPrestataire: {},
      presta_creation: {
        name: "",
        password: "",
        passwordLevel: -1,
        showPassword: false,
      },
      old_presta_creation: {
        show: false,
        error: false,
        name: null,
        invalidForm: false,
      },
      showCopyPopup: false,
      showImportLoadingAnimation: false,

      importingLoader: {
        step: 0,
        max: 0,
      },
    };
  },
  methods: {
    // POPUP
    closePopup() {
      this.showEditPopup = false;
      this.showDeletePopup = false;
      this.popupPrestataire = {};
    },
    openEditPopup(presta) {
      this.showEditPopup = true;
      this.showDeletePopup = false;

      this.popupPrestataire = presta;

      console.log('Description: ', presta.description)
      PrestataireEditPage.methods.setDescription(presta.description || '')
    },
    openDeletePopup(presta) {
      this.showEditPopup = false;
      this.showDeletePopup = true;

      this.popupPrestataire = presta;
    },

    // DELETE
    async deletePrestataire(presta_id) {
      let res = await PrestataireService.deletePrestataire(presta_id);

      if (!res.error) {
        // Reload prestataire list
        await store.dispatch("prestataire/getAllPrestataires");
        this.closePopup();
      } else {
        console.error(res.status + " -- " + res.data);
      }
    },

    // CREATION
    resetPrestaCreationForm() {
      this.presta_creation = {
        name: "",
        password: "",
        passwordLevel: -1,
        showPassword: false,
      };
    },
    async createPrestataire() {
      if (
          this.presta_creation.name?.trim().length < 1 ||
          this.presta_creation.password.trim().length < 1
      ) {
        this.old_presta_creation.show = true;
        this.old_presta_creation.invalidForm = true;
        this.old_presta_creation.error = true;
        this.old_presta_creation.name = this.presta_creation.name;
        return;
      }

      let res = await PrestataireService.createPrestataireWithHashing(
          this.presta_creation.name,
          this.presta_creation.password
      );

      this.old_presta_creation.show = true;
      this.old_presta_creation.invalidForm = false;
      this.old_presta_creation.error = res.error;
      this.old_presta_creation.name = this.presta_creation.name;

      if (!res.error) {
        this.resetPrestaCreationForm();
        this.addPrestataireToCache(res.data);
      } else {
        console.error(res.status + " -- " + res.data);
      }
    },
  },
  computed: {
    ...mapGetters("prestataire", ["prestataires"]),
  },
  actions: {
    ...mapActions("prestataire", ["getAllPrestataires", "addPrestataireToCache"]),
  },
  async beforeMount() {
    await store.dispatch("prestataire/getAllPrestataires");
  },
  async mounted() {
    let services = await PrestataireService.getPrestatairesServicesCount();
    if (!services.error) {
      this.services = services;
    } else {
      console.error(services);
    }
  },
};
</script>
