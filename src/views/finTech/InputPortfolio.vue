<template>
  <div class="main mx-auto pa-0 pa-md-6 py-6">
    <!--  <div>
      <v-icon class="blue-grey--text text--darken-3" @click="back" small>fas fa-arrow-left</v-icon>
    </div> -->
    <div class="text-center">
      <h2 class="font-weight-bold maintitle">
        投資標的輸入
      </h2>
    </div>
    <div class="divider my-8 my-md-10 mb-8 mb-md-14"></div>

    <div class="input-field">
      <div>
        <v-form ref="stockForm" style="width:100%;">
          <v-row class="justify-center">
            <v-text-field
              class="kind rounded-pill"
              background-color="white"
              color="cyan" item-color="cyan"
              outlined
              disabled
              filled
              height="164"
              v-model="select"
            ></v-text-field>
            <v-col cols="12" class="pa-0">
              <p class="subtitle my-6">股票代號</p>
              <v-autocomplete
                class="stock rounded-pill"
                background-color="white"
                color="cyan" item-color="cyan"
                outlined filled rounded
                placeholder="ex. 2330 台積電"
                validate-on-blur
                height="164"
                v-model="stockNumber"
                :rules="inputRule.id"
                :menu-props="{ maxHeight: 600 }"
                :items="getStock">
              </v-autocomplete>

            </v-col>
            <v-col cols="12" class="pa-0">
              <p class="subtitle mt-6 mb-8">買進成本</p>
              <v-text-field
                class="buy rounded-pill"
                background-color="white"
                color="black" item-color="cyan"
                outlined 
                filled
                dense 
                validate-on-blur
                height="164"
                :disabled="true"
                v-model="buy">
              </v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
              <p class="subtitle mt-6 mb-8">持有股數</p>
              <v-text-field
                class="reserve rounded-pill"
                background-color="white"
                color="success" item-color="cyan"
                outlined 
                filled 
                rounded
                validate-on-blur
                height="164"
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
</template>
<style lang="scss" scoped>
$rounded: (
  0: 0,
  'sm': $border-radius-root / 2,
  null: $border-radius-root,
  'lg': $border-radius-root * 2,
  'xl': $border-radius-root * 6,
  'pill': 9999px,
  'circle': 50%
);

.main {
  width: 90%;
  @media screen and (max-width: 414px) {
    width: 95%;
  }

  .maintitle {
  font-size: 60px; 
  margin-bottom:120px;
  }

  .subtitle {
    font-size: 35px;
  }
}


::v-deep input#input {
    &-7, &-10, &-15, &-18 {
      font-weight: 700;
      font-size: 35px;
      max-height: 100px;
      margin-left: 85px;
      color: #4E4E4E !important;
    }
  }

.kind ::v-deep fieldset, .buy ::v-deep fieldset, .reserve ::v-deep fieldset{
  color: #F2F3F3 !important;
  background: #EFEFEF;
}

.stock ::v-deep fieldset {
  border: 3px solid #707070;
}

::v-deep i.v-icon.v-icon {
  position: absolute;
  font-size: 86px !important;
  top: 25%;
  right: 4%;
}

::v-deep .v-list-item__title {
  padding: 20px;
  font-size: 35px;
  font-weight: 500;
}

::v-deep .v-messages__message {
  font-size: 35px;
  padding: 30px;
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
  @Action('loadPortfolio') loadPortfolio!: (stock: any) => void;
  @Getter('getPortfolio') getPortfolio!: any;
  @Getter('getType') getType!: any;

  private decoAlpha = decoAlpha
  private addedDialog = false;
  private dialogMsg = '';
  private select = '台股 / ETF';

  private getStock = [];
  private getBuy = [];
  private getReserve = [];
  private getClass = [];

  // 選擇的股票代號
  private stockNumber = '';
  private buy = '';
  private reserve = '';
  private classes = ''

  // 監聽標的總數
  @Watch('getPortfolio')
  private updatePortfolioAll () {
    const portfolioAllId = this.getPortfolio.map((item: any) => {
      return item.id;
    });
    return portfolioAllId;
  }

  // 渲染資料，避免DOM抓取不到
  private renderData () {
    this.getStock = stockData(this.getType)[0];
    this.getBuy = stockData(this.getType)[1];
    this.getReserve = stockData(this.getType)[2];

    // 自選投組多一個產業類別
    if (this.getType === 'option') {
      this.getClass = stockData(this.getType)[3];
    }
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
    id: [rules('required'), this.checkRepeat]
  };

  // 先行在created渲染，否則抓不到資料
  private created () {
    this.renderData();
  }

  private back () {
    this.$router.push('./InvestDiagnosis.html');
  }

  @Watch('stockNumber')
  private setBuyAndReserve () {
    const index = stockData(this.getType)[0].findIndex((item: any) => {
      return item === this.stockNumber;
    });
    this.buy = stockData(this.getType)[1][index];
    this.reserve = stockData(this.getType)[2][index];
    if (this.getType === 'option') {
      this.classes = stockData(this.getType)[3][index];
    }
  }

  // /**
  //  * 台股輸入
  //  */
  private addStock () {
    const form: any = this.$refs.stockForm;
    if (form.validate()) {
      if (this.getType === 'option') {
        this.loadPortfolio({
          id: this.stockNumber,
          type: 'stock',
          buy: this.buy,
          reserve: this.reserve,
          classes: this.classes
        });

        this.stockNumber = '';
        this.buy = '';
        this.reserve = '';
        this.classes = '';
        this.addedDialog = true;
        this.dialogMsg = '已新增';
      }
    }
  }

  private next () {
    router.push('/InputResult');
  }

  private cancel () {
    this.addedDialog = false;
    this.dialogMsg = '';
  }
}
</script>
