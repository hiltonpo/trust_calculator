<template>
  <v-app>
    <article class="bg-home position-relative">
      <div class="home-liquid position-absolute"></div>
      <!-- 阿爾發LOGO -->
      <figure  data-aos="zoom-in-down" data-aos-duration="1500" class="d-flex justify-center mt-10">
        <img class=" home-logo" :src="imgCl" alt="投資健檢"/>
      </figure>
      <!-- 拯救你的投資組合 -->
      <figure class="position-relative d-flex justify-center mt-10">
        <img class="avatar home-title" :src="imgHi" alt="投資健檢"/>
        <!-- 星星 -->
        <div class="blingbling position-absolute">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439.16 448.24" width="500px"><defs></defs><title>shine</title><g id="OBJECTS">
            <polygon class="cls-1 shine star-1" points="106.77 89.07 163.5 87.09 106.77 85.11 128.64 60.59 104.12 82.46 102.14 25.73 100.16 82.46 75.64 60.59 97.5 85.11 40.77 87.09 97.5 89.07 75.64 113.59 100.16 91.72 102.14 148.45 104.12 91.73 128.64 113.59 106.77 89.07"/>
            <polygon class="cls-1 shine star-2" points="224.25 207.06 263.15 205.7 224.62 204.36 243.03 193.17 222.85 202.47 233.02 182.72 220.83 200.93 219.47 162.02 218.13 200.56 206.94 182.15 216.24 202.32 196.49 192.16 214.7 204.34 175.79 205.7 214.33 207.05 195.92 218.24 216.09 208.94 205.93 228.69 218.12 210.47 219.47 249.38 220.82 210.85 232.01 229.25 222.71 209.08 242.46 219.25 224.25 207.06"/>
            <polygon class="cls-1 shine star-3" points="409.06 36.1 439.15 35.05 408.24 33.97 423 24.99 407.79 32 420.82 6.69 405.16 30.09 404.11 0 403.03 30.92 394.05 16.15 401.07 31.36 375.76 18.34 399.16 33.99 369.06 35.05 399.98 36.13 385.21 45.1 400.43 38.09 387.4 63.4 403.06 40 404.11 70.09 405.19 39.17 414.17 53.94 407.15 38.73 432.46 51.76 409.06 36.1"/>
            <polygon class="cls-1 shine star-4" points="62.12 395.44 108.85 393.81 60.84 392.13 83.77 378.19 60.14 389.09 80.38 349.78 56.06 386.12 54.43 339.38 52.75 387.4 38.81 364.47 49.7 388.1 10.39 367.86 46.74 392.18 0 393.81 48.01 395.49 25.08 409.43 48.71 398.54 28.48 437.84 52.79 401.5 54.43 448.24 56.1 400.23 70.04 423.16 59.15 399.53 98.46 419.76 62.12 395.44"/>
            <polygon class="cls-1 shine star-5" points="376.66 272.3 404.11 271.34 376.66 270.38 387.24 258.52 375.38 269.1 374.42 241.65 373.46 269.1 361.6 258.52 372.18 270.38 344.73 271.34 372.18 272.3 361.6 284.17 373.46 273.59 374.42 301.03 375.38 273.59 387.24 284.17 376.66 272.3"/>
            <circle class="cls-2" cx="404.11" cy="35.05" r="3.5"/><circle class="cls-2" cx="374.42" cy="271.34" r="3.5"/><circle class="cls-2" cx="219.47" cy="205.7" r="3.5"/><circle class="cls-2" cx="102.14" cy="87.09" r="3.5"/><circle class="cls-2" cx="54.43" cy="393.81" r="3.5"/>
          </g>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439.16 448.24" width="500px"><defs></defs><title>shine</title><g id="OBJECTS">
            <polygon class="cls-1 shine star-1" points="106.77 89.07 163.5 87.09 106.77 85.11 128.64 60.59 104.12 82.46 102.14 25.73 100.16 82.46 75.64 60.59 97.5 85.11 40.77 87.09 97.5 89.07 75.64 113.59 100.16 91.72 102.14 148.45 104.12 91.73 128.64 113.59 106.77 89.07"/>
            <polygon class="cls-1 shine star-5" points="376.66 272.3 404.11 271.34 376.66 270.38 387.24 258.52 375.38 269.1 374.42 241.65 373.46 269.1 361.6 258.52 372.18 270.38 344.73 271.34 372.18 272.3 361.6 284.17 373.46 273.59 374.42 301.03 375.38 273.59 387.24 284.17 376.66 272.3"/>
            <polygon class="cls-1 shine star-2" points="224.25 207.06 263.15 205.7 224.62 204.36 243.03 193.17 222.85 202.47 233.02 182.72 220.83 200.93 219.47 162.02 218.13 200.56 206.94 182.15 216.24 202.32 196.49 192.16 214.7 204.34 175.79 205.7 214.33 207.05 195.92 218.24 216.09 208.94 205.93 228.69 218.12 210.47 219.47 249.38 220.82 210.85 232.01 229.25 222.71 209.08 242.46 219.25 224.25 207.06"/>
            <polygon class="cls-1 shine star-3" points="409.06 36.1 439.15 35.05 408.24 33.97 423 24.99 407.79 32 420.82 6.69 405.16 30.09 404.11 0 403.03 30.92 394.05 16.15 401.07 31.36 375.76 18.34 399.16 33.99 369.06 35.05 399.98 36.13 385.21 45.1 400.43 38.09 387.4 63.4 403.06 40 404.11 70.09 405.19 39.17 414.17 53.94 407.15 38.73 432.46 51.76 409.06 36.1"/>
            <polygon class="cls-1 shine star-4" points="62.12 395.44 108.85 393.81 60.84 392.13 83.77 378.19 60.14 389.09 80.38 349.78 56.06 386.12 54.43 339.38 52.75 387.4 38.81 364.47 49.7 388.1 10.39 367.86 46.74 392.18 0 393.81 48.01 395.49 25.08 409.43 48.71 398.54 28.48 437.84 52.79 401.5 54.43 448.24 56.1 400.23 70.04 423.16 59.15 399.53 98.46 419.76 62.12 395.44"/>
            <circle class="cls-2" cx="404.11" cy="35.05" r="3.5"/><circle class="cls-2" cx="374.42" cy="271.34" r="3.5"/><circle class="cls-2" cx="219.47" cy="205.7" r="3.5"/><circle class="cls-2" cx="102.14" cy="87.09" r="3.5"/><circle class="cls-2" cx="54.43" cy="393.81" r="3.5"/>
          </g>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439.16 448.24" width="500px"><defs></defs><title>shine</title><g id="OBJECTS">
            <polygon class="cls-1 shine star-5" points="376.66 272.3 404.11 271.34 376.66 270.38 387.24 258.52 375.38 269.1 374.42 241.65 373.46 269.1 361.6 258.52 372.18 270.38 344.73 271.34 372.18 272.3 361.6 284.17 373.46 273.59 374.42 301.03 375.38 273.59 387.24 284.17 376.66 272.3"/>
            <polygon class="cls-1 shine star-4" points="62.12 395.44 108.85 393.81 60.84 392.13 83.77 378.19 60.14 389.09 80.38 349.78 56.06 386.12 54.43 339.38 52.75 387.4 38.81 364.47 49.7 388.1 10.39 367.86 46.74 392.18 0 393.81 48.01 395.49 25.08 409.43 48.71 398.54 28.48 437.84 52.79 401.5 54.43 448.24 56.1 400.23 70.04 423.16 59.15 399.53 98.46 419.76 62.12 395.44"/>
            <polygon class="cls-1 shine star-2" points="224.25 207.06 263.15 205.7 224.62 204.36 243.03 193.17 222.85 202.47 233.02 182.72 220.83 200.93 219.47 162.02 218.13 200.56 206.94 182.15 216.24 202.32 196.49 192.16 214.7 204.34 175.79 205.7 214.33 207.05 195.92 218.24 216.09 208.94 205.93 228.69 218.12 210.47 219.47 249.38 220.82 210.85 232.01 229.25 222.71 209.08 242.46 219.25 224.25 207.06"/>
            <polygon class="cls-1 shine star-1" points="106.77 89.07 163.5 87.09 106.77 85.11 128.64 60.59 104.12 82.46 102.14 25.73 100.16 82.46 75.64 60.59 97.5 85.11 40.77 87.09 97.5 89.07 75.64 113.59 100.16 91.72 102.14 148.45 104.12 91.73 128.64 113.59 106.77 89.07"/>
            <polygon class="cls-1 shine star-3" points="409.06 36.1 439.15 35.05 408.24 33.97 423 24.99 407.79 32 420.82 6.69 405.16 30.09 404.11 0 403.03 30.92 394.05 16.15 401.07 31.36 375.76 18.34 399.16 33.99 369.06 35.05 399.98 36.13 385.21 45.1 400.43 38.09 387.4 63.4 403.06 40 404.11 70.09 405.19 39.17 414.17 53.94 407.15 38.73 432.46 51.76 409.06 36.1"/>
            <circle class="cls-2" cx="404.11" cy="35.05" r="3.5"/><circle class="cls-2" cx="374.42" cy="271.34" r="3.5"/><circle class="cls-2" cx="219.47" cy="205.7" r="3.5"/><circle class="cls-2" cx="102.14" cy="87.09" r="3.5"/><circle class="cls-2" cx="54.43" cy="393.81" r="3.5"/>
          </g>
          </svg>
        </div>
      </figure>
      <!-- 閃電 -->
      <!-- <figure class="avatar d-flex justify-center mt-10">
        <img class="home-lightning" :src="imgLt" alt="投資健檢"/>
      </figure> -->
      <!-- 立即體驗 ALPHA投資健檢領好禮 ! -->
      <div data-aos="fade-right" data-aos-duration="2000" class="text-center white--text my-10 position-relative">
        <h1 style="font-size:40px;">
          立即體驗 alpha 投資健檢領好禮 !
        </h1>
      </div>
      <!-- 拯救你的投資組合 -->
      <figure class="d-flex justify-center position-relative">
        <img  data-aos="zoom-in-up" data-aos-duration="1500" class=" home-phone" :src="imghp" alt="投資健檢"/>
        <router-link to="/ChoosePortfolio">
          <div class="login-box nextStep position-absolute">
            <a class=" pulsing ">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              立即體驗
            </a>
          </div>
        </router-link>
      </figure>

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

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.home {
  &-liquid {
    width: 100%;
    height: 100%;
    background: linear-gradient(-45deg, #3A007C, #4c1d56, #9822c3, #00009C);
    background-size: 400% 400%;
    animation: gradient 2s ease infinite;
    opacity: 0.5;
  }
  &-logo {
    width: 20%;
  }
  &-title {
    width: 75%;
  }
  &-lightning {
    width: 80%;
  }
  &-phone {
    width: 70%;
  }
}

.blingbling{
  top: 250px;
  left: 70px;
}

.shine {
  animation-name: glitter;
  animation-iteration-count: infinite;
}

.star-1 {
  transform-origin: 102.14px 87.09px;
  animation-duration: 3.5s;
}

.star-2 {
  transform-origin: 219.47px 205.7px;
  animation-duration: 4s;
}

.star-3 {
  transform-origin: 404.11px 35.05px;
  animation-duration: 2.5s;
}

.star-4 {
  transform-origin: 54.43px 393.81px;
  animation-duration: 2.5s;
}

.star-5 {
  transform-origin: 374.42px 271.34px;
  animation-duration: 3s;
}

@keyframes glitter {
  0% {
    -webkit-transform: scale(0.3) rotate(0deg);
    opacity: 0;
  }
  50% {
    -webkit-transform: scale(.8) rotate(360deg);
    opacity: .7;
  }
  100% {
    -webkit-transform: scale(0.3) rotate(0deg);
    opacity: 0;
  }
}

.cls-1 {
  fill:#D49DFF;
}
.cls-2 {
  fill:#D49DFF;
}

.avatar {
  overflow: hidden;
  transform: translatey(0px);
  animation: float 2.5s ease-in-out infinite;
}
@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-20px) ;
  }
  100% {
    transform: translatey(0px);
  }
}
.nextStep {
  bottom: -200px;
  left: 100px;
}

.pulsing {
  width: 900px;
  height: 11vh !important;
  font-size: 80px;
  font-weight: 600;

  z-index: 12 !important;
  color: #FFF;
  background: linear-gradient(to right, #774DAF 0%, #942987 100%);
  text-shadow: rgb(3, 3, 3) 4px 4px 15px;
}

.login-box a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #F5DDFF !important;
  text-decoration: none;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px;
  text-align:center;
  line-height: 170px;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, transparent, #F5DDFF);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #F5DDFF);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 5px;
  background: linear-gradient(270deg, transparent, #F5DDFF);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #F5DDFF);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}

</style>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';

import imgCl from '@/assets/img/investDiagnosis/coverLogo.png';
import imgHi from '@/assets/img/investDiagnosis/logo_home_img.png';
import imgLt from '@/assets/img/investDiagnosis/home-lightning.png';
import imghp from '@/assets/img/investDiagnosis/mobile_home_img.png';

@Component
export default class InvestDiagnosis extends Vue {
  private imgCl = imgCl;
  private imgHi = imgHi;
  private imgLt = imgLt;
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
