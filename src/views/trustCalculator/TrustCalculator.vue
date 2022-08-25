<template>
    <v-app>
      <MainTopBar></MainTopBar>
      <v-main >
        <v-container style="padding-top: 100px;">
          <v-row class="graph justify-center pb-10">
            圖表放置處
          </v-row>
          <v-row class="justify pt-10 justify-center">
            <v-col cols="3" class="d-flex justify-end text-h5">
              <span>{{ ageRangeOption.name[0] }}</span>
              <v-text-field
              v-model="input[ageRangeOption.prop][0]"
              class="ml-2 mt-0 pt-0 text-h5"
              hide-details
              single-line
              type="number"
              style="max-width:20%;"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <div class="range-slider">
                <v-range-slider
                v-model="input.ageRange"
                :min="ageRangeOption.min"
                :max="ageRangeOption.max"
                color="blue"
                track-color="grey lighten-2"
                track-fill-color="yellow darken-2"
                >
                </v-range-slider>
              </div>
            </v-col>
            <v-col cols="3" class="d-flex text-h5">
              <span>{{ageRangeOption.name[1]}}</span>
              <v-text-field
              v-model="input[ageRangeOption.prop][1]"
              class="ml-2 mt-0 pt-0 text-h5"
              hide-details
              single-line
              type="number"
              style="max-width:25%;"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify pt-10 justify-center">
            <v-col cols="3" class="d-flex justify-end text-h5">{{ lifeOption.name }}</v-col>
            <v-col cols="6">
              <div class="slider">
                <v-slider
                v-model="input[lifeOption.prop]"
                :max="lifeOption.max"
                :min="lifeOption.min"
                :step="lifeOption.step"
                color="yellow darken-2"
                :rules="[rules.retireAge]"
                >
                </v-slider>
              </div>
            </v-col>
            <v-col cols="3" class="text-h5">
              <span class="font-weight-black">{{ input[lifeOption.prop] }}</span>
              <span class="ml-2">{{ lifeOption.unit }}</span>
            </v-col>
          </v-row>
          <v-row  v-for="(option, index) in options" :key="index" class="justify pt-10 justify-center">
            <v-col cols="3" class="d-flex justify-end text-h5">{{ option.name }}</v-col>
            <v-col cols="6">
              <div class="slider">
                <v-slider
                v-model="input[option.prop]"
                :max="option.max"
                :min="option.min"
                :step="option.step"
                color="yellow darken-2"
                >
                </v-slider>
              </div>
            </v-col>
            <v-col cols="3" class="text-h5">
              <span class="font-weight-black">{{ input[option.prop] }}</span>
              <span class="ml-2">{{ option.unit }}</span>
            </v-col>
          </v-row>
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
// .v-slider__track-container
::v-deep .v-slider--horizontal .v-slider__track-container {
  height: 12px;
}

::v-deep .v-slider__track-background.grey.lighten-2, ::v-deep .v-slider__track-fill, ::v-deep .v-slider__track-background.primary.lighten-3 {
  border-radius: 45px;
}

::v-deep .v-slider__thumb {
  width: 20px !important;
  height: 20px !important;
}



</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import LineChart from 'echarts/charts'
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
import { barChartOption, orderLineChartOption, portfolioBarChartOption, portfolioLineChartOption } from '@/views/trustCalculator/echartsOptions';
import { Action } from 'vuex-class';
import { number_d } from 'echarts/types/dist/shared';
import { KeyObjectType } from 'crypto';

echarts.use([DatasetComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, CanvasRenderer]);

@Component({
  data() {
    return {

    }
  },
  computed: {

  }
})
export default class TrustCalculator extends Vue {

  // 圖表資料
  private lineChartOption = {};

  // 退休年齡限制
  private rules = {
    retireAge: (value: any) => {
      return !(value < this.input.ageRange[1]) || '不得小於退休年齡';
    }
  };

  // 投資狀況
  public situation = ['better', 'normal', 'poor']

  // 固定內建參數
  public constant: object | any = {
    Rinvest: {
      better: 0.08,  // 較好投報率
      normal: 0.05,  // 一般投報率
      poor: 0.03     // 較差投報率
    },
    Rinflation: 0.02,  // 通膨率
    Rdeposit: 0.01,  // 定存利率
  };
  
  // 輸入參數 (給予初始預設值)
  public input = {
    ageRange:[40, 65],
    lifeAge: 90,
    invMoney: 30, // 萬
    regMoney: 3000,
    deposit: 200, // 萬
    withdraw: 30000
  };

  // 調整器設置
  // 現齡與退休年齡
  private ageRangeOption = {
    name: ['現在年齡', '退休年齡'],
    min: 18,
    max: 85,
    prop:['ageRange']
  };

  // 預期壽命
  private lifeOption = {
    name: '預期壽命',
    prop: 'lifeAge',  
    max: 90,
    min: 0,
    unit: '歲',
    step: 1
  };

  // 單、定、退休提領、定存金額
  private options = [
    {
      name: '單筆投入金額金額',
      prop: 'invMoney',
      max: 100,
      min: 0,
      unit: '萬',
      step: 1
    },
    {
      name: '定期定額投入金額',
      prop: 'regMoney', 
      max: 100000,
      min: 0,
      unit: '元',
      step: 100
    },
    {
      name: '退休後每月提領金額',
      prop: 'withdraw',  
      max: 100000,
      min: 0,
      unit: '元',
      step: 100
    },
    { 
      name: '其他退休金準備(定存)',
      prop: 'deposit',  
      max: 1000,
      min: 0,
      unit: '萬', 
      step: 1
    }
  ];

  //  退休前資產累積  (year為投資第幾年、r為投報率=>好、普通、差)
  private assetBeforeRetire(year: number, r: number) {
    const depositRatio = 1 + this.constant.Rdeposit;                              // 總定存投報率
    const investRatio = 1 + r;                                                    // 總投資投報率
    const totalDeposit = (t: number) => {                                         // 累積定存資產
        return this.input.deposit*10000*(depositRatio**year);                             
    };
    const recrusionAssetBefore = (year: number, r: number) => {                   // 累積投資資產
      const inital = this.input.invMoney*10000;                                   // 初始單筆金額
      const totalRegMoney = this.input.regMoney*12;                               // 每年定期總額
      const total = (inital + totalRegMoney)*investRatio;                         // 當年度投資資產 = (初始單筆金額+每年定期累積金額)X年化報酬率
      if (year == 0) {
        return inital;
      } else if (year == 1) {
        return total;
      } else {
        return (recrusionAssetBefore(year - 1 , r) + totalRegMoney)*investRatio;
      }
    }

    return Math.round(recrusionAssetBefore(year, r) + totalDeposit(year));  // 退休前資產累積 = 累積定存資產 + 累積投資資產
  }

  //  退休後資產累積  (year為退休第幾年、r為投報率=>好、普通、差)
  private assetAfterRetire(year: number, r: number) {
    const depositRatio = 1 + this.constant.Rdeposit;                          // 總定存投報率
    const inflationRatio = 1 + this.constant.Rinflation;                      // 總通膨投報率
    const investRatio = 1 + r;                                                // 總投資投報率
    const investYear = this.input.ageRange[1] - this.input.ageRange[0];   // 投資年數
    // 總加權報酬率(退休後使用的報酬率) = 1 + (累積投資資產 X 總投資投報率 + 累積定存資產 X 總定存投報率) / 總累積資產
    const avgRatio = 1 + (this.assetBeforeRetire(investYear, r)*r - this.input.deposit*10000*(depositRatio**investYear)*investRatio + this.input.deposit*10000*(depositRatio**investYear)*depositRatio) / this.assetBeforeRetire(investYear, r);

    const recrusionAssetAfter: any = (year: number, r: number) => {
      const inital = this.assetBeforeRetire(investYear, r)                        // 初始退休累積資產
      const totalRegWithdraw = (t: number) => {                                   // 提領金額(考慮每年通膨)
        return this.input.withdraw*12*(inflationRatio**t);                             
      };
      const total = (inital - totalRegWithdraw(0))*avgRatio;                      // 當年度投資資產 = (初始單筆金額+每年定期累積金額)X年化報酬率
      if (year < 2) {
        return total;
      } else {
        return (recrusionAssetAfter(year - 1 , r) - totalRegWithdraw(year - 1))*avgRatio;  // 提領後資產累積
      }
    }
    return recrusionAssetAfter(year, r) <= 0 ? 0 : Math.round(recrusionAssetAfter(year, r));
  }

  private setLineChartData() {
    // X軸資料(array)： 現在年齡 至 預期壽命
    const XLineData = new Array(this.input.lifeAge - this.input.ageRange[0] + 1).fill(0).map((item, index) => this.input.ageRange[0]+ index);
    // Y軸資料(array)： 退休前資產累積 至 退休後資產累積 (分成 較好投報率、正常投報率、較差投報率)
    const YLineData: Object | any = new Object();

    // X軸資料分成兩段： 現在年齡 至 退休年齡(含) & 退休年齡+1 至 預期壽命 
    const beforeRetireAgeData = new Array(this.input.ageRange[1] - this.input.ageRange[0] + 1).fill(0).map((item, index) => index);
    const afterRetireAgeData = new Array(this.input.lifeAge - this.input.ageRange[1]).fill(0).map((item, index) => index + 1);
    
    // 退休前累積資產(array)： 分成 較好投報率、正常投報率、較差投報率
    const beforeRetireAssetData: any = this.situation.reduce((all: any, cur: any) => {
      all[cur] = beforeRetireAgeData.map((item, index) => { return this.assetBeforeRetire(item, this.constant.Rinvest[cur]) });
      return all;
    }, new Object());
    // 退休後累積資產(array)： 分成 較好投報率、正常投報率、較差投報率
    const afterRetireAssetData: any = this.situation.reduce((all: any, cur: any) => {
      all[cur] = afterRetireAgeData.map((item, index) => { return this.assetAfterRetire(item, this.constant.Rinvest[cur]) });
      return all;
    }, new Object());
    
    for (let item of this.situation) {
      YLineData[item] = beforeRetireAssetData[item].concat(afterRetireAssetData[item]);
    }

    // console.log(YLineData)
    // console.log(XLineData)
    // console.log(beforeRetireAssetData)
    // console.log(beforeRetireAgeData)
    // console.log(afterRetireAgeData)
    console.log(beforeRetireAssetData)
    console.log(afterRetireAssetData)
    // console.log(YLineData)

  }

  private updated() {
    this.setLineChartData();
  }

  private created() {
  }
}
</script>
