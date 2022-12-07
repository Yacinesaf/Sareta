import axios from "axios";
import 'firebase/compat/firestore';
import firebase from "../firebase/firebase";
const db = firebase.firestore();

function getBudgetCardImage() {
  return axios.get("https://api.unsplash.com/photos/random?client_id=8H2mV-XceZaObYIHpzH1IqKP7UquA2wiYoS5qz8CnQE&query=finance,money,budget,accounting")
    .then(res => res.data.urls.regular)
}
function checkIfUserExist(id) {
  db.collection("users").get().then((querySnapshot) => {
    let result;
    querySnapshot.forEach((doc) => {
      result = doc.data().uid === id
    })
    console.log("🚀  querySnapshot.forEach  result", result)
    return result
  });
}
// async function checkIfUserExist(id) {
//   await db.collection('users').get().then(doc => {
//     return doc.map(doc => doc.data());
//   })
// }

export {
  getBudgetCardImage,
  checkIfUserExist
};

