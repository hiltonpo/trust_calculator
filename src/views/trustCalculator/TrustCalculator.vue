<template>
    <v-app>
      <v-main class="pa-0 mt-0" :class="bg">
        <v-container class="pa-0">

          <div class="container mx-auto pa-0">
            <router-view :name="componentName"></router-view>
          </div>

          <template v-if="AnalysisState">
            <div class="text-center bgProgress d-flex flex-column justify-center align-center">
              <v-progress-circular
                :size="100"
                :width="10"
                color="primary"
                indeterminate
              ></v-progress-circular>
              <p class="text-h6 indigo--text text--darken-3 my-4">
                投資健檢報告分析中
              </p>
            </div>
          </template>

        </v-container>
      </v-main>
    </v-app>
</template>

<style lang="scss" scoped>

.container
{
  max-width: 1200px;
  width: 100%;
}
.bgProgress {
  background: rgba(225, 245, 254, 0.8);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}

</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component({
  data() {
    return {
      isShow : true,
      AnalysisState : false
    }
  },
})
export default class TrustCalculator extends Vue {
  @Action('getToken') getToken!: () => Promise<any>;

  private componentName = ''
  private bg = 'white';
  private created () {

  }

  @Watch('$route')
  private changeComponent (to: any, from: any) {
    if (this.$route.query.id === '1') {
      this.componentName = 'InputCustomer';
      this.bg = 'light-blue lighten-5';
    } else if (this.$route.query.id === '2') {
      this.componentName = 'Risk';
      this.bg = 'light-blue lighten-5';
    } else if (this.$route.query.id === '3') {
      this.componentName = 'InputPortfolio';
      this.bg = 'light-blue lighten-5';
    } else if (this.$route.query.id === '4') {
      this.componentName = 'InputResult';
      this.bg = 'light-blue lighten-5';
    } else if (this.$route.query.id === '5') {
      this.componentName = 'InputMail';
      this.bg = 'light-blue lighten-5';
    } else if (this.$route.query.id === '6') {
      this.componentName = 'Finish';
      this.bg = 'light-blue lighten-5';
    } else if (this.$route.query.id === '7') {
      this.componentName = 'Finish';
      this.bg = 'light-blue lighten-5';
    } else {
      this.componentName = 'Inital';
      this.bg = 'white';
    }
  }
}
</script>
