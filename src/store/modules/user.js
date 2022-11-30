import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
const state = { user: null };
const getters = {

};
const actions = {
  emailSignup({ dispatch, commit }, obj) {
    const { email, password, name } = obj
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setDoc(doc("users"), {
          name: name,
          uId: userCredential.uId,
          email: email
        }).then(res => {
          console.log("🚀 ~ setDoc ~ res", res)
          commit("setUser", userCredential.user)
        });
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
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
