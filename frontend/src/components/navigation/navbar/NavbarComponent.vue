<template>
  <nav class="w-full fixed top-2 left-0 flex flex-row space-between z-50">
    <div
        class="w-1/12 bg-dark mr-auto ml-8 rounded-full text-white p-4 flex justify-center content-center shadow-2xl shadow-green-700">
      <router-link to="/">
        <IconEvent height="30"></IconEvent>
      </router-link>
    </div>
    <div
        class="min-w-6/12 bg-dark m-auto rounded-full text-white flex flex-row font-semibold space-x-8 p-4 px-16 justify-center content-center shadow-2xl shadow-red-700">
      <router-link to="/billetterie"><p>Billetterie</p></router-link>
      <router-link to="/boutique"><p>Boutique</p></router-link>
      <router-link to="/carte"><p>Carte</p></router-link>
      <!-- L'utilisation de mode: hash est trop complexe-->
      <a href="/#service">Prestataires</a>
      <router-link to="/karting">Karting</router-link>
      <router-link to="/montgolfiere">Montgolfière</router-link>
    </div>

    <router-link
        to="/cart"
        style="height: 60px"
        class="cursor-pointer min-w-1/12 bg-dark ml-auto p-4 rounded-full text-white font-semibold mr-8 flex flex-row justify-center content-center shadow-2xl shadow-blue-700"
        :class="{'invisible': $route.meta.hideCart}">
      <svg class="fill-white m-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
            d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921z"></path>
        <circle cx="10.5" cy="19.5" r="1.5"></circle>
        <circle cx="17.5" cy="19.5" r="1.5"></circle>
      </svg>
      <p class="ml-2 my-auto">{{ getCartCount(userId) }}</p>
    </router-link>

    <div
        class="min-w-1/12 bg-dark ml-0 p-4 rounded-full text-white font-semibold mr-8 flex flex-row justify-center content-center shadow-2xl shadow-blue-700"
        style="height: 60px">

      <router-link to="/login" v-if="!loggedInUser"><p>Login</p></router-link>
      <router-link to="/client/panel" v-else-if="loggedInUser && userType === Selected.User">
        <p>Mon profil</p>
      </router-link>
      <router-link to="/prestataire/panel" v-else-if="loggedInUser && userType === Selected.Prestataire">
        <p>Dashboard</p>
      </router-link>
      <router-link to="/admin/panel" v-else-if="loggedInUser && userType === Selected.Admin">
        <p>Dashboard</p>
      </router-link>

      <svg class="min-w-4 max-w-5 h-auto ml-1.5" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
           viewBox="0 0 30 30" fill="none">
        <g clip-path="url(#clip0_95_645)">
          <path
              d="M2.5 27.5C2.5 24.8478 3.55357 22.3043 5.42893 20.4289C7.3043 18.5536 9.84783 17.5 12.5 17.5C15.1522 17.5 17.6957 18.5536 19.5711 20.4289C21.4464 22.3043 22.5 24.8478 22.5 27.5H2.5ZM12.5 16.25C8.35625 16.25 5 12.8938 5 8.75C5 4.60625 8.35625 1.25 12.5 1.25C16.6437 1.25 20 4.60625 20 8.75C20 12.8938 16.6437 16.25 12.5 16.25ZM21.7037 19.0413C23.6158 19.5327 25.3241 20.6148 26.5854 22.1335C27.8467 23.6523 28.5968 25.5302 28.7287 27.5H25C25 24.2375 23.75 21.2675 21.7037 19.0413ZM19.175 16.1962C20.2225 15.2593 21.0602 14.1117 21.6332 12.8284C22.2062 11.5452 22.5016 10.1554 22.5 8.75C22.5027 7.04183 22.0657 5.36171 21.2312 3.87125C22.647 4.15574 23.9206 4.92172 24.8356 6.039C25.7505 7.15627 26.2503 8.55591 26.25 10C26.2503 10.8906 26.0603 11.7709 25.6926 12.5821C25.325 13.3932 24.7882 14.1164 24.1182 14.7032C23.4482 15.2899 22.6606 15.7267 21.808 15.9842C20.9555 16.2417 20.0578 16.314 19.175 16.1962Z"
              class="fill-white"/>
        </g>
        <defs>
          <clipPath id="clip0_95_645">
            <rect width="30" height="30" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  </nav>
</template>

<script lang="ts">
import IconEvent from "@/components/navigation/navbar/icons/IconEvent.vue";
import {mapActions, mapGetters, mapState} from "vuex";
import {Selected} from "@/utils";

export default {
  name: "NavbarComponent",
  components: {IconEvent},
  data() {
    return {
      Selected
    }
  },
  beforeMount() {
    this.getCarts();
  },
  methods: {
    ...mapActions('prestataire/boutique', ['getCarts'])
  },
  computed: {
    ...mapState('login', ['loggedInUser', 'userType']),
    ...mapGetters('prestataire/boutique', ['getCart', 'getCartCount']),
    userId() {
      return this.loggedInUser?.user_id || 'guest';
    },
    cartCount() {
      return this.getCartCount(this.user_id)
    }
  }
}
</script>