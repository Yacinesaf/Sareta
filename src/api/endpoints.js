import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import "firebase/compat/firestore";
import firebase from "../firebase/firebase";
const db = firebase.firestore();
const auth = getAuth();

function getBudgetCardImage() {
  return axios
    .get(
      "https://api.unsplash.com/photos/random?client_id=8H2mV-XceZaObYIHpzH1IqKP7UquA2wiYoS5qz8CnQE&orientation=landscape&query=finance,accounting"
    )
    .then((res) => {
      console.log(res);
      return res.data.urls.regular;
    });
}
function createUserWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
function userSignIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
function signout() {
  return signOut(auth);
}
function createUser(userObj) {
  return db.collection("users").add(userObj);
}
function createBudget(obj) {
  return db
    .collection("budgets")
    .add(obj)
    .then((docRef) => {
      db.collection("budgets").doc(docRef.id).update({
        docId: docRef.id,
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
function deleteBudget(budgetDocId) {
  return db.collection("budgets").doc(budgetDocId).delete();
}
function editBudget(obj) {
  db.collection("budgets")
    .doc(obj.docId)
    .set({
      name: obj.name,
      uId: obj.id,
      description: obj.description,
    })
    .then(() => {})
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
function editInfoSnackbarState(userDocId) {
  db.collection("users").doc(userDocId).update({
    dontShowAlertAgain: true,
  });
}
function getAllBudgets(userId) {
  const budgets = [];
  return db
    .collection("budgets")
    .where("uId", "==", userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        budgets.push(doc.data());
      });
      return budgets;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}
function getBudget(userId, docId) {
  db.collection("budgets")
    .doc(docId)
    .get()
    .then((doc) => {
      if (doc.uId === userId) {
        return doc;
      }
    });
}
function getDbUser(userId) {
  return db
    .collection("users")
    .where("firebaseAuthUserUID", "==", userId)
    .get();
}
function editUserPassword(newPassword) {
  const user = firebase.auth().currentUser;
  return user.updatePassword(newPassword);
}
function sendResetPasswordEmail(email) {
  return firebase.auth().sendPasswordResetEmail(email);
}
function editUserInfo(userDocId, user) {
  return db.collection("users").doc(userDocId).set(user);
}
function editUserMembers(userDocId, membersList) {
  return db.collection("users").doc(userDocId).set({ members: membersList });
}

export {
  getBudgetCardImage,
  createUser,
  createBudget,
  deleteBudget,
  editBudget,
  getAllBudgets,
  getBudget,
  getDbUser,
  editUserPassword,
  sendResetPasswordEmail,
  createUserWithEmail,
  userSignIn,
  signout,
  editUserInfo,
  editInfoSnackbarState,
  editUserMembers,
};
