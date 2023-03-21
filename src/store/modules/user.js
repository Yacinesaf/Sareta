import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createUser } from "../../api/endpoints";
const state = { user: null };
const getters = {
  infoSnackbar: (state, getters, rootState) => {
    return rootState.general.moreInfoSnackbar
  }
  
};
const actions = {
  emailSignup({ dispatch, commit, getters }, obj) {
    const { email, password, name } = obj
    const auth = getAuth();
    //change then to awaits
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await createUser({
          firebaseAuthUserUID: userCredential.user.uid,
          infoSnackbar: getters.infoSnackbar,
          displayName: name,
          email: email,
        })
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
  },
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
