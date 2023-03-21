<template>
  <v-row class="justify-center py-12">
    <v-col cols="10" md="5">
      <v-row class="mx-0 justify-center mb-12">
        <v-avatar style="color: #404b3b; border: 5px solid #404b3b" size="180">
          <div class="text-h2">
            {{ initials(user) }}
          </div>
        </v-avatar>
      </v-row>
      <div :key="i" v-for="(textField, i) in textFields">
        <label class="text-h6" :for="textField.label">{{ textField.label }}</label>
        <v-text-field
          :name="textField.label"
          :readonly="textField.isReadOnly"
          :rules="textField.rules"
          style="border-radius: 6px"
          v-model="textField.value"
          outlined
          :type="textField.type"
        ></v-text-field>
      </div>
    </v-col>
    <!-- <v-text-field
      readonly
      :rules="[rules.required]"
      style="border-radius: 6px"
      v-model="passwordReset"
      outlined
    ></v-text-field>
    <v-text-field
      readonly
      :rules="[rules.required]"
      style="border-radius: 6px"
      v-model="netIncome"
      outlined
    ></v-text-field>
    <v-text-field
      readonly
      :rules="[rules.required]"
      style="border-radius: 6px"
      v-model="approxTax"
      outlined
    ></v-text-field>
    <v-text-field readonly :rules="[rules.required]" style="border-radius: 6px" v-model="name" outlined></v-text-field>
    <v-text-field
      readonly
      :rules="[rules.required]"
      style="border-radius: 6px"
      v-model="currency"
      outlined
    ></v-text-field> -->
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
      user: (state) => state.user.user,
    }),
  },
  data() {
    return {
      initials: initials,
      textFields: [
        { rules: [], value: "", isReadOnly: true, type: "text", label: "Name", key: "name" },
        {
          rules: [],
          value: "lllllllllllllllll",
          isReadOnly: true,
          type: "password",
          label: "Password",
          key: "password",
        },
        { rules: [], value: "", isReadOnly: true, type: "number", label: "Net income", key: "net" },
        {
          rules: [],
          value: "",
          isReadOnly: true,
          type: "number",
          label: "Approximate tax percentage per year",
          key: "tax",
        },
      ],
      passwordReset: "",
      netIncome: "",
      approxTax: "",
      name: "",
    };
  },
  mounted() {
    this.textFields.forEach((element) => {
      switch (element.key) {
        case "name":
          element.value = this.user.displayName;
          break;
        case "net":
          element.value = this.user.net;
          break;
        case "tax":
          element.value = this.user.tax;
          break;
        default:
      }
    });
  },
};
</script>
