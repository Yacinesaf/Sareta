<template>
  <v-row
    class="ma-0 animationFadeout"
    justify="center"
    align="center"
  >
    <v-col cols="12" md="8" lg="5">
      <div class="text-h3 text-md-h2 text-center textShadow" style="font-weight: 600">
        Take your finance planing to the next Step
      </div>
      <div class="text-center pt-6">Sign up right now to structure you spending</div>
      <div class="d-flex justify-center pt-6">
        <v-btn @click="goSignup" x-large class="shadow"> Sign up </v-btn>
      </div>
    </v-col>
    <div></div>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    goSignup() {
      this.$router.push({ name: "EntryPage", params: { state: "signup" } });
    },
  },
};
</script>

<style scoped>
.shadow {
  border: 1px #404b3b solid;
  border-radius: 10px;
  box-shadow: -7.5px 7.5px 0px 2px rgba(33, 51, 29, 1);
  -webkit-box-shadow: -7.5px 7.5px 0px 2px rgba(33, 51, 29, 1);
  -moz-box-shadow: -7.5px 7.5px 0px 2px rgba(33, 51, 29, 1);
  cursor: pointer;
}
</style>
