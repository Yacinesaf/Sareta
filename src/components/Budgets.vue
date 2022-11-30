<template>
  <div class="pa-6">
    <div v-if="data" class="text-h3 text-center py-6" style="font-weight: 700">Your spending sheets</div>
    <v-row v-if="isLoadingBudgets">
      <v-col :key="i" v-for="i in Array.from(Array(8).keys())" cols="12" md="6" lg="3" xl="2">
        <v-skeleton-loader width="100%" v-bind="attrs" type="image"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row class="pt-6" v-else align="center" justify="center">
      <v-row v-if="data" class="ma-0">
        <v-col :key="i" v-for="(budget, i) in data" cols="12" md="6" lg="3" xl="2">
          <budget-card :img="budget.img" :name="budget.name" :description="budget.description" :date="budget.date" />
        </v-col>
        <v-col v-if="data" cols="12" md="6" lg="3" xl="2">
          <v-dialog transition="scroll-y-reverse-transition" v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-on="on"
                v-bind="attrs"
                style="width: 100%; min-height: 378px"
                class="rounded-lg"
                @click="addBudget"
                outlined
                ><v-icon size="70">mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <div class="pa-6">
                <div class="text-h5 pb-6" style="font-weight: 600">Add new budget</div>
                <v-form>
                  <v-text-field
                    :rules="rules.required"
                    style="border-radius: 6px"
                    label="Budget name"
                    v-model="BudgetName"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    style="border-radius: 6px"
                    label="Description"
                    v-model="description"
                    outlined
                  ></v-text-field>
                  <div class="d-flex justify-end">
                    <v-btn color="primary" @click="createBudget">Create</v-btn>
                  </div>
                </v-form>
              </div>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <div
        style="
          position: absolute;
          flex-direction: column;
          top: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        "
        v-else
        cols="5"
      >
        <img src="@/assets/emptyState.png" height="200px" width="auto" wid alt="" />
        <div class="text-h6 text-md-h4 text-center mt-6">You don't have any budget set up</div>
      </div>
    </v-row>
  </div>
</template>

<script>
import rules from "../rules/rules";

import BudgetCard from "./BudgetCard.vue";
import { getBudgetCardImage } from "../api/endpoints";
export default {
  components: { BudgetCard },
  computed: {
    rules() {
      console.log("🚀 ~ rules ~ rules", rules);
      return rules;
    },
  },
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
      description: "",
      budgetName: "",
    };
  },
  methods: {
    createBudget() {},
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
