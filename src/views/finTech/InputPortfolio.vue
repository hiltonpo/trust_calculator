<template>
  <div class="main mx-auto pa-0 pa-md-6 py-6">
    <!--  <div>
      <v-icon class="blue-grey--text text--darken-3" @click="back" small>fas fa-arrow-left</v-icon>
    </div> -->
    <div class="text-center">
      <h2 class="cyan--text text--lighten-1 font-weight-bold">
        投資標的輸入
      </h2>
      <p class="text-h6">
        <small class="text-subtitle-1 blue-grey--text text--lighten-1">若有搜尋不到的標的，可能因該檔投資標的成立日期小於6個月，或資料不完整喔！</small>
      </p>
    </div>
    <div class="divider my-8 my-md-10 mb-8 mb-md-14"></div>

    <div class="input-field">
      <v-select
        background-color="white"
        color="cyan" item-color="cyan"
        outlined
        filled
        rounded
        :items="items"
        v-model="select"
      ></v-select>
      <div v-if="getSelect === 0">
        <v-form ref="stockForm">
          <v-row>
            <v-col cols="12" class="pa-0">
              <p>股票代號</p>
              <v-autocomplete
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                :rules="inputRule.id"
                placeholder="ex. 2330"
                validate-on-blur
                v-model="stockNumber"
                :items="getStockTW != '' ? getStockTW : ['請稍後...']">
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      查無此股票
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>

            </v-col>
            <v-col cols="12" sm="6" class="pa-0 pr-sm-3">
              <p class="mb-3">買進成本</p>
              <v-text-field
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                validate-on-blur
                :rules="inputRule.buy"
                placeholder="ex. 679"
                v-model="buy"
                :suffix="TWCurrency">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pa-0 pl-sm-3">
              <p class="mb-3">持有股數</p>
              <v-text-field
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                validate-on-blur
                :rules="inputRule.reserve"
                placeholder="ex. 1000"
                v-model="reserve">
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-btn
          class="mt-16"
          color="cyan lighten-1"
          outlined
          width="100%"
          large
          depressed
          @click="addStock"> 新增 </v-btn>
      </div>
      <div v-if="getSelect === 1">
        <v-form ref="fundForm">
          <v-row>
            <v-col cols="12" class="pa-0">
              <p>基金名稱</p>
              <v-autocomplete
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                :rules="inputRule.id"
                placeholder="ex. 永豐臺灣加權ETF基金"
                validate-on-blur
                v-model="fundNumber"
                :items="getFunds != '' ? getFunds : ['請稍後...']">
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      查無此基金
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="6" class="pa-0 pr-sm-3">
              <p>買進成本</p>
              <v-text-field
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                validate-on-blur
                :rules="inputRule.buy"
                placeholder="ex. 679"
                v-model="fundBuy"
                :suffix="fundCurrency">
              </v-text-field>
            </v-col>
            <v-col cols="6" class="pa-0 pl-sm-3">
              <p>持有單位</p>
              <v-text-field
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                validate-on-blur
                :rules="inputRule.reserve"
                placeholder="ex. 1000"
                v-model="fundReserve">
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-btn
          class="mt-16"
          color="cyan lighten-1"
          outlined
          width="100%"
          large
          depressed
          @click="addFund"> 新增 </v-btn>
      </div>
      <div v-if="getSelect === 2">
        <v-form ref="stockForm">
          <v-row>
            <v-col cols="12" class="pa-0">
              <p>股票代號</p>
              <v-autocomplete
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                :rules="inputRule.id"
                placeholder="ex. AAPL"
                validate-on-blur
                v-model="stockUSANumber"
                :items="getStockUSA != '' ? getStockUSA : ['請稍後...']">
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      查無此股票
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="6" class="pa-0 pr-sm-3">
              <p>買進成本</p>
              <v-text-field
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                validate-on-blur
                :rules="inputRule.buy"
                placeholder="ex. 679"
                v-model="USAbuy"
                :suffix="USACurrency">
              </v-text-field>
            </v-col>
            <v-col cols="6" class="pa-0 pl-sm-3">
              <p>持有股數</p>
              <v-text-field
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                validate-on-blur
                :rules="inputRule.reserve"
                placeholder="ex. 1000"
                v-model="USAreserve">
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-btn
          class="mt-16"
          color="cyan lighten-1"
          outlined
          width="100%"
          large
          depressed
          @click="addStockUSA"> 新增 </v-btn>
      </div>

      <v-btn
        class="white--text my-6 mt-4"
        color="cyan lighten-1"
        width="100%"
        large
        depressed
        to="./InvestDiagnosis.html?id=2">
        下一步
      </v-btn>

      <!-- <v-row v-if="getSelect === 1">
        <p class="font-weight-light mt-6">
          ＊若您不清楚投資基金的ISIN代碼，可以透過以下連結查詢:<br>
          1. 境內基金查詢：<a href="https://reurl.cc/pxynba" target="_blank">https://reurl.cc/pxynba</a><br>
          2. 境外基金查詢：<a href="https://reurl.cc/KrjKXM" target="_blank">https://reurl.cc/KrjKXM</a>
        </p>
      </v-row> -->
    </div>

    <!-- popup -->
    <v-dialog v-model="addedDialog" max-width="350">
      <v-card class="text-center white py-10 position-relative">
        <v-icon
          color="grey lighten-1"
          style="position:absolute; top: 12px; right: 12px;"
          @click="cancel" large
        >
          fas fa-times-circle
        </v-icon>
        <v-card-text class="pt-5 pb-0">
          <p class="text-h6 font-weight-bold pa-4">
            {{ dialogMsg }}
          </p>
        </v-card-text>
        <div class="d-table mx-auto">
          <v-img :src="decoAlpha" width="200"></v-img>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<style lang="scss" scoped>
.main {
  width: 90%;
  @media screen and (max-width: 414px) {
    width: 95%;
  }
}

</style>

<script lang="ts">
import { watch } from 'fs';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { VCardSubtitle } from 'vuetify/lib';
import { Action, Getter, Mutation } from 'vuex-class';

import decoAlpha from '@/assets/img/alpha-5.png';
import { rules, setCookie } from '@/utility/utility';
import MainSideBar from '@/views/main/MainSideBar.vue';
import MainTopBar from '@/views/main/MainTopBar.vue';
import Standard from '@/views/main/Standard.vue';

Vue.component('MainSideBar', MainSideBar);
Vue.component('MainTopBar', MainTopBar);

@Component
export default class InputPortfolio extends Standard {
  /**
   * 待補股票列表API 名字要更換 參考 store/InvestDiagnosis.ts
   */
  @Action('addingPortfolio') addingPortfolio!: (data: any) => void;
  @Getter('getPortfolioLength') getPortfolioLength!: number;
  @Getter('getStockTW') getStockTW!: string[];
  @Getter('getStockUSA') getStockUSA!: string[];
  @Getter('getFunds') getFunds!: string[];
  @Getter('getFundsCurrency') getFundsCurrency!: string[];
  @Getter('getPortfolioAll') getPortfolioAll!: any;
  @Getter('getSelect') getSelect!: any;
  @Mutation('setSelect') setSelect!: any;

  private addedDialog = false;
  private dialogMsg = '';
  private decoAlpha = decoAlpha;
  private select = 0;

  private items = [
    {
      text: '台股 / ETF',
      value: 0
    },
    {
      text: '基金',
      value: 1
    },
    {
      text: '美股',
      value: 2
    }
  ];

  /**
   * 台股
   */
  private stockNumber = '';
  private buy = '';
  private reserve = '';
  private TWCurrency = '新台幣';

  private stockUSANumber = '';
  private USAbuy = '';
  private USAreserve = '';
  private USACurrency = '美元';

  private fundNumber = '';
  private fundBuy = '';
  private fundReserve = '';
  private fundCurrency = '';

  // 要串API
  // private getStockTW123 = ['要串getList的API', '某某股2', '某某股3'];

  private created () {
    this.select = this.getSelect;
  }

  // 自訂義 標的重複檢查
  private checkRepeat = (id: string) => {
    const total = new Set(this.updatePortfolioAll());
    if (total.has(id)) {
      return '標的不得重複';
    } else {
      return true;
    }
  }

  private inputRule = {
    id: [rules('required'), this.checkRepeat],
    buy: [rules('required'), rules('checkStockNumber'), rules('noneZero')],
    reserve: [rules('required'), rules('checkStockNumber'), rules('noneZero')]
  };

  private back () {
    this.$router.push('./InvestDiagnosis.html');
  }

  @Watch('fundNumber')
  private setCurrency () {
    this.fundCurrency = this.getFundsCurrency[this.getFunds.indexOf(this.fundNumber)];
  }

  @Watch('select')
  private selectChange () {
    this.setSelect(this.select);
  }

  // 監聽標的總數
  @Watch('getPortfolioAll')
  private updatePortfolioAll () {
    return this.getPortfolioAll;
  }

  /**
   * 台股輸入
   */
  private addStock () {
    if (this.$refs.stockForm.validate()) {
      if (this.getPortfolioLength < 50) {
        this.addingPortfolio({
          id: String(this.stockNumber),
          type: 'stock',
          buy: Number(this.buy),
          reserve: Number(this.reserve),
          currency: 'NTD'
        });

        this.stockNumber = '';
        this.buy = '';
        this.reserve = '';

        this.addedDialog = true;
        this.dialogMsg = '已新增';
      } else {
        this.addedDialog = true;
        this.dialogMsg = '無法新增超過 50 筆資料';
      }
    }
  }

  /**
   * 美股輸入
   */
  private addStockUSA () {
    if (this.$refs.stockForm.validate()) {
      if (this.getPortfolioLength < 50) {
        this.addingPortfolio({
          id: String(this.stockUSANumber),
          type: 'USAstock',
          buy: Number(this.USAbuy),
          reserve: Number(this.USAreserve),
          currency: 'USD'
        });

        this.stockUSANumber = '';
        this.USAbuy = '';
        this.USAreserve = '';

        this.addedDialog = true;
        this.dialogMsg = '已新增';
      } else {
        this.addedDialog = true;
        this.dialogMsg = '無法新增超過 50 筆資料';
      }
    }
  }

  /**
   * 基金輸入
   */
  private addFund () {
    if (this.$refs.fundForm.validate()) {
      if (this.getPortfolioLength < 50) {
        this.addingPortfolio({
          id: String(this.fundNumber),
          type: 'fund',
          buy: Number(this.fundBuy),
          reserve: Number(this.fundReserve),
          currency: this.fundCurrency
        });

        this.fundNumber = '';
        this.fundBuy = '';
        this.fundReserve = '';

        this.addedDialog = true;
        this.dialogMsg = '已新增';
      } else {
        this.addedDialog = true;
        this.dialogMsg = '無法新增超過 50 筆資料';
      }
    }
  }

  private cancel () {
    this.addedDialog = false;
    this.dialogMsg = '';
  }
}
</script>
