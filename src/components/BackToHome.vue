<template>
  <v-btn
    depressed
    v-if="showBackBtn"
    color="transparent"
    style="position: absolute; left: 1rem; top: 5rem; z-index: 100"
    @click="goHome"
    ><v-icon size="2.5rem">mdi-chevron-left</v-icon></v-btn
  >
</template>

<script>
export default {
  computed: {
    showBackBtn() {
      return this.$route.meta.requiresAuth && this.$route.path !== "/budgets";
    },
  },
  methods: {
    goHome() {
      this.$router.push("/budgets");
    },
  },
};
</script>
