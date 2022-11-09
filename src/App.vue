<template>
  <v-app style="background: #f1eee7">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
    <v-main>
      <!-- <navbar />
      <div class="mt-6">
        <back-to-home />
        <calculator />
      </div> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import BackToHome from "./components/BackToHome.vue";
// import Calculator from "./components/Calculator.vue";
// import Navbar from "./components/Navbar.vue";
export default {
  name: "App",

  components: {
    // Calculator,
    // Navbar,
    // BackToHome,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped></style>
