<template>
  <v-row align-content="center" justify="center">
    <v-row justify="center">
      <v-col cols="9">
        <v-row class="mb-3">
          <v-col>
            <h1>Budget Name</h1>
            <div>Budget Description</div>
          </v-col>
          <v-col cols="4"><assignee-card :assignees="['dddd', 'fff', 'eeee', 'gggg', 'dddd', 'fff', 'eeee', 'gggg']" /></v-col>
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
    return {};
  },
};
</script>

<style scoped></style>
