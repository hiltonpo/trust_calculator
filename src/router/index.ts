import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { pathToRegexp, match, parse, compile } from 'path-to-regexp';
import TrustCalculator from '@/views/trustCalculator/TrustCalculator.vue';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '*',
    name: 'Inital',
    components: {
      TrustCalculator
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
