const state = { moreInfoSnackbar: true };
const getters = {
  userId: (state, getters, rootState) => {
    return rootState.user.user.uid
  }
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
