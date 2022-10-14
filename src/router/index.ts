import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { pathToRegexp, match, parse, compile } from 'path-to-regexp';
import InputPortfolio from '@/views/finTech/InputPortfolio.vue';
import InputResult from '@/views/trustCalculator/InputResult.vue';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '*',
    name: 'Inital',
    components: {
      InputPortfolio
    }
  },
  {
    path: '/InputPortfolio',
    name: 'Inital',
    components: {
      InputPortfolio
    }
  },
  {
    path: '/InputResult',
    name: 'Inital',
    components: {
      InputResult
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
