<template>
  <div class="pa-3 pa-md-6" style="position: relative">
    <v-btn
      @click="openAddBudgetDialog"
      v-if="areBudgetsPopulated && this.$vuetify.breakpoint.mdAndUp"
      class="rounded mt-6"
      color="primary"
      absolute
      top
      right
      x-large
      >Add budget
    </v-btn>
    <div v-if="areBudgetsPopulated" class="text-h5 text-md-h3 text-center py-6" style="font-weight: 700">
      Your spending sheets
    </div>
    <v-row style="height: 90vh" class="justify-center align-center" v-if="isLoadingBudgets">
      <v-progress-circular indeterminate size="60" width="6" color="primary"></v-progress-circular>
    </v-row>
    <v-row class="pt-6 mx-0" v-else align="center" justify="center">
      <v-row class="ma-0">
        <v-col
          @click="goToBudgetManager(budget)"
          :key="i"
          v-for="(budget, i) in budgets"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <budget-card @deleteBudget="deleteBudget" :budget="budget" />
        </v-col>
        <v-btn
          v-if="this.$vuetify.breakpoint.smAndDown && budgets.length"
          @click="openAddBudgetDialog"
          fixed
          bottom
          left
          color="primary"
          ripple
          elevation="3"
          fab
          large
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
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
        v-if="!areBudgetsPopulated && !isLoadingBudgets"
        cols="5"
      >
        <img :src="emptyState" height="200px" width="auto" wid alt="" />
        <div class="text-h6 text-md-h4 text-center mt-6">You don't have any budget set up</div>
        <v-btn @click="openAddBudgetDialog" class="rounded-lg mt-4" outlined> Add a budget </v-btn>
      </div>
      <v-dialog
        @click:outside="closeAddBudgetDialog"
        transition="scroll-y-reverse-transition"
        :value="isDialogOpen"
        width="500"
      >
        <v-card>
          <div class="pa-6">
            <div class="text-h5 pb-6" style="font-weight: 600">Add new budget</div>
            <v-form lazy-validation ref="budgetForm">
              <v-text-field
                :rules="[rules.required]"
                style="border-radius: 6px"
                label="Budget name"
                v-model="budgetName"
                outlined
              ></v-text-field>
              <v-textarea
                :rules="[rules.required]"
                style="border-radius: 6px"
                label="Description"
                v-model="description"
                outlined
              ></v-textarea>
              <div class="d-flex justify-end">
                <v-btn color="primary" @click="createBudget">Create</v-btn>
              </div>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { emptyState } from "../assets/firebaseStorage.json";
import rules from "../rules/rules";
import BudgetCard from "./BudgetCard.vue";
import { mapState } from "vuex";
export default {
  components: { BudgetCard },
  computed: {
    rules() {
      return rules;
    },
    ...mapState({
      userId: (state) => state.user.authUser.uid,
      user: (state) => state.user.dbUser,
      budgets: (state) => state.budgets.budgets,
    }),
    areBudgetsPopulated() {
      return this.budgets.length;
    },
    emptyState() {
      return emptyState;
    },
  },
  data() {
    return {
      description: "",
      budgetName: "",
      isDialogOpen: false,
      isLoadingBudgets: false,
      is: null,
    };
  },
  methods: {
    openAddBudgetDialog() {
      this.isDialogOpen = true;
    },
    closeAddBudgetDialog() {
      this.isDialogOpen = false;
    },
    resetCreateBudgetFields() {
      this.description = "";
      this.budgetName = "";
    },
    createBudget() {
      if (this.$refs.budgetForm.validate()) {
        this.$store.dispatch("budgets/addBudget", {
          description: this.description,
          name: this.budgetName,
          expenses: [],
        });
        this.closeAddBudgetDialog();
        this.resetCreateBudgetFields();
      }
    },
    deleteBudget(docId) {
      this.$store.dispatch("budgets/deleteBudgetAction", docId);
    },
    goToBudgetManager(budget) {
      this.$router.push({
        name: "BudgetManager",
        params: { budget: budget, id: budget.docId },
      });
    },
  },
  mounted() {
    this.isLoadingBudgets = true;
    this.$store.dispatch("budgets/getBudgets").then(() => {
      this.isLoadingBudgets = false;
    });
  },
};
</script>
<style scoped></style>
