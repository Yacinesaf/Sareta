<template>
  <v-row class="pt-16" justify="center">
    <v-row justify="center">
      <v-col cols="8">
        <v-row class="mb-3">
          <v-col>
            <h1>{{budget.name}}</h1>
            <div>{{budget.description}}</div>
          </v-col>
          <v-col cols="4"
            ><assignee-card :assignees="['dddd', 'fff', 'eeee', 'gggg', 'dddd', 'fff', 'eeee', 'gggg']"
          /></v-col>
        </v-row>
        <div><detailed-results /></div>
        <div class="my-3 d-flex justify-end"><add-expense /></div>
        <div><budget-table /></div>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import AddExpense from "./AddExpense.vue";
import AssigneeCard from "./AssigneeCard.vue";
import BudgetTable from "./BudgetTable.vue";
import DetailedResults from "./DetailedResults.vue";
export default {
  components: { AddExpense, BudgetTable, AssigneeCard, DetailedResults },
  data() {
    return {
      budget: null
    };
  },
  created(){
    if(!this.$route.params.budget) return;
    this.budget = this.$route.params.budget;
}
};
</script>

<style scoped></style>
