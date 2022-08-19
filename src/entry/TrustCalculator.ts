import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import TrustCalculator from '@/views/trustCalculator/TrustCalculator.vue';
import router from '@/router';
import store from '@/store';
import '@/plugins/main';
import vuetify from '@/plugins/vuetify';

Vue.use(VueCompositionAPI);
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(TrustCalculator)
}).$mount('#app');
