<template>
  <v-scroll-y-transition>
    <v-row v-if="currentBudget" class="pt-8 ma-0" justify="center">
      <v-row justify="center" class="ma-0 pt-6 pt-md-0">
        <v-col cols="11" md="9" lg="8">
          <v-row class="mb-3">
            <v-col cols="12" lg="8">
              <v-form lazy-validation v-if="isEditingName" v-model="validName">
                <v-text-field
                  autofocus
                  v-click-outside="onClickOutsideName"
                  :rules="[rules.required]"
                  v-model="newBudgetName"
                  clearable
                >
                  <template v-slot:append-outer>
                    <v-btn elevation="0" outlined :disabled="!validName" @click="confirmChanges('name')">
                      <v-icon>mdi-check</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-form>
              <div
                class="text-h4 text-md-h3 font-weight-bold"
                v-else
                @click="enableEditBudgetName"
                style="font-size: 3rem; cursor: pointer"
              >
                {{ currentBudget?.name }}
              </div>
              <v-form lazy-validation v-if="isEditingDesc" v-model="validDesc">
                <v-textarea
                  autofocus
                  v-click-outside="onClickOutsideDesc"
                  :rules="[rules.required]"
                  v-model="newBudgetDesc"
                  clearable
                >
                  <template v-slot:append-outer>
                    <v-btn elevation="0" outlined :disabled="!validDesc" @click="confirmChanges">
                      <v-icon>mdi-check</v-icon>
                    </v-btn>
                  </template>
                </v-textarea>
              </v-form>
              <div
                v-else
                @click="enableEditBudgetDesc"
                style="font-size: 1.15rem; cursor: pointer; max-width: 300px"
                class="ellipsis"
              >
                {{ currentBudget?.description }}
              </div>
            </v-col>
            <v-col cols="12" lg="4"><assignee-card /></v-col>
          </v-row>
          <v-row class="justify-end">
            <v-col cols="6" md="4" lg="3" xl="2">
              <v-select
                @change="updateBudgetCurrency"
                v-model="currencySymbol"
                :items="currencyItems"
                label="Currency"
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <detailed-results
            :sumPerMemberList="sumPerMemberList"
            :selected="selected"
            :monthlyBudget="monthlyBudget"
            :approxIncome="approxIncome"
            :yearlyBudget="yearlyBudget"
            :diffPercentage="diffPercentage"
            :currency="currencySymbol"
            :budget="currentBudget"
          />
          <div class="my-3 d-flex justify-end">
            <add-expense @addedExpense="addExpenseSelectedItems" @updateExpense="updateSelectedItems" />
          </div>
          <div>
            <budget-table @selectedListChange="setSelected" :indexedExpenses="indexedExpenses" :selected="selected" />
          </div>
        </v-col>
      </v-row>
    </v-row>
  </v-scroll-y-transition>
</template>

<script>
import { mapState } from "vuex";
import AddExpense from "./AddExpense.vue";
import AssigneeCard from "./AssigneeCard.vue";
import BudgetTable from "./BudgetTable.vue";
import DetailedResults from "./DetailedResults.vue";
import rules from "../rules/rules";

export default {
  components: { AddExpense, BudgetTable, AssigneeCard, DetailedResults },
  computed: {
    ...mapState({
      currentBudget: (state) => state.budgets.currentBudget,
      currency: (state) => state.budgets.currentBudget?.currency,
      user: (state) => state.user.dbUser,
    }),
    allDailyExpenses() {
      return this.selected
        ?.filter((expense) => expense.frequency == "Daily")
        .reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    },
    allWeeklyExpenses() {
      return this.selected
        ?.filter((expense) => expense.frequency == "Weekly")
        .reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    },
    allMonthlyExpenses() {
      return this.selected
        ?.filter((expense) => expense.frequency == "Monthly")
        .reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    },
    allYearlyExpenses() {
      return this.selected
        ?.filter((expense) => expense.frequency == "Yearly")
        .reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    },
    monthlyBudget() {
      const dailies = (this.allDailyExpenses * 365) / 12;
      const weeklies = (this.allWeeklyExpenses * 52.1429) / 12;
      const yearlies = this.allYearlyExpenses / 12;
      const result = dailies + weeklies + yearlies + this.allMonthlyExpenses;

      return result;
    },
    yearlyBudget() {
      const dailies = this.allDailyExpenses * 365;
      const weeklies = this.allWeeklyExpenses * 52.1429;
      const monthlies = this.allMonthlyExpenses * 12;
      const result = dailies + weeklies + monthlies + this.allYearlyExpenses;

      return result;
    },
    approxIncome() {
      const percentage = (100 - Number(this.user.tax)) / 100;
      return this.yearlyBudget / percentage;
    },
    diffPercentage() {
      if (this.approxIncome) {
        const approx = Number(this.approxIncome);
        const gross = Number(this.user.gross);
        return ((gross / approx - 1) * 100).toFixed(2);
      } else {
        return null;
      }
    },
    sumPerMemberList() {
      const sumByAssignee = [];
      this.selected.forEach((item) => {
        const { assignee, amount, frequency } = item;
        const existingAssignee = sumByAssignee.find((obj) => obj.assignee === assignee);
        if (existingAssignee) {
          existingAssignee.amount += this.calculateExpensePerMember(amount, frequency);
        } else {
          const amountCalculated = this.calculateExpensePerMember(amount, frequency);
          if (assignee === this.user.displayName) {
            sumByAssignee.push({ assignee, amount: amountCalculated, color: "#404B3B" });
          } else {
            const index = this.user.members.findIndex((el) => el.name == assignee);
            sumByAssignee.push({ assignee, amount: amountCalculated, color: this.user.members[index].shipColor });
          }
        }
      });
      return sumByAssignee;
    },
    rules() {
      return rules;
    },
    indexedExpenses() {
      return this.currentBudget?.expenses.map((item, index) => ({
        index: index,
        ...item,
      }));
    },
  },
  data() {
    return {
      budget: null,
      isEditingName: false,
      isEditingDesc: false,
      validName: false,
      validDesc: false,
      currencyItems: ["EUR", "YEN", "USD", "CAD", "GBP"],
      currencySymbol: "CAD",
      newBudgetName: "",
      newBudgetDesc: "",
      selected: [],
    };
  },
  updated() {
    if (this.currency) this.currencySymbol = this.currency;
  },
  methods: {
    updateSelectedItems(updatedExpense) {
      this.selected.splice(updatedExpense.index, 1, updatedExpense);
    },
    addExpenseSelectedItems(expense) {
      expense.index = this.selected.length;
      this.selected = [...this.selected, expense];
    },
    setSelected(expenses) {
      this.selected = expenses.map((item, index) => ({
        index: index,
        ...item,
      }));
    },
    enableEditBudgetName() {
      this.newBudgetName = this.currentBudget.name;
      this.isEditingName = true;
    },
    enableEditBudgetDesc() {
      this.newBudgetDesc = this.currentBudget.description;
      this.isEditingDesc = true;
    },
    onClickOutsideName() {
      this.isEditingName = false;
    },
    onClickOutsideDesc() {
      this.isEditingDesc = false;
    },
    confirmChanges(field) {
      let currentBudgetCopy = { ...this.currentBudget };
      if (field == "name") {
        if (this.newBudgetName !== this.currentBudget.name) {
          currentBudgetCopy.name = this.newBudgetName;
          this.$store.dispatch("budgets/updateBudget", currentBudgetCopy);
        }
        this.onClickOutsideName();
      } else {
        if (this.newBudgetDesc !== this.currentBudget.description) {
          currentBudgetCopy.description = this.newBudgetDesc;
          this.$store.dispatch("budgets/updateBudget", currentBudgetCopy);
        }
        this.onClickOutsideDesc();
      }
    },
    updateBudgetCurrency() {
      let copyBudget = { ...this.currentBudget };
      copyBudget.currency = this.currencySymbol;
      this.$store.dispatch("budgets/updateBudget", copyBudget);
    },
    calculateExpensePerMember(amount, frequency) {
      const numberAmount = Number(amount);
      switch (frequency) {
        case "Daily":
          return Number(((numberAmount * 365) / 12).toFixed(2));
        case "Weekly":
          return Number(((numberAmount * 52.1429) / 12).toFixed(2));
        case "Monthly":
          return numberAmount;
        case "Yearly":
          return Number((numberAmount / 12).toFixed(2));
      }
    },
  },
  watch: {
    currentBudget: function () {
      this.selected = this.indexedExpenses;
    },
  },
  created() {
    if (!this.$route.params.budget) {
      this.$store.dispatch("budgets/getCurrentBudget", this.$route.params.id);
    } else {
      this.$store.commit("budgets/setCurrentBudget", this.$route.params.budget);
    }
  },
};
</script>

<style scoped></style>
