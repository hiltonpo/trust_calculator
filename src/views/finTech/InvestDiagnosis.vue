<template>
  <v-app>
    <article class="bg-home">
      <!-- 阿爾發LOGO -->
      <figure class="d-flex justify-center mt-10">
        <img class=" home-logo" :src="imgCl" alt="投資健檢"/>
      </figure>
      <!-- 拯救你的投資組合 -->
      <figure class="d-flex justify-center mt-10">
        <img class=" home-title" :src="imgHi" alt="投資健檢"/>
      </figure>
      <!-- 立即體驗 ALPHA投資健檢領好禮 ! -->
      <div class="text-center white--text my-10">
        <h1 style="font-size:40px;">
        立即體驗 alpha 投資健檢領好禮 !
        </h1>
      </div>
      <!-- 拯救你的投資組合 -->
      <figure class="d-flex justify-center">
        <img class=" home-phone" :src="imghp" alt="投資健檢"/>
      </figure>
      <v-btn class="nextStep">
        立即體驗
      </v-btn>
    </article>
  </v-app>
</template>

<style lang="scss" scoped>
.bg-home {
  max-width: 1080px;
  width: 100vh;
  height: 100vh;
  background: url(~@/assets/img/investDiagnosis/bg_home.png) no-repeat;
  overflow: hidden;
}
.home {
  &-logo {
    width: 20%;
  }
  &-title {
    // width: 10%;
  }
  &-phone {
    width: 70%;
  }
}
.nextStep {
  width: 100%;
  height: 12vh !important;
  font-size: 100px;
  font-weight: 600;
}

.theme--light.v-btn.v-btn--has-bg {
  color: #FFF;
  background: linear-gradient(90deg,#7065f7,#de7bfe);
  text-shadow: rgb(3, 3, 3) 4px 4px 15px;
}

</style>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';

import imgCl from '@/assets/img/investDiagnosis/coverLogo.png';
import imgHi from '@/assets/img/investDiagnosis/logo_home_img.png';
import imghp from '@/assets/img/investDiagnosis/mobile_home_img.png';


@Component
export default class InvestDiagnosis extends Vue {
  private imgCl = imgCl;
  private imgHi = imgHi;
  private imghp = imghp;
  // @Action('getInvestDiagnosisToken') getInvestDiagnosisToken!: (email: any) => Promise<any>;
  // @Action('getRecommendList') getRecommendList!: () => Promise<void>;
  // @Action('loadPersonLevel') public loadPersonLevel!: () => Promise<any>;

  // @Getter('getFundsCurrency') getFundsCurrency!: string[];
  // @Getter('getFunds') getFunds!: any;
  // @Getter('getPortfolioAll') getPortfolioAll!: any; // 取得全部投組資料
  // @Getter('getReportLoading') public getReportLoading!: boolean;

  // @Action('addingPortfolio') addingPortfolio!: (data: any) => void;
  // @Getter('getInvestDiagnosisValidData') public getInvestDiagnosisValidData!: any;
  // @Getter('getPersonIdentityLevel') public getPersonIdentityLevel!: any;
  // @Action('getPortfolio') public getPortfolio!: (tkn: any) => Promise<any>;; // 取得使用者前次投組資料
  // @Action('getYahooPortfolio') public getYahooPortfolio!: (portfolio: any) => Promise<any>;; // 取得使用者前次投組資料

  // @Mutation('setInvestDiagnosisLoading') setInvestDiagnosisLoading!: (boolean: boolean) => void;

  // setup () {
  //   return {
  //     imgLr: require('@/assets/img/investDiagnosis/coverLogo.png')
  //   };
  // }
}
</script>
