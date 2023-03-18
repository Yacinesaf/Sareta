import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addUserDoc } from "../../api/endpoints";
const state = { user: null };
const getters = {

};
const actions = {
  emailSignup({ dispatch, commit }, obj) {
    const { email, password, name } = obj
    const auth = getAuth();
    //change then to awaits
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await addUserDoc({ name: name, id: userCredential.user.uid })
        commit("setUser", userCredential.user)
      })
      .catch((error) => {
        dispatch('snackbar/toggleSnackbar', { color: "red", message: error.message }, { root: true })
        // ..
      });
  },
  logOut({ dispatch, commit }) {
    const auth = getAuth();
    return signOut(auth).then(() => {
      commit("resetUser")
    }).catch((error) => {
      dispatch('snackbar/toggleSnackbar', { color: "red", message: error.message }, { root: true })
    });
  },
  logIn({ commit, dispatch }, obj) {
    const { email, password } = obj
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        commit("setUser", userCredential.user)
        // ...
      })
      .catch((error) => {
        dispatch('snackbar/toggleSnackbar', { color: "red", message: error.message }, { root: true })
      });
  }
};
const mutations = {
  setUser(state, user) {
    state.user = user
  },
  resetUser(state) {
    state.user = null
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
