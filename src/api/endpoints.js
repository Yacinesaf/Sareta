import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import 'firebase/compat/firestore';
import firebase from "../firebase/firebase";
const db = firebase.firestore();
const auth = getAuth();
const user = firebase.auth().currentUser;

function getBudgetCardImage() {
  return axios.get("https://api.unsplash.com/photos/random?client_id=8H2mV-XceZaObYIHpzH1IqKP7UquA2wiYoS5qz8CnQE&orientation=landscape&query=finance,accounting")
    .then(res => { console.log(res); return res.data.urls.regular })
}
function createUserWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}
function userSignIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}
function signout() {
  return signOut(auth)
}
function createUser(userObj) {
  return db.collection("users").add({
    firebaseAuthUserUID: userObj.id,
    dontShowAlertAgain: userObj.infoSnackbar,
    email: userObj.email,
    displayName: userObj.displayName
  })
}
function createBudget(obj) {
  return db.collection("budgets").add(obj)
    .then((docRef) => {
      db.collection("budgets").doc(docRef.id).update({
        docId: docRef.id
      })
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
function deleteBudget(budgetDocId) {
  return db.collection("budgets").doc(budgetDocId).delete();
}
function editBudget(obj) {
  db.collection("budgets").doc(obj.docId).set({
    name: obj.name,
    uId: obj.id,
    description: obj.description,
  })
    .then(() => {
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
function getAllBudgets(userId) {
  const budgets = []
  return db.collection("budgets").where("uId", "==", userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        budgets.push(doc.data())
      });
      return budgets
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}
function getUser(userId) {
  return db.collection("users").where("firebaseAuthUserUID", "==", userId).get()

}
function editUserName(name) {
  return user.updateProfile({
    displayName: name,
  })
}
function editUserEmail(email) {
  return user.updateEmail(email)
}
function editUserPassword(newPassword) {
  return user.updatePassword(newPassword)
}
function sendResetPasswordEmail(email) {
  return firebase.auth().sendPasswordResetEmail(email)
}

export {
  getBudgetCardImage,
  createUser,
  createBudget,
  deleteBudget,
  editBudget,
  getAllBudgets,
  getUser,
  editUserName,
  editUserEmail,
  editUserPassword,
  sendResetPasswordEmail,
  createUserWithEmail,
  userSignIn,
  signout,
};

