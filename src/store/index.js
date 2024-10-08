import Vue from 'vue';
import Vuex from 'vuex';


import budgets from "./modules/budgets";
import snackbar from "./modules/snackbar";
import user from "./modules/user";


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, snackbar, budgets
  }
})
