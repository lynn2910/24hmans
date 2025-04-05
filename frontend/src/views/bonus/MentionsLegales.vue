<template>
  <div class="mt-36">
    <h1 class="font-bold text-3xl text-center mb-10">{{ $t('bonuses.mentions.title') }}</h1>

    <div class="mx-10 md:mx-40">
      <h2 class="text-xl font-bold mb-5">{{ $t('bonuses.mentions.editor.title') }}</h2>

      <p>
        {{ $t('bonuses.mentions.editor.text') }}
        <br>
        {{ $t('bonuses.mentions.editor.responsables') }}
      </p>
      <div class="grid grid-cols-2 grid-rows-5 w-40 mt-3 ml-5">
        <p>Cédric</p>
        <p>COLIN</p>

        <p>Marvyn</p>
        <p>LEVIN</p>

        <p>Leslie</p>
        <p>MERAT</p>

        <p>Sugdenaz</p>
        <p>EKICI</p>

        <p>Anna</p>
        <p>GAIFFE</p>
      </div>

      <hr class="my-10">

      <h2 class="text-xl font-bold mb-5">{{ $t('bonuses.mentions.host.title') }}</h2>

      <p><strong>{{ $t('bonuses.mentions.host.name') }}</strong> Cédric COLIN</p>
      <p><strong>{{ $t('bonuses.mentions.host.address') }}</strong></p>
      <div class="ml-5">
        <p>{{ $t('bonuses.mentions.host.address_line1') }}</p>
        <p>{{ $t('bonuses.mentions.host.address_line2') }}</p>
        <p>{{ $t('bonuses.mentions.host.address_line3') }}</p>
      </div>

      <hr class="my-10">

      <h2 class="text-xl font-bold mb-5">{{ $t('bonuses.mentions.intellectual.title') }}</h2>

      <p>{{ $t('bonuses.mentions.intellectual.text1') }}</p>
      <p>{{ $t('bonuses.mentions.intellectual.text2') }}</p>
      <p>{{ $t('bonuses.mentions.intellectual.text3') }}</p>
      <p>{{ $t('bonuses.mentions.intellectual.text4') }}</p>

      <br><br>

      <p>{{ $t('bonuses.mentions.intellectual.contact') }}
        <a class="underline text-blue-400"
           href="mailto:cedric.colin35@gmail.com">{{ $t('bonuses.mentions.intellectual.email') }}</a>
      </p>

      <hr class="my-10">

      <h2 class="text-xl font-bold mb-5">{{ $t('bonuses.mentions.personal.title') }}</h2>

      <router-link class="underline text-blue-400" :to="{name: 'donnees_personnelles'}">
        {{ $t('bonuses.mentions.personal.link') }}
      </router-link>

      <hr class="my-10">

      <h2 class="text-xl font-bold mb-5">{{ $t('bonuses.mentions.hyperlinks.title') }}</h2>

      <p>{{ $t('bonuses.mentions.hyperlinks.text') }}</p>

      <hr class="my-10">

      <h2 class="text-xl font-bold mb-5">{{ $t('bonuses.mentions.warning.title') }}</h2>

      <p>{{ $t('bonuses.mentions.warning.text1') }}</p>
      <p>{{ $t('bonuses.mentions.warning.text2') }}</p>

      <hr class="my-10">

      <h2 class="text-xl font-bold mb-5">{{ $t('bonuses.mentions.law.title') }}</h2>

      <p>{{ $t('bonuses.mentions.law.text') }}</p>
    </div>


    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import FooterComponent from "@/components/navigation/footer/FooterComponent.vue";

export default {
  name: "MentionsLegales",
  components: {FooterComponent}
}
</script>