<template>
  <v-snackbar transition="scroll-y-reverse-transition" :value="isShowed" absolute bottom :color="color" >
    {{ message }}
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      color: (state) => state.snackbar.color,
      message: (state) => state.snackbar.message,
      isShowed: (state) => state.snackbar.value,
    }),
  },
};
</script>
