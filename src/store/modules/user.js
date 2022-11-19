import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const state = { user: null };
const getters = {

};
const actions = {
  emailSignup({ state, dispatch }, obj) {
    const { email, password } = obj
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        dispatch('snackbar/toggleSnackbar', {email, password})
        state.user = userCredential.user
      })
      .catch((error) => {

        dispatch('snackbar/toggleSnackbar', { color: "secondary", message: error.message })
        // ..
      });
  },
  logOut() {

  },
  logIn() {

  }
};
const mutations = {

};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
