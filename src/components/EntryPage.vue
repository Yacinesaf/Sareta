<template>
  <div class="d-flex justify-center px-3" style="align-items: center; height: 100vh; width: 100%">
    <v-row style="position: absolute; z-index: 2; width: 100%" justify="center">
      <v-col class="px-0 entryCard" cols="11" sm="9" md="6" lg="4">
        <v-card style="border-radius: 16px">
          <v-row justify="center">
            <v-col class="pt-12 pb-6" cols="10">
              <div class="text-h4 text-center mb-10" style="font-weight: 700">
                {{ isLoggingIn ? "Login" : "Sign up" }}
              </div>
              <v-form v-model="valid" ref="form">
                <v-text-field
                  :rules="[rules.required]"
                  class="pt-3"
                  style="border-radius: 6px"
                  placeholder="Name"
                  outlined
                  v-show="!isLoggingIn"
                ></v-text-field>
                <v-text-field
                  :rules="isLoggingIn ? [rules.required] : [rules.required, rules.email]"
                  style="border-radius: 6px"
                  placeholder="Email"
                  outlined
                ></v-text-field>
                <v-text-field
                  style="border-radius: 6px"
                  placeholder="Net Income"
                  outlined
                  v-show="!isLoggingIn"
                ></v-text-field>
                <v-text-field
                  style="border-radius: 6px"
                  placeholder="approximate tax %"
                  v-show="!isLoggingIn"
                  outlined
                ></v-text-field>
                <div
                  :class="{
                    'mb-4': isLoggingIn,
                  }"
                  style="position: relative"
                >
                  <v-text-field
                    :rules="isLoggingIn ? [rules.required] : [rules.required, rules.min]"
                    :append-icon="showFirstPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showFirstPassword ? 'text' : 'password'"
                    v-model="password"
                    style="border-radius: 6px"
                    placeholder="Password"
                    outlined
                    :counter="!isLoggingIn"
                    @click:append="showFirstPassword = !showFirstPassword"
                  >
                  </v-text-field>
                  <div
                    @click="forgotPasswordMode"
                    style="position: absolute; right: 0; bottom: 4px; cursor: pointer"
                    v-show="isLoggingIn"
                  >
                    Forgot password?
                  </div>
                </div>
                <v-text-field
                  :rules="[rules.required, rules.matchingPasswords]"
                  :append-icon="showSecondPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showSecondPassword ? 'text' : 'password'"
                  v-model="password1"
                  style="border-radius: 6px"
                  placeholder="Confirm password"
                  outlined
                  v-show="!isLoggingIn"
                  @click:append="showSecondPassword = !showSecondPassword"
                ></v-text-field>
                <v-btn class="float-end" color="primary" @click="lo">{{ isLoggingIn ? "Login" : "Sign up" }}</v-btn>
              </v-form>
            </v-col>
            {{ is }}
            <v-col cols="10">
              <div v-if="isLoggingIn" class="text-center">
                You don't have an account?
                <span @click="SwitchingEntryForm" style="color: #21331d; cursor: pointer; font-weight: 600"
                  >Sign up here.</span
                >
              </div>
              <div v-else class="text-center">
                You already have an account?
                <span @click="SwitchingEntryForm" style="color: #21331d; cursor: pointer; font-weight: 600"
                  >Log in here.</span
                >
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {},
  data() {
    return {
      isLoggingIn: false,
      isForgotPasswordMode: false,
      showFirstPassword: false,
      showSecondPassword: false,
      valid: false,
      password: "",
      password1: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        matchingPasswords: () => {
          if (this.password === this.password1) {
            return true;
          } else {
            return "Passwords do not match.";
          }
        },
      },
    };
  },
  methods: {
    SwitchingEntryForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },
    forgotPasswordMode() {
      this.isForgotPasswordMode = true;
    },
    lo() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.entryCard {
  border: 3px #404b3b solid;
  border-radius: 16px;
  box-shadow: -30px 30px 0px 2px rgba(33, 51, 29, 1);
  -webkit-box-shadow: -30px 30px 0px 2px rgba(33, 51, 29, 1);
  -moz-box-shadow: -30px 30px 0px 2px rgba(33, 51, 29, 1);
}
</style>
