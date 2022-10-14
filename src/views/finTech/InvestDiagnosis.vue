<template>
  <v-app>
    <v-row class="pa-0 ma-0">
      <MainSideBar></MainSideBar>
        <v-main class="grey lighten-4 pb-16">
          <MainTopBar></MainTopBar>
          <v-container class="v-container" fluid>
              <!-- 步驟進度條(隱藏) -->
              <!--  <v-stepper v-model="currentStep">
                <v-stepper-header>
                  <v-stepper-step step="1" :complete="componentKey > 0" color="cyan">
                    個人資料填寫
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step step="2" :complete="componentKey > 1" color="cyan">
                    風險承受測驗
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step step="3" :complete="componentKey > 2" color="cyan">
                    投資標的輸入
                  </v-stepper-step>

                  <v-stepper-step step="4" color="cyan" style="display: none;">
                    -
                  </v-stepper-step>
                </v-stepper-header>
              </v-stepper> -->

              <v-card
                class="container mx-auto rounded-xl pa-5 px-md-5 px-4 white white"
                elevation="2"
                style="overflow: hidden;"
              >
                <!-- loading -->
                <template v-if="getReportLoading === true">
                  <div class="text-center bgProgress d-flex flex-column justify-center align-center">
                    <v-progress-circular
                      :size="100"
                      :width="10"
                      color="white"
                      indeterminate>
                    </v-progress-circular>
                    <p class="text-h6 white--text text--lighten-1 my-4">
                      請稍候
                    </p>
                  </div>
                </template>

                <component v-bind:is="inputCustomer" v-if="componentKey === 0"></component>
                <!-- <component v-bind:is="risk" v-if="componentKey === 1"></component> -->
                <component v-bind:is="inputPortfolio" v-if="componentKey === 1"></component>
                <component v-bind:is="inputResult" v-if="componentKey === 2"></component>
              </v-card>
              <div v-if="componentKey === 2" class="text-left d-flex align-center my-8 yahoo-description mx-auto px-sm-3 px-md-11" elevation="0">
                <div class="purple lighten-5 pa-6 mx-auto">
                  <p class="text-h6 font-weight-bold">同步 Yahoo 股市資料</p>
                  <div class="text-subtitle-2 font-weight-bold d-md-flex">alpha 經你同意授權同步取得以下資料：
                    <div class="d-flex ml-md-3 mt-3 mt-sm-0">
                      <div class="dot deep-purple rounded-circle scale-smaller-3 d-flex align-center justify-center d-flex">
                        <v-icon small color="white">fas fa-check</v-icon>
                      </div>
                      <span>Email</span>
                    </div>
                    <div class="d-flex ml-md-3">
                      <div class="dot deep-purple rounded-circle scale-smaller-3 d-flex align-center justify-center d-flex">
                        <v-icon small color="white">fas fa-check</v-icon>
                      </div>
                      <span>Yahoo 股市投資組合資料</span>
                    </div>
                  </div>
                </div>
              </div>`
          </v-container>
       </v-main>
    </v-row>
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

import jwt_decode from 'jwt-decode';
import { has } from 'lodash-es';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';

import { checkSinopacLogin, getCookie, urlRelocation } from '@/utility/utility';
import InputCustomer from '@/views/investDiagnosis/InputCustomer.vue';
import InputPortfolio from '@/views/investDiagnosis/InputPortfolio.vue';
import InputResult from '@/views/investDiagnosis/InputResult.vue';
import Risk from '@/views/investDiagnosis/Risk.vue';
import MainSideBar from '@/views/main/MainSideBar.vue';
import MainTopBar from '@/views/main/MainTopBar.vue';
import Standard from '@/views/main/Standard.vue';

Vue.component('MainSideBar', MainSideBar);
Vue.component('MainTopBar', MainTopBar);

@Component
export default class InvestDiagnosis extends Standard {
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

  /**
   * components
   */
  private inputCustomer = InputCustomer;
  private risk = Risk;
  private inputPortfolio = InputPortfolio;
  private inputResult = InputResult;

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

    if (getCookie('Login').email !== undefined) {
      this.email = unescape(getCookie('Login').email);

      // 查詢是否曾經做過投資健檢 (包括手動輸入、自動帶入)

      // 查詢是否曾經做過投資健檢 (包括手動輸入、自動帶入)
      await this.getInvestDiagnosisToken(this.email)
        .then((datas) => {
          /**
           * getCookie('investDiagnosis').reload 表示從側邊欄進來的
           */

          // console.log(getCookie('investDiagnosis').reload);
          // console.log(datas.pid)

          // 未簽約已過7天 -> 不能玩
          if ((this.getPersonIdentityLevel.ContractVer !== '5') && (this.getInvestDiagnosisValidData.PHC_status === false)) {
            urlRelocation('selectYahooPortfolios')();
          };

          // 未簽約未過7天 -> 可以玩 | 已簽約 -> 可以玩
          if (((this.getPersonIdentityLevel.ContractVer !== '5') && (this.getInvestDiagnosisValidData.PHC_status === true)) ||
            (this.getPersonIdentityLevel.ContractVer === '5')) {
            // 如果從側邊欄入口近來 且投資健檢有報告 選擇手動輸入(沒有yahoo投組cookie) => 顯示上次報告
            if (datas.pid !== '' && getCookie('investDiagnosis').reload === 'true') {
              urlRelocation('investDiagnosisReport')();
            };

            // 從報告編輯來的
            if (datas.pid !== '' && getCookie('investDiagnosis').reload === 'false') {
              // 直接抓報告就好
              this.getPortfolio(datas.tkn);
            }

            // 如果從側邊欄入口近來 且投資健檢沒報告
            if (datas.pid === '' && getCookie('investDiagnosis').reload === 'true') {
              // 選擇自動帶入(有yahoo投組cookie) => 顯示yahoo投組
              if (getCookie('investDiagnosis').selectionAuto === 'true' && getCookie('yahoo').yahooData) {
                const yahooData = JSON.parse(getCookie('yahoo').yahooData);
                this.getYahooPortfolio(yahooData)
                  .then(() => {
                    this.setInvestDiagnosisLoading(false);
                  });
              } else if (getCookie('investDiagnosis').selectionAuto === 'false') {
                // 選擇手動帶入 填年齡
                this.setInvestDiagnosisLoading(false);
                console.log('false');
              } else {
                // 還沒選
                urlRelocation('selectYahooPortfolios')();
              };
            };
          };
        });
    };
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
