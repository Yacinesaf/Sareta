<template>
  <v-app
    :style="{
      backgroundImage: `url(${require('@/assets/' + landingBg)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
    <v-main>
      <div
        style="height: 100vh; display: flex; justify-content: center; align-items: center"
        v-if="requiresAuth && !dbUserAuthId"
      >
        <v-progress-circular indeterminate size="60" width="6" color="primary"></v-progress-circular>
      </div>

      <div v-else>
      <info-snackbar />
        <navbar />
        <back-to-home />
        <snackbar />
        <router-view style="min-height: calc(100vh - 64px)"></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import BackToHome from "./components/BackToHome.vue";
import InfoSnackbar from "./components/InfoSnackbar.vue";
import Navbar from "./components/Navbar.vue";
import Snackbar from "./components/Snackbar.vue";
export default {
  name: "App",

  components: {
    Navbar,
    Snackbar,
    InfoSnackbar,
    BackToHome,
  },
  computed: {
    ...mapState({
      dbUserAuthId: (state) => state.user.dbUser?.firebaseAuthUserUID,
    }),
    requiresAuth() {
      return this.$route.meta.requiresAuth;
    },
    landingBg() {
      if (this.$vuetify.breakpoint.xs) {
        if (this.dbUserAuthId) return "mobileConnected.png";
        return "BgMobile.png";
      } else if (this.$vuetify.breakpoint.sm) {
        if (this.dbUserAuthId) return "iPadConnected.png";
        return "BgIpad.png";
      } else {
        if (this.dbUserAuthId) return "desktopConnected.png";
        return "Bg1.png";
      }
    },
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ellipsisMultiLine {
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
