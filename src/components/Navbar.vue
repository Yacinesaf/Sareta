<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-row @click="goHome" align="end" class="mx-0" style="cursor: pointer">
        <div class="text-h4" style="font-family: Monoton, cursive !important">
          S
        </div>
        <div style="padding-left: 1px" class="text-h6">areta</div>
      </v-row>
      <v-spacer></v-spacer>
      <v-btn v-if="!authUser" @click="goLogin" outlined>Log in</v-btn>
      <v-menu offset-y v-if="dbUser" open-on-hover bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            @click="goToProfile"
            v-bind="attrs"
            v-on="on"
            style="color: white; border: 2px solid white; cursor: pointer"
            size="40"
          >
            {{ initials(dbUser) }}
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
import { initials } from "../helper/functions";
export default {
  computed: {
    ...mapState({
      dbUser: (state) => state.user.dbUser,
      authUser: (state) => state.user.authUser,
    }),
  },
  data() {
    return {
      initials: initials,
    };
  },
  methods: {
    goLogin() {
      if (this.$route.path === "/") {
        this.$router.push({ name: "EntryPage", params: { state: "login" } });
      } else {
        if (this.$route.path === "/login") return;
        this.$root.$emit("navbarLoginClicked");
      }
    },
    goHome() {
      if (this.dbUser) this.$router.push({ name: "Budgets" });
      this.$router.push({ name: "LandingPage" });
    },
    goToProfile() {
      if (this.$route.path === "/profile") return;
      this.$router.push({ name: "Profile" });
    },
    async logOut() {
      await this.$store.dispatch("user/logOut");
      this.$router.push({ name: "EntryPage", params: { state: "login" } });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Monoton&display=swap");
</style>
