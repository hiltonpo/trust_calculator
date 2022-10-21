<template>
  <div class="main mx-auto pa-0">
    <FintechHeader></FintechHeader>
    <!--  <div>
      <v-icon class="blue-grey--text text--darken-3" @click="back" small>fas fa-arrow-left</v-icon>
    </div> -->
    <div class="text-center" style="margin-top: 60px">
      <h2 class="font-weight-bold maintitle">
        投資標的輸入
        <p class="maintitle-2">展覽僅開放體驗 
          <span class="maintitle-3">台股/ETF</span> 
          版部分標的 <br> 完整功能可至官網使用
        </p>
      </h2>
    </div>
    <div class="input-field">
      <div>
        <v-form ref="stockForm" style="width:90%; margin: 0 auto">
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
                :prefix="buy ? '$' : ''"
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
        <div class="d-flex justify-center">
          <v-btn
            class="my-12 rounded-xl"
            color="#7166F9"
            outlined
            width="90%"
            height="5vh"
            style="border: 3px solid #7166F9; background:#E7E5FF"
            large
            depressed
            @click="addStock">
            <span class="text-h3 font-weight-bold">新增標的</span> 
          </v-btn>
        </div>
      </div>
      <div class="d-flex justify-center" style="width:90%; margin:0 auto">
        <v-divider class="mb-16"></v-divider>
      </div>
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
          @click="next"
          :loading="show">
          <span class="text-h3 font-weight-bold">確定</span>
        </v-btn>
      </div>
    </div>

    <!-- popup -->
    <FintechDialog :dialog="deleteDialog"  icon="fas fa-check-circle" dialogContent="標的已新增">
    </FintechDialog>
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
  @media screen and (max-width: 414px) {
    width: 95%;
  }

  .maintitle {
    font-size: 60px;
    margin-bottom:100px;
    line-height: 0.9em;
    &-2 {
      font-size:30px;
      color: #7166F9;
      margin-top:32px;
    }
    &-3 {
      
      background:#7166F9; 
      color:#FFFFFF; 
      padding:0px 13px 5px 14px;
      border-radius: 10px;
    }
  }

  .subtitle {
    font-size: 35px;
    font-weight: bold;
  }
}

::v-deep .v-input input {
  font-weight: 700;
  font-size: 35px;
  max-height: 100px;
  margin-left: 85px;
  color: #4E4E4E !important;   
}

::v-deep .v-input.buy input {
  margin-left: 0px;
}
::v-deep .buy.v-input--is-label-active .v-text-field__prefix {
  display: block;
  font-size: 35px;
  margin-left: 85px;
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

button.mt-16.rounded-xl.v-btn.v-btn--outlined.theme--light.v-size--large {
  background: #E7E5FF;
}

::v-deep .theme--light.v-divider {
  border: 1px solid #7166F9;
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { rules } from '@/utility/utility';
import { stockData } from '@/utility/globalData';

import router from '@/router';

import FintechHeader from '@/components/FintechHeader.vue';
import FintechDialog from '@/components/FintechDialog.vue';
Vue.component('FintechHeader', FintechHeader);
Vue.component('FintechDialog', FintechDialog);


@Component
export default class InputPortfolio extends Vue {
  @Action('loadPortfolio') loadPortfolio!: (stock: any) => void;
  @Getter('getPortfolio') getPortfolio!: any;
  @Getter('getType') getType!: any;

  private show = false;
  private deleteDialog = false;
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
    console.log(this.getStock)
  }

  private back () {
    this.$router.push('./InvestDiagnosis.html');
  }

  private next () {
    router.push('/InputResult');
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
        this.deleteDialog = true;
        setTimeout(() => {
          this.deleteDialog = false;
        }, 1300)
      }
    }
  }
}
</script>
