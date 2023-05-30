<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="primary" elevation="2">Add expense</v-btn>
    </template>
    <v-card>
      <v-card-title> Expense </v-card-title>
      <v-form name="addExpense" lazy-validation ref="addExpense">
        <v-card-text>
          <v-text-field
            :rules="[rules.required]"
            v-model="expense.name"
            label="Name"
            outlined
            clearable
            id="expenseName"
          ></v-text-field>
          <v-text-field
            type="number"
            label="Amount"
            outlined
            clearable
            v-model="expense.amount"
            :rules="[rules.required]"
            id="expenseAmount"
          ></v-text-field>
          <v-select v-model="expense.assignee" :items="membersListFormatted" label="Member" outlined> </v-select>
          <v-select v-model="expense.frequency" :items="frequencies" label="Frequency" outlined></v-select>
          <div class="d-flex justify-end">
            <v-btn v-if="isEditing" @click="update" color="primary">Update</v-btn>
            <v-btn v-else @click="confirmed" color="primary">Confirm</v-btn>
          </div>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import rules from "../rules/rules";
export default {
  computed: {
    ...mapState({
      user: (state) => state.user.dbUser,
      budget: (state) => state.budgets.currentBudget,
    }),
    rules() {
      return rules;
    },
    membersListFormatted() {
      let membersList = this.user.members.map((e) => e.name);
      membersList.unshift(this.user.displayName);
      return membersList;
    },
  },
  data() {
    return {
      dialog: false,
      expense: {
        name: "",
        amount: null,
        assignee: this.user?.displayName,
        frequency: "Daily",
        isActive: true,
      },
      editingExpenseIndex: null,
      isEditing: false,
      frequencies: ["Daily", "Weekly", "Monthly", "Yearly"],
    };
  },
  methods: {
    confirmed() {
      if (this.$refs.addExpense.validate()) {
        if (!this.expense.assignee) this.expense.assignee = this.user.displayName;
        this.expense.amount = Number(this.expense.amount);
        const expensesList = [...this.budget.expenses, this.expense];
        this.$store.dispatch("budgets/updateExpenses", expensesList).then(() => {
          this.$emit("addedExpense", this.expense);
          this.dialog = false;
        });
      }
    },
    update() {
      if (this.$refs.addExpense.validate()) {
        let updatedList = [...this.budget.expenses];
        this.expense.amount = Number(this.expense.amount);
        updatedList.splice(this.editingExpenseIndex, 1, this.expense);
        this.$store.dispatch("budgets/updateExpenses", updatedList).then(() => {
          this.expense.index = this.editingExpenseIndex;
          this.$emit("updateExpense", this.expense);
          this.dialog = false;
        });
      }
    },
    openDialog(expense) {
      let copyExpense = { ...expense };
      this.editingExpenseIndex = copyExpense.index;
      delete copyExpense.index;
      this.expense = copyExpense;
      this.isEditing = true;
      this.dialog = true;
    },
  },
  mounted() {
    this.$root.$on("openEditExpenseDialog", (expense) => {
      this.openDialog(expense);
    });
  },
  watch: {
    dialog: function (newValue, old) {
      old;
      if (!newValue) {
        this.expense = {
          name: "",
          amount: null,
          assignee: "",
          frequency: "Daily",
          isActive: true,
        };
        this.editingExpenseIndex = null;
        this.isEditing = false;
      }
    },
  },
};
</script>
