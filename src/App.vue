<template>
<<<<<<< HEAD
    <v-app>
        <!-- <InvestDiagnosis v-if="key === 0"></InvestDiagnosis> -->
        <InvestDiagnosis></InvestDiagnosis>
        <!-- <InputPortfolio v-if="key === 1"></InputPortfolio> -->
        <!-- <InputResult v-if="key === 2"></InputResult> -->
=======
    <v-app class="main">
      <transition name="fade" mode="out-in">
        <!-- <InvestDiagnosis v-if="key === 0"></InvestDiagnosis>
        <ChoosePortfolio v-if="key === 1"></ChoosePortfolio>
        <InputPortfolio v-if="key === 2"></InputPortfolio>
        <InputResult v-if="key === 3"></InputResult> -->
        <component :is="routes[key]"></component>
      </transition>
>>>>>>> 1e9b10fadb466305d7755f7c0ab00f4bf5dbda94
    </v-app>
</template>

<style lang="scss" scoped>
.main {
  background: #F9F8F8;;
}

</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import InvestDiagnosis from '@/views/finTech/InvestDiagnosis.vue'
import InputPortfolio from '@/views/finTech/InputPortfolio.vue'
import InputResult from '@/views/finTech/InputResult.vue'
import ChoosePortfolio from '@/views/finTech/ChoosePortfolio.vue';
import { findKey } from 'lodash-es';

Vue.component('InvestDiagnosis', InvestDiagnosis)
Vue.component('InputPortfolio', InputPortfolio)
Vue.component('InputResult', InputResult)
Vue.component('ChoosePortfolio', ChoosePortfolio)

@Component
export default class App extends Vue {
    private key = 0;
    private routes = {
      0: 'InvestDiagnosis',
      1: 'ChoosePortfolio',
      2: 'InputPortfolio',
      3: 'InputResult'
    }

    private created () {
      this.changeComponent();
    }

    @Watch('$route.name')
    private changeComponent () {
      this.key = Number(findKey(this.routes, (item: any) =>  item === this.$route.name)) || 0;
    }
}
</script>
