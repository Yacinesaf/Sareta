import { createBudget, deleteBudget, getAllBudgets, getBudgetCardImage } from "../../api/endpoints";

const state = { userBudgets: [] };
const getters = {
  userId: (state, getters, rootState) => {
    return rootState.user.authUser.uid
  }
};

const actions = {
  deleteBudgetAction({ dispatch, commit }, docId) {
    deleteBudget(docId).then(() => {
      commit("deleteBudget", docId)
      dispatch('snackbar/toggleSnackbar', { color: "green", message: "Budget deleted sucessfully!" }, { root: true })
    }).catch(() => {
      dispatch('snackbar/toggleSnackbar', { color: "red", message: "There was an error" }, { root: true })
    })
  },
  async addBudget({ dispatch, commit, getters }, budgetObj) {
    budgetObj.imgUrl = await getBudgetCardImage()
    budgetObj.uId = getters.userId
    budgetObj.date = Date.now()
    createBudget(budgetObj).then(() => {
      commit("updateBudgets", budgetObj)
    })
      .catch(() => {
        dispatch('snackbar/toggleSnackbar', { color: "red", message: "There was an error" }, { root: true })
      })
  },
  getBudgets({ commit, getters }) {
    return getAllBudgets(getters.userId).then(budgets => {
      commit("setBudgets", budgets)
    })

  }
};
const mutations = {
  deleteBudget(state, docId) {
    let copy = [...state.userBudgets]
    // const index = copy.findIndex(budget => budget.budgetId === docId)
    // copy.splice(index, 1)
    state.userBudgets = copy.filter(budget => budget.docId !== docId)
  },
  setBudgets(state, budgets) {
    state.userBudgets = budgets
  },
  updateBudgets(state, budget) {
    state.userBudgets = [...state.userBudgets, budget]
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};