import Budgets from '@/components/Budgets';
import Calculator from '@/components/Calculator';
import EntryPage from '@/components/EntryPage';
import LandingPage from '@/components/LandingPage';
import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from '../firebase/firebase';

const routes = [
  {
    meta: {
      requireGuest: true
    },
    path: '/signup',
    name: 'EntryPage',
    component: EntryPage,
  },
  {
    meta: {
      requireGuest: true
    },
    path: '/calculator',
    name: 'Calculator',
    component: Calculator,
  },
  {
    meta: {
      requireGuest: true
    },
    path: '/login',
    name: 'EntryPage',
    component: EntryPage,
  },
  {
    meta: {
      requiresAuth: true
    },
    path: '/budgets',
    name: 'Budgets',
    component: Budgets,
  },
  {
    path: '/',
    meta: {
      requireGuest: true
    },
    name: 'LandingPage',
    component: LandingPage,
  },
]


Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // Check for requireAuth guard AND not logged in user
  if (to.matched.some(record => record.meta.requiresAuth) && !firebase.auth().currentUser) next({ name: 'EntryPage', params: { state: "login" } })

  // Check for requireGuest guard AND logged in user
  else if (to.matched.some(record => record.meta.requireGuest) && firebase.auth().currentUser) {
    if (from.path !== "/budgets") next({ name: 'Budgets' })
  }


  else next()
  window.scrollTo(0, 0)
})
export default router;
