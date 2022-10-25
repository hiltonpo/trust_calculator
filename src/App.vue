<template>
    <v-app class="main">
      <transition name="fade" mode="out-in">
        <component :is="routes[key]"></component>
      </transition>
    </v-app>
</template>

<style lang="scss" scoped>
.main {
  background: #F9F8F8;;
}

</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import InvestDiagnosis from '@/views/finTech/InvestDiagnosis.vue';
import InputPortfolio from '@/views/finTech/InputPortfolio.vue';
import InputResult from '@/views/finTech/InputResult.vue';
import ChoosePortfolio from '@/views/finTech/ChoosePortfolio.vue';
import Report from '@/views/finTech/Report.vue';
import { findKey } from 'lodash-es';

Vue.component('InvestDiagnosis', InvestDiagnosis);
Vue.component('InputPortfolio', InputPortfolio);
Vue.component('InputResult', InputResult);
Vue.component('ChoosePortfolio', ChoosePortfolio);
Vue.component('Report', Report);

@Component
export default class App extends Vue {
    private key = 0;
    private routes = {
      0: 'InvestDiagnosis',
      1: 'ChoosePortfolio',
      2: 'InputPortfolio',
      3: 'InputResult',
      4: 'Report'
    }

    private created () {
      this.changeComponent();
    }

    @Watch('$route.name')
    private changeComponent () {
      this.key = Number(findKey(this.routes, (item: any) => item === this.$route.name)) || 0;
    }
}
</script>
