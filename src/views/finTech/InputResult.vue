<template>
  <div class="grey lighten-5 h-100">

    <FintechHeader></FintechHeader>
    <section class="main mx-auto py-12">
      <!-- <div>
        <v-icon class="blue-grey--text text--darken-3" @click="back" small>fas fa-arrow-left</v-icon>
      </div> -->
      <div class="text-center py-6">
        <h2 class="text-h2 font-weight-bold">
          投資組合確認
        </h2>

      </div>
      <div class="divider my-8 my-md-10"></div>

      <!-- 類別標籤 -->
      <nav>
        <v-row class="ma-0 text-center" style="border-bottom: 2px solid black;">
          <v-col 
            class="text-h4 font-weight-bold px-0 py-5 white--text" :class="targetType.color">
            {{ targetType.title }}
          </v-col>

          <v-col class="text-table font-weight-bold d-flex align-center justify-end" cols="3">
            <span v-if="getType === 'yahoo' || getType === 'option'">成本／新台幣</span>
            <span v-if="getType === 'fund'">成本</span>
            <span v-if="getType === 'US'">成本／美元</span>
          </v-col>
          <v-col class="text-table font-weight-bold d-flex align-center justify-end px-8" cols="2">
            股數
          </v-col>
          <v-col v-if="getType === 'option'" cols="1"></v-col>
        </v-row>
      </nav>
      <!-- 台股表 Yahoo / 自選 -->
      <div v-if="getType === 'yahoo' || getType === 'option'">
        <div>
          <v-form ref="stockForm">
            <v-simple-table dense class="pa-5"
              :class="[ getType === 'yahoo' ? 'pink lighten-5' : 'light-blue lighten-5' ]">
              <template v-slot:default>
                <tbody>
                  <tr v-for="(value , key) in getPortfolioStock" :key="key">
                    <td style="width: 26px">
                      <div class="d-inline-block d-flex align-center text-h6 justify-center font-weight-bold white--text cube"
                      :class="[ getType === 'yahoo' ? 'pink lighten-2' : 'cyan' ]">
                        {{ key + 1 }}
                      </div>
                    </td>
                    <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-left w-40">
                      <v-autocomplete color="#7166F9" item-color="deep-purple" outlined rounded
                        :rules="inputRule.id"
                        :items="getStock"
                        v-model="value.id"
                        @change="change(value.id, updateModeId)">
                      </v-autocomplete>
                    </td>
                    <td v-else  class="text-left w-50 font-weight-bold"
                      v-html="value.id.split(' ').join('<br />')">
                    </td>


                    <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-right font-weight-bold w-30">
                      <v-text-field :value="value.buy" :disabled="true"></v-text-field>
                    </td>
                    <td v-else class="text-right font-weight-bold">$ {{ Number(value.buy).toFixed(2) }}</td>

                    <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-right font-weight-bold w-20">
                      <v-text-field v-model="value.reserve" :disabled="true"></v-text-field>
                    </td>
                    <td v-else class="text-right font-weight-bold">{{ value.reserve }}</td>

                    <td v-if="getType === 'option'" class="text-center px-0" style="width: 10vw">
                      <v-btn
                        :disabled="uniqle()"
                        v-show="(updateModeId.index !== key) || (updateModeId.type !== value.type)"
                        class="white"
                        height="38" width="66"
                        x-small
                        depressed
                        @click="del({id: value.id , type: value.type})">
                        <v-icon>fas fa-minus</v-icon>
                      </v-btn>
                      &emsp;
                      <v-btn
                        :disabled="uniqle()"
                        v-show="(updateModeId.index !== key) || (updateModeId.type !== value.type)"
                        class="white"
                        height="38" width="66"
                        x-small
                        depressed
                        @click.stop="updateMode(key, value.type, value.id)">
                        <v-icon>fas fa-pencil-alt</v-icon>
                      </v-btn>
                      &emsp;
                      <v-btn
                        v-show="(updateModeId.index === key) && (updateModeId.type === value.type)"
                        class="white"
                        height="38" width="66"
                        x-small
                        depressed
                        @click="updateDone(key, value.id)">
                        <v-icon>fas fa-check</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
                <!-- <v-btn
                  v-if="getType === 'option'"
                  class="white pink--text text--lighten-2"
                  x-small
                  depressed
                  @click="autoSelect">
                  <v-icon>fas fa-plus</v-icon>
                </v-btn> -->
              </template>
            </v-simple-table>
            <div v-if="getType === 'option'" class="w-100 light-blue lighten-5 pa-10 pt-0">
              <router-link to="/InputPortfolio">
                <v-btn class="white text-h4 font-weight-bold overwrite border-cyan d-block"
                  color="cyan" height="4.5vh" width="100%" rounded outlined x-large>
                  + 繼續新增標的
                </v-btn>
              </router-link>
            </div>
          </v-form>
        </div>
      </div>

      <!-- 基金表 -->
      <div v-if="getType === 'fund'">
        <div>
          <v-form ref="fundForm">
            <v-simple-table dense class="mb-10 pa-5 amber lighten-5">
              <template v-slot:default>
                <tbody>
                  <tr v-for="(value , key) in getPortfolioFund" :key="key" class="amber lighten-5">
                    <td style="width: 26px">
                      <div class="d-inline-block amber accent-3 d-flex align-center text-subtitle-1 justify-center font-weight-bold white--text cube">
                        {{ key }}
                      </div>
                    </td>
                    <td class="text-left w-50 font-weight-bold"
                      v-html="value.id.split(' ').join('<br />')">
                    </td>
                    <td class="text-right font-weight-bold">
                      $ {{ Number(value.buy).toFixed(2) }}
                    </td>
                    <td class="text-right font-weight-bold">{{ value.reserve }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-form>
        </div>
      </div>

      <!-- 美股表 -->
      <div v-if="getType === 'US'">

        <div style="margin-bottom: 100px;">
          <v-form ref="stockUSAForm">
            <v-simple-table dense class="mb-10 pa-5 green lighten-5">
              <template v-slot:default>
                <tbody>
                  <tr v-for="(value , key) in getPortfolioStockUSA" :key="key" class="green lighten-5">
                    <td style="width: 26px">
                      <div class="d-inline-block green darken-1 d-flex align-center justify-center font-weight-bold white--text cube">
                        {{ key }}
                      </div>
                    </td>
                    <td class="text-left w-50 font-weight-bold"
                      v-html="value.id">
                    </td>
                    <td class="text-right font-weight-bold">$ {{ Number(value.buy).toFixed(2) }}</td>
                    <td class="text-right font-weight-bold">{{ value.reserve }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-form>
        </div>
      </div>
    </section>

    <template v-if="AnalysisState">
      <div class="text-center bgProgress d-flex flex-column justify-center align-center" style="z-index: 5">
        <v-progress-circular
          :size="100"
          :width="10"
          color="white"
          indeterminate>
        </v-progress-circular>
        <p class="text-h6 white--text text--lighten-1 my-4">
          投資健檢報告分析中
        </p>
      </div>
    </template>
    <div class="d-flex justify-center">
      <v-btn
        class="mt-2 rounded-xl ma-6"
        color="#7166F9"
        style="border: 3px solid #7166F9"
        width="34%"
        height="5vh"
        large
        depressed
        outlined
        :disabled="permission()"
        @click="back"
        :loading="show">
        <span class="text-h3 font-weight-bold">返回</span>
      </v-btn>
      <v-btn
        class="mt-2 rounded-xl ma-6 white--text"
        color="#7166F9"
        width="34%"
        height="5vh"
        large
        depressed
        :disabled="permission()"
        @click="healthCheck"
        :loading="show">
        <span class="text-h3 font-weight-bold">確定</span>
      </v-btn>

      <FintechDialog :dialog="deleteDialog"  icon="fas fa-check-circle" dialogContent="標的已刪除">
      </FintechDialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.main {
  width: 90%;
  height: calc(90vh - 200px);
}

header {
  height: 10vh;
  background: url(~@/assets/img/header_bg_p3.png);
  background-size: cover;
}
.del {
  cursor: pointer;
}
th, td {
  width: 25vw;
}
$--font-size: 2rem;
.text-table {
  font-size: $--font-size;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: $--font-size;
  height: 6vh;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
  border-bottom: 0;
}

::v-deep .v-autocomplete:not(.v-input--is-disabled).v-select.v-text-field input,
::v-deep .v-input--is-disabled:not(.v-input--is-readonly) {
  font-size: $--font-size;
  font-weight: 600;
}

::v-deep .v-input input {
  max-height: 6vh;
}

.bgProgress {
  background: rgba(0, 172, 193, 0.7);
  position: absolute;
  top: 0; bottom: 0;
  left: 0; right: 0;
}
button.white.v-btn.v-btn--depressed.theme--light.v-size--x-small {
  background: none !important;
}

$--cube-base: 3.6vw;
.cube {
  height: $--cube-base; width: $--cube-base;
  font-size: 1.5rem !important;
}

.v-data-table {
  overflow-y: scroll;
  max-height: 68vh;
}

::v-deep .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: unset;
}

::v-deep .v-list-item__title {
  font-size: 2rem;
  font-weight: bold;
}
::v-deep .v-list-item__content {
  padding: 30px 0;
}
</style>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';

import { rules } from '@/utility/utility';
import { stockData, lunchBoxType, resultType } from '@/utility/globalData';
import router from '@/router';
import { filter } from 'lodash-es';

import FintechHeader from '@/components/FintechHeader.vue';
import FintechDialog from '@/components/FintechDialog.vue';

Vue.component('FintechHeader', FintechHeader);
Vue.component('FintechDialog', FintechDialog);


@Component({
  data () {
    return {
      headerTitle: require('@/assets/img/logo_header_left.png'),
      headerLogo: require('@/assets/img/alpha-white.svg')
    }
  }
})
export default class InputResult extends Vue {
  @Action('delPortfolio') delPortfolio!: (params: any) => void;
  @Action('loadPortfolio') loadPortfolio!: (stock: any) => void;

  @Mutation('setType') setType!: (type: any) => void;
  @Mutation('setLunchBoxType') setLunchBoxType!: (type: any) => void;
  @Mutation('setResultType') setResultType!: (type: any) => void;

  @Getter('getPortfolio') getPortfolio!: any;
  @Getter('getPortfolioStock') getPortfolioStock!: any;
  @Getter('getPortfolioFund') getPortfolioFund!: any;
  @Getter('getPortfolioStockUSA') getPortfolioStockUSA!: any;
  @Getter('getPortfolioLength') getPortfolioLength!: any;
  @Getter('getType') getType!: any;

  private AnalysisState = false;
  private nonUpdateError = false;
  private show = false;
  private typeRoot: any = [
    { type: 'yahoo', color: 'pink lighten-2', title: 'Yahoo 股市熱門台股組合' },
    { type: 'fund', color: 'amber accent-3', title: '台灣人最愛基金組合' },
    { type: 'US', color: 'green darken-1', title: '精選國外標的美股組合' },
    { type: 'option', color: 'cyan', title: '我有自己想法體驗自選組合' }
  ]
  private targetType = {};
  private updateModeId = {
    index: null,
    type: null,
    id: null
  };

  // 選擇出現哪種列表 台股、美股、基金、或全部
  private showType (type: any) {
    if (type === 'yahoo') {

    }
  }

  private getStock = [];
  private getBuy = [];
  private getReserve = [];
  private getClass = [];

  private deleteDialog = false;

  // 監聽標的總數
  @Watch('getPortfolio')
  private updatePortfolioAll () {
    const portfolioAllId = this.getPortfolio.map((item: any) => {
      return item.id;
    });
    console.log(this.getPortfolio)
    return portfolioAllId;
  }

  private renderData () {
    this.getStock = stockData(this.getType)[0];
    this.getBuy = stockData(this.getType)[1];
    this.getReserve = stockData(this.getType)[2];
    this.getClass = stockData(this.getType)[3];
  }

  private change (idRenew: any, updateMode: any) {

    const stockIndex = this.getStock.findIndex((item: any) => {
      return item === idRenew;
    });
    this.getPortfolio[updateMode.index].buy = this.getBuy[stockIndex];
    this.getPortfolio[updateMode.index].reserve = this.getReserve[stockIndex];
    this.getPortfolio[updateMode.index].classes = this.getClass[stockIndex];
  }

  // 自訂義 標的重複檢查
  private checkRepeat = (id: string) => {
    const total = new Set(this.updatePortfolioAll());
    const result = new Set();
    // 先剔除set裡重複標的(去除v-model雙向綁定功能)
    total.forEach((item: any) => {
      if (!result.has(item)) {
        result.add(item);
      };
    });
    // 若資料長度不一樣 則表示有選取到重複的標的
    if (result.size !== this.updatePortfolioAll().length) {
      return '標的不得重複';
    } else {
      return true;
    }
  }

  private inputRule = {
    id: [rules('required'), this.checkRepeat]
  };

  // 開始健檢disabled condition
  private permission () {
    if (this.getPortfolioLength !== 0 && !this.updateModeId.id) {
      return false;
    } else {
      return true;
    };
  }

  // 點擊新增標的，進入InputPortfolio自動帶入標的種類
  // private autoSelect () {
  //   router.push('./InputPortfolio');
  // }

  // 刪除功能
  private del (data: any) {
    this.delPortfolio(data);
    this.deleteDialog = true;
    setTimeout(() => {
      this.deleteDialog = false;
    }, 1300)
  }

  // 開啟修改功能
  private updateMode (index: any, type: any, id: any, buy: any, reserve: any) {
    this.nonUpdateError = true;
    this.updateModeId = {
      index: index,
      type: type,
      id: id
    };
  }

  // 關閉修改功能
  private updateDone (index: any, id: any) {
    this.nonUpdateError = false;
    if (this.$refs.stockForm.validate()) {
      this.$nextTick(() => {
        this.updateModeId = {
          index: null,
          type: null,
          id: null
        };
      });
    };
  }
  
  // 進行健檢 output兩個值
  // 1. lunchBoxType得到[哪種便當盒] R1:積極型、R2:穩健型、R3:保守型
  // 2. resultType得到[哪種報告分析圖] A1:美股、A2:yahoo、A3:基金、A4~10為自選投組 (A4:半、A5:金、A6:ETF、A7:半+金、A8:半+ETF、A9:金+ETF、A10:半+金+ETF)
  private healthCheck () {
    this.setLunchBoxType(lunchBoxType(this.getType, this.getPortfolio));
    this.setResultType(resultType(this.getType, this.getPortfolio));

    // console.log(lunchBoxType(this.getType, this.getPortfolio));
    // console.log(resultType(this.getType, this.getPortfolio));
  }

  private back () {
    if (this.getType === 'option') {
      this.$router.push('/InputPortfolio');
    } else {
      this.$router.push('/ChoosePortfolio');
    }
  }

  // 確認當前修改標的
  // 在修改階段下 設定當下修改標的id 避免手賤點到其他標的按鈕
  private uniqle () {
    return Boolean(this.updateModeId.id);
  }

  private created () {
    this.switchPortfoliosType();
  }

  @Watch('getType')
  private switchPortfoliosType () {
    this.renderData();
    
    if (this.getType !== 'option') {
      this.loadPortfolio(stockData(this.getType));
    }
    this.targetType = filter(this.typeRoot, [ 'type', this.getType ])[0];
    console.log(this.getPortfolio);
    console.log(this.getPortfolioStockUSA);
  }
}
</script>
