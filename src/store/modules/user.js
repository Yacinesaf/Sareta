import {
  createUser, createUserWithEmail, editUserEmail, editUserName, editUserPassword, getUser, sendResetPasswordEmail, signout, userSignIn
} from "../../api/endpoints";
const state = { authUser: null, dbUser: null, moreInfoSnackbar: true };
const getters = {

};
const actions = {
  emailSignup({ dispatch, commit, getters }, obj) {
    const { email, password, name } = obj
    //change then to awaits

    return createUserWithEmail(email, password)
      .then(async (userCredential) => {
        const newUser = {
          firebaseAuthUserUID: userCredential.user.uid,
          dontShowAlertAgain: getters.infoSnackbar,
          email: email,
          displayName: name,
        }
        await createUser(newUser)
        commit("setAuthUser", userCredential.user)
        commit("setDbUser", newUser)
      })
      .catch((error) => {
        dispatch('snackbar/toggleSnackbar', { color: "red", message: error.message }, { root: true })
        // ..
      });
  },
  logOut({ dispatch, commit }) {
    return signout().then(() => {
      commit("resetUser")
    }).catch((error) => {
      dispatch('snackbar/toggleSnackbar', { color: "red", message: error.message }, { root: true })
    });
  },
  logIn({ commit, dispatch }, obj) {
    const { email, password } = obj
    return userSignIn(email, password)
      .then(async (userCredential) => {
        // Signed in 
        commit("setAuthUser", userCredential.user)
        const dbUser = await dispatch("user/getUser")
        commit("setDbUser", dbUser)
        // ...
      })
      .catch((error) => {
        dispatch('snackbar/toggleSnackbar', { color: "red", message: error.message }, { root: true })
      });
  },
  getUser() {
    const result = null
    getUser().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        result.push({ ...doc.data(), docId: doc.id })
      });
      return result
    })
  },
  async editUserName({ commit, dispatch }, name) {
    return await editUserName(name)
  },
  async editUserEmail({ commit, dispatch }, email) {
    return await editUserEmail(email)
  },
  async editUserPassword({ commit, dispatch }, newPassword) {
    return await editUserPassword(newPassword)
  },
  async sendResetPasswordEmail({ commit, dispatch }, email) {
    return await sendResetPasswordEmail(email)
  }
};
const mutations = {
  setAuthUser(state, user) {
    state.authUser = user
  },
  setDbUser(state, user) {
    state.dbUser = user
  },
  resetUser(state) {
    state.authUser = null
    state.dbUser = null
  },
  closeMoreInfoSnackbar(state, value) {
    state.moreInfoSnackbar = value;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
