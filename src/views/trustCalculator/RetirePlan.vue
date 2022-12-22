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
                    <span v-if="option.prop === 'withdraw'">NTD$</span>
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
                        :thumb-color="thumbColor"
                        :track-color="trackColor"
                        :color="barColor"
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
              <v-row class="justify-space-between px-4 font-weight-medium">
                <div>{{ investOptions[0].name }}</div>
                <div class="d-flex align-baseline">
                  <span>NTD$</span>
                  <span>
                    <span v-show="edit.single === false" class="font-weight-black mx-1">{{
                      thousand(input[investOptions[0].prop])
                    }}</span>
                    <v-form v-show="edit.single === true" class="text mt-3 mb-5">
                      <v-text-field
                        ref="inputSingle"
                        v-model="textSingle"
                        inputmode="numeric"
                        placeholder="輸入投資金額..."
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
                    color="grey"
                    small
                    @click.stop="switchEditState('single')"
                  >
                    {{ edit.single === false ? "fas fa-edit" : "fas fa-times-circle" }}
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
                      :thumb-color="thumbColor"
                      :track-color="trackColor"
                      :color="barColor"
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
              <v-row class="justify-space-between px-4 font-weight-medium">
                <div>{{ investOptions[1].name }}</div>
                <div class="d-flex align-baseline">
                  <span>NTD$</span>
                  <span>
                    <span v-show="edit.regular === false" class="font-weight-black mx-1">{{
                      thousand(input[investOptions[1].prop])
                    }}</span>
                    <v-form v-show="edit.regular === true" class="text mb-6 mt-3">
                      <v-text-field
                        ref="inputRegular"
                        v-model="textRegular"
                        inputmode="numeric"
                        placeholder="輸入投資金額..."
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
                    color="grey"
                    small
                    @click.stop="switchEditState('regular')"
                  >
                    {{ edit.regular === false ? "fas fa-edit" : "fas fa-times-circle" }}
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
                      :thumb-color="thumbColor"
                      :track-color="trackColor"
                      :color="barColor"
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
                <span>NTD$</span>
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
                    :thumb-color="thumbColor"
                    :track-color="trackColor"
                    :color="barColor"
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
                <div>NTD $ {{ suggest[0] }} 萬</div>
                <div>NTD $ {{ suggest[1] }} 元</div>
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

::v-deep .v-messages__message.message-transition-enter-to,
::v-deep .v-messages.theme--light.error--text {
  font-size: 12px !important;
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
  // slider bar & track 顏色
  private barColor = '#CC9C50';
  private trackColor = '#FFFFFF';
  private thumbColor = '#F2EADA';
  // 文字資料
  private text: any = [];
  private textDetail: any = [];

  // 提醒警告
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
    fee: false,
    single: false,
    regular: false
  };

  // 退休年齡限制
  private rules = {
    nowAge: (value: any) => {
      return !(value > this.input.retireAge) || '不得大於退休年齡';
    },
    lifeAge: (value: any) => {
      return !(value < this.input.retireAge) || '不得小於退休年齡';
    },
    regularMoney: (value: any) => {
      return this.commasToNumber(value) >= 15000 || '定期定額不得小於NTD$ 15,000元';
    },
    singleMoney: (value: any) => {
      return this.commasToNumber(value) >= 30 || '單筆投入不得小於NTD$ 30萬';
    }
  };

  // 千分位
  private thousand (val: any) {
    return toThousand(val);
  }

  private commasToNumber (commas: string) {
    const value = commas.split(',').join('');
    return Number(value) || 0;
  }

  private addCommas (money: number) {
    if (isNaN(Number(money)) === false) return toThousand(money);
    if (isNaN(Number(money)) !== false) return '0';
  }

  // 投資狀況
  public situation = ['better', 'normal', 'poor', 'withdraw'];

  // 風險屬性文字
  private riskText = [
    {
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
    }
  ];

  // 固定內建參數: 三種投資報酬率(較好、一般、較差)、通膨率、定存利率
  public constant: object | any = {
    Rinvest: [
      [0.021, 0.013, 0.005], // 保守
      [0.064, 0.049, 0.034], // 穩健
      [0.083, 0.065, 0.047], // 成長
      [0.103, 0.083, 0.063] // 積極
    ],
    Rinflation: 0.02,
    Rdeposit: 0
  };

  // 輸入參數 (給予初始預設值): 風險等級、年齡區間、預期壽命、單筆投入、定期定額、其他退休準備(定存)、退休後每月提領金額
  public input = {
    kyc: 1,
    nowAge: 35,
    retireAge: 65,
    ageRange: [35, 65],
    lifeAge: 90,
    invMoney: 100, // 萬
    regMoney: 15000, // 元  (定期先設為零，不確定金額限制)
    deposit: 300, // 萬
    withdraw: 30000 // 元
  };

  private textSingle = this.thousand(this.input.invMoney);
  private textRegular = this.thousand(this.input.regMoney);

  // 文字動態設置
  private textRender = (assetData: any, type: any) => {
    const assetFixedData = assetData.map((item: any) => {
      return (item / 10000).toFixed(0);
    });
    if (type === 'lint') {
      return [
        [
          '#A6C7A5',
          `市場較好情況下，您可能累積到：NTD$ ${toThousand(Number(assetFixedData[0]))}萬`
        ],
        [
          '#6BB169',
          `市場一般情況下，您可能累積到：NTD$ ${toThousand(Number(assetFixedData[1]))}萬`
        ],
        [
          '#438B41',
          `市場較差情況下，您可能累積到：NTD$ ${toThousand(Number(assetFixedData[2]))}萬`
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
      max: 100,
      min: 0,
      unit: '歲',
      step: 1
    },
    {
      name: '退休後每月提領金額',
      prop: 'withdraw',
      max: 200000,
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
    {
      name: '其他現金準備',
      prop: 'deposit',
      max: 2000,
      min: 0,
      unit: '萬',
      step: 5
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

  // 最佳解：假如總提領金額 > 退休前累積資產(市場一般情況)，則計算單筆 或 定期定額 所需要調整的金額大小
  private optimalSolution (withdrawAll: any, assetBeforeRetire: any, year: any) {
    const depositRatio = 1 + this.constant.Rdeposit; // 總定存投報率
    const investRatio = 1 + this.constant.Rinvest[this.input.kyc][1]; // 總投資投報率
    const totalDeposit = (t: number) => {
      // 累積定存資產
      return this.input.deposit * 10000 * depositRatio ** t;
    };
    if (withdrawAll > assetBeforeRetire) {
      // 只調整單筆金額大小，定期定額設為常數
      const deltaInv = () => {
        return (
          (withdrawAll -
            (totalDeposit(year) +
              (12 * this.input.regMoney * (investRatio ** (year + 1) - investRatio)) /
                (investRatio - 1))) /
          investRatio ** year
        );
      };
      // 只調整定期定額金額大小，單筆設為常數
      const deltaReg = () => {
        return (
          ((withdrawAll -
            (totalDeposit(year) + this.input.invMoney * 10000 * investRatio ** year)) *
            (investRatio - 1)) /
          (12 * (investRatio ** (year + 1) - investRatio))
        );
      };
      this.$nextTick(() => {
        const string = `<div> 您需要將 單筆投入金額 提升至<span class="red--text font-weight-black"> ${toThousand(
          Number(deltaInv() / 10000)
        )} </span>萬，將可以順利提領到<span class="green--text font-weight-bold"> ${
          this.input.lifeAge
        } </span>歲</div>`;
        const complied = template(string);
        this.textDetail = complied();
        this.warning = true;
        this.suggest = [
          toThousand(Number(deltaInv() / 10000)),
          toThousand(Math.round(Number(deltaReg() / 1000)) * 1000)
        ];
      });
    }

    this.warning = false;
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
    this.optimalSolution(
      withdrawAll,
      afterRetireAssetData.normal.shift(),
      this.input.ageRange[1] - this.input.ageRange[0]
    );

    // 圖表RWD
    this.chartsResize();
  }

  @Watch('edit.single')
  private singleTurnText () {
    if (this.edit.single) {
      this.investOptions[0].max = 9999;
      this.investOptions[0].min = 0;
      this.investOptions[0].step = 1;
    } else {
      this.investOptions[0].max = 3000;
      this.investOptions[0].min = 30;
      this.investOptions[0].step = 10;
    }
    this.textSingle = this.addCommas(this.input.invMoney);
  }

  @Watch('edit.regular')
  private regularTurnText () {
    if (this.edit.regular) {
      this.investOptions[1].max = 1000000;
      this.investOptions[1].min = 0;
      this.investOptions[1].step = 1;
    } else {
      this.investOptions[1].max = 100000;
      this.investOptions[1].step = 1000;
    }
    this.textRegular = this.addCommas(this.input.regMoney);
  }

  @Watch('textSingle')
  private textRenderToSingle () {
    this.input.invMoney = this.commasToNumber(this.textSingle as any);
  }

  @Watch('textRegular')
  private textRenderToRegular () {
    this.input.regMoney = this.commasToNumber(this.textRegular as any);
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

    this.textRegular = this.addCommas(this.input.regMoney);
    this.textSingle = this.addCommas(this.input.invMoney);

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
