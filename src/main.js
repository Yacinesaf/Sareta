import { getAuth, onAuthStateChanged } from "firebase/auth";
import Vue from 'vue';
import router from '../src/router';
import App from './App.vue';
import app from "./firebase/firebase";
import vuetify from './plugins/vuetify';
import store from "./store/index";
// import {getFirestore} from "firebase/firestore"

Vue.config.productionTip = false

const auth = getAuth(app)
// const db = getFirestore(app)

//auth state onAuthStateChanged
onAuthStateChanged(auth, user => {
  if(user != null) {
    console.log("logged in")
  }else {
    console.log("null")
  }
})

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
