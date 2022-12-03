<template>
  <v-snackbar
    timeout="-1"
    color="primary"
    outlined
    bottom
    right
    :value="isInfoSnackbarShown"
    vertical
  >
    <div style="font-size: 1.15rem">
      Go to settings to finish your registration and get the full experience of the app
    </div>
    <template v-slot:action="{ attrs }">
      <v-btn color="primary" text v-bind="attrs" @click="closeInfoSnackbar"> Do not show again </v-btn>
      <v-btn color="primary" text v-bind="attrs" @click="goToSettings"> Go to settings </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      isInfoSnackbarShown: (state) => state.general.moreInfoSnackbar,
    }),
  },
  methods: {
    closeInfoSnackbar() {
      this.$store.commit("general/closeMoreInfoSnackbar");
    },
    goToSettings() {
      this.$router.push("/settings");
    },
  },
};
</script>

<style scoped></style>
