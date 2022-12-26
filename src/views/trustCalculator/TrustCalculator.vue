<template>
    <v-app>
      <MainTopBar></MainTopBar>
      <v-main class="pb-0">
        <v-container class="pa-0" fluid>
          <section class="index main-kv overflow-hidden">
            <!-- <div> -->
              <div id="wrap" :class="isAnimated ? 'animated' : ''">
                <svg viewbox="20 0 450 400" class="pieChart" preserveAspectRatio="xMinYMin slice">
                  <circle class="outline" r="100" cx="210" cy="200" />
                  <circle class="pie-1" r="100" cx="210" cy="200" />
                  <circle class="pie-2" r="100" cx="210" cy="200" />
                  <circle class="pie-3" r="100" cx="210" cy="200" />
                  <circle class="pie-4" r="100" cx="210" cy="200" />
                  <circle class="pie-5" r="100" cx="210" cy="200" />
                  <circle class="pie-6" r="100" cx="210" cy="200" />
                  <circle id="helper" style="display:none;" r="110" cy="200" cx="205" stroke-width="1" stroke="blue" fill="none" />
                  <circle id="helper" style="display:none;" r="150" cy="200" cx="205" stroke-width="1" stroke="blue" fill="none" />
                </svg>
              </div>
            <!-- </div> -->
            <div style="padding-bottom: 80px;">
              <v-row class="flex-column align-center" style="font-size: 24px">
                <h1>阿爾發智能理財</h1>
                <h1>安養信託</h1>
                <h1>試算工具</h1>
              </v-row>
            </div>
            <div class="logo" style="padding-bottom: 100px;">
              <v-row class="justify-center">
                <div>
                  <img class="logo" style="width:130px; height:70px" :src="logo" />
                </div>
              </v-row>
            </div>
          </section>
          <section>
            <v-row style="height:70px" class="ma-0">
              <v-col cols="6" class="pa-0">
                <v-btn
                width="100%"
                height="100%"
                :color="plan === 0 ? 'white' : '#00000029'"
                :style="plan === 0 ?  '' : 'opacity: 70%'"
                @click="choosePlan(0)"
                >
                  <span :class="plan === 0 ? 'clickOn' : 'hoverOn'" class="btn">
                    退休規劃
                  </span>
                </v-btn>
              </v-col>
              <v-col cols="6" class="pa-0">
                <v-btn
                width="100%"
                height="100%"
                :color="plan === 1 ? 'white' : '#00000029'"
                :style="plan === 1 ?  '' : 'opacity: 70%'"
                @click="choosePlan(1)"
                >
                  <span :class="plan === 1 ? 'clickOn' : 'hoverOn'" class="btn">
                    累積財富
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </section>
        </v-container>
      </v-main>
      <!-- 退休計畫試算表 -->
      <component v-bind:is="RetirePlan" v-if="plan === 0"></component>
      <!-- 累積財富試算表 -->
      <component v-bind:is="WealthPlan" v-if="plan === 1"></component>
      <!-- <RetirePlan v-if="plan === 1"></RetirePlan>
      <WealthPlan v-if="plan === 2"></WealthPlan> -->
    </v-app>
</template>

<style lang="scss" scoped>
.index {
  // padding-bottom: 670px;
  background-image: url(~@/assets/img/bg.png);
  background-size: cover;
  background-position: center center;
}

.hoverOn {
  display: inline-block;
  position: relative;
}

.hoverOn::after {
  background: none repeat scroll 0 0 transparent;
  bottom:-20px;
  content: "";
  display: block;
  height: 3px;
  left: 50%;
  position: absolute;
  background: #CC9C50;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}

.hoverOn:hover::after {
  width: 100%;
  left: 0;
}

.btn:hover {
  color: #CC9C50;
}

.clickOn {
  color: #CC9C50;
  display: inline-block;
  position: relative;
}

.clickOn::after {
    background: none repeat scroll 0 0 transparent;
  bottom:-20px;
  content: "";
  display: block;
  height: 3px;
  left: 0;
  position: absolute;
  background: #CC9C50;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 100%;
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

.pie-1 {
  stroke-dasharray: 0 628.32;
  stroke-dashoffset: 498;
  stroke: #8E714F;
  transition-delay: 25ms;
}
.pie-2 {
  stroke-dasharray: 0 628.32;
  stroke-dashoffset: 490;
  stroke: #CC9C50;
  transition-delay: 50ms;
}
.pie-3 {
  stroke-dasharray: 0 628.32;
  stroke-dashoffset: 560;
  stroke: #E8B462;
  transition-delay: 75ms;
}
.pie-4 {
  stroke-dasharray: 0 628.32;
  stroke-dashoffset: -69;
  stroke: #F5D39C;
  transition-delay: 100ms;
}
.pie-5 {
  stroke-dasharray: 0 628.32;
  stroke-dashoffset:  10;
  stroke: #A6C7A5;
  transition-delay: 125ms;
}
.pie-6 {
  stroke-dasharray: 0 628.32;
  stroke-dashoffset: 164;
  stroke: #6BB169;
  transition-delay: 150ms;
}

.animated {
  [class^="data"],
  .outline { opacity: 1; }
  .pie-1 { stroke-dasharray: 208 628.32; }
  .pie-2 { stroke-dasharray: 100 628.32; }
  .pie-3 { stroke-dasharray:  85 628.32; }
  .pie-4 { stroke-dasharray:  85 628.32; }
  .pie-5 { stroke-dasharray:  80 628.32; }
  .pie-6 { stroke-dasharray:  82 628.32; }
}

// PRESENTATION
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

import logo from '@/assets/img/logo.png';
import bg from '@/assets/img/bg.png';

echarts.use([DatasetComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, CanvasRenderer]);
Vue.component('RetirePlan', RetirePlan);
Vue.component('WealthPlan', WealthPlan);

@Component({
  setup () {
    return {
      logo: logo,
      bg: bg
    };
  }
})
export default class TrustCalculator extends Vue {
  private RetirePlan = RetirePlan;
  private WealthPlan = WealthPlan;

  private isAnimated = false

  private plan = 0;

  private choosePlan (val: any) {
    this.plan = val;
  }

  private created () {
    setTimeout(() => {
      this.isAnimated = true;
    }, 1000);
  }
}

</script>
