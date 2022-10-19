<template>
  <div class="main mx-auto pa-0 pa-md-6 py-6">
    <!-- <div>
      <v-icon class="blue-grey--text text--darken-3" @click="back" small>fas fa-arrow-left</v-icon>
    </div> -->
    <div class="text-center">
      <h2 class="cyan--text text--lighten-1 font-weight-bold">
        投資組合確認
      </h2>

    </div>
    <div class="divider my-8 my-md-10"></div>

    <!-- 台股表 -->
    <div v-if="getType === 'yahoo' || getType === 'option'">
    <p class="text-h6 pink--text text--lighten-2 mb-1">
      台股
    </p>
    <div>
      <v-form ref="stockForm">
        <v-simple-table dense class="mb-10">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  代號
                </th>
                <th class="text-center">
                  成本／幣別
                </th>
                <th class="text-center">
                    股數
                </th>
                <th class="text-center">
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value , key) in getPortfolioStock" :key="key" class="pink lighten-5">
                <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-left">
                  <v-autocomplete
                    :rules="inputRule.id"
                    v-model="value.id"
                    @change="change(value.id, updateModeId)"
                    :items="getStock">
                  </v-autocomplete>
                </td>
                <td v-else class="text-left"><i class="fas fa-square pink--text text--lighten-2 mr-2"></i>{{ value.id }}</td>

                <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-center">
                  <v-text-field :value="value.buy" :disabled="true"></v-text-field>
                </td>
                <td v-else class="text-center">{{ value.buy }}／新台幣</td>

                <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-center">
                  <v-text-field v-model="value.reserve" :disabled="true"></v-text-field>
                </td>
                <td v-else class="text-center">{{ value.reserve }}</td>
                <td class="text-center">
                  <v-btn
                    :disabled="uniqle()"
                    v-show="(updateModeId.index !== key) || (updateModeId.type !== value.type)"
                    class="white"
                    x-small
                    depressed
                    @click="del({id: value.id , type: value.type})">
                    <i class="fas fa-minus"></i>
                  </v-btn>
                  &emsp;
                  <v-btn
                    :disabled="uniqle()"
                    v-show="(updateModeId.index !== key) || (updateModeId.type !== value.type)"
                    class="white"
                    x-small
                    depressed
                    @click.stop="updateMode(key, value.type, value.id)">
                    <i class="fas fa-pencil-alt"></i>
                  </v-btn>
                  &emsp;
                  <v-btn
                    v-show="(updateModeId.index === key) && (updateModeId.type === value.type)"
                    class="white"
                    x-small
                    depressed
                    @click="updateDone(key, value.id)">
                    <i class="fas fa-check"></i>
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <v-btn
              v-if="getType === 'option'"
              class="white pink--text text--lighten-2"
              x-small
              depressed
              @click="autoSelect">
              <i class="fas fa-plus"> 新增</i>
            </v-btn>
          </template>
        </v-simple-table>
      </v-form>
    </div>
    </div>

    <!-- 基金表 -->
    <div v-if="getType === 'fund' || getType === 'option'">
    <p class="text-h6 amber--text text--accent-3 mb-1">
      基金
    </p>
    <div>
      <v-form ref="fundForm">
        <v-simple-table dense class="mb-10">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  代號
                </th>
                <th class="text-center">
                  成本／幣別
                </th>
                <th class="text-center">
                  單位數
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value , key) in getPortfolioFund" :key="key" class="amber lighten-5">
                <td class="text-left"><i class="fas fa-square mr-2 amber--text text--accent-3"></i>{{ value.id }}</td>
                <td class="text-center">{{ value.buy }}／{{ value.currency }}</td>
                <td class="text-center">{{ value.reserve }}</td>
                <td class="text-center"></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-form>
    </div>
    </div>
    
    <!-- 美股表 -->
    <div v-if="getType === 'US' || getType === 'option'">
    <p class="text-h6 green--text text--darken-1 mb-1">
      美股
    </p>
    <div style="margin-bottom: 100px;">
      <v-form ref="stockUSAForm">
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  代號
                </th>
                <th class="text-center">
                  成本／幣別
                </th>
                <th class="text-center">
                  股數
                </th>
                <th class="text-center">
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value , key) in getPortfolioStockUSA" :key="key" class="green lighten-5">
                <td class="text-left"><i class="fas fa-square mr-2 green--text text--darken-1"></i>{{ value.id }}</td>
                <td class="text-center">{{ value.buy }}／美元</td>
                <td class="text-center">{{ value.reserve }}</td>
                <td class="text-center">
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-form>
    </div>
    </div>

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
    <div>
      <v-row>
        <v-col cols="12" sm="6" lg="6">
          <v-btn
            class="mt-2"
            color="black"
            width="100%"
            large
            depressed
            outlined
            :disabled="permission()"
            @click="back"
            :loading="show">
            上一步
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" lg="6">
          <v-btn
            class="mt-2"
            color="black"
            width="100%"
            large
            depressed
            outlined
            :disabled="permission()"
            @click="healthCheck"
            :loading="show">
            下一步
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <!-- <v-btn
      class="deep-purple--text text--accent-4 font-weight-bold mt-4 mb-6 text-capitalize"
      color="deep-purple accent-4"
      width="100%"
      large
      depressed
      outlined
      @click="resetYahooPortfolio"
      :loading="show">
      <span>同步 Yahoo 股市</span>
    </v-btn> -->
  </div>
</template>

<style lang="scss" scoped>

.main {
  width: 90%;
  height: 100vh;
  @media screen and (max-width: 414px) {
    width: 98%;
  }
}
.del {
  cursor: pointer;
}
th, td {
  width: 25vw;
  // border-right:1px solid rgba(225, 245, 254, 0.5);
  @media screen and (max-width: 768px) {
    padding: 2vw 1vw !important;
    &:nth-last-child(1) {
      width: 2vw;
    }
    &:first-child {
      width: 50vw;
    }
  }
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
</style>

<script lang="ts">

import { forEach } from 'lodash-es';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';

import { getCookie, removeCookie, rules, setCookie } from '@/utility/utility';
import { stockData, lunchBoxType } from '@/utility/globalData';
import router from '@/router';

@Component
export default class InputResult extends Vue {
  @Action('delPortfolio') delPortfolio!: (params: any) => void;
  @Action('loadPortfolio') loadPortfolio!: (stock: any) => void;

  @Mutation('setLunchBoxType') setLunchBoxType!: (type: any) => void;

  @Getter('getPortfolio') getPortfolio!: any;
  @Getter('getPortfolioStock') getPortfolioStock!: any;
  @Getter('getPortfolioFund') getPortfolioFund!: any;
  @Getter('getPortfolioStockUSA') getPortfolioStockUSA!: any;
  @Getter('getPortfolioLength') getPortfolioLength!: any;
  @Getter('getType') getType!: any;

  private AnalysisState = false;
  private nonUpdateError = false;
  private show = false;
  private updateModeId = {
    index: null,
    type: null,
    id: null
  };
  // 選擇出現哪種列表 台股、美股、基金、或全部
  private showType(type: any) {
    if (type === 'yahoo') {
      return 
    }
  }

  private getStock = [];
  private getBuy = [];
  private getReserve = [];
  private getClass = [];

    // 監聽標的總數
  @Watch('getPortfolio')
  private updatePortfolioAll () {
    const portfolioAllId = this.getPortfolio.map((item: any) => {
      return item.id;
    });
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

  // 跳出刪除標的對話窗
  private showDialog (refsName: any) {
    this.$refs[refsName].showDialog();
  }
  
  // 開始健檢disabled condition
  private permission () {
    if (this.getPortfolioLength !== 0 && !this.updateModeId.id) {
      return false;
    } else {
      return true;
    };
  }

  // 點擊新增標的，進入InputPortfolio自動帶入標的種類
  private autoSelect () {
    router.push('./InputPortfolio');
  }

  // 刪除功能
  private del (data: any) {
    this.delPortfolio(data);
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
    // 台股 美股 基金必須一起綁定驗證
    if (this.$refs.stockForm.validate() && this.$refs.fundForm.validate() && this.$refs.stockUSAForm.validate()) {
      this.$nextTick(() => {
        this.updateModeId = {
          index: null,
          type: null,
          id: null
        };
      });
      // 基金的幣值需隨種類不同而更動
      if (this.updateModeId.type === 'fund') {
        const ID = id.split(' ')[0];
        this.getPortfolioFund[index].currency = this.getFundsCurrency[this.getFunds.indexOf(ID)];
      };
    };
    console.log(this.getPortfolioAll);
  }

  private healthCheck() {
    console.log(lunchBoxType(this.getType, this.getClass))
  }

  private back() {
    router.push('./InputPortfolio');
  }

  // 確認當前修改標的
  // 在修改階段下 設定當下修改標的id 避免手賤點到其他標的按鈕
  private uniqle () {
    if (!this.updateModeId.id) {
      return false;
    } else {
      return true;
    }
  }

  private created() {
    this.renderData()
    this.loadPortfolio(stockData(this.getType))

    console.log(this.getPortfolio)
    console.log(this.getPortfolioStockUSA)
  }
}
</script>
