import axios from "axios";
import 'firebase/compat/firestore';
import firebase from "../firebase/firebase";
const db = firebase.firestore();

function getBudgetCardImage() {
  return axios.get("https://api.unsplash.com/photos/random?client_id=8H2mV-XceZaObYIHpzH1IqKP7UquA2wiYoS5qz8CnQE&orientation=landscape&query=finance,accounting")
    .then(res => { console.log(res); return res.data.urls.regular })
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
  db.collection("users").where("firebaseAuthUserUID", "==", userId).get()
    .then((querySnapshot) => {
      const result = []
      querySnapshot.forEach((doc) => {
        result.push({ ...doc.data(), docId: doc.id })
      });
    })

}

export {
  getBudgetCardImage,
  createUser,
  createBudget,
  deleteBudget,
  editBudget,
  getAllBudgets,
  getUser
};

