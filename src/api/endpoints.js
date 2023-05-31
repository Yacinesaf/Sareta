import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
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
      return db.collection("budgets").doc(docRef.id).update({
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
function getAllBudgets(userId) {
  const budgets = [];
  return db
    .collection("budgets")
    .where("uId", "==", userId)
    .orderBy("date", "desc")
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
  return db.collection("budgets")
    .doc(docId)
    .get()
    .then((doc) => {
      const budget = doc.data();
      if (budget.uId === userId) {
        return budget;
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
function editBudget(budgetDocId, budget) {
  return db.collection("budgets").doc(budgetDocId).set(budget);
}
function editUserMembers(userDocId, membersList) {
  return db.collection("users").doc(userDocId).update({ members: membersList });
}
function checkSsoUserExists(userId) {
  let user;
  return db
    .collection("users")
    .where("firebaseAuthUserUID", "==", userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        user = doc
      });
      return user;
    })

}
function editExpenses(budgetDocId, expenseList) {
  return db.collection("budgets").doc(budgetDocId).update({ expenses: expenseList });
}

export {
  getBudgetCardImage,
  createUser,
  createBudget,
  deleteBudget,
  editBudget,
  getAllBudgets,
  editExpenses,
  getBudget,
  getDbUser,
  editUserPassword,
  sendResetPasswordEmail,
  createUserWithEmail,
  userSignIn,
  signout,
  editUserInfo,
  editUserMembers,
  checkSsoUserExists
};
