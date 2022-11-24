import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyDgTbNiSTrSp_e8Y82pXDvPNrMyT-q_Ta4",
  authDomain: "sareta-f8acd.firebaseapp.com",
  projectId: "sareta-f8acd",
  storageBucket: "sareta-f8acd.appspot.com",
  messagingSenderId: "586907253893",
  appId: "1:586907253893:web:4c4b42c08d009324ebbdec"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;