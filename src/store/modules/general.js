const state = { moreInfoSnackbar: true };
const getters = {
};
const actions = {

};
const mutations = {
  closeMoreInfoSnackbar(state) {
    state.moreInfoSnackbar = false;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
