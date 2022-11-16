import Vue from 'vue';
import VueRouter from 'vue-router';

import EntryPage from '@/components/EntryPage';
import LandingPage from '@/components/LandingPage';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/entryPage',
    name: 'EntryPage',
    component: EntryPage,
  },
]


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});


export default router;
