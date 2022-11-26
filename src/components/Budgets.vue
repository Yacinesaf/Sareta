<template>
  <div class="pa-4">
    <div class="text-h3 text-center py-6" style="font-weight: 700">Your spending sheets</div>
    <v-row class="pa-6" v-if="isLoadingBudgets">
      <v-col :key="i" v-for="i in Array.from(Array(8).keys())" cols="12" md="6" lg="3" xl="2">
        <v-skeleton-loader width="100%" v-bind="attrs" type="image"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else style="height: calc(100vh - 116px)" align="center" justify="center">
      <v-row v-if="data" class="ma-0">
        <v-col :key="i" v-for="(budget, i) in data" cols="12" md="6" lg="3" xl="2">
          <budget-card :img="budget.img" :name="budget.name" :description="budget.description" :date="budget.date" />
        </v-col>
        <v-col cols="12" md="6" lg="3" xl="2">
          <v-btn style="width: 100%; min-height: 378px" class="rounded-lg" @click="addBudget" outlined
            ><v-icon size="70">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-col v-else class="d-flex align-center" style="flex-direction: column" cols="5">
        <img src="@/assets/emptyState.png" height="200px" width="auto" wid alt="" />
        <div class="text-h6 text-md-h4 text-center mt-6">You don't have any budget set up</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BudgetCard from "./BudgetCard.vue";
import { getBudgetCardImage } from "../api/endpoints";
export default {
  components: { BudgetCard },
  data() {
    return {
      data: [
        {
          name: "2022 spending",
          description: "ooo",
          date: "12/12/12",
          img: "https://images.unsplash.com/photo-1669279594631-401ecc3883d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        },
        {
          name: "2022 spending",
          description: "ooo",
          date: "12/12/12",
          img: "https://images.unsplash.com/photo-1669279594631-401ecc3883d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        },
        {
          name: "2022 spending",
          description: "ooo",
          date: "12/12/12",
          img: "https://images.unsplash.com/photo-1669279594631-401ecc3883d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        },
        {
          name: "2022 spending",
          description: "ooo",
          date: "12/12/12",
          img: "https://images.unsplash.com/photo-1669279594631-401ecc3883d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        },
        {
          name: "2022 spending",
          description: "ooo",
          date: "12/12/12",
          img: "https://images.unsplash.com/photo-1669279594631-401ecc3883d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        },
        {
          name: "2022 spending",
          description: "ooo",
          date: "12/12/12",
          img: "https://images.unsplash.com/photo-1669279594631-401ecc3883d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        },
      ],
    };
  },
  created() {
    getBudgetCardImage().then((res) => {
      console.log(res);
    });
  },
};
</script>
<style scoped>
::v-deep .v-skeleton-loader__image {
  height: 378px !important;
}
</style>
