<template>
    <v-app>
      <MainTopBar></MainTopBar>
      <v-main class="pb-0">
        <v-container class="pa-0" fluid>
          <section class="main-kv overflow-hidden" :class="`index-${company}`">
            <!-- <div> -->
              <div id="wrap" :class="isAnimated ? 'animated' : ''">
                <svg viewbox="20 0 450 400" class="pieChart" preserveAspectRatio="xMinYMin slice">
                  <circle class="outline" r="100" cx="210" cy="200" />
                  <circle :class="`pie-1-${company}`" r="100" cx="210" cy="200" />
                  <circle :class="`pie-2-${company}`" r="100" cx="210" cy="200" />
                  <circle :class="`pie-3-${company}`" r="100" cx="210" cy="200" />
                  <circle :class="`pie-4-${company}`" r="100" cx="210" cy="200" />
                  <circle :class="`pie-5-${company}`" r="100" cx="210" cy="200" />
                  <circle :class="`pie-6-${company}`" r="100" cx="210" cy="200" />
                  <circle id="helper" style="display:none;" r="110" cy="200" cx="205" stroke-width="1" stroke="blue" fill="none" />
                  <circle id="helper" style="display:none;" r="150" cy="200" cx="205" stroke-width="1" stroke="blue" fill="none" />
                </svg>
              </div>
            <!-- </div> -->
            <div style="padding-bottom: 80px;">
              <v-row :class="company + '-header flex-column align-center'" style="font-size: 24px; position: relative;">
                <h1>阿爾發智能理財</h1>
                <h1>安養信託</h1>
                <h1>試算工具</h1>
              </v-row>
            </div>
            <div class="logo">
              <v-row class="justify-center">
                <div>
                  <img style="width:160px;" :src="logo" />
                </div>
              </v-row>
            </div>
            <!-- 塞scroll箭頭 -->
            <div class="scrollBox text-center mb-10">
              <h1>
                scroll
                <svg version="1.1" id="svg-arrow-down" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 35" style="enable-background:new 0 0 22 35;" xml:space="preserve">
                  <polygon class="arrow" style="fill:#000000;" points="20.58,11.584 12.004,20.158 12.004,0 9.996,0 9.996,20.158 1.42,11.584 0,13.004 11,24 22,13.004 "></polygon>
                </svg>
              </h1>
            </div>
          </section>
          <section>
            <v-row style="height:70px" class="ma-0">
              <v-col cols="6" class="pa-0">
                <v-btn
                width="100%"
                height="100%"
                :color="plan === 0 ? btnChangeColor(company)[0] : btnChangeColor(company)[1]"
                :style="plan === 0 ?  '' : 'opacity: 70%'"
                @click="choosePlan(0)"
                >
                  <span :class="plan === 0 ? `clickOn-${company}` : `hoverOn-${company}`">
                    退休規劃
                  </span>
                </v-btn>
              </v-col>
              <v-col cols="6" class="pa-0">
                <v-btn
                width="100%"
                height="100%"
                :color="plan === 1 ? btnChangeColor(company)[0] : btnChangeColor(company)[1]"
                :style="plan === 1 ?  '' : 'opacity: 70%'"
                @click="choosePlan(1)"
                >
                  <span :class="plan === 1 ? `clickOn-${company}` : `hoverOn-${company}`">
                    累積財富
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </section>
        </v-container>
      </v-main>
      <!-- 退休計畫試算表 -->
      <component v-bind:is="RetirePlan" :type="company" v-if="plan === 0"></component>
      <!-- 累積財富試算表 -->
      <component v-bind:is="WealthPlan" :type="company" v-if="plan === 1"></component>
      <!-- <RetirePlan v-if="plan === 1"></RetirePlan>
      <WealthPlan v-if="plan === 2"></WealthPlan> -->
      <section :class="`optionArea-${company}`" style="padding-bottom:40px">
        <div class="mt-1 d-flex justify-center">
          <a :href="href()" target="_blank">
            <v-btn class="white--text rounded-xl" color="#BE0000" style="height: 48px">了解更多</v-btn>
          </a>
        </div>
      </section>
    </v-app>
</template>

<style lang="scss" scoped>
/***各家的背景顏色(要新增的地方)***/
$area-colors: (
  Golden: #f2eada,
  ENOCH: #F7F8F7,
  Attendance: #F7F8F7,
  GoodBigMoney: #FFF7F7,
  ForeverPeace: #F7F8F7,
);

/***各家的button hover底線顏色(要新增的地方)***/
$hover-colors: (
  Golden: #CC9C50,
  ENOCH: #FFFFFF,
  Attendance: #FFFFFF,
  GoodBigMoney: #FFFFFF,
  ForeverPeace: #FFFFFF,
);

/***各家的bg(要新增的地方)***/
$banner: (
  Golden: url(~@/assets/img/bg.png),
  ENOCH: url(~@/assets/img/enoch-bg.jpg),
  Attendance: url(~@/assets/img/attendance-bg.jpg),
  GoodBigMoney: url(~@/assets/img/good-bg.jpg),
  ForeverPeace: url(~@/assets/img/FP-bg.png),
);

// 固定不用調
$pieDashoffset:(328, 412, 507, -103, 0, 329);
$pieDelay:(25ms, 50ms, 75ms, 100ms, 125ms, 150ms);

/***各家的piechart調整(要新增的地方)***/
$pieGolden:(#8E714F, #CC9C50, #E8B462, #F5D39C, #A6C7A5, #6BB169);
$pieEnoch:(#005874, #0088AC, #ACEDFF, #EBC0AC, #D35A23, #004266);
$pieAttendance:(#005874, #0088AC, #ACEDFF, #F3D39C, #D0AD87, #003146);
$pieGoodBigMoney:(#FFDC74, #FDC725, #FF9A9A, #F5211F, #D80B04, #AE020B);
$pieForeverPeace:(#3884DB, #68BFFA, #00AF95, #FF9204, #FE4358, #0052AE);
$pieType:(Golden, ENOCH, Attendance, GoodBigMoney, ForeverPeace);

@each $key, $value in $banner {
  .index-#{$key} {
    position: relative;
    // height: 100vh;
    width: 100%;
  }

  .index-#{$key}::before {
      content: "";
      background-image: $value;
      background-size: cover;
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      opacity: 0.41;
  }
}

@each $key, $value in $area-colors {
  .optionArea-#{$key} {
    background-color: $value;
  }
}

/***各家的標題顏色(要新增的地方)***/
.Golden-header {
  color: black;
}

.ENOCH-header {
  color: #004266;
}

.Attendance-header {
  color: #004266;
}

.GoodBigMoney-header {
  color: #393939;
}

.ForeverPeace-header {
  color: black;
}

.logo {
  padding-bottom: 40px;
  position: relative
}

@each $key, $value in $hover-colors {
  .hoverOn-#{$key} {
    display: inline-block;
    position: relative;
  }

  .hoverOn-#{$key}::after {
    background: none repeat scroll 0 0 transparent;
    bottom:-20px;
    content: "";
    display: block;
    height: 3px;
    left: 50%;
    position: absolute;
    background: $value;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }

  .hoverOn-#{$key}:hover::after {
    width: 100%;
    left: 0;
  }

  .clickOn-#{$key} {
    color: $value;
    display: inline-block;
    position: relative;
  }

  .clickOn-#{$key}::after {
    background: none repeat scroll 0 0 transparent;
    bottom:-20px;
    content: "";
    display: block;
    height: 3px;
    left: 0;
    position: absolute;
    background: $value;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 100%;
  }
}

.v-btn {
  font-size: 20px;
  border-radius: 0;
}

[class^="pie"] {
  stroke-width: 58;
  fill: none;
  transition: all ease 450ms;
}

[class^="pie"]:hover {
  stroke-width: 70; border-radius: 4px;
}

.outline {
  stroke-width: 68;
  stroke: #fff;
  fill: none;
  opacity: 0;
  transition: all ease 450ms 1000ms;
}

@for $i from 1 through 6 {
  .pie-#{$i}-Golden {
    stroke-dasharray: 0 628.32;
    stroke-dashoffset: nth($pieDashoffset, $i);
    stroke: nth($pieGolden, $i);
    transition-delay: nth($pieDelay, $i);
  }

  .pie-#{$i}-ENOCH {
    stroke-dasharray: 0 628.32;
    stroke-dashoffset: nth($pieDashoffset, $i);
    stroke: nth($pieEnoch, $i);
    transition-delay: nth($pieDelay, $i);
  }

  .pie-#{$i}-Attendance {
    stroke-dasharray: 0 628.32;
    stroke-dashoffset: nth($pieDashoffset, $i);
    stroke: nth($pieAttendance, $i);
    transition-delay: nth($pieDelay, $i);
  }

  .pie-#{$i}-GoodBigMoney {
    stroke-dasharray: 0 628.32;
    stroke-dashoffset: nth($pieDashoffset, $i);
    stroke: nth($pieGoodBigMoney, $i);
    transition-delay: nth($pieDelay, $i);
  }

  .pie-#{$i}-ForeverPeace {
    stroke-dasharray: 0 628.32;
    stroke-dashoffset: nth($pieDashoffset, $i);
    stroke: nth($pieForeverPeace, $i);
    transition-delay: nth($pieDelay, $i);
  }
}

@for $i from 1 through 5 {
  .animated {
  [class^="data"],
  .outline { opacity: 1; }
  .pie-1-#{nth($pieType, $i)} { stroke-dasharray: 85 628.32; }
  .pie-2-#{nth($pieType, $i)} { stroke-dasharray: 85 628.32; }
  .pie-3-#{nth($pieType, $i)} { stroke-dasharray: 90 628.32; }
  .pie-4-#{nth($pieType, $i)} { stroke-dasharray: 110 628.32; }
  .pie-5-#{nth($pieType, $i)} { stroke-dasharray: 105 628.32; }
  .pie-6-#{nth($pieType, $i)} { stroke-dasharray: 170 628.32; }
}
}

#wrap {
  margin: 0 auto;
  width: 420px;
  height: 400px;
}

.pieChart {
  width:100%;
  height:100%;
  scale:1.1;

  @media screen and (max-width: 400px) {
    transform: translate(-4vw, 0px);
  }

  @media screen and (max-width: 376px) {
    transform: translate(-6vw, 0px);
  }

  @media screen and (max-width: 361px) {
    transform: translate(-8vw, 0px);
  }
}

.scrollBox {
  // position: fixed;
  // top: 50%;
  // left: 50%;
  // font-family: sans-serif;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  // transform: translate(-50%, -50%);
  svg {
    width: 14px;
    display: block;
    margin: 10px auto;
    .arrow {
      animation: scroll .35s ease-in alternate infinite;
    }
  }
}

@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
}
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import {
  CanvasRenderer
} from 'echarts/renderers';
import RetirePlan from '@/views/trustCalculator/RetirePlan.vue';
import WealthPlan from '@/views/trustCalculator/WealthPlan.vue';

import logoGolden from '@/assets/img/logo.png';
import logoEnoch from '@/assets/img/enoch_logo.png';
import logoAttendance from '@/assets/img/attendance_logo.png';
import logoGood from '@/assets/img/good_logo.png';
import logoFP from '@/assets/img/FP_logo.png';

echarts.use([DatasetComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, CanvasRenderer]);
Vue.component('RetirePlan', RetirePlan);
Vue.component('WealthPlan', WealthPlan);

@Component
export default class TrustCalculator extends Vue {
  private RetirePlan = RetirePlan;
  private WealthPlan = WealthPlan;

  private isAnimated = false

  private plan = 0;
  private company = '' as any;
  private logo = '';

  private choosePlan (val: any) {
    this.plan = val;
  }

  private href () {
    if (this.company === 'GoodBigMoney') {
      return 'https://bigmoney.goodins.life/uncategorized/32163/c-future-life';
    }
  }

  // 各家的button底色
  private btnChangeColor (company: any) {
    if (company === 'ENOCH') {
      return ['#074163', '#FFFFFF'];
    } else if (company === 'Attendance') {
      return ['#074163', '#FFFFFF'];
    } else if (company === 'GoodBigMoney') {
      return ['#E63A36', '#FFFFFF'];
    } else if (company === 'ForeverPeace') {
      return ['#0050A8', '#FFFFFF'];
    } else {
      return ['white', '#00000029'];
    }
  }

  private created () {
    this.company = ['ENOCH', 'Attendance', 'GoodBigMoney', 'ForeverPeace'].indexOf(this.$route.query.type as any) === -1 ? 'Golden' : this.$route.query.type;
    // 以諾 信託試算工具
    if (this.company === 'ENOCH') {
      this.logo = logoEnoch;
    // 上勤 信託試算工具
    } else if (this.company === 'Attendance') {
      this.logo = logoAttendance;
    // 好險有錢 信託試算工具
    } else if (this.company === 'GoodBigMoney') {
      this.logo = logoGood;
    // 永平 信託試算工具
    } else if (this.company === 'ForeverPeace') {
      this.logo = logoFP;
    // 公勝 信託試算工具
    } else {
      this.logo = logoGolden;
    }

    setTimeout(() => {
      this.isAnimated = true;
    }, 1000);
  }
}

</script>
