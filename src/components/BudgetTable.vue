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
        :items-per-page-options="[10, 20, 30, 40]"
        item-key="index"
      >
        <template v-slot:item.action="{ item }">
          <v-btn icon @click="editExpense(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-dialog transition="scroll-y-reverse-transition" v-model="isConfirmationDeleteOpen" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <v-card>
              <div class="pa-6">
                <div class="text-h5 pb-12" style="font-weight: 600">Are you sure you want to delete this expense?</div>
                <v-row justify="end">
                  <v-btn text class="mr-3" @click="closeConfirmationDialog" color="gray">Cancel</v-btn>
                  <v-btn style="color: white" @click="deleteExpense(item)" color="red">Confirm</v-btn>
                </v-row>
              </div>
            </v-card>
          </v-dialog>
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
        { text: "", value: "action", align: "right", sortable: false },
      ],
      isConfirmationDeleteOpen: false,
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
      this.$emit("selectedListChange", newList);
    },
    closeConfirmationDialog() {
      this.isConfirmationDeleteOpen = false;
    },
    deleteExpense(expense) {
      let expensesCopy = [...this.expenses];
      expensesCopy.splice(expense.index, 1);
      this.$emit("selectedListChange", expensesCopy);
      this.$store.dispatch("budgets/updateExpenses", expensesCopy);
    },
    editExpense(expense) {
      this.$root.$emit("openEditExpenseDialog", expense);
    },
  },
};
</script>
<style scoped></style>
