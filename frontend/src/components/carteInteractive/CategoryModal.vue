<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-gray-900 border border-slate-500 p-6 rounded-lg text-center min-w-[300px]">
      <h2 class="text-2xl font-bold text-white mb-4">Choisissez une catégorie d'icône</h2>

      <select
          v-model="selectedCategory"
          size="5"
          class="w-full p-2 mb-4 rounded-md bg-white text-gray-500 overflow-y-auto max-h-40"
      >
        <option v-for="(icon, category) in categories" :key="category" :value="category">
          {{ category.replace("_", " ") }}
        </option>
      </select>

      <div class="flex justify-between mt-4">
        <button @click="cancel"
                class="mt-6 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none text-xl">
          Annuler
        </button>
        <button @click="confirm"
                class="mt-6 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-xl">
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: Object,
    value: Boolean,
  },
  data() {
    return {
      show: this.value,
      selectedCategory: null,
    };
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    confirm() {
      if (this.selectedCategory) {
        this.$emit("selected", this.selectedCategory);
        this.show = false;
      }
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>
