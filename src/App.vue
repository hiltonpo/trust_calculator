<template>
    <v-app>
        <!-- <InvestDiagnosis v-if="key === 0"></InvestDiagnosis> -->
        <InvestDiagnosis></InvestDiagnosis>
        <!-- <InputPortfolio v-if="key === 1"></InputPortfolio> -->
        <!-- <InputResult v-if="key === 2"></InputResult> -->
    </v-app>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import InvestDiagnosis from '@/views/finTech/InvestDiagnosis.vue';
import InputPortfolio from '@/views/finTech/InputPortfolio.vue';
import InputResult from '@/views/finTech/InputResult.vue';

Vue.component('InvestDiagnosis', InvestDiagnosis);
Vue.component('InputPortfolio', InputPortfolio);
Vue.component('InputResult', InputResult);

@Component
export default class App extends Vue {
    private key = 2

    private created () {
      this.changeComponent();
    }

    @Watch('$route.name')
    private changeComponent () {
      if (this.$route.name === 'InputPortfolio') {
        this.key = 1;
      } else if (this.$route.name === 'InputResult') {
        this.key = 2;
      }
    }
}
</script>
