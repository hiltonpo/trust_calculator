import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { pathToRegexp, match, parse, compile } from 'path-to-regexp';
import InputPortfolio from '@/views/finTech/InputPortfolio.vue';
import InputResult from '@/views/finTech/InputResult.vue';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/InputPortfolio',
    name: 'InputPortfolio',
    components: {
      InputPortfolio
    }
  },
  {
    path: '/InputResult',
    name: 'InputResult',
    components: {
      InputResult
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
})


export default router;
