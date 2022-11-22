const state = { color: null, message: null, value: false };
const getters = {

};
const actions = {
  toggleSnackbar({ commit }, obj) {
    const { color, message } = obj
    commit("showSnackbar", {color: color, message: message})
    setTimeout(() => {
      commit("hideSnackbar")
    }, 3500);
  }
};
const mutations = {
  showSnackbar(state, obj) {
    state.color = obj.color
    state.message = obj.message
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
