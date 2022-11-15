import Vue from 'vue';
import Vuex from 'vuex';


// Load Vuex
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {

  },
});

//We must register the module dinamycally since there is some user
// who already have a store. To migrate a strore or to include a new module
// we must add it dinamycally because the store won't be initialise properly
// store.registerModule("player", player);
// store.registerModule("tutorial", tutorial);

// Create store
export default store;
