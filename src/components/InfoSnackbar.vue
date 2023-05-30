<template>
  <v-snackbar
    timeout="-1"
    color="primary"
    outlined
    bottom
    right
    :value="!showInfoSnackbar && notProfile && IsAuthenticated"
    vertical
  >
    <div style="font-size: 1.05rem">Go to Profile to finish your registration</div>
    <template v-slot:action="{ attrs }">
      <v-btn color="primary" text v-bind="attrs" @click="closeInfoSnackbar"> Do not show again </v-btn>
      <v-btn color="primary" text v-bind="attrs" @click="goToProfile"> Go to Profile </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      showInfoSnackbar: (state) => state.user.dbUser?.dontShowAlertAgain,
      user: (state) => state.user.dbUser,
    }),
    completed() {
      return this.user?.gross && this.user?.tax;
    },
    notProfile() {
      return this.$route.path !== "/profile";
    },
    IsAuthenticated() {
      return this.$route.meta.requiresAuth;
    },
  },
  methods: {
    closeInfoSnackbar() {
      this.$store.dispatch("user/editSnackbarInfo");
    },
    goToProfile() {
      this.$router.push("/profile");
    },
  },
  watch: {
    completed: function () {
      this.$store.dispatch("user/editSnackbarInfo");
    },
  },
};
</script>

<style scoped></style>
