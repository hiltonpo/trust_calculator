import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { pathToRegexp, match, parse, compile } from 'path-to-regexp';
import InputPortfolio from '@/views/finTech/InputPortfolio.vue';
import InputResult from '@/views/finTech/InputResult.vue';
import ChoosePortfolio from '@/views/finTech/ChoosePortfolio.vue';
import InvestDiagnosis from '@/views/finTech/InvestDiagnosis.vue';
import Report from '@/views/finTech/Report.vue';

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
  {
    path: '/ChoosePortfolio',
    name: 'ChoosePortfolio',
    components: {
      ChoosePortfolio
    }
  },
  {
    path: '/InvestDiagnosis',
    name: 'InvestDiagnosis',
    components: {
      InvestDiagnosis
    }
  },
  {
    path: '/Report',
    name: 'Report',
    components: {
      Report
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'development' ? '/RoboAdvisor_Customer_frontend/fintech2022/' : '/',
  routes: routes
});

export default router;
