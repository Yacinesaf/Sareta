import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

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
        dispatch('snackbar/toggleSnackbar', { color: "green", message: "yay!" }, { root: true })
        state.user = userCredential.user
      })
      .catch((error) => {
        dispatch('snackbar/toggleSnackbar', { color: "red", message: error.message }, { root: true })
        // ..
      });
  },
  logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch(() => {
      // An error happened.
    });
  },
  logIn({ state }, obj) {
    const { email, password } = obj
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("🚀 ~ .then ~ userCredential", userCredential)
        // Signed in 
        state.user = userCredential.user
        // ...
      })
      .catch((error) => {
        console.log("🚀 ~ logIn ~ error", error)
      });
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
