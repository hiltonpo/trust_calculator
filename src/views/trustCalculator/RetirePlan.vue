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
                <v-btn
                  class="risk-button text-center rounded-lg text-h6 mr-2 mb-2"
                  elevation="4"
                  width="47%"
                  height="60px"
                  depressed
                  :style="input.kyc === item.value ? '' : 'opacity:40%'"
                  :class="input.kyc === item.value ? 'white--text' : ''"
                  :color="input.kyc === item.value ? '#CC9C50' : '#F7F2E8'"
                  v-for="(item, index) in riskText"
                  :key="index"
                  @click="input.kyc = item.value"
                >
                  {{ item.text }}
                </v-btn>
              </v-col>
            </v-row>
            <!-- 目標設定: 現在年齡、退休年齡、預期壽命、退休後每月花費 -->
            <h2 class="my-6 font-weight-bold">目標設定</h2>
            <div>
              <div
                v-for="(option, index) in goalOptions"
                :key="index"
                class="optionSet justify pt-2 justify-center"
              >
                <v-row class="justify-space-between px-4 font-weight-medium">
                  <div>{{ option.name }}</div>
                  <div>
                    <span v-if="option.prop === 'withdraw'">{{preffix}}</span>
                    <span class="font-weight-black mx-1">{{ thousand(input[option.prop]) }}</span>
                    <span>{{ option.unit }}</span>
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
                        :thumb-color="sliderColor.thumbColor"
                        :track-color="sliderColor.trackColor"
                        :color="sliderColor.barColor"
                        :rules="
                          option.prop === 'nowAge'
                            ? [rules.nowAge]
                            : option.prop === 'lifeAge'
                            ? [rules.lifeAge]
                            : []
                        "
                      >
                      </v-slider>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-form>
          <!-- 投入金額：單筆、定期、其他現金準備slider -->
          <v-row class="switch align-center px-4 mb-3">
            <h2 class="font-weight-bold mr-5">投入金額</h2>
            <div class="d-flex mt-3">
              <v-switch class="mr-5" flat label="單筆" v-model="switchSet.single"> </v-switch>
              <v-switch flat label="定期定額" v-model="switchSet.regular"> </v-switch>
            </div>
          </v-row>
          <div
            v-if="!(switchSet.single || switchSet.regular)"
            class="errorMsg mb-6 red--text font-weight-bold text-center text-subtitle-1"
          >
            您必須選擇一項投入方式
          </div>
          <!-- 單筆投入金額 -->
          <v-slide-y-transition>
            <div
              v-if="switchSet.single"
              class="single justify pt-2 justify-center"
            >
              <v-row class="justify-space-between align-baseline px-4 font-weight-medium">
                <div>{{ investOptions[0].name }}</div>
                <div class="d-flex align-baseline">
                  <span>{{preffix}}</span>
                  <span>
                    <span v-show="edit.single === false" class="font-weight-black mx-1">{{
                      thousand(input[investOptions[0].prop])
                    }}</span>
                    <v-form v-show="edit.single === true" class="text mt-3 mb-5 px-1" style="width: 35vw;">
                      <v-text-field
                        ref="inputSingle"
                        v-model="textSingle"
                        inputmode="numeric"
                        placeholder="請輸入金額"
                        color="cyan"
                        background-color="white"
                        rounded
                        dense
                        outlined
                        :rules="[rules.singleMoney]"
                      >
                      </v-text-field>
                    </v-form>
                  </span>
                  <span>{{ investOptions[0].unit }} </span>
                  <v-icon
                    class="ml-2 cursor-pointer"
                    color="black"
                    small
                    @click.stop="switchEditState('single')"
                  >
                    {{ edit.single === false ? "fas fa-edit" : "fas fa-sliders-h" }}
                  </v-icon>
                </div>
              </v-row>
              <v-row v-show="edit.single === false" class="justify-center">
                <v-col cols="12" class="pr-0">
                  <div class="slider">
                    <v-slider
                      v-model="input.invMoney"
                      :max="investOptions[0].max"
                      :min="investOptions[0].min"
                      :step="investOptions[0].step"
                      :thumb-color="sliderColor.thumbColor"
                      :track-color="sliderColor.trackColor"
                      :color="sliderColor.barColor"
                    >
                    </v-slider>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-slide-y-transition>
          <!-- 定期定額 -->
          <v-slide-y-transition>
            <div
              v-if="switchSet.regular"
              class="regular justify pt-2 justify-center"
            >
              <v-row class="justify-space-between align-baseline px-4 font-weight-medium">
                <div>{{ investOptions[1].name }}</div>
                <div class="d-flex align-baseline">
                  <span>{{preffix}}</span>
                  <span>
                    <span v-show="edit.regular === false" class="font-weight-black mx-1">{{
                      thousand(input[investOptions[1].prop])
                    }}</span>
                    <v-form v-show="edit.regular === true" class="text mb-6 mt-3 px-1" style="width: 30.4vw;">
                      <v-text-field
                        ref="inputRegular"
                        v-model="textRegular"
                        inputmode="numeric"
                        placeholder="請輸入金額"
                        background-color="white"
                        rounded
                        dense
                        outlined
                        :rules="[rules.regularMoney]"
                      >
                      </v-text-field>
                    </v-form>
                  </span>
                  <span>{{ investOptions[1].unit }} </span>
                  <v-icon
                    class="ml-2 cursor-pointer"
                    color="black"
                    small
                    @click.stop="switchEditState('regular')"
                  >
                    {{ edit.regular === false ? "fas fa-edit" : "fas fa-sliders-h" }}
                  </v-icon>
                </div>
              </v-row>
              <v-row v-show="edit.regular === false" class="justify-center">
                <v-col cols="12" class="pr-0">
                  <div class="slider">
                    <v-slider
                      v-model="input.regMoney"
                      :max="investOptions[1].max"
                      :min="investOptions[1].min"
                      :step="investOptions[1].step"
                      :thumb-color="sliderColor.thumbColor"
                      :track-color="sliderColor.trackColor"
                      :color="sliderColor.barColor"
                    >
                    </v-slider>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-slide-y-transition>
          <!-- 其他現金準備 -->
          <div class="deposit justify pt-2 justify-center">
            <v-row class="justify-space-between px-4 font-weight-medium">
              <div>{{ investOptions[2].name }}</div>
              <div>
                <span>{{preffix}}</span>
                <span class="font-weight-black mx-1">{{ thousand(input[investOptions[2].prop]) }}</span>
                <span>{{ investOptions[2].unit }}</span>
              </div>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="12" class="pr-0">
                <div class="slider">
                  <v-slider
                    v-model="input.deposit"
                    :max="investOptions[2].max"
                    :min="investOptions[2].min"
                    :step="investOptions[2].step"
                    :thumb-color="sliderColor.thumbColor"
                    :track-color="sliderColor.trackColor"
                    :color="sliderColor.barColor"
                  >
                  </v-slider>
                </div>
              </v-col>
            </v-row>
          </div>

          <div class="pb-2" style="font-size: 12px; color: #707070">
            <div>* 其他現金準備：</div>
            <p>
              包含現在手上的閒置資金，以及退休時所領到的勞保、勞退等退休金。『其他現金準備』此筆資金，會涵蓋在資產累積模擬圖中，但不考慮其複利增值效果，僅以現金計算。
            </p>
          </div>
          <!-- 資產模擬 -->
          <h2 class="mt-8 font-weight-bold">資產模擬</h2>
          <v-row class="graph justify-center pb-6 px-0">
            <LineChart
              chartID="trustLineChart"
              ref="trustLineChart"
              :height="'600px'"
              :lineChartOption="lineChartOption"
            >
            </LineChart>
          </v-row>
          <v-row class="mx-1">
            <v-card width="100%" elevation="4" rounded="xl">
              <div class="text-legend pa-4">
                <div class="mb-6 font-weight-bold">退休時，預估退休金:</div>
                <v-row style="padding: 2px">
                  <div v-for="(item, index) in text" :key="index" class="mr-sm-3">
                    <span
                      :style="`display:inline-block;border-radius:10px;width:12px;height:12px;background-color:${item[0]};`"
                    ></span>
                    <span class="font-weight-medium" style="margin-left: 2px; font-size: 14px">{{
                      item[1]
                    }}</span>
                  </div>
                </v-row>
                <v-row class="mt-5 mb-3" style="font-size: 12px; color: #707070">
                  <div>* 報酬率假設：</div>
                  <div>
                    較好情況為年化報酬率
                    {{ (constant.Rinvest[input.kyc][0] * 100).toFixed(1) }}%；一般情況為年化報酬率
                    {{ (constant.Rinvest[input.kyc][1] * 100).toFixed(1) }}%;
                  </div>
                  <div>
                    較差情況為年化報酬率{{
                      (constant.Rinvest[input.kyc][2] * 100).toFixed(1)
                    }}%。每年提領金額以通膨率 2% 增加
                  </div>
                </v-row>
              </div>
            </v-card>
          </v-row>
          <v-row
            v-if="warning"
            class="justify-center py-10 text-center font-weight-bold"
            style="color: #837151"
          >
            <div>距離您需要的退休金還有一點點距離</div>
            <div>請參考以下建議調整參數，提高達成機率！</div>
          </v-row>
        </section>
        <div v-if="warning" class="noticeArea px-4 py-10 white--text">
          <v-row class="justify-start justify-sm-center px-4 pb-5 text--lighten-1">
            <div style="font-size: 20px">
              <span style="color: #eab86a">&#9733;</span><span class="pl-2">參數建議</span>
              <span class="pl-4 text-subtitle-2">(以下金額二擇一調整)</span>
            </div>
          </v-row>
          <div class="px-2">
            <v-row class="justify-center">
              <v-col class="d-flex flex-column align-start align-sm-center" cols="6">
                <div>單筆投資提高至：</div>
                <div>定期定額提高至：</div>
              </v-col>
              <v-col class="d-flex flex-column align-end align-sm-center" cols="6">
                <div>約{{preffix}} {{ suggest[0] }} 元</div>
                <div>約{{preffix}} {{ suggest[1] }} 元</div>
              </v-col>
            </v-row>
          </div>
        </div>
        <div class="optionArea px-4">
          <v-row class="py-6 px-5" style="font-size: 12px; color: #707070">
            * 重要聲明：
            投資人因不同時間進場，將有不同之投資績效，過去之績效亦不代表未來績效之保證。以過去績效進行模擬投資組合之報酬率時，僅為歷史資料模擬投資組合之結果，不代表本投資組合之實際報酬率及未來績效保證，不同時間進行模擬操作，結果可能不同。
            <div>
              阿爾發投顧自當盡力提供正確資訊，所載資料均來自或本諸我們相信可靠之來源，但對其完整性、即時性和正確性不做任何擔保，如有錯漏或疏忽，本公司或關係企業與其任何董事或受僱人等，對此不負任何法律責任。模擬之結果僅供參考，無法保證準確性，未來實際狀況可能與模擬數值有所落差。
            </div>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>

.optionSet, .switch, .single, .regular, .deposit {
  font-size: 17px;
}

.container {
  max-width: 100%;
  width: 100%;
}

.optionArea {
  background-color: #f2eada;
}

.noticeArea {
  background-color: #837151;
}

::v-deep .v-slider__track-background {
  border-radius: 45px !important;
}

::v-deep .v-slider--horizontal .v-slider__track-container {
  height: 11px !important;
}

::v-deep .v-slider__track-background.grey.lighten-2,
::v-deep .v-slider__track-fill,
::v-deep .v-slider__track-background.primary.lighten-3 {
  border-radius: 45px;
}

::v-deep .v-slider__thumb {
  border: 4px #cc9c50 solid !important;
}

::v-deep .v-messages__message {
  line-height: 14px !important;
  min-width: 100px;
}

::v-deep .theme--light.v-input input {
  text-align: center;

}
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { toThousand, addCommas, commasToNumber } from '@/utility/utility';
import { preffix, sliderColor, riskText, parameter, chartDataCalculation, optimalSolution } from '@/views/trustCalculator/trustFormula';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { retireLineChartOption } from '@/views/trustCalculator/echartsOptions';

echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  CanvasRenderer
]);

@Component
export default class RetirePlan extends Vue {
  // 貨幣單位
  private preffix = preffix;

  // slider bar & track 顏色
  private sliderColor = sliderColor;

  // 文字資料
  private text: any = [];

  // 參數建議提醒
  private warning = false;

  // 圖表資料
  private lineChartOption = {};
  private lineChartWidth = 0;
  private validation = true;

  // 參數建議 (如果未達標) [單筆金額、定期金額]
  private suggest: any = [];

  // 單筆、定期開關
  private switchSet = {
    single: true,
    regular: true
  };

  private edit: any = {
    single: false,
    regular: false
  };

  // 千分位
  private thousand (val: any) {
    return toThousand(val);
  }

  // 投資狀況
  public situation = ['better', 'normal', 'poor', 'withdraw'];

  // 風險屬性文字
  private riskText = riskText;

  // 固定內建參數: 三種投資報酬率(較好、一般、較差)、通膨率、定存利率
  public constant: object | any = parameter('retire', 'constant')

  // 輸入參數 (給予初始預設值): 風險等級、年齡區間、預期壽命、單筆投入、定期定額、其他退休準備(定存)、退休後每月提領金額
  public input: object | any = parameter('retire', 'input')

  // 單筆 和 定期 手動輸入顯示金額數字
  private textSingle = toThousand(this.input.invMoney);
  private textRegular = toThousand(this.input.regMoney);

  // 整數regex check
  private intCheck = /^[0-9]+$/g;

  private rules = {
    nowAge: (value: any) => {
      return !(value > this.input.retireAge) || '不得大於退休年齡';
    },
    lifeAge: (value: any) => {
      return !(value < this.input.retireAge) || '不得小於退休年齡';
    },
    regularMoney: (value: any) => {
      return commasToNumber(value) >= 3500 || `定期定額不得小於${preffix} 3,500元`;
    },
    singleMoney: (value: any) => {
      return commasToNumber(value) >= 35000 || `單筆投入不得小於${preffix} 35,000元`;
    }
  };

  // 文字動態設置
  private textRender = (assetData: any, type: any) => {
    const assetFixedData = assetData.map((item: any) => {
      return (item / 10000).toFixed(0);
    });
    if (type === 'lint') {
      return [
        [
          '#A6C7A5',
          `市場較好情況下，您可能累積到：${preffix} ${toThousand(Number(assetFixedData[0]))}萬`
        ],
        [
          '#6BB169',
          `市場一般情況下，您可能累積到：${preffix} ${toThousand(Number(assetFixedData[1]))}萬`
        ],
        [
          '#438B41',
          `市場較差情況下，您可能累積到：${preffix} ${toThousand(Number(assetFixedData[2]))}萬`
        ]
      ];
    }
  };

  // 調整器設置
  // 風險等級
  private risk = {
    name: '風險屬性',
    prop: 'kyc',
    max: 3,
    min: 0,
    unit: '',
    step: 1
  };

  // 目標設定：現在年齡、退休年齡、預期壽命、退休每月花費
  private goalOptions = [
    {
      name: '現在年齡',
      prop: 'nowAge',
      max: 120,
      min: 0,
      unit: '歲',
      step: 1
    },
    {
      name: '退休年齡',
      prop: 'retireAge',
      max: 120,
      min: 0,
      unit: '歲',
      step: 1
    },
    {
      name: '預期壽命',
      prop: 'lifeAge',
      max: 120,
      min: 0,
      unit: '歲',
      step: 1
    },
    {
      name: '退休後每月提領金額',
      prop: 'withdraw',
      max: 20000,
      min: 0,
      unit: '元',
      step: 1000
    }
  ];

  // 投入金額: 單、定、其他現金
  private investOptions = [
    {
      name: '單筆投入金額',
      prop: 'invMoney',
      max: 1000000,
      min: 35000,
      unit: '元',
      step: 1000
    },
    {
      name: '定期定額投入金額',
      prop: 'regMoney',
      max: 35000,
      min: 3500,
      unit: '元',
      step: 500
    },
    {
      name: '其他現金準備',
      prop: 'deposit',
      max: 1000000,
      min: 0,
      unit: '元',
      step: 10000
    }
  ];

  private switchEditState (type: string) {
    if (type === 'single') {
      this.edit.single = !this.edit.single;
    } else {
      this.edit.regular = !this.edit.regular;
    }
  }

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

  // 構圖：將參數整合並帶入echartsOption.ts
  private setLineChartData () {
    const [XLineData, YLineData, beforeRetireAssetData, afterRetireAssetData, withdrawAll] =
      chartDataCalculation(this.input, this.situation, this.constant);

    // Y軸座標最大值Maximum 動態調整 避免過大造成圖表縮小不易閱讀
    const maximum = (assetMax: any, withdrawMax: any) => {
      const axisMax = () => {
        return Math.max(...assetMax) >= withdrawMax
          ? Math.max(...assetMax).toString()
          : withdrawMax.toString();
      };
      const reset = (condition: any) => {
        if (condition === 'upToFive') {
          return [...axisMax()]
            .map((item: any, index: any) => {
              if (index === 0) {
                return item;
              } else if (index === 1) {
                return '5';
              } else {
                return '0';
              }
            })
            .join('');
        } else if (condition === 'upToOrder') {
          return [...axisMax()]
            .map((item: any, index: any) => {
              if (index === 0) {
                return (Number(item) + 1).toString();
              } else {
                return '0';
              }
            })
            .join('');
        }
      };
      const temp: any = () => {
        return [...axisMax()][1] < 5 ? reset('upToFive') : reset('upToOrder');
      };
      const order = temp().length - 1;
      return Number((temp() / 10 ** order).toFixed(1)) * 10 ** order;
    };

    // 目標顯示點 => 顯示累計提領金額、退休前累積資產(一般情況)兩個資料點
    const markpointXY = {
      name: '座標',
      assetCoord: [
        [this.input.retireAge - this.input.nowAge, beforeRetireAssetData.better.pop()],
        [this.input.retireAge - this.input.nowAge, beforeRetireAssetData.normal.pop()],
        [this.input.retireAge - this.input.nowAge, beforeRetireAssetData.poor.pop()]
      ],
      withdrawCoord: [this.input.retireAge - this.input.nowAge, withdrawAll],
      retireAge: this.input.retireAge
    };

    // 帶入echartOptions => 五個參數代表: 圖表檔案、標記座標(累積資產最大值)、X軸資料陣列、Y軸資料陣列、Y軸最大值
    this.lineChartOption = retireLineChartOption(
      'graph',
      markpointXY,
      XLineData,
      YLineData,
      maximum(YLineData.better, withdrawAll),
      this.lineChartWidth
    );

    // 文字渲染 右上角 還有 中間
    this.$nextTick(() => {
      const retireAllData = (index: any) => {
        const { better, normal, poor } = YLineData;
        return [better[index], normal[index], poor[index]];
      };
      this.text = this.textRender(retireAllData(this.input.retireAge - this.input.nowAge), 'lint');
    });

    // 當總退休資產小於總提領金額，提醒需要調整單筆或定期之金額
    const [warning, suggest]: Array<any> = optimalSolution(
      withdrawAll,
      YLineData.normal[this.input.retireAge - this.input.nowAge],
      this.input.retireAge - this.input.nowAge
    )(this.constant, this.input);

    this.warning = warning;
    this.suggest = suggest;

    // 圖表RWD
    this.chartsResize();
  }

  @Watch('edit.single')
  private singleTurnText () {
    if (this.edit.single) {
      this.investOptions[0].max = 3500000;
      this.investOptions[0].min = 0;
      this.investOptions[0].step = 1;
    } else {
      this.investOptions[0].max = 1000000;
      this.investOptions[0].min = 35000;
      this.investOptions[0].step = 1000;
    }
    this.textSingle = addCommas(this.input.invMoney);
  }

  @Watch('edit.regular')
  private regularTurnText () {
    if (this.edit.regular) {
      this.investOptions[1].max = 350000;
      this.investOptions[1].min = 0;
      this.investOptions[1].step = 1;
    } else {
      this.investOptions[1].max = 35000;
      this.investOptions[1].min = 3500;
      this.investOptions[1].step = 500;
    }
    this.textRegular = addCommas(this.input.regMoney);
  }

  @Watch('textSingle')
  private textRenderToSingle () {
    this.input.invMoney = commasToNumber(this.textSingle as any);
  }

  @Watch('textRegular')
  private textRenderToRegular () {
    this.input.regMoney = commasToNumber(this.textRegular as any);
  }

  private mounted () {
    this.lineChartWidth = (this.$refs.trustLineChart as any).lineChart.getWidth();
    this.setLineChartData();
    this.change();

    // setTimeout(() => {
    //   this.chartsResize();
    // }, 800);
    window.addEventListener('resize', () => {
      this.lineChartWidth = (this.$refs.trustLineChart as any).lineChart.getWidth();
      this.chartsResize();
    });
  }

  @Watch('switchSet.single')
  @Watch('switchSet.regular')
  @Watch('input.kyc')
  @Watch('input.nowAge')
  @Watch('input.retireAge')
  @Watch('input.lifeAge')
  @Watch('input.invMoney')
  @Watch('input.regMoney')
  @Watch('input.deposit')
  @Watch('input.withdraw')
  private change () {
    if (!this.switchSet.single) {
      this.input.invMoney = 0;
    }
    if (!this.switchSet.regular) {
      this.input.regMoney = 0;
    }

    this.textRegular = addCommas(this.input.regMoney);
    this.textSingle = addCommas(this.input.invMoney);

    (this.$refs.form as Vue & { validate: () => boolean }).validate();
    this.validation = (this.$refs.form as Vue & { validate: () => boolean }).validate();
    setTimeout(() => {
      this.setLineChartData();
    }, 700);
  }

  @Watch('lineChartWidth')
  private retest () {
    setTimeout(() => {
      this.setLineChartData();
    }, 700);
  }
}
</script>
