<template>
    <v-app>
      <MainTopBar></MainTopBar>
      <v-main >
        <v-container fluid style="padding-top: 100px;">
          <v-row class="justify-end pb-10">
              <div class="text-legend pa-6" style="border: 1px solid black">
                <div class="mb-8">
                  <span style="display:inline-block;margin-right:20px;border-radius:35px;width:25px;height:25px;background-color:#3cbedd"></span>
                  <span class="text-content">{{ text[0] }}</span>
                </div>
                <div>
                  <span style="display:inline-block;margin-right:20px;border-radius:35px;width:25px;height:25px;background-color:#878787"></span>
                  <span class="text-content">{{ text[1] }}</span>
                </div>
              </div>
          </v-row>
          <v-row class="graph justify-center pb-10">
            <LineChart
              chartID="trustLineChart"
              ref="trustLineChart"
              :height="'1000px'"
              :lineChartOption="lineChartOption">
            </LineChart>
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
              style="max-width:10%;"
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
              style="max-width:10%;"
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
.text-legend {
  margin: 0 auto;
  @media (min-width: 900px){
    margin-right: 150px;
  }
  .text-content {
    font-size: 20px;
    @media (min-width: 900px){
    font-size: 36px;
  }
  }
}

.container
{
  max-width: 100%;
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
import { number } from 'echarts/core';

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
  
  //文字資料
  private text: Array<string> = [];

  // 圖表資料
  private lineChartOption = {};

  // 退休年齡限制
  private rules = {
    retireAge: (value: any) => {
      return !(value < this.input.ageRange[1]) || '不得小於退休年齡';
    }
  };

  // 投資狀況
  public situation = ['better', 'normal', 'poor', 'withdraw']

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
    deposit: 300, // 萬
    withdraw: 22000
  };

  // 文字動態設置
  private textRender = (retireAge: any, assetMax: any, retireMax: any) => {
    const assetFixed = (assetMax/10000).toFixed(0)
    const retireFixed = (retireMax/10000).toFixed(0)
    return [`${retireAge}歲時，資產預期會成長到約TWD＄ ${assetFixed} 萬`, `${retireAge}歲時，你需要的退休金目標約為TWD＄ ${retireFixed} 萬`]
  }

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
  
  // 讓圖表RWD
  private chartsResize() {
    const resizeAllCharts = () => {
      this.$refs.trustLineChart.drawLineChart();
    }

    setTimeout(() => {
      resizeAllCharts();
      window.addEventListener('resize', resizeAllCharts)
    }, 50)
  }

  //  退休前資產累積  (year為投資第幾年、r為投報率=>好、普通、差)
  private assetBeforeRetire(year: number, r: number) {
    const depositRatio = 1 + this.constant.Rdeposit;                              // 總定存投報率
    const investRatio = 1 + r;                                                    // 總投資投報率
    const totalDeposit = (t: number) => {                                         // 累積定存資產
        return this.input.deposit*10000*(depositRatio**year);                             
    };
    const recrusionAssetBefore: any = (year: number, r: number) => {                   // 累積投資資產
      const inital = this.input.invMoney*10000;                                   // 初始單筆金額
      const totalRegMoney = this.input.regMoney*12;                               // 每年定期總額
      const total = (inital + totalRegMoney)*investRatio;                         // 當年度投資資產 = (初始單筆金額+每年定期累積金額)X年化報酬率
      if (year == 0) {
        return inital;
      } else if (year == 1) {
        return total;
      } else {
        return (recrusionAssetBefore(year - 1 , r) + totalRegMoney)*investRatio;
      };
    };

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
      const inital = this.assetBeforeRetire(investYear, r);                       // 初始退休累積資產
      const totalRegWithdraw = (t: number) => {                                   // 每年提領金額(考慮每年通膨)
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
    // Y軸資料(array)： 退休前資產累積 至 退休後資產累積 (分成 較好投報率、正常投報率、較差投報率 三條折線)
    const YLineData: Object | any = new Object();

    // X軸資料分成兩段： 現在年齡 至 退休年齡(含) & 退休年齡+1 至 預期壽命 
    const beforeRetireAgeData = new Array(this.input.ageRange[1] - this.input.ageRange[0] + 1).fill(0).map((item, index) => index);
    const afterRetireAgeData = new Array(this.input.lifeAge - this.input.ageRange[1]).fill(0).map((item, index) => index + 1);
    
    // 退休前累積資產(array)： 分成 較好投報率、正常投報率、較差投報率 三條折線
    const beforeRetireAssetData: any = this.situation.reduce((all: any, cur: any) => {
      all[cur] = beforeRetireAgeData.map((year, index) => { return this.assetBeforeRetire(year, this.constant.Rinvest[cur]) });
      return all;
    }, new Object());
    // 退休後累積資產(array)： 分成 較好投報率、正常投報率、較差投報率三條折線
    const afterRetireAssetData: any = this.situation.reduce((all: any, cur: any) => {
      all[cur] = afterRetireAgeData.map((year, index) => { return this.assetAfterRetire(year, this.constant.Rinvest[cur]) });
      return all;
    }, new Object());
    
    // 預計提領總金額
    const withdrawAll: any = afterRetireAgeData.reduce((all: any, cur: any) => {
      return  Math.round(all + this.input.withdraw*12*((1 + this.constant.Rinflation) ** cur));
    }, 0);
    
    // 將 退休前+退休後累積資產(三種報酬率)、提領金額 塞進Y軸資料
    (function fillDataToYLine(situation, arrayFillBefore, arrayFillAfter) {
      for (let item of situation) {
        if (item !== 'withdraw') {
          YLineData[item] = beforeRetireAssetData[item].concat(afterRetireAssetData[item]);
        } else {
          // Y軸座標起始(0)->最高點(提領總額)->終點(0)
          YLineData[item] = [0, ...arrayFillBefore, withdrawAll, ...arrayFillAfter, 0];
        };
      }
    })(this.situation, new Array(beforeRetireAgeData.length - 2).fill(''), new Array(afterRetireAgeData.length - 1).fill(''));

    // Y軸座標最大值Maximum 動態調整 避免過大造成圖表縮小不易閱讀 
    const maximum = (assetMax: any, withdrawMax: any) => {
      const axisMax = () => { return Math.max(...assetMax) >= withdrawMax ? Math.max(...assetMax).toString() : withdrawMax.toString() };
      const reset = (condition: any) => {
        if ( condition === 'upToFive' ) {
          return [...axisMax()].map((item: any, index: any) => { if(index == 0) {return item} else if (index == 1) { return '5' } else { return '0'} }).join('');
        } else if ( condition === 'upToOrder' ) {
          return [...axisMax()].map((item: any, index: any) => { if(index == 0) {return (Number(item) + 1).toString()}  else { return '0' } }).join('');
        };
      };
      const temp: any = () => { return [...axisMax()][1] < 5 ? reset('upToFive') : reset('upToOrder') };
      const order = temp().length - 1;
      return Number(((temp()/(10**order)).toFixed(1))) * 10**order;
    }

    // 目標顯示點
    // X軸起點為[現在年齡]，終點為[預期壽命]
    const markpointXY = { 
      name: '座標', 
      assetCoord: [(this.input.ageRange[1] - this.input.ageRange[0]), afterRetireAssetData.normal.shift()],
      withdrawCoord: [(this.input.ageRange[1] - this.input.ageRange[0]), withdrawAll]
    }

    // console.log(YLineData)
    // console.log(XLineData)
    // console.log(beforeRetireAssetData)
    console.log(beforeRetireAgeData.length)
    console.log(afterRetireAgeData.length)
    // console.log(beforeRetireAssetData)
    // console.log(afterRetireAssetData)
    console.log(withdrawAll)
    console.log(YLineData.better)
    console.log( typeof withdrawAll)
    console.log( maximum(YLineData.better, withdrawAll))
    console.log(markpointXY)
    // console.log(YLineData)

    // 帶入echartOptions => 五個參數代表: 圖表檔案、標記座標(累積資產最大值)、X軸資料陣列、Y軸資料陣列、Y軸最大值
    this.lineChartOption = orderLineChartOption('graph', markpointXY, XLineData, YLineData, maximum(YLineData.better, withdrawAll))
    this.$nextTick(()=> {
      this.text = this.textRender(this.input.ageRange[1], beforeRetireAssetData.normal.pop(), withdrawAll);
    });
    this.chartsResize();
  }

  private mounted() {
    this.setLineChartData();

    setTimeout(() => {
      this.chartsResize();
    }, 800);

    window.addEventListener('resize', () => {
      this.chartsResize();
    });

    this.change();
  }

  @Watch('input.ageRange')
  @Watch('input.lifeAge')
  @Watch('input.invMoney')
  @Watch('input.regMoney')
  @Watch('input.deposit')
  @Watch('input.withdraw')
  private change() {
    setTimeout(() => {
      this.setLineChartData();
    }, 700);
  }
}

</script>
