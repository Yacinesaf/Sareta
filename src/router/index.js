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
    component: () => import('@/components/EntryPage'),
  },
  {
    meta: {
      requiresAuth: true
    },
    path: '/budgetManager/:id',
    name: 'BudgetManager',
    component: () => import('@/components/BudgetManager'),
  },
  {
    meta: {
      requireGuest: true
    },
    path: '/login',
    name: 'EntryPage',
    component: () => import('@/components/EntryPage'),
  },
  {
    meta: {
      requiresAuth: true
    },
    path: '/budgets',
    name: 'Budgets',
    component: () => import('@/components/Budgets'),
  },
  {
    meta: {
      requiresAuth: true
    },
    path: '/profile',
    name: 'Profile',
    component: () => import('@/components/Profile'),
  },
  {
    path: '/',
    meta: {
      requireGuest: true
    },
    name: 'LandingPage',
    component: () => import('@/components/LandingPage'),
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
