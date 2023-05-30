import {
  createBudget, deleteBudget, editBudget, editExpenses, getAllBudgets, getBudgetCardImage
} from "../../api/endpoints";

const state = { budgets: [], currentBudget: null, isFetching: false };
const getters = {
  userId: (state, getters, rootState) => {
    return rootState.user.dbUser.firebaseAuthUserUID;
  },
};

const actions = {
  deleteBudgetAction({ dispatch, commit }, docId) {
    deleteBudget(docId)
      .then(() => {
        commit("deleteBudget", docId);
        dispatch(
          "snackbar/toggleSnackbar",
          { color: "green", message: "Budget deleted sucessfully!" },
          { root: true }
        );
      })
      .catch(() => {
        dispatch(
          "snackbar/toggleSnackbar",
          { color: "red", message: "There was an error" },
          { root: true }
        );
      });
  },
  async addBudget({ dispatch, commit, getters }, budgetObj) {
    budgetObj.imgUrl = await getBudgetCardImage();
    budgetObj.uId = getters.userId;
    budgetObj.date = Date.now();
    createBudget(budgetObj)
      .then(async () => {
        commit("updateBudgets", budgetObj);
        dispatch("getBudgets")
      })
      .catch(() => {
        dispatch(
          "snackbar/toggleSnackbar",
          { color: "red", message: "There was an error" },
          { root: true }
        );
      });
  },
  getBudgets({ commit, getters }) {
    return getAllBudgets(getters.userId).then((budgets) => {
      commit("setBudgets", budgets);
    });
  },
  async getCurrentBudget({ commit, dispatch, state }, docId) {
    commit("setIsFetching", true)
    await dispatch("getBudgets")
    const currentBudget = state.budgets.find(el => el.docId === docId)
    commit("setCurrentBudget", currentBudget);
    commit("setIsFetching", false)
  },
  async updateBudget({ commit, state }, newBudget) {
    await editBudget(state.currentBudget.docId, newBudget)
    commit("updateBudget", newBudget)
  },
  async updateExpenses({ commit, state }, expensesList) {
    await editExpenses(state.currentBudget.docId, expensesList)
    commit("updateExpenses", expensesList)

  }
};
const mutations = {
  deleteBudget(state, docId) {
    let copy = [...state.budgets];
    state.budgets = copy.filter((budget) => budget.docId !== docId);
  },
  setBudgets(state, budgets) {
    state.budgets = budgets;
  },
  setCurrentBudget(state, budget) {
    state.currentBudget = budget;
  },
  updateBudgets(state, budget) {
    state.budgets = [budget, ...state.budgets];
  },
  updateBudget(state, budget) {
    state.currentBudget = budget;
    const index = state.budgets.findIndex(budget => budget.docId === state.currentBudget.docId)
    state.budgets[index] = budget
  },
  setIsFetching(state, value) {
    state.isFetching = value
  },
  updateExpenses(state, expensesList) {
    state.currentBudget.expenses = expensesList;
    const index = state.budgets.findIndex(budget => budget.docId === state.currentBudget.docId)
    state.budgets[index].expenses = expensesList
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
