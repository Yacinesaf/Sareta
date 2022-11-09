<template>
  <div>
    <v-card class="rounded-lg">
      <v-data-table
        :sort-by="['name', 'frequency', 'amount', 'assignee']"
        v-model="selected"
        :single-select="singleSelect"
        show-select
        :headers="tableHeader"
        :items="expenses"
        :items-per-page="5"
        class="elevation-1"
        item-key="name"
      >
        <template v-slot:item.action="{ item }">
          <v-btn icon @click="editExpense(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteExpense(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeader: [
        { text: "", value: "checkbox" },
        { text: "Name", value: "name" },
        { text: "Frequency", value: "frequency" },
        { text: "Amount", value: "amount" },
        { text: "Assignee", value: "assignee", align: this.doesHaveAssignee ? "d-block" : "d-none" },
        { text: "", value: "action", align: "right" },
      ],
      doesHaveAssignee: false,
      singleSelect: false,
      selected: [],
      userCurencySymbol: "$",
      expenses: [
        { name: "car gass", frequency: "weekly", amount: 51.27, assignee: "Islam" },
        { name: "car gasss", frequency: "weekly", amount: 51.27, assignee: "yacine" },
        { name: "car gassss", frequency: "weekly", amount: 51.27, assignee: "Islam" },
        { name: "car gasw", frequency: "weekly", amount: 51.27, assignee: "Islam" },
        { name: "car gase", frequency: "weekly", amount: 51.27, assignee: "Islam" },
        { name: "car gast", frequency: "weekly", amount: 51.27, assignee: "Islam" },
        { name: "car gasr", frequency: "weekly", amount: 51.27, assignee: "Islam" },
        { name: "car gasy", frequency: "weekly", amount: 51.27, assignee: "Islam" },
      ],
    };
  },
  computed: {
    isExpensesLengthOverTen() {
      return this.expenses.length >= 10;
    },
  },
  methods: {
    amount(amount) {
      return `${parseFloat(amount).toFixed(2)} ${this.userCurencySymbol}`;
    },
    deleteExpense(expense) {
      console.log(expense);
    },
    editExpense(expense) {
      console.log(expense);
    },
  },
};
</script>
<style scoped></style>
