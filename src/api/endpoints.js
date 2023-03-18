import axios from "axios";
import 'firebase/compat/firestore';
import firebase from "../firebase/firebase";
const db = firebase.firestore();

function getBudgetCardImage() {
  return axios.get("https://api.unsplash.com/photos/random?client_id=8H2mV-XceZaObYIHpzH1IqKP7UquA2wiYoS5qz8CnQE&orientation=landscape&query=finance,accounting")
    .then(res => {console.log(res); return res.data.urls.regular})
}
async function addUserDoc(userObj) {
  await db.collection("users").get().then((querySnapshot) => {
    let result;
    querySnapshot.forEach((doc) => {
      result = doc.data().uid === userObj.id
    })
    if (result) return
    addUserInDb(userObj)
  });
}
function addUserInDb(userObj) {
  return db.collection("users").add({
    name: userObj.name,
    uId: userObj.id,
    dontShowAlertAgain: false
  })
    .then((docRef) => {
      docRef
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
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

export {
  getBudgetCardImage,
  addUserDoc,
  createBudget,
  deleteBudget,
  editBudget,
  getAllBudgets
};

