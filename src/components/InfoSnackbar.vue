<template>
  <v-snackbar max-width="270px" timeout="-1" color="orange" bottom right :value="isInfoSnackbarShown" vertical>
    Go to settings to finish your registration and get the full experience of the app
    <template v-slot:action="{ attrs }">
      <v-btn  text v-bind="attrs" @click="closeInfoSnackbar"> Close </v-btn>
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
  },
};
</script>

<style scoped></style>
