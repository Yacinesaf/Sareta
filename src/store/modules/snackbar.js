const state = { color: null, message: null, value: false };
const getters = {

};
const actions = {
  toggleSnackbar({ commit }, obj) {
    const { color, message } = obj
    commit("showSnackbar", color, message)
    setTimeout(() => {
      commit("hideSnackbar")
    }, 2500);
  }
};
const mutations = {
  showSnackbar(state, color, message) {
    state.color = color
    state.message = message
    state.value = true

  },
  hideSnackbar(state) {
    state.color = null
    state.message = null
    state.value = false
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
