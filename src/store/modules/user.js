import {
  createUser,
  createUserWithEmail, editUserInfo, editUserMembers, editUserPassword,
  getDbUser,
  sendResetPasswordEmail,
  signout,
  userSignIn
} from "../../services/endpoints";
import { generateTemplate } from "../../services/functions";
import * as authErrorsMsgs from "../../utils/firebaseAuthErrorList.json";
const state = { authUser: null, dbUser: null };
const getters = {};
const actions = {
  emailSignup({ dispatch, commit }, obj) {
    const { email, password, name } = obj;
    return createUserWithEmail(email, password)
      .then(async (userCredential) => {
        const newUser = {
          firebaseAuthUserUID: userCredential.user.uid,
          email: email,
          displayName: name,
          isSso: false,
          tax: null,
          gross: null,
          members: [],
        };
        await createUser(newUser);
        dispatch("budgets/addBudget", generateTemplate(newUser.displayName), { root: true });
        commit("setAuthUser", userCredential.user);
        commit("setDbUser", newUser);

      })
      .catch((error) => {
        dispatch(
          "snackbar/toggleSnackbar",
          { color: "red", message: authErrorsMsgs.default[error.code] },
          { root: true }
        );
        // ..
      });
  },
  logOut({ dispatch, commit }) {
    return signout()
      .then(() => {
        commit("resetUser");
      })
      .catch((error) => {
        dispatch(
          "snackbar/toggleSnackbar",
          { color: "red", message: authErrorsMsgs.default[error.code] },
          { root: true }
        );
      });
  },
  logIn({ commit, dispatch, state }, obj) {
    const { email, password } = obj;
    return userSignIn(email, password)
      .then(async (userCredential) => {
        // Signed in
        commit("setAuthUser", userCredential.user);
        const dbUser = await dispatch("getUser", state.authUser.uid);
        commit("setDbUser", dbUser);
        // ...
      })
      .catch((error) => {
        dispatch(
          "snackbar/toggleSnackbar",
          {
            color: "red",
            message: authErrorsMsgs.default[error.code],
          },
          { root: true }
        );
      });
  },
  getUser({ commit }, userId) {
    let result;
    getDbUser(userId).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        result = doc.data();
        result.docId = doc.id;
      });
      commit("setDbUser", result);
    });
  },
  editUser({ commit, dispatch, state }, obj) {
    const userObj = { ...state.dbUser, ...obj };
    return editUserInfo(state.dbUser.docId, userObj)
      .then(() => {
        commit("setEditedUser", userObj);
        dispatch(
          "snackbar/toggleSnackbar",
          { color: "green", message: "User have been successfully updated!" },
          { root: true }
        );
      })
      .catch(() => {
        dispatch(
          "snackbar/toggleSnackbar",
          { color: "red", message: "There was an error. Please try again" },
          { root: true }
        );
      });
  },
  editUserPassword({ dispatch }, newPassword) {
    return editUserPassword(newPassword)
      .then(() => {
        dispatch(
          "snackbar/toggleSnackbar",
          {
            color: "green",
            message: "You have successfully changed your password!",
          },
          { root: true }
        );
      })
      .catch((error) => {
        dispatch(
          "snackbar/toggleSnackbar",
          { color: "red", message: authErrorsMsgs.default[error.code] },
          { root: true }
        );
      });
  },
  sendResetPasswordEmail({ dispatch }, email) {
    return sendResetPasswordEmail(email)
      .then(() => {
        dispatch(
          "snackbar/toggleSnackbar",
          { color: "green", message: "A reset email has been sent to you!" },
          { root: true }
        );
      })
      .catch((error) => {
        dispatch(
          "snackbar/toggleSnackbar",
          { color: "red", message: authErrorsMsgs.default[error.code] },
          { root: true }
        );
      });
  },
  editUserMembers({ dispatch, commit, state }, obj) {
    return editUserMembers(state.dbUser.docId, obj.membersList)
      .then(() => {
        commit("setUserMembers", obj.membersList);
        dispatch(
          "snackbar/toggleSnackbar",
          { color: "green", message: obj.isDeleting ? "Member deleted successfully" : "A new member has been added" },
          { root: true }
        );
      })
      .catch(() => {
        dispatch(
          "snackbar/toggleSnackbar",
          {
            color: "red",
            message:
              "A problem occured. Please try again",
          },
          { root: true }
        );
      });
  },
};
const mutations = {
  setAuthUser(state, user) {
    state.authUser = user;
  },
  setDbUser(state, user) {
    state.dbUser = user;
  },
  resetUser(state) {
    state.authUser = null;
    state.dbUser = null;
  },
  setUserMembers(state, memberList) {
    state.dbUser.members = memberList;
  },

  setEditedUser(state, editedUser) {
    state.dbUser = editedUser;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
