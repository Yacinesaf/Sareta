import Vue from 'vue';
import VueRouter from 'vue-router';

import EntryPage from '@/components/EntryPage';

const routes = [
  {
    path: '/',
    name: 'EntryPage',
    component: EntryPage,
  },]


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});


export default router;
