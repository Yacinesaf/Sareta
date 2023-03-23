<template>
  <v-app style="background: #f1eee7">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
    <div
      style="height: 100vh; display: flex; justify-content: center; align-items: center"
      v-if="requiresAuth && !authUser"
    >
      <v-progress-circular indeterminate size="60" width="6" color="primary"></v-progress-circular>
    </div>
    <v-main v-else>
      <navbar />
      <snackbar />
      <info-snackbar />
      <router-view style="min-height: calc(100vh - 64px)"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import InfoSnackbar from "./components/InfoSnackbar.vue";
import Navbar from "./components/Navbar.vue";
import Snackbar from "./components/Snackbar.vue";
export default {
  name: "App",

  components: {
    Navbar,
    Snackbar,
    InfoSnackbar,
  },
  computed: {
    ...mapState({
      authUser: (state) => state.user.authUser?.uid,
    }),
    requiresAuth() {
      return this.$route.meta.requiresAuth;
    },
  },
  data: () => ({
    //
  }),

};
</script>

<style scoped></style>
