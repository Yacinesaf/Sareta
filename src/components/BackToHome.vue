<template>
  <v-btn fab style="position: fixed; left: 1rem; top: 4.3rem" @click="goHome"><v-icon>mdi-chevron-left</v-icon></v-btn>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
