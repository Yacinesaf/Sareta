import Vue from 'vue';
import router from '../src/router';
import App from './App.vue';
import firebase from './firebase/firebase';
import vuetify from './plugins/vuetify';
import store from "./store/index";

Vue.config.productionTip = false


let app;
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
  app.$store.commit("user/setUser", user)
})
