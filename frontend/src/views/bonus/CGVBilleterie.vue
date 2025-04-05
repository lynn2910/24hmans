<template>
  <div class="mt-72">
    <div class="flex flex-col justify-center content-center items-center">
      <h1 class="font-bold text-3xl text-center mb-10">{{ $t('bonuses.cgv.title') }}</h1>

      <div class="w-fit">
        <p class="font-bold">{{ $t('bonuses.cgv.text') }}</p>
        <a class="underline" target="_blank" href="/documents/CGV24hDuMans.pdf">CGV24hDuMans.pdf</a>
      </div>
    </div>

    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import FooterComponent from "@/components/navigation/footer/FooterComponent.vue";

export default {
  components: {FooterComponent}
}
</script>