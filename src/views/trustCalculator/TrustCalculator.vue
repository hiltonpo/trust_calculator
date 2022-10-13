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
          <v-row class="graph justify-center pb-6">
            <LineChart
              chartID="trustLineChart"
              ref="trustLineChart"
              :height="'1000px'"
              :lineChartOption="lineChartOption">
            </LineChart>
          </v-row>
          <v-row class="justify-center my-5 text-h4 blue--text text--lighten-1">
            <div class="center-text pa-10" :class="warning ? 'warn' : '' ">
              <p v-html="textDetail"></p>
            </div>
          </v-row>
          <v-row class="justify pt-10 justify-center">
            <v-col cols="3" class="d-flex justify-end text-h4">
              <span>{{ ageRangeOption.name[0] }}</span>
              <v-text-field
              v-model="input[ageRangeOption.prop][0]"
              class="ml-2 mt-1 pt-0 text-h4"
              hide-details
              single-line
              type="number"
              style="max-width:55px;"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <div class="range-slider">
                <v-range-slider
                v-model="input.ageRange"
                :min="ageRangeOption.min"
                :max="ageRangeOption.max"
                color="brown lighten-2"
                track-color="grey lighten-2"
                track-fill-color="yellow darken-2"
                >
                </v-range-slider>
              </div>
            </v-col>
            <v-col cols="3" class="d-flex text-h4">
              <span>{{ageRangeOption.name[1]}}</span>
              <v-text-field
              v-model="input[ageRangeOption.prop][1]"
              class="ml-2 mt-1 pt-0 text-h4"
              hide-details
              single-line
              type="number"
              style="max-width:55px;"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify pt-10 justify-center">
            <v-col cols="3" class="d-flex justify-end text-h4">{{ lifeOption.name }}</v-col>
            <v-col cols="6">
              <div class="slider">
                <v-slider
                v-model="input[lifeOption.prop]"
                :max="lifeOption.max"
                :min="lifeOption.min"
                :step="lifeOption.step"
                color="yellow darken-2"
                thumb-color="brown lighten-2"
                :rules="[rules.retireAge]"
                >
                </v-slider>
              </div>
            </v-col>
            <v-col cols="3" class="text-h4">
              <span class="font-weight-black">{{ input[lifeOption.prop] }}</span>
              <span class="ml-2">{{ lifeOption.unit }}</span>
            </v-col>
          </v-row>
          <v-row  v-for="(option, index) in options" :key="index" class="justify pt-10 justify-center">
            <v-col cols="3" class="d-flex justify-end text-h4">{{ option.name }}</v-col>
            <v-col cols="6">
              <div class="slider">
                <v-slider
                v-model="input[option.prop]"
                :max="option.max"
                :min="option.min"
                :step="option.step"
                thumb-color="brown lighten-2"
                :color="option.prop === 'withdraw' ? 'blue-grey' : 'yellow darken-2'"
                :track-color="option.prop === 'withdraw' ? 'grey lighten-2' : ''"
                >
                </v-slider>
              </div>
            </v-col>
            <v-col cols="3" class="text-h4">
              <span class="font-weight-black">{{ thousand(input[option.prop]) }}</span>
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

.center-text {
  margin: 0 auto;
  border: 4px solid rgb(0, 89, 255);
  border-radius: 20px;
  text-align: center;
  &.warn {
    border: 4px solid rgb(255, 0, 0);
    @media (max-width: 900px){
      font-size: 28px;
    }
  }
  @media (max-width: 900px){
    font-size: 28px;
  }
}

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

::v-deep .v-messages__message.message-transition-enter-to {
  font-size: 24px;
}

</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { toThousand, chartDataCalculation } from '@/utility/utility';
import { template } from 'lodash-es';
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
import { orderLineChartOption } from '@/views/trustCalculator/echartsOptions';

echarts.use([DatasetComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, CanvasRenderer]);

@Component
export default class TrustCalculator extends Vue {
  // 文字資料
  private text: any = [];
  private textDetail: any = [];

  // 提醒警告
  private warning = false;

  // 圖表資料
  private lineChartOption = {};

  // 退休年齡限制
  private rules = {
    retireAge: (value: any) => {
      return !(value < this.input.ageRange[1]) || '不得小於退休年齡';
    }
  };

  // 千分位
  private thousand (val: any) {
    return toThousand(val);
  };

  // 投資狀況
  public situation = ['better', 'normal', 'poor', 'withdraw']

  // 固定內建參數
  public constant: object | any = {
    Rinvest: {
      better: 0.08, // 較好投報率
      normal: 0.05, // 一般投報率
      poor: 0.03 // 較差投報率
    },
    Rinflation: 0.02, // 通膨率
    Rdeposit: 0.01 // 定存利率
  };

  // 輸入參數 (給予初始預設值)
  public input = {
    ageRange: [35, 65],
    lifeAge: 90,
    invMoney: 30, // 萬
    regMoney: 3000,
    deposit: 300, // 萬
    withdraw: 30000
  };

  // 文字動態設置
  private textRender = (retireAge: any, assetMax: any, retireMax: any, type: any) => {
    const assetFixed = (assetMax / 10000).toFixed(0);
    const retireFixed = (retireMax / 10000).toFixed(0);
    if (type === 'right-top') {
      return [`${retireAge}歲時，資產預期會成長到約TWD＄ ${toThousand(Number(assetFixed))} 萬`, `${retireAge}歲時，你需要的退休金目標約為TWD＄ ${toThousand(Number(retireFixed))} 萬`];
    }
    if (type === 'middle') {
      const string = `<div class="pb-3">您將會在退休時，擁有約<span class="green--text font-weight-black"> ${toThousand(Number(assetFixed))} </span>萬的退休資產</div>
      <div>如果每年提領約<span class="green--text font-weight-black"> ${(Math.round(Number(this.input.withdraw * 12) / 10000))} </span>萬，將可以順利提領到<span class="green--text font-weight-bold"> ${this.input.lifeAge} </span>歲</div>`;
      const complied = template(string);
      return complied();
    }
  }

  // 調整器設置
  // 現齡與退休年齡
  private ageRangeOption = {
    name: ['現在年齡', '退休年齡'],
    min: 20,
    max: 80,
    prop: ['ageRange']
  };

  // 預期壽命
  private lifeOption = {
    name: '預期壽命',
    prop: 'lifeAge',
    max: 100,
    min: 0,
    unit: '歲',
    step: 1
  };

  // 單、定、退休提領、定存金額
  private options = [
    {
      name: '單筆投入金額',
      prop: 'invMoney',
      max: 1000,
      min: 0,
      unit: '萬',
      step: 5
    },
    {
      name: '定期定額投入金額',
      prop: 'regMoney',
      max: 100000,
      min: 0,
      unit: '元',
      step: 1000
    },
    {
      name: '退休後每月提領金額',
      prop: 'withdraw',
      max: 200000,
      min: 0,
      unit: '元',
      step: 1000
    },
    {
      name: '其他退休金準備(定存)',
      prop: 'deposit',
      max: 1000,
      min: 0,
      unit: '萬',
      step: 5
    }
  ];

  // 讓圖表RWD
  private chartsResize () {
    const resizeAllCharts = () => {
      const graph: any = this.$refs.trustLineChart;
      graph.drawLineChart();
    };

    setTimeout(() => {
      resizeAllCharts();
      window.addEventListener('resize', resizeAllCharts);
    }, 50);
  }

  // 最佳解：假如總提領金額 > 退休前累積資產(市場一般情況)，則計算單筆 或 定期定額 所需要調整的金額大小
  private optimalSolution (withdrawAll: any, assetBeforeRetire: any, year: any) {
    const depositRatio = 1 + this.constant.Rdeposit; // 總定存投報率
    const investRatio = 1 + this.constant.Rinvest.normal; // 總投資投報率
    const totalDeposit = (t: number) => { // 累積定存資產
      return this.input.deposit * 10000 * (depositRatio ** t);
    };
    if (withdrawAll > assetBeforeRetire) {
      // 只調整單筆金額大小，定期定額設為常數
      const deltaInv = () => {
        return (withdrawAll - (totalDeposit(year) + 12 * this.input.regMoney * ((investRatio) ** (year + 1) - investRatio) / (investRatio - 1))) / (investRatio) ** year;
      };
      // 只調整定期定額金額大小，單筆設為常數
      const deltaReg = () => {
        return (withdrawAll - (totalDeposit(year) + this.input.invMoney * 10000 * investRatio ** year)) * (investRatio - 1) / (12 * ((investRatio) ** (year + 1) - investRatio));
      };
      this.$nextTick(() => {
        const string = `<div class="pb-3">您需要將 定期定額投入金額 提升至<span class="red--text font-weight-black"> ${toThousand(Math.round(Number(deltaReg() / 1000)) * 1000)} </span>元 或</div>
      <div> 單筆投入金額 提升至<span class="red--text font-weight-black"> ${toThousand(Number(deltaInv() / 10000))} </span>萬，將可以順利提領到<span class="green--text font-weight-bold"> ${this.input.lifeAge} </span>歲</div>`;
        const complied = template(string);
        this.textDetail = complied();
        this.warning = true;
      });
    };

    this.warning = false;
  }

  // 構圖：將參數整合並帶入echartsOption.ts
  private setLineChartData () {
    const [XLineData, YLineData, beforeRetireAssetData, afterRetireAssetData, withdrawAll] = chartDataCalculation(this.input, this.situation, this.constant);

    // Y軸座標最大值Maximum 動態調整 避免過大造成圖表縮小不易閱讀
    const maximum = (assetMax: any, withdrawMax: any) => {
      const axisMax = () => { return Math.max(...assetMax) >= withdrawMax ? Math.max(...assetMax).toString() : withdrawMax.toString(); };
      const reset = (condition: any) => {
        if (condition === 'upToFive') {
          return [...axisMax()].map((item: any, index: any) => { if (index === 0) { return item; } else if (index === 1) { return '5'; } else { return '0'; } }).join('');
        } else if (condition === 'upToOrder') {
          return [...axisMax()].map((item: any, index: any) => { if (index === 0) { return (Number(item) + 1).toString(); } else { return '0'; } }).join('');
        };
      };
      const temp: any = () => { return [...axisMax()][1] < 5 ? reset('upToFive') : reset('upToOrder'); };
      const order = temp().length - 1;
      return Number(((temp() / (10 ** order)).toFixed(1))) * 10 ** order;
    };

    // 目標顯示點 => 顯示累計提領金額、退休前累積資產(一般情況)兩個資料點
    const markpointXY = {
      name: '座標',
      assetCoord: [(this.input.ageRange[1] - this.input.ageRange[0]), beforeRetireAssetData.normal.pop()],
      withdrawCoord: [(this.input.ageRange[1] - this.input.ageRange[0]), withdrawAll],
      retireAge: this.input.ageRange[1]
    };

    // 帶入echartOptions => 五個參數代表: 圖表檔案、標記座標(累積資產最大值)、X軸資料陣列、Y軸資料陣列、Y軸最大值
    this.lineChartOption = orderLineChartOption('graph', markpointXY, XLineData, YLineData, maximum(YLineData.better, withdrawAll));

    // 文字渲染 右上角 還有 中間
    this.$nextTick(() => {
      this.text = this.textRender(this.input.ageRange[1], YLineData.normal[(this.input.ageRange[1] - this.input.ageRange[0])], withdrawAll, 'right-top');
      this.textDetail = this.textRender(this.input.ageRange[1], YLineData.normal[(this.input.ageRange[1] - this.input.ageRange[0])], withdrawAll, 'middle');
    });

    // 當總退休資產小於總提領金額，提醒需要調整單筆或定期之金額
    this.optimalSolution(withdrawAll, afterRetireAssetData.normal.shift(), (this.input.ageRange[1] - this.input.ageRange[0]));

    // 圖表RWD
    this.chartsResize();
  }

  private mounted () {
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
  private change () {
    setTimeout(() => {
      this.setLineChartData();
    }, 700);
  }
}

</script>
