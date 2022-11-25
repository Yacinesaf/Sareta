<template>
  <v-snackbar max-width="250px" timeout="-1" color="orange" bottom right :value="isInfoSnackbarShown" vertical>
    <template v-slot:default>
      <div>
        <v-btn class="float-right" color="indigo" text v-bind="attrs" @click="closeInfoSnackbar">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div>Go to settings to finish your registration and get the full experience of the app</div>
      </div>
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
