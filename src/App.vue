<template>
  <v-app style="background: #f1eee7">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
    <v-main>
      <!-- 
      <div class="mt-6">
        <back-to-home />
        <calculator />
      </div> -->
      <navbar />
      <snackbar />
      <router-view style="min-height: calc(100vh - 48px)"></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import BackToHome from "./components/BackToHome.vue";
// import Calculator from "./components/Calculator.vue";
import Navbar from "./components/Navbar.vue";
import Snackbar from './components/Snackbar.vue';
export default {
  name: "App",

  components: {
    // Calculator,
    Navbar,
    Snackbar,
    // BackToHome,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped></style>
