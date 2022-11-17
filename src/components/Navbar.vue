<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <v-row @click="goHome" align="end" class="mx-0" style="cursor: pointer">
        <div class="text-h4" style="font-family: 'Monoton', cursive !important">S</div>
        <div style="padding-left: 1px" class="text-h6">areta</div>
      </v-row>
      <v-spacer></v-spacer>
      <v-btn v-if="!ifUserIsConnected" @click="goLogin" outlined>Log in</v-btn>
      <v-avatar v-else style="color: black" color="grey lighten-2" size="34"> YS </v-avatar>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({}),
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "EntryPage", params: { state: "login" } });
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Monoton&display=swap");
</style>
