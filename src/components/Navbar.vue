<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-row @click="goHome" align="end" class="mx-0" style="cursor: pointer">
        <div class="text-h4" style="font-family: 'Monoton', cursive !important">S</div>
        <div style="padding-left: 1px" class="text-h6">areta</div>
      </v-row>
      <v-spacer></v-spacer>
      <v-btn v-if="!user" @click="goLogin" outlined>Log in</v-btn>
      <v-menu offset-y v-else open-on-hover bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-bind="attrs" v-on="on" style="color: white; border: 2px solid white; cursor: pointer" size="40">
            {{ initials(user) }}
          </v-avatar>
        </template>
        <v-list>
          <v-list-item ripple style="cursor: pointer">
            <v-list-item-title @click="logOut">Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "EntryPage", params: { state: "login" } });
    },
    goHome() {
      this.$router.push({ name: "LandingPage" });
    },
    initials(user) {
      let splitedName = user.displayName.split(" ");
      let firstNameInitial = splitedName[0].split("")[0];
      let lastNameInitial = splitedName[1].split("")[0];
      return firstNameInitial.toUpperCase() + lastNameInitial.toUpperCase();
    },
    async logOut() {
      await this.$store.dispatch("user/logOut");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Monoton&display=swap");
</style>
