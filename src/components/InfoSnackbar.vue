<template>
  <v-snackbar timeout="-1" color="primary" outlined bottom right :value="isInfoSnackbarShown" vertical>
    <div style="font-size: 1.15rem">
      Go to Profile to finish your registration and get the full experience of the app
    </div>
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
      isInfoSnackbarShown: (state) => state.general.moreInfoSnackbar,
    }),
  },
  methods: {
    closeInfoSnackbar() {
      this.$store.commit("general/closeMoreInfoSnackbar");
    },
    goToProfile() {
      this.$router.push("/profile");
    },
  },
};
</script>

<style scoped></style>
