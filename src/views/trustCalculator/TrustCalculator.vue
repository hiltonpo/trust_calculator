<template>
    <v-app>
      <MainTopBar></MainTopBar>
      <v-main >
        <v-container style="padding-top: 100px;">
          <v-row class="graph justify-center pb-10">
            圖表放置處
          </v-row>
          <v-row class="justify pt-10 justify-center">
            <v-col cols="3" class="d-flex justify-end text-h5">
              <span>{{ ageRangeOption.name[0] }}</span>
              <v-text-field
              v-model="input[ageRangeOption.prop][0]"
              class="ml-2 mt-0 pt-0 text-h5"
              hide-details
              single-line
              type="number"
              style="max-width:20%;"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <div class="range-slider">
                <v-range-slider
                v-model="input.ageRange"
                :min="ageRangeOption.min"
                :max="ageRangeOption.max"
                color="blue"
                track-color="grey lighten-2"
                track-fill-color="yellow darken-2"
                >
                </v-range-slider>
              </div>
            </v-col>
            <v-col cols="3" class="d-flex text-h5">
              <span>{{ageRangeOption.name[1]}}</span>
              <v-text-field
              v-model="input[ageRangeOption.prop][1]"
              class="ml-2 mt-0 pt-0 text-h5"
              hide-details
              single-line
              type="number"
              style="max-width:25%;"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify pt-10 justify-center">
            <v-col cols="3" class="d-flex justify-end text-h5">{{ lifeOption.name }}</v-col>
            <v-col cols="6">
              <div class="slider">
                <v-slider
                v-model="input[lifeOption.prop]"
                :max="lifeOption.max"
                :min="lifeOption.min"
                :step="lifeOption.step"
                color="yellow darken-2"
                :rules="[rules.retireAge]"
                >
                </v-slider>
              </div>
            </v-col>
            <v-col cols="3" class="text-h5">
              <span class="font-weight-black">{{ input[lifeOption.prop] }}</span>
              <span class="ml-2">{{ lifeOption.unit }}</span>
            </v-col>
          </v-row>
          <v-row  v-for="(option, index) in options" :key="index" class="justify pt-10 justify-center">
            <v-col cols="3" class="d-flex justify-end text-h5">{{ option.name }}</v-col>
            <v-col cols="6">
              <div class="slider">
                <v-slider
                v-model="input[option.prop]"
                :max="option.max"
                :min="option.min"
                :step="option.step"
                color="yellow darken-2"
                >
                </v-slider>
              </div>
            </v-col>
            <v-col cols="3" class="text-h5">
              <span class="font-weight-black">{{ input[option.prop] }}</span>
              <span class="ml-2">{{ option.unit }}</span>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
</template>

<style lang="scss" scoped>

.container
{
  max-width: 1200px;
  width: 100%;
}
// .v-slider__track-container
::v-deep .v-slider--horizontal .v-slider__track-container {
  height: 12px;
}

::v-deep .v-slider__track-background.grey.lighten-2, ::v-deep .v-slider__track-fill, ::v-deep .v-slider__track-background.primary.lighten-3 {
  border-radius: 45px;
}

::v-deep .v-slider__thumb {
  width: 20px !important;
  height: 20px !important;
}



</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import LineChart from 'echarts/charts'
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
import { barChartOption, orderLineChartOption, portfolioBarChartOption, portfolioLineChartOption } from '@/views/trustCalculator/echartsOptions';
import { Action } from 'vuex-class';

echarts.use([DatasetComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, CanvasRenderer]);

@Component({
  data() {
    return {

    }
  },
  computed: {

  }
})
export default class TrustCalculator extends Vue {

// 固定內建參數
  public constant = {
    Rgood: 0.08,  // 較好投報率
    Rnormal: 0.05,  // 一般投報率
    Rpoor: 0.03,  // 較差投報率
    Rinflation: 0.02,  // 通膨率
    Rdeposit: 0.01,  // 定存利率
  }
  
// 輸入參數 (給予初始預設值)
  public input = {
    ageRange:[40, 65],
    lifeAge: 90,
    invMoney: 30, // 萬
    regMoney: 3000,
    deposit: 200, // 萬
    retireMoney: 30000
  }

// 調整器設置
  // 現齡與退休年齡
  private ageRangeOption = {
    name: ['現在年齡', '退休年齡'],
    min: 18,
    max: 90,
    prop:['ageRange']
  }

  // 預期壽命
  private lifeOption = {
    name: '預期壽命',
    prop: 'lifeAge',  
    max: 90,
    min: 0,
    unit: '歲',
    step: 1
  }
  // 單、定、退休提領、定存金額
  private options = [
    {
      name: '單筆投入金額金額',
      prop: 'invMoney',
      max: 100,
      min: 0,
      unit: '萬',
      step: 1
    },
    {
      name: '定期定額投入金額',
      prop: 'regMoney', 
      max: 100000,
      min: 0,
      unit: '元',
      step: 100
    },
    {
      name: '退休後每月提領金額',
      prop: 'retireMoney',  
      max: 100000,
      min: 0,
      unit: '元',
      step: 100
    },
    { 
      name: '其他退休金準備(定存)',
      prop: 'deposit',  
      max: 1000,
      min: 0,
      unit: '萬', 
      step: 1
    }
  ]

  private rules = {
    retireAge: (value: any) => {
      return !(value < this.input.ageRange[1]) || '不得小於退休年齡';
    }
  }
  

  private updated() {
    console.log(this.input)
  }

}
</script>
