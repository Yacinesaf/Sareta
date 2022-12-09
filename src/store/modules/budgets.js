const state = { userBudgets: [] };
const getters = {

};
const actions = {
deleteBudgetAction(){
  
}
};
const mutations = {
  deleteBudget(state, id) {
    let copy = [...state.userBudgets]
    const index = copy.findIndex(budget => budget.budgetId === id)
    copy.splice(index, 1)
    state.userBudgets = copy
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};