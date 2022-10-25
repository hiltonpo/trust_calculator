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
            class="text-h4 font-weight-medium px-0 py-5 white--text" :class="targetType.color">
            <span class="portfolio-title d-block">{{ targetType.title }}{{ targetType.summary }}</span>
          </v-col>

          <v-col class="text-table font-weight-bold d-flex align-center justify-end" :class="[ getType === 'fund' ? `justify-center` : `justify-end` ]" cols="3">
            <span v-if="getType === 'yahoo' || getType === 'option'">成本／新台幣</span>
            <span v-if="getType === 'fund'">成本</span>
            <span v-if="getType === 'US'">成本／美元</span>
          </v-col>
          <v-col class="text-table font-weight-bold d-flex align-center px-8" cols="2">
            股數
          </v-col>
          <v-col v-if="getType === 'option'" cols="1"></v-col>
        </v-row>
      </nav>
      <div>
        <div>
          <v-form ref="stockForm" :class="[ getType === 'option'? 'option' : '' ]">
            <v-simple-table dense class="pa-5"
              :class="targetType.bg">
              <template v-slot:default>
                <tbody>
                  <tr v-for="(value , key) in portfolioList" :key="key">
                    <td style="width: 26px">
                      <div class="d-inline-block d-flex align-center text-h6 justify-center font-weight-bold white--text cube"
                      :class="targetType.color">
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

    </section>

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
      <FintechDialog :dialog="reportDialog"  icon="fas fa-clipboard-list" :dialogContent="`產生報告中${loadingTxt}`">
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
  background: url(~@/assets/img/finTech/header_bg_p3.png);
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

.portfolio-title {
  transform: scale(1.15);
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
.option {
  .v-data-table {
    overflow-y: scroll;
    max-height: 55vh;
  }
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
import { stockData, lunchBoxType, resultType, typeRoot } from '@/utility/globalData';
import router from '@/router';
import { filter } from 'lodash-es';

import FintechHeader from '@/components/FintechHeader.vue';
import FintechDialog from '@/components/FintechDialog.vue';

Vue.component('FintechHeader', FintechHeader);
Vue.component('FintechDialog', FintechDialog);

@Component({
  data () {
    return {
      headerTitle: require('@/assets/img/finTech/logo_header_left.png'),
      headerLogo: require('@/assets/img/finTech/alpha-white.svg')
    };
  }
})
export default class InputResult extends Vue {
  @Action('delPortfolio') delPortfolio!: (params: any) => void;
  @Action('loadPortfolio') loadPortfolio!: (stock: any) => void;

  // @Mutation('setType') setType!: (type: any) => void;
  @Mutation('setLunchBoxType') setLunchBoxType!: (type: any) => void;
  @Mutation('setResultType') setResultType!: (type: any) => void;

  @Getter('getPortfolio') getPortfolio!: any;
  @Getter('getPortfolioStock') getPortfolioStock!: any;
  @Getter('getPortfolioFund') getPortfolioFund!: any;
  @Getter('getPortfolioStockUSA') getPortfolioStockUSA!: any;
  @Getter('getPortfolioLength') getPortfolioLength!: any;
  @Getter('getType') getType!: any;
  @Getter('getResultType') getResultType!: string;

  private nonUpdateError = false;
  private show = false;
  private typeRoot: any = typeRoot;

  private targetType = {};
  private updateModeId = {
    index: null,
    type: null,
    id: null
  };

  private getStock = [];
  private getBuy = [];
  private getReserve = [];
  private getClass = [];

  private deleteDialog = false;
  private reportDialog = false;
  private loadingTxt = '';

  private created () {
    this.switchPortfoliosType();
  }

  @Watch('getType')
  private switchPortfoliosType () {
    if (!this.getType) {
      this.$router.push('/ChoosePortfolio');
    }

    if (this.getType) {
      this.targetType = filter(this.typeRoot, ['type', this.getType])[0];
      this.renderData();

      if (this.getType !== 'option') {
        this.loadPortfolio(stockData(this.getType));
      }

      if (this.getType === 'option') {
        this.permission();
      }
      // this.loadPortfolio(stockData(type));

      // console.log(this.getPortfolio);
      // console.log(this.getPortfolioStockUSA);
    }
  }

  get portfolioList () {
    const list: any = {
      yahoo: this.getPortfolioStock,
      fund: this.getPortfolioFund,
      US: this.getPortfolioStockUSA,
      option: this.getPortfolioStock
    };
    return list[this.getType];
  }

  // 監聽標的總數
  @Watch('getPortfolio')
  private updatePortfolioAll () {
    const portfolioAllId = this.getPortfolio.map((item: any) => {
      return item.id;
    });
    console.log(this.getPortfolio);
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
    // if (this.getPortfolioLength !== 0 && !this.updateModeId.id) {
    //   return false;
    // } else {
    //   return true;
    // };
    return this.getPortfolioLength === 0 && this.updateModeId.id;
  }

  @Watch('getPortfolioLength')
  @Watch('updateModeId')
  private updatePermission () {
    this.permission();
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
    }, 1300);
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
    this.reportDialog = true;
    console.log(this.getResultType);

    const timer = setInterval(() => {
      this.loadingTxt.length < 3
        ? this.loadingTxt += '.' : this.loadingTxt = '';
    }, 600);

    setTimeout(() => {
      clearInterval(timer);
      this.$router.push('/Report');
    }, 3800);
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
}
</script>
