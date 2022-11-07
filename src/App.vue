<template>
  <v-app>
    <v-main>
      <navbar />
      <div class="mt-6">
        <back-to-home />
        <calculator />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import BackToHome from "./components/BackToHome.vue";
import Calculator from "./components/Calculator.vue";
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",

  components: {
    Calculator,
    Navbar,
    BackToHome,
  },

  data: () => ({
    //
  }),
};
</script>
