<template>
  <v-row class="justify-center pt-12 ma-0" style="position: relative">
    <v-btn absolute top right @click="logOut" outlined>Log out</v-btn>
    <v-col cols="10" md="5">
      <v-row class="mx-0 justify-center mb-4">
        <v-avatar style="color: #404b3b; border: 5px solid #404b3b" :size="!dbUser.isSso ? '100' : '150'">
          <div class="text-h2">
            {{ initials(dbUser) }}
          </div>
        </v-avatar>
      </v-row>
      <div v-if="!dbUser.isSso">
        <label class="text-h6" for="password">Password</label>
        <div class="d-flex">
          <v-text-field
            :readonly="isPasswordReadonly"
            dense
            :rules="isPasswordReadonly ? [] : [rules.required, rules.password, rules.min]"
            :append-icon="!isPasswordReadonly ? (showPassword ? 'mdi-eye' : 'mdi-eye-off') : ''"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            style="border-radius: 6px"
            v-model="password"
            @click:append="showPassword = !showPassword"
            hint="At least 8 characters"
            outlined
          ></v-text-field>
          <v-btn v-if="isPasswordReadonly" @click="editPassword" outlined style="height: 40px; width: 40px" class="ml-3"
            ><v-icon>mdi-pencil</v-icon>
          </v-btn>
          <div v-else class="d-flex">
            <v-btn @click="confirmPasswordEdit" outlined style="height: 40px; width: 40px" class="ml-3"
              ><v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn @click="cancelPasswordEdit" outlined style="height: 40px; width: 40px" class="ml-3"
              ><v-icon>mdi-cancel</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <div class="py-6 py-md-0 justify-center justify-md-end d-flex" v-if="isReadonly">
        <v-btn @click="enableUserInfoEditing" outlined style="height: 40px">Edit your infos </v-btn>
      </div>
      <label class="text-h6" for="displayName">Name</label>
      <v-text-field
        name="displayName"
        :readonly="isReadonly"
        dense
        type="text"
        :rules="[rules.required]"
        style="border-radius: 6px"
        v-model="displayName"
        outlined
      ></v-text-field>
      <label class="text-h6" for="gross">Gross yearly income</label>
      <v-text-field
        :readonly="isReadonly"
        name="gross"
        dense
        :rules="[rules.required]"
        type="number"
        style="border-radius: 6px"
        v-model="gross"
        outlined
      ></v-text-field>
      <label class="text-h6" for="tax">Approx. tax rate</label>
      <v-text-field
        :readonly="isReadonly"
        dense
        name="tax"
        :rules="[rules.required]"
        type="number"
        style="border-radius: 6px"
        v-model="tax"
        outlined
      ></v-text-field>
      <div v-if="!isReadonly" class="d-flex justify-end">
        <v-btn @click="confirmUserInfoEdit" outlined style="height: 40px; width: 40px" class="ml-3"
          ><v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn @click="cancelUserInfoEdit" outlined style="height: 40px; width: 40px" class="ml-3"
          ><v-icon>mdi-cancel</v-icon>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { initials } from "../helper/functions";
import { mapState } from "vuex";
import rules from "../rules/rules";
export default {
  computed: {
    rules() {
      return rules;
    },
    ...mapState({
      dbUser: (state) => state.user.dbUser,
      authUser: (state) => state.user.authUser,
    }),
  },
  data() {
    return {
      initials: initials,
      password: "lllllllllllllllll",
      gross: "",
      tax: "",
      displayName: "",
      isReadonly: true,
      showPassword: false,
      isPasswordReadonly: true,
    };
  },
  methods: {
    enableUserInfoEditing() {
      this.isReadonly = false;
    },
    async logOut() {
      await this.$store.dispatch("user/logOut");
      this.$router.push({ name: "EntryPage", params: { state: "login" } });
    },
    editPassword() {
      this.password = "";
      this.isPasswordReadonly = false;
    },
    confirmUserInfoEdit() {
      const obj = {
        displayName: this.displayName,
        tax: this.tax,
        gross: this.gross,
      };
      this.$store.dispatch("user/editUser", obj);
      this.isReadonly = true;
    },
    confirmPasswordEdit() {
      this.$store.dispatch("user/editUserPassword", this.password).then(() => {
        this.isPasswordReadonly = true;
        this.showPassword = false;
        this.password = "lllllllllllllllll";
      });
    },
    cancelUserInfoEdit() {
      this.isReadonly = true;
    },
    cancelPasswordEdit() {
      this.password = "lllllllllllllllll";
      this.isPasswordReadonly = true;
    },
  },

  mounted() {
    this.displayName = this.dbUser.displayName;
    if (this.dbUser.gross) this.gross = this.dbUser.gross;
    if (this.dbUser.tax) this.tax = this.dbUser.tax;
  },
};
</script>
