<template>
  <footer class="w-screen" style="z-index: 9999;">
    <svg
        class="relative transform translate-y-[60%] w-screen h-auto mt-auto left-0 flex flex-row space-between drop-shadow-all-white-700"
        width="1918"
        height="529" viewBox="0 0 1918 529" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
          d="M0 170.2C76.72 156.745 230.16 93.9548 383.6 102.925C537.04 111.895 613.76 235.33 767.2 215.05C920.64 194.77 997.36 14.9798 1150.8 1.52485C1304.24 -11.9302 1380.96 137.83 1534.4 147.775C1687.84 157.72 1841.28 70.5548 1918 51.2498V529H0V170.2Z"
          fill="url(#paint0_linear_359_779)"/>
      <defs>
        <linearGradient id="paint0_linear_359_779" x1="0" y1="264.835" x2="1918" y2="264.835"
                        gradientUnits="userSpaceOnUse">
          <stop offset="1"/>
        </linearGradient>
      </defs>
    </svg>
    <div class="flex flex-col transform translate-y-[-10%]">
      <div class="relative flex flex-row space-between w-screen">
        <div class="z-50 w-1/3 flex items-center">
          <router-link to="/" class="m-auto">
            <IconEvent width="180" height="auto"></IconEvent>
          </router-link>
        </div>
        <div class="z-50 w-2/3 flex flex-row">
          <div class="flex flex-col m-5 max-w-44 text-center mr-14 mt-auto ml-auto">
            <p class="text-2xl font-bold italic">{{ $t('footer.a_propos') }}</p>
            <router-link :to="{name: 'mentions_legales'}"><p>{{ $t('footer.mentions_legales') }}</p></router-link>
            <router-link :to="{name: 'donnees_personnelles'}"><p>{{ $t('footer.donnees_personnelles') }}</p>
            </router-link>
            <router-link :to="{name: 'cgv_billeterie'}"><p>{{ $t('footer.cgv_billeterie') }}</p></router-link>
          </div>
          <div class="flex flex-col m-5 max-w-44 text-center mr-14 mt-auto">
            <p class="text-2xl font-bold italic">{{ $t('footer.services') }}</p>
            <router-link :to="{ name: 'billeterie_list'}"><p>{{ $t('footer.billetteries') }}</p>
            </router-link>
            <router-link :to="{ name: 'ecurie_list' }"><p>{{ $t('footer.visites_ecuries') }}</p>
            </router-link>
            <router-link :to="{ name: 'karting_list' }"><p>{{ $t('footer.karting') }}</p>
            </router-link>
            <router-link :to="{ name: 'montgolfiere_list' }"><p>{{ $t('footer.montgol') }}</p>
            </router-link>
            <router-link :to="{ name: 'shop_list' }"><p>{{ $t('footer.boutique') }}</p>
            </router-link>
          </div>
          <div class="flex flex-col m-5 max-w-44 text-center mt-auto mr-auto">
            <p class="text-2xl font-bold italic">{{ $t('footer.reseaux') }}</p>
            <a target="_blank" href="https://www.instagram.com/24heuresdumans/"><p>{{ $t('footer.instagram') }}</p></a>
            <a target="_blank" href="https://www.facebook.com/24heuresdumans/"><p>{{ $t('footer.facebook') }}</p></a>
            <a target="_blank" href="https://www.youtube.com/24heuresdumans"><p>{{ $t('footer.youtube') }}</p></a>
          </div>
        </div>
      </div>
      <p class="text-2xl font-semibold italic z-20 text-center mt-10">
        {{ $t('footer.realise_par') }} {{ $t('footer.developpeurs') }}
      </p>
    </div>
  </footer>
</template>
<script setup lang="ts">
import IconEvent from "@/components/navigation/navbar/icons/IconEvent.vue";
</script>