<template>
  <div class="relative h-screen overflow-y-auto">
    <!-- Carte en arrière-plan -->
    <CarteInteractivePublic class="relative z-0" width="100%" height="100vh"/>

    <!-- Image en superposition -->
    <div class="fixed bottom-2 left-0 right-0 z-50 flex justify-center">
      <img
          src="@/assets/images/descriptionServices.png"
          alt="description carte interactive"
          class="w-2/3 object-contain mx-auto"
          loading="lazy"
      />
    </div>
  </div>
</template>

<script>
import CarteInteractivePublic from "@/components/carteInteractive/CarteInteractivePublic.vue";

export default {
  components: {CarteInteractivePublic},
}
</script>