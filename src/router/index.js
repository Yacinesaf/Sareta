import Vue from 'vue';
import VueRouter from 'vue-router';

import Budgets from '@/components/Budgets';
import EntryPage from '@/components/EntryPage';
// import LandingPage from '@/components/LandingPage';

const routes = [
  // {
  //   path: '/',
  //   name: 'LandingPage',
  //   component: LandingPage,
  // },
  {
    path: '/signup',
    name: 'EntryPage',
    component: EntryPage,
  },
  {
    path: '/login',
    name: 'EntryPage',
    component: EntryPage,
  },
  {
    path: '/',
    name: 'Budgets',
    component: Budgets,
  },

]


Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   else next()
// })

export default router;
