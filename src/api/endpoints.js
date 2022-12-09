import axios from "axios";
import 'firebase/compat/firestore';
import firebase from "../firebase/firebase";
const db = firebase.firestore();

function getBudgetCardImage() {
  return axios.get("https://api.unsplash.com/photos/random?client_id=8H2mV-XceZaObYIHpzH1IqKP7UquA2wiYoS5qz8CnQE&query=finance,money,budget,accounting")
    .then(res => res.data.urls.regular)
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
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
function addBudget(obj) {
  db.collection("budgets").add({
    name: obj.name,
    uId: obj.id,
    description: obj.description,
  })
    .then((docRef) => {
      db.collection("budgets").doc(docRef.id).set({
        docId: docRef.id
      })
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
function deleteBudget(budgetDocId) {
  db.collection("cities").doc(budgetDocId).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
}


export {
  getBudgetCardImage,
  addUserDoc,
  addBudget,
  deleteBudget
};

