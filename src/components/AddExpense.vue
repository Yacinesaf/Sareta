<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="primary" elevation="2">Add Expense</v-btn>
    </template>
    <v-card>
      <v-card-title> Expense </v-card-title>
      <v-card-text>
        <v-text-field v-model="expenseName" label="Name" outlined clearable id="expenseName"></v-text-field>
        <v-text-field
          type="number"
          v-model="expenseAmount"
          label="Amount"
          outlined
          clearable
          id="expenseAmount"
        ></v-text-field>
        <v-select v-model="expenseFrequency" :items="items" label="Frequency" outlined></v-select>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn @click="confirmed" :disabled="!expenseFormCompleted" color="primary">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    expenseFormCompleted() {
      return Boolean(this.expenseName.length && this.expenseAmount);
    },
  },
  data() {
    return {
      dialog: false,
      expenseName: "",
      expenseAmount: null,
      rate: null,
      expenseFrequency: "Daily",
      items: ["Daily", "Weekly", "Monthly", "Yearly"],
    };
  },
  methods: {
    confirmed() {
      this.dialog = false;
      this.$emit("expenseAdded", [this.expenseName, this.expenseAmount, this.expenseFrequency]);
    },
  },
};
</script>
