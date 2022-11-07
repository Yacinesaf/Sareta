<template>
  <div>
    <v-card class="rounded-lg">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th style="width: 60px !important" v-if="doesHaveAssignee" class="text-center">
                <v-checkbox class="ml-2" v-model="checkAll"></v-checkbox>
              </th>
              <th :key="i" v-for="(header, i) in tableHeaders" class="text-center">{{ header }}</th>
              <th v-if="doesHaveAssignee" class="text-center">Assignee</th>
              <th v-if="doesHaveAssignee" class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr style="width: inherit" :key="i" v-for="(expense, i) in expenses" class="text-center">
              <td>
                <v-checkbox class="ml-2" v-model="expense.checked"></v-checkbox>
              </td>
              <td>{{ expense.name }}</td>
              <td>{{ expense.frequency }}</td>
              <td>{{ amount(expense.amount) }}</td>
              <td>{{ expense.assignee }}</td>
              <td style="text-align: end; width: 60px !important; cursor: pointer">
                <v-icon style="padding: 5px" class="deleteIcon" color="red lighten-1">mdi-delete-outline</v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeaders: ["Name", "Frequency", "Amount"],
      doesHaveAssignee: true,
      checkAll: false,
      userCurencySymbol: "$",
      expenses: [
        { name: "car gas", frequency: "weekly", amount: 51.27, assignee: "Islam" },
        { name: "car gas", frequency: "weekly", amount: 51.27, assignee: "yacine" },
        { name: "car gas", frequency: "weekly", amount: 51.27, assignee: "Islam" },
        { name: "car gas", frequency: "weekly", amount: 51.27, assignee: "Islam" },
        { name: "car gas", frequency: "weekly", amount: 51.27, assignee: "Islam" },
        { name: "car gas", frequency: "weekly", amount: 51.27, assignee: "Islam" },
        { name: "car gas", frequency: "weekly", amount: 51.27, assignee: "Islam" },
        { name: "car gas", frequency: "weekly", amount: 51.27, assignee: "Islam" },
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
  },
};
</script>
<style scoped>
.deleteIcon:hover {
  background-color: #ffcdd2;
  padding: 5px;
  border-radius: 20px;
}
</style>
