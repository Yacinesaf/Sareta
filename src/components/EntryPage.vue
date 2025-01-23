<template>
  <div class="d-flex justify-center px-3 animationFadeout" style="align-items: center; min-height: calc(100vh - 64px)">
    <v-row justify="center">
      <v-col class="px-0 entryCard animationFadeout" cols="10" sm="9" md="6" lg="4" xl="3">
        <v-card style="border-radius: 16px">
          <v-row justify="center">
            <v-col cols="10" class="animationFadeout" v-if="isChosingSignupMode">
              <div class="text-h5 text-center" style="font-weight: 600">
                Choose a method to sign up and start improving your spening
              </div>
              <v-row>
                <v-col c class="d-flex align-center pt-6" style="flex-direction: column">
                  <v-btn
                    :key="i"
                    v-for="(btn, i) in signupBtns"
                    :style="`min-width: ${btnWidth} !important; width: ${
                      $vuetify.breakpoint.smAndDown ? '90%' : 'unset'
                    }`"
                    x-large
                    @click="getSignupFunction(btn.icon)"
                    class="shadow my-3 justify-start"
                  >
                    <span
                      ><v-icon color="primary" class="mr-2">mdi-{{ btn.icon }}</v-icon></span
                    >
                    <span class="mr-1" v-show="$vuetify.breakpoint.smAndUp">Continue with</span>
                    <span>{{ btn.text }}</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col v-else class="pt-12 pb-6 animationFadeout" cols="10">
              <div v-if="!isLoggingIn" style="position: absolute; top: 2rem; left: 1rem">
                <v-btn elevation="0" color="transparent" @click="returnToChosingSignUpMethod"
                  ><v-icon size="xx-large">mdi-chevron-left</v-icon></v-btn
                >
              </div>
              <div
                v-if="isForgotPasswordMode"
                class="text-h5 text-md-h4 text-center mb-5 mb-md-10"
                style="font-weight: 700"
              >
                Reset password
              </div>
              <div v-else class="text-h5 text-md-h4 text-center mb-5 mb-md-10" style="font-weight: 700">
                {{ isLoggingIn ? "Login" : "Sign up" }}
              </div>
              <v-row v-if="isLoggingIn && !isForgotPasswordMode" justify="center" class="my-6">
                <v-col>
                  <v-btn outlined style="height: 40px; width: 100%" color="primary" @click="ssoSignup(facebookProvider)"
                    ><v-icon class="mr-2">mdi-facebook</v-icon> Facebook</v-btn
                  >
                </v-col>
                <v-col>
                  <v-btn outlined style="height: 40px; width: 100%" color="primary" @click="ssoSignup(googleProvider)"
                    ><v-icon class="mr-2">mdi-google</v-icon> Google</v-btn
                  >
                </v-col>
              </v-row>
              <v-form lazy-validation ref="resetPassword" v-if="isForgotPasswordMode">
                <div class="text-md-h6 text-center mb-4">
                  Please enter your email. If it's linked to an account you'll receive an email to reset your password.
                </div>
                <v-text-field
                  :rules="[rules.required, rules.email]"
                  style="border-radius: 6px"
                  label="Email"
                  outlined
                  v-model="emailPassword"
                  :dense="$vuetify.breakpoint.xsOnly"
                ></v-text-field>
                <v-btn class="float-end" color="primary" @click="sendResetPasswordEmail">Submit</v-btn>
              </v-form>
              <v-form lazy-validation v-else v-model="valid" ref="form">
                <v-text-field
                  :rules="[rules.required]"
                  class="pt-3"
                  style="border-radius: 6px"
                  label="Name"
                  v-model="name"
                  type="text"
                  outlined
                  :dense="$vuetify.breakpoint.xsOnly"
                  v-show="!isLoggingIn"
                ></v-text-field>
                <v-text-field
                  :rules="isLoggingIn ? [rules.required] : [rules.required, rules.email]"
                  style="border-radius: 6px"
                  label="Email"
                  v-model="email"
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
                    label="Password"
                    outlined
                    :dense="$vuetify.breakpoint.xsOnly"
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
                  :rules="[rules.required, matchingPasswords]"
                  :append-icon="showSecondPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showSecondPassword ? 'text' : 'password'"
                  v-model="password1"
                  style="border-radius: 6px"
                  label="Confirm password"
                  outlined
                  :dense="$vuetify.breakpoint.xsOnly"
                  v-show="!isLoggingIn"
                  @click:append="showSecondPassword = !showSecondPassword"
                ></v-text-field>
                <v-btn
                  class="float-end"
                  color="primary"
                  :loading="isBtnLoading"
                  @click="isLoggingIn ? login() : signup()"
                  >{{ isLoggingIn ? "Login" : "Sign up" }}</v-btn
                >
              </v-form>
            </v-col>
            <v-col v-if="!isForgotPasswordMode" cols="10">
              <div v-if="isLoggingIn" class="text-center">
                You don't have an account?
                <span @click="toggleSignupForm" style="color: #21331d; cursor: pointer; font-weight: 600"
                  >Sign up here.</span
                >
              </div>
              <div v-else class="text-center">
                You already have an account?
                <span @click="toggleLoginForm" style="color: #21331d; cursor: pointer; font-weight: 600"
                  >Log in here.</span
                >
              </div>
            </v-col>
            <v-col v-else cols="10">
              <div class="text-center">
                Go back to
                <span @click="goBackToLogin" style="color: #21331d; cursor: pointer; font-weight: 600">Log in.</span>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import rules from "../rules/rules";
import { createUser, checkSsoUserExists } from "../services/endpoints";
import { generateTemplate } from "../services/functions";
export default {
  computed: {
    btnWidth() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return "180px";
      } else {
        return "310px";
      }
    },
    rules() {
      return rules;
    },
  },
  data() {
    return {
      isLoggingIn: false,
      isBtnLoading: false,
      isChosingSignupMode: true,
      isForgotPasswordMode: false,
      showFirstPassword: false,
      showSecondPassword: false,
      googleProvider: null,
      facebookProvider: null,
      auth: null,
      valid: false,
      password: "",
      password1: "",
      email: "",
      emailPassword: "",
      name: "",
      matchingPasswords: () => {
        if (this.password === this.password1) {
          return true;
        } else {
          return "Passwords do not match.";
        }
      },
      signupBtns: [
        { text: "Facebook", icon: "facebook" },
        { text: "Google", icon: "google" },
        { text: "Email", icon: "email" },
      ],
      user: null,
    };
  },
  methods: {
    ssoSignup(provider) {
      signInWithPopup(this.auth, provider)
        .then(async (result) => {
          const userExist = await checkSsoUserExists(result.user.uid);
          const user = {
            firebaseAuthUserUID: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            isSso: true,
            tax: null,
            gross: null,
            members: [],
          };
          if (!userExist?.exists) {
            await createUser(user);
            this.$store.commit("user/setDbUser", user);
            await this.$store.dispatch("budgets/addBudget", generateTemplate(user.displayName));
          } else {
            await this.$store.dispatch("user/getUser", result.user.uid);
          }
          this.$store.commit("user/setAuthUser", {
            displayName: result.user.displayName,
            email: result.user.email,
            uid: result.user.uid,
          });
          this.$router.push("/budgets").catch(()=>{});
        })
        .catch((error) => {
          this.$store.dispatch("snackbar/toggleSnackbar", {
            color: "red",
            message: error.message,
          });
        });
    },
    getSignupFunction(method) {
      switch (method) {
        case "email":
          this.emailSignupChosen();
          break;
        case "google":
          this.ssoSignup(this.googleProvider);
          break;
        case "facebook":
          this.ssoSignup(this.facebookProvider);
          break;
      }
    },
    emailSignupChosen() {
      this.isChosingSignupMode = false;
    },
    returnToChosingSignUpMethod() {
      this.isChosingSignupMode = true;
    },
    toggleLoginForm() {
      this.isLoggingIn = true;
      this.isChosingSignupMode = false;
    },
    toggleSignupForm() {
      this.isLoggingIn = false;
      this.isChosingSignupMode = true;
    },
    goBackToLogin() {
      this.isLoggingIn = true;
      this.isForgotPasswordMode = false;
    },
    forgotPasswordMode() {
      this.isForgotPasswordMode = true;
    },
    sendResetPasswordEmail() {
      if (this.$refs.resetPassword.validate()) {
        this.$store.dispatch("user/sendResetPasswordEmail", this.emailPassword);
        this.$refs.form.reset();
      }
    },
    login() {
      this.isBtnLoading = true;
      this.$store
        .dispatch("user/logIn", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.isBtnLoading = false;
          this.$router.push("/budgets").catch(()=>{});
        });
    },
    signup() {
      if (this.$refs.form.validate()) {
        this.isBtnLoading = true;
        this.$store
          .dispatch("user/emailSignup", {
            email: this.email,
            password: this.password,
            name: this.name,
          })
          .then(() => {
            this.isBtnLoading = false;
            this.$router.push("/budgets").catch(()=>{});
            this.$refs.form.reset();
          });
      }
    },
  },
  created() {
    this.googleProvider = new GoogleAuthProvider();
    this.facebookProvider = new FacebookAuthProvider();
    this.auth = getAuth();
  },
  mounted() {
    this.$root.$on("navbarLoginClicked", this.toggleLoginForm);
    if (this.$route.params.state !== "login") return;
    this.isChosingSignupMode = false;
    this.isLoggingIn = true;
  },
  watch: {
    isLoggingIn: function () {
      if (this.isLoggingIn) {
        this.$router.replace("/login").catch(()=>{});;
      } else {
        this.$router.replace("/signup").catch(()=>{});;
      }
    },
  },
};
</script>

<style scoped>
.entryCard {
  border: 3px #404b3b solid;
  border-radius: 16px;
  box-shadow: -15px 15px 0px 2px rgba(33, 51, 29, 1);
  -webkit-box-shadow: -15px 15px 0px 2px rgba(33, 51, 29, 1);
  -moz-box-shadow: -15px 15px 0px 2px rgba(33, 51, 29, 1);
}
.shadow {
  border: 1px #404b3b solid;
  border-radius: 10px;
  box-shadow: -7.5px 7.5px 0px 2px rgba(33, 51, 29, 1);
  -webkit-box-shadow: -7.5px 7.5px 0px 2px rgba(33, 51, 29, 1);
  -moz-box-shadow: -7.5px 7.5px 0px 2px rgba(33, 51, 29, 1);
}
</style>
