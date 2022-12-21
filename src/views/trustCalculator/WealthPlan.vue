<template>
    <v-app>
      <v-main class="pt-0">
        <v-container fluid class="px-0 pt-0">
          <section class="optionArea px-4">
            <v-form ref="form">
              <!-- 風險等級 -->
              <h2 class="py-6 font-weight-bold">風險等級</h2>
              <v-row>
                <v-col cols="12" md="6" class="d-sm-flex justify-space-between px-4">
                  <v-btn class="risk-button text-center rounded-lg text-h6 mr-2 mb-2"
                  elevation="4"
                  width="47%"
                  height="60px"
                  depressed
                  :style="input.kyc === item.value ? '' : 'opacity:40%'"
                  :class="input.kyc === item.value ? 'white--text' : ''"
                  :color="input.kyc === item.value ? '#CC9C50' : '#F7F2E8'"
                  v-for="(item, index) in riskText" 
                  :key="index"
                  @click="input.kyc = item.value">
                    {{ item.text }}
                  </v-btn>
                </v-col>
              </v-row>
              <!-- 目標設定: 現在年齡、投資期間 -->
              <h2 class="my-6 font-weight-bold ">目標設定</h2>
              <div v-for="(option, index) in goalOptions" :key="index" class="justify pt-2 justify-center">
                <v-row class="justify-space-between px-4 font-weight-medium">
                  <div>{{ option.name }}</div>
                  <div>
                    <span class="font-weight-black">{{ thousand(input[option.prop]) }}</span>
                    <span class="ml-2">{{ option.unit }}</span>
                  </div>
                </v-row>
                <v-row class="justify-center">
                  <v-col cols="12" class="pr-0">
                    <div class="slider">
                      <v-slider
                      v-model="input[option.prop]"
                      :max="option.max"
                      :min="option.min"
                      :step="option.step"
                      :thumb-color="thumbColor"
                      :track-color="trackColor"
                      :color="barColor"
                      >
                      </v-slider>
                    </div>
                  </v-col>
                </v-row>
              </div>
              <!-- 投入金額：單筆、定期 -->
              <h2 class="my-6 font-weight-bold">投入金額</h2>
              <div v-for="(option, index) in investOptions" :key="'option'+index" class="justify pt-2 justify-center">
                <v-row class="justify-space-between px-4 font-weight-medium">
                  <div>{{ option.name }}</div>
                  <div>
                    <span>NTD$</span>
                    <span class="font-weight-black">{{ thousand(input[option.prop]) }}</span>
                    <span class="ml-2">{{ option.unit }}</span>
                  </div>
                </v-row>
                <v-row class="justify-center">
                  <v-col cols="12" class="pr-0">
                    <div class="slider">
                      <v-slider
                      v-model="input[option.prop]"
                      :max="option.max"
                      :min="option.min"
                      :step="option.step"
                      :thumb-color="thumbColor"
                      :track-color="trackColor"
                      :color="barColor"
                      >
                      </v-slider>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-form>
            <!-- 資產模擬 -->
            <h2 class="my-6 font-weight-bold">資產模擬</h2>
            <v-row class="graph justify-center pb-6 mx-auto">
              <LineChart
                chartID="trustLineChart"
                ref="trustLineChart"
                :height="'600px'"
                :lineChartOption="lineChartOption">
              </LineChart>
              <!-- <div v-else style="height: 1000px;"></div> -->
            </v-row>
            <!-- <v-row class="justify-center mb-8 text-h5 blue--text text--lighten-1">
              <v-card class="mx-4" elevation="4" rounded="xl">
                <div class="center-text pa-5" :class="warning ? 'warn' : '' ">
                  <p v-html="textDetail" class="my-0"></p>
                </div>
              </v-card>
            </v-row> -->
            <v-row class="mx-1">
              <v-card width="100%" elevation="4" rounded="xl">
                <div class="text-legend pa-4">
                  <div class="mb-6 font-weight-bold">投資時間到時，預估資產累積: </div>
                  <v-row style="padding: 2px;" v-for="(item, index) in text" :key="'text'+index">
                    <div>
                      <span :style="`display:inline-block;border-radius:10px;width:12px;height:12px;background-color:${item[0]};`"></span>
                      <span class="font-weight-medium" style="margin-left: 4px; font-size:14px">{{item[1]}}</span>
                    </div>
                  </v-row>
                  <v-row class="mt-5 mb-3" style="font-size:12px; color:#707070;">
                    <div>* 報酬率假設：</div>
                    <div>較好情況為年化報酬率 {{ (constant.Rinvest[input.kyc][0] * 100).toFixed(1) }}%；一般情況為年化報酬率 {{ (constant.Rinvest[input.kyc][1] * 100).toFixed(1) }}%;</div>
                    <div>較差情況為年化報酬率{{ (constant.Rinvest[input.kyc][2] * 100).toFixed(1) }}%。每年提領金額以通膨率 2% 增加</div>
                  </v-row>
                </div>
              </v-card>
            </v-row>
            <v-row v-if="warning" class="justify-center py-10 text-center font-weight-bold" style="color:#837151">
              <div>距離您需要的退休金還有一點點距離</div>
              <div>請參考以下建議調整參數，提高達成機率！</div>
            </v-row>
          </section>
          <div class="optionArea px-4">
            <v-row class="py-8 px-5" style="font-size: 12px; color:#707070;">
              * 重要聲明： 投資人因不同時間進場，將有不同之投資績效，過去之績效亦不代表未來績效之保證。以過去績效進行模擬投資組合之報酬率時，僅為歷史資料模擬投資組合之結果，不代表本投資組合之實際報酬率及未來績效保證，不同時間進行模擬操作，結果可能不同。
              <div>阿爾發投顧自當盡力提供正確資訊，所載資料均來自或本諸我們相信可靠之來源，但對其完整性、即時性和正確性不做任何擔保，如有錯漏或疏忽，本公司或關係企業與其任何董事或受僱人等，對此不負任何法律責任。模擬之結果僅供參考，無法保證準確性，未來實際狀況可能與模擬數值有所落差。</div>
            </v-row>
          </div>
        </v-container>
      </v-main>
    </v-app>
</template>

<style lang="scss" scoped>
.v-container {
  height: 100%;
  max-width: min(95vw, 1400px);

  @media screen and (max-width: 414px) {
    max-width: 95vw;
  }
}

.text-legend {
  margin: 0 auto;
  @media (min-width: 900px){
    margin-right: 150px;
  }
  .text-content {
    font-size: 18px;
    @media (min-width: 900px){
    font-size: 20px;
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
  // border: 4px solid rgb(0, 89, 255);
  // border-radius: 20px;
  text-align: center;
  &.warn {
    border: 4px solid rgb(255, 0, 0);
    @media (max-width: 900px){
      font-size: 22px;
    }
  }
  @media (max-width: 900px){
    font-size: 22px;
  }
}

.optionArea {
  background-color: #F2EADA;
}

::v-deep .v-slider__track-background {
  border-radius: 45px !important;
}

::v-deep .v-slider--horizontal .v-slider__track-container {
  height: 11px !important;
}

::v-deep .v-slider__track-background.grey.lighten-2, ::v-deep .v-slider__track-fill, ::v-deep .v-slider__track-background.primary.lighten-3 {
  border-radius: 45px;
}

::v-deep .v-slider__thumb {
  border: 4px #CC9C50 solid !important;
}

::v-deep .v-messages__message.message-transition-enter-to, ::v-deep .v-messages.theme--light.error--text {
  font-size: 18px !important;
}

</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { toThousand, chartDataCalculation_Aum } from '@/utility/utility';
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
import { assetLineChartOption } from '@/views/trustCalculator/echartsOptions';
import { ScatterChart } from 'echarts/charts';

echarts.use([DatasetComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, CanvasRenderer, ScatterChart]);

@Component
export default class WealthPlan extends Vue {
  // slider bar & track 顏色
  private barColor = '#CC9C50' 
  private trackColor = '#FFFFFF'
  private thumbColor = '#F2EADA'

  // 文字資料
  private text: any = [];
  private textDetail: any = [];

  // 提醒警告
  private warning = false;

  // 圖表資料
  private lineChartOption = {};
  private lineChartWidth = 0;

  private validation = true;

  // 投資狀況
  public situation = ['better', 'normal', 'poor']

  // 風險屬性文字
  private riskText = [{
    text: '保守型',
    value: 0
  },
  {
    text: '穩健型',
    value: 1
  }, 
  {
    text: '成長型',
    value: 2
  },
  {
    text: '積極型',
    value: 3
  }]


  // 現在年齡 + 投資時間 <= 100限制
  private rules = {
    retireAge: (value: any) => {
      return (value <= 120 - this.input.nowAge) || `不得大於${120 - this.input.nowAge}年`;
    }
  };

  // 千分位
  private thousand (val: any) {
    return toThousand(val);
  };


  // 固定內建參數: 各風險等級囊括三種投資報酬率([較好、一般、較差])、通膨率、定存利率
  public constant: object | any = {
    Rinvest: [
      [0.021, 0.013, 0.005],  // 保守 
      [0.064, 0.049, 0.034],  // 穩健
      [0.083, 0.065, 0.047],  // 成長
      [0.103, 0.083, 0.063]   // 積極
    ],
  };

  // 輸入參數 (給予初始預設值): 風險等級、現在年齡、預計投資期間、單筆投入、定期定額
  public input = {
    kyc: 1,   
    nowAge: 30,                            
    invYear: 30,                            
    invMoney: 30, // 萬
    regMoney: 15000,  // 元 (定期先設為零，不確定金額限制)
  };

  // 文字動態設置
  private textRender = (assetData: any, type: any) => {
    const assetFixedData = assetData.map((item: any) => { return (item / 10000).toFixed(0); })
    if (type === 'lint') {
      // return [`${retireAge}歲時，資產預期會成長到約TWD＄ ${toThousand(Number(assetFixed))} 萬`, `${retireAge}歲時，你需要的退休金目標約為TWD＄ ${toThousand(Number(retireFixed))} 萬`];
      return [
        ['#A6C7A5', `市場較好情況下，您可能累積到：NTD$ ${toThousand(Number(assetFixedData[0]))}萬`],
        ['#6BB169', `市場一般情況下，您可能累積到：NTD$ ${toThousand(Number(assetFixedData[1]))}萬`],
        ['#438B41', `市場較差情況下，您可能累積到：NTD$ ${toThousand(Number(assetFixedData[2]))}萬`],
      ]
    }
  }

  // 調整器設置
  // 風險等級
  private risk = {
    name: '風險等級',
    prop: 'kyc',
    max: 3,
    min: 0,
    unit: '',
    step: 1
  };

  // 目標設定：現在年齡、投資期間
  private goalOptions = [
    {
      name: '現在年齡',
      prop: 'nowAge',
      max: 100,
      min: 0,
      unit: '歲',
      step: 1
    },
    {
      name: '投資期間',
      prop: 'invYear',
      max: 120,
      min: 3,
      unit: '年',
      step: 1,
      rule: this.rules
    },
  ];
  
  // 投入金額：單筆、定期
  private investOptions = [
    {
      name: '單筆投入金額',
      prop: 'invMoney',
      max: 3000,
      min: 30,
      unit: '萬',
      step: 10
    },
    {
      name: '定期定額投入金額',
      prop: 'regMoney',
      max: 100000,
      min: 15000,
      unit: '元',
      step: 1000
    },
  ]

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
  // private optimalSolution (withdrawAll: any, assetBeforeRetire: any, year: any) {
  //   const depositRatio = 1 + this.constant.Rdeposit; // 總定存投報率
  //   const investRatio = 1 + this.constant.Rinvest.normal; // 總投資投報率
  //   const totalDeposit = (t: number) => { // 累積定存資產
  //     return this.input.deposit * 10000 * (depositRatio ** t);
  //   };
  //   if (withdrawAll > assetBeforeRetire) {
  //     // 只調整單筆金額大小，定期定額設為常數
  //     const deltaInv = () => {
  //       return (withdrawAll - (totalDeposit(year) + 12 * this.input.regMoney * ((investRatio) ** (year + 1) - investRatio) / (investRatio - 1))) / (investRatio) ** year;
  //     };
  //     // 只調整定期定額金額大小，單筆設為常數
  //     const deltaReg = () => {
  //       return (withdrawAll - (totalDeposit(year) + this.input.invMoney * 10000 * investRatio ** year)) * (investRatio - 1) / (12 * ((investRatio) ** (year + 1) - investRatio));
  //     };
  //     this.$nextTick(() => {
  //       const string = `<div class="pb-3">您需要將 定期定額投入金額 提升至<span class="red--text font-weight-black"> ${toThousand(Math.round(Number(deltaReg() / 1000)) * 1000)} </span>元 或</div>
  //     <div> 單筆投入金額 提升至<span class="red--text font-weight-black"> ${toThousand(Number(deltaInv() / 10000))} </span>萬，將可以順利提領到<span class="green--text font-weight-bold"> ${this.input.lifeAge} </span>歲</div>`;
  //       const complied = template(string);
  //       this.textDetail = complied();
  //       this.warning = true;
  //     });
  //   };

  //   this.warning = false;
  // }

  // 構圖：將參數整合並帶入echartsOption.ts
  private setLineChartData () {
    const [XLineData, YLineData, AssetAumData] = chartDataCalculation_Aum(this.input, this.situation, this.constant);

    // Y軸座標最大值Maximum 動態調整 避免過大造成圖表縮小不易閱讀
    const maximum = (assetMax: any) => {
      const axisMax = () => { return Math.max(...assetMax).toString() };
      const reset = (condition: any) => {
        if (condition === 'upToFive') {
          return [...axisMax()].map((item: any, index: any) => { if (index === 0) { return item; } else if (index === 1) { return '5'; } else { return '0'; } }).join('');
        } else if (condition === 'upToOrder') {
          return [...axisMax()].map((item: any, index: any) => { if (index === 0) { return (Number(item) + 1).toString(); } else { return '0'; } }).join('');
        };
      };
      const temp: any = () => { return Number([...axisMax()][1]) < 5 ? reset('upToFive') : reset('upToOrder'); };
      const order = temp().length - 1;
      return Number(((temp() / (10 ** order)).toFixed(1))) * 10 ** order;
    };

    // 目標顯示點 => 顯示累計提領金額、退休前累積資產(一般情況)兩個資料點
    const markpointXY = {
      name: '座標',
      assetCoord: [
        [this.input.invYear, AssetAumData.better[AssetAumData.better.length - 1]],
        [this.input.invYear, AssetAumData.normal[AssetAumData.normal.length - 1]],
        [this.input.invYear, AssetAumData.poor[AssetAumData.poor.length - 1]]
      ],
      retireAge: this.input.nowAge + this.input.invYear,
    };

    // 帶入echartOptions => 五個參數代表: 圖表檔案、標記座標(累積資產最大值)、X軸資料陣列、Y軸資料陣列、Y軸最大值
    this.lineChartOption = assetLineChartOption('graph', markpointXY, XLineData, YLineData, maximum(YLineData.better), this.lineChartWidth);


    // 文字渲染 右上角 還有 中間
    this.$nextTick(() => {
      const retireAllData = (index: any) => {
        const {better, normal, poor} = YLineData
        return [better[index], normal[index], poor[index]]
      }
      this.text = this.textRender(retireAllData(this.input.invYear), 'lint');
    });

    // 圖表RWD
    this.chartsResize();
    console.log(YLineData)
  }

  @Watch('input.kyc')
  @Watch('input.nowAge')
  @Watch('input.invYear')
  @Watch('input.invMoney')
  @Watch('input.regMoney')
  private change () {
    (this.$refs.form as Vue & { validate: () => boolean }).validate()
    this.validation = (this.$refs.form as Vue & { validate: () => boolean }).validate()
    setTimeout(() => {
      this.setLineChartData();
    }, 700);
  }

  @Watch('lineChartWidth')
  private retest() {
    setTimeout(() => {
      this.setLineChartData();
    }, 700);
  }

  private mounted () {
    this.lineChartWidth = this.$refs.trustLineChart.lineChart.getWidth()
    this.setLineChartData();
    this.change();

    // setTimeout(() => {
    //   this.chartsResize();
    // }, 800);
    window.addEventListener('resize', () => {
      this.lineChartWidth = this.$refs.trustLineChart.lineChart.getWidth();
      this.chartsResize();
    });


  }

}

</script>
