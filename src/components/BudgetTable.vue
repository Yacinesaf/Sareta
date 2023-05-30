<template>
  <div>
    <v-card class="rounded-lg">
      <v-data-table
        :sort-by="['name']"
        :value="selected"
        @input="changeSelectedList"
        :single-select="false"
        show-select
        must-sort
        :loading="isFetching"
        :headers="tableHeader"
        :items="isFetching ? [] : indexedExpenses"
        :items-per-page="10"
        class="elevation-1"
        :items-per-page-options="[10,20,30,40]"
        item-key="index"
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableHeader: [
        { text: "", value: "checkbox" },
        { text: "Name", value: "name" },
        { text: "Frequency", value: "frequency" },
        { text: "Amount", value: "amount" },
        { text: "Assignee", value: "assignee" },
        { text: "", value: "action", align: "right" },
      ],
      userCurencySymbol: "$",
    };
  },
  props: {
    selected: Array,
    indexedExpenses: Array,
  },
  computed: {
    ...mapState({
      expenses: (state) => state.budgets.currentBudget?.expenses,
      isFetching: (state) => state.budgets.isFetching,
    }),

  },
  methods: {
    changeSelectedList(newList) {
      this.$emit("selectedListChange", newList)
    },
    deleteExpense(expense) {
      let expensesCopy = [...this.expenses];
      expensesCopy.splice(expense.index, 1);
      this.$emit("selectedListChange", expensesCopy)
      this.$store.dispatch("budgets/updateExpenses", expensesCopy);
    },
    editExpense(expense) {
      this.$root.$emit("openEditExpenseDialog", expense);
    },
  },
  // watch: {
  //   selected: function () {
  //     this.$emit("selectedExpenses", this.selected);
  //   },
  //   selectedExpenses: function () {
  //     this.selected = this.selectedExpenses
  //   },
  // },
};
</script>
<style scoped></style>
