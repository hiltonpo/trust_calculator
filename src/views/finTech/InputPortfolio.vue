<template>
  <v-card
    class="mx-auto rounded-xl pa-5 px-md-5 px-4 white white"
    elevation="3"
    style="overflow: hidden;"
  >
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
      <div>
        <v-form ref="stockForm" style="width:100%;">
          <v-row class="justify-center">
            <v-select
              background-color="white"
              color="cyan" item-color="cyan"
              outlined
              filled
              rounded
              :rules="inputRule.id"
              :items="items"
              v-model="select"
            ></v-select>
            <v-col cols="12" class="pa-0">
              <p>股票代號</p>
              <v-autocomplete
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                placeholder="ex. 2330"
                validate-on-blur
                :rules="inputRule.id"
                v-model="stockNumber"
                :items="select === items[0].value ? getStock: ['']">
              </v-autocomplete>

            </v-col>
            <v-col cols="12" sm="6" class="pa-0 pr-sm-3">
              <p class="mb-3">買進成本 (新台幣)</p>
              <v-text-field
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                validate-on-blur
                placeholder="ex. 679"
                :disabled="true"
                v-model="buy">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pa-0 pl-sm-3">
              <p class="mb-3">持有股數 (股)</p>
              <v-text-field
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                validate-on-blur
                placeholder="ex. 1000"
                :disabled="true"
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

      <v-btn
        class="white--text my-6 mt-4"
        color="cyan lighten-1"
        width="100%"
        large
        depressed
        @click="next">
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
  </v-card>
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';
import { rules } from '@/utility/utility';
import { stockData } from '@/utility/globalData';

import decoAlpha from '@/assets/img/alpha-5.png';
import router from '@/router';


@Component
export default class InputPortfolio extends Vue {
  @Action('loadPortfolioAll') loadPortfolioAll!: (stock: any) => void;
  @Getter('getPortfolioAll') getPortfolioAll!: any;

  private decoAlpha = decoAlpha
  private addedDialog = false;
  private dialogMsg = '';
  private select = 0;

  private items = [
    {
      text: '台股 / ETF',
      value: 1
    },
  ];

  private getStock = stockData()[0]
  private getBuy = stockData()[1]
  private getReserve = stockData()[2]

  // 選擇的股票代號
  private stockNumber = '';
  private buy = '';
  private reserve = '';

  
  // 自訂義 標的重複檢查
  private checkRepeat = (id: string) => {
    const total = new Set(this.getPortfolioAll);
    if (total.has(id)) {
      return '標的不得重複';
    } else {
      return true;
    }
  }

  private inputRule = {
    id: [rules('required'), this.checkRepeat],
  };

  private created () {
    
  }

  private back () {
    this.$router.push('./InvestDiagnosis.html');
  }

  @Watch('stockNumber')
  private setBuyAndReserve() {
    const index = stockData()[0].findIndex((item: any) => {
      return item === this.stockNumber;
    });
    this.buy = stockData()[1][index];
    this.reserve = stockData()[2][index];
  }

  // @Watch('fundNumber')
  // private setCurrency () {
  //   this.fundCurrency = this.getFundsCurrency[this.getFunds.indexOf(this.fundNumber)];
  // }

  // @Watch('select')
  // private selectChange () {
  //   this.setSelect(this.select);
  // }

  // // 監聽標的總數
  // @Watch('getPortfolioAll')
  // private updatePortfolioAll () {
  //   return this.getPortfolioAll;
  // }

  // /**
  //  * 台股輸入
  //  */
  private addStock () {
    const form: any = this.$refs.stockForm;
    if (form.validate()) {
      this.loadPortfolioAll({
        id: this.stockNumber,
        type: 'stock',
        buy: this.buy,
        reserve: this.reserve,
        currency: 'NTD'
      })

      this.stockNumber = '';
      this.buy = '';
      this.reserve = '';
      this.addedDialog = true;
      this.dialogMsg = '已新增';
    }
  }

  private next() {
    router.push('/InputResult')
  }

  // /**
  //  * 美股輸入
  //  */
  // private addStockUSA () {
  //   const form: any = this.$refs.stockForm;
  //   if (form.validate()) {
  //     if (this.getPortfolioLength < 50) {
  //       this.addingPortfolio({
  //         id: String(this.stockUSANumber),
  //         type: 'USAstock',
  //         buy: Number(this.USAbuy),
  //         reserve: Number(this.USAreserve),
  //         currency: 'USD'
  //       });

  //       this.stockUSANumber = '';
  //       this.USAbuy = '';
  //       this.USAreserve = '';

  //       this.addedDialog = true;
  //       this.dialogMsg = '已新增';
  //     } else {
  //       this.addedDialog = true;
  //       this.dialogMsg = '無法新增超過 50 筆資料';
  //     }
  //   }
  // }

  // /**
  //  * 基金輸入
  //  */
  // private addFund () {
  //   const form: any = this.$refs.fundForm;
  //   if (form.validate()) {
  //     if (this.getPortfolioLength < 50) {
  //       this.addingPortfolio({
  //         id: String(this.fundNumber),
  //         type: 'fund',
  //         buy: Number(this.fundBuy),
  //         reserve: Number(this.fundReserve),
  //         currency: this.fundCurrency
  //       });

  //       this.fundNumber = '';
  //       this.fundBuy = '';
  //       this.fundReserve = '';

  //       this.addedDialog = true;
  //       this.dialogMsg = '已新增';
  //     } else {
  //       this.addedDialog = true;
  //       this.dialogMsg = '無法新增超過 50 筆資料';
  //     }
  //   }
  // }

  private cancel () {
    this.addedDialog = false;
    this.dialogMsg = '';
  }
}
</script>
