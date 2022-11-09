<template>
  <div class="d-flex justify-center px-3" style="align-items: center; height: 100vh; width: 100%">
    <v-row style="position: absolute; z-index: 2; width: 100%" justify="center">
      <v-col class="px-0 entryCard" cols="11" sm="9" md="6" lg="4">
        <v-card style="border-radius: 16px; z-index: 5">
          <v-row justify="center">
            <v-col class="py-12" cols="10">
              <div class="text-h4 text-center mb-16" style="font-weight: 700">
                {{ isLoggingIn ? "Login" : "Sign up" }}
              </div>
              <v-form v-model="valid" ref="form">
                <v-text-field
                  :rules="[rules.required]"
                  class="pt-3"
                  style="border-radius: 6px"
                  placeholder="Name"
                  filled
                ></v-text-field>
                <v-text-field
                  :rules="[rules.required, rules.email]"
                  class="pb-3"
                  style="border-radius: 6px"
                  placeholder="Email"
                  filled
                  v-show="!isLoggingIn"
                ></v-text-field>
                <v-text-field
                  class="pb-3"
                  style="border-radius: 6px"
                  placeholder="Net Income"
                  filled
                  v-show="!isLoggingIn"
                ></v-text-field>
                <v-text-field
                  class="pb-3"
                  style="border-radius: 6px"
                  placeholder="approximate tax %"
                  filled
                ></v-text-field>
                <v-text-field
                  :rules="[rules.required, rules.min]"
                  class="pb-3"
                  :append-icon="showFirstPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showFirstPassword ? 'text' : 'password'"
                  v-model="password"
                  style="border-radius: 6px"
                  placeholder="Password"
                  filled
                  counter
                  @click:append="showFirstPassword = !showFirstPassword"
                ></v-text-field>
                <v-text-field
                  :rules="[rules.required, rules.matchingPasswords]"
                  class="pb-3"
                  :append-icon="showSecondPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showSecondPassword ? 'text' : 'password'"
                  v-model="password1"
                  style="border-radius: 6px"
                  placeholder="Confirm password"
                  filled
                  @click:append="showSecondPassword = !showSecondPassword"
                ></v-text-field>
                <v-btn class="float-end" color="primary" @click="lo">{{ isLoggingIn ? "Login" : "Sign up" }}</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggingIn: false,
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
    lo() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.entryCard {
  border: 3px #404b3b solid;
  min-height: 500px;
  border-radius: 16px;
  box-shadow: -31px 29px 0px 2px rgba(33, 51, 29, 1);
  -webkit-box-shadow: -31px 29px 0px 2px rgba(33, 51, 29, 1);
  -moz-box-shadow: -31px 29px 0px 2px rgba(33, 51, 29, 1);
}
</style>
