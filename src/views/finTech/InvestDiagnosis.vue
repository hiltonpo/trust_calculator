<template>
  <v-app>
    1234556
  </v-app>
</template>
<style lang="scss" scoped>

.v-container {
  height: 100%;
  width: 95%;
  max-width: 1200px;
  @media screen and (max-width: 600px) {
    width: 98%;
  }
}
.theme--light.v-stepper {
  background: none !important;
}
.v-stepper {
  box-shadow: none !important;
}
.bgProgress {
  background: rgba(0, 172, 193, 0.7);
  position: absolute;
  top: 0; bottom: 0;
  left: 0; right: 0;
  z-index: 3;
}
.yahoo-description {
  max-width: 1176px;
  & > div {
    width: 95%;
    @media screen and (min-width: 600px) {
      width: 90%;
    }
  }
}
// ::v-deep .theme--light.v-sheet {
//   background: transparent;
// }
.yahoo-description {
  max-width: 1176px;
  & > div {
    width: 95%;
    @media screen and (min-width: 600px) {
      width: 90%;
    }
  }
}
// ::v-deep .theme--light.v-sheet {
//   background: transparent;
// }
</style>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';



@Component
export default class InvestDiagnosis extends Vue {
  @Action('getInvestDiagnosisToken') getInvestDiagnosisToken!: (email: any) => Promise<any>;
  @Action('getRecommendList') getRecommendList!: () => Promise<void>;
  @Action('loadPersonLevel') public loadPersonLevel!: () => Promise<any>;

  @Getter('getFundsCurrency') getFundsCurrency!: string[];
  @Getter('getFunds') getFunds!: any;
  @Getter('getPortfolioAll') getPortfolioAll!: any; // 取得全部投組資料
  @Getter('getReportLoading') public getReportLoading!: boolean;

  @Action('addingPortfolio') addingPortfolio!: (data: any) => void;
  @Getter('getInvestDiagnosisValidData') public getInvestDiagnosisValidData!: any;
  @Getter('getPersonIdentityLevel') public getPersonIdentityLevel!: any;
  @Action('getPortfolio') public getPortfolio!: (tkn: any) => Promise<any>;; // 取得使用者前次投組資料
  @Action('getYahooPortfolio') public getYahooPortfolio!: (portfolio: any) => Promise<any>;; // 取得使用者前次投組資料

  @Mutation('setInvestDiagnosisLoading') setInvestDiagnosisLoading!: (boolean: boolean) => void;


  private email = '';
  private componentKey = 0;
  private currentStep = 0;
  // private loading = true;

  private async created () {
    // subjectlist 要先得到
    await this.loadPersonLevel();
    await this.getRecommendList();
    this.changeComponent();

    // subjectlist 要先得到
    await this.loadPersonLevel();
    await this.getRecommendList();
    this.changeComponent();

  }

  @Watch('$route')
  private changeComponent () {
    this.setInvestDiagnosisLoading(true);
    if (this.$route.query.id !== undefined) {
      this.setInvestDiagnosisLoading(false);
    }

    this.setInvestDiagnosisLoading(true);
    if (this.$route.query.id !== undefined) {
      this.setInvestDiagnosisLoading(false);
    }

    if (!this.$route.query.id) {
      this.componentKey = 0;
    // } else if (this.$route.query.id === '1') {
    //   this.componentKey = 1;
    // } else if (this.$route.query.id === '1') {
    //   this.componentKey = 1;
    } else if (this.$route.query.id === '1') {
      this.componentKey = 1;
    } else if (this.$route.query.id === '2') {
      this.componentKey = 2;
    }
    this.currentStep = this.componentKey + 1;
  }

  // @Watch('componentKey')
  // private closeLoading () {
  //   if (this.componentKey !== 0) {
  //     this.loading = false;
  //   }
  // }

  // @Watch('componentKey')
  // private closeLoading () {
  //   if (this.componentKey !== 0) {
  //     this.loading = false;
  //   }
  // }
}
</script>
