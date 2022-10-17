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
                    :items="getStockTW">
                  </v-autocomplete>
                </td>
                <td v-else class="text-left"><i class="fas fa-square pink--text text--lighten-2 mr-2"></i>{{ value.id }}</td>

                <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-center">
                  <v-text-field v-model="value.buy"></v-text-field>
                </td>
                <td v-else class="text-center">{{ value.buy }}／新台幣</td>

                <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-center">
                  <v-text-field v-model="value.reserve"></v-text-field>
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
              class="white pink--text text--lighten-2"
              x-small
              depressed
              @click="autoSelect(0)">
              <i class="fas fa-plus"> 新增</i>
            </v-btn>
          </template>
        </v-simple-table>
      </v-form>
    </div>

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
                  股數
                </th>
                <th class="text-center">
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value , key) in getPortfolioFund" :key="key" class="amber lighten-5">
                <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-left">
                  <v-autocomplete
                    :rules="inputRule.id"
                    v-model="value.id"
                    :items="getFunds">
                    {{ value.id }}
                  </v-autocomplete>
                </td>
                <td v-else class="text-left"><i class="fas fa-square mr-2 amber--text text--accent-3"></i>{{ value.id }}</td>

                <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-center">
                  <v-text-field v-model="value.buy"></v-text-field>
                </td>
                <td v-else class="text-center">{{ value.buy }}／{{ value.currency }}</td>

                <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-center">
                  <v-text-field v-model="value.reserve"></v-text-field>
                </td>
                <td v-else class="text-center">{{ value.reserve }}</td>
                <td class="text-center">
                  <v-btn
                    :disabled="uniqle()"
                    v-show="(updateModeId.index !== key) || (updateModeId.type !== value.type) "
                    class="white"
                    x-small
                    depressed
                    @click="del({id: value.id, type: value.type})">
                    <i class="fas fa-minus"></i>
                  </v-btn>
                  &emsp;
                  <v-btn
                    :disabled="uniqle()"
                    v-show="(updateModeId.index !== key) || (updateModeId.type !== value.type) "
                    class="white"
                    x-small
                    depressed
                    @click.stop="updateMode(key, value.type, value.id)">
                    <i class="fas fa-pen"></i>
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
              class="white amber--text text--accent-3"
              x-small
              depressed
              @click="autoSelect(1)">
              <i class="fas fa-plus"> 新增</i>
            </v-btn>
          </template>
        </v-simple-table>
      </v-form>
    </div>

    <p class="text-h6 green--text text--darken-1 mb-1">
      美股
    </p>
    <div>
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
                <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-left">
                  <v-autocomplete
                    :rules="inputRule.id"
                    v-model="value.id"
                    :items="getStockUSA">
                  </v-autocomplete>
                </td>
                <td v-else class="text-left"><i class="fas fa-square mr-2 green--text text--darken-1"></i>{{ value.id }}</td>
                <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-center">
                  <v-text-field v-model="value.buy"></v-text-field>
                </td>
                <td v-else class="text-center">{{ value.buy }}／美元</td>
                <td v-if="(updateModeId.index === key) && (updateModeId.type === value.type)" class="text-center">
                  <v-text-field v-model="value.reserve"></v-text-field>
                </td>
                <td v-else class="text-center">{{ value.reserve }}</td>
                <td class="text-center">
                  <v-btn
                    :disabled="uniqle()"
                    v-show="(updateModeId.index !== key) || (updateModeId.type !== value.type) "
                    class="white"
                    x-small
                    depressed
                    @click="del({id: value.id , type: value.type})">
                    <i class="fas fa-minus"></i>
                  </v-btn>
                  &emsp;
                  <v-btn
                    :disabled="uniqle()"
                    v-show="(updateModeId.index !== key) || (updateModeId.type !== value.type) "
                    class="white"
                    x-small
                    depressed
                    >
                    <i class="fas fa-pen"></i>
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
              class="white green--text text--darken-1"
              x-small
              depressed
              @click="autoSelect(2)">
              <i class="fas fa-plus"> 新增</i>
            </v-btn>
          </template>
        </v-simple-table>
      </v-form>
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
    <div class="d-flex align-center justify-end mt-16 mb-4 position-relative" style="z-index: 2">
      <!-- <v-checkbox v-model="agree" color="cyan"></v-checkbox>
      <label class="text-subtitle-2">我已閱讀並同意</label>
      <v-btn
        class="white--text text-subtitle-2 ml-3"
        rounded depressed outlined color="cyan"
        href="./Terms.html" target="_blank"
      >
        使用者條款
      </v-btn> -->

      <!-- 刪掉全部投組 垃圾桶 -->
      <v-btn
        class="pa-0 position-relative" style="min-width: auto; z-index: 1"
        small
        depressed
        color="white"
        @click="showDialog('clearAllPortfolio')">
        <v-icon color="grey darken-1">fas fa-trash</v-icon>
      </v-btn>

      <!-- <span class="cursor: pointer;" @click="showDialog('clearAllPortfolio')">
        <i class="fas fa-trash" style="transform: scale(1.5); margin-bottom:10px"></i>
      </span> -->
      <CommonDialog
      ref="clearAllPortfolio"
      title="提醒"
      :YesOrNo="false"
      :text="'確定要刪除全部標的嗎？'"
      nextBtnText="全部刪除"
      @correct="clearAllPortfolio"
      >
      </CommonDialog>
    </div>
    <v-btn
      class="white--text mt-2"
      color="cyan lighten-2"
      width="100%"
      large
      depressed
      :disabled="permission()"
     
      :loading="show">
      確認送出
    </v-btn>
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

@Component
export default class InputResult extends Vue {
  @Action('delAllPortfolio') delAllPortfolio!: () => void;

  @Getter('getPortfolioAll') getPortfolioAll!: any;
  @Getter('getPortfolioStock') getPortfolioStock!: any;
  @Getter('getPortfolioFund') getPortfolioFund!: any;
  @Getter('getPortfolioStockUSA') getPortfolioStockUSA!: any;
  @Getter('getPortfolioLength') getPortfolioLength!: any;

  private AnalysisState = false;
  private show = false;
  private updateModeId = {
    index: null,
    type: null,
    id: null
  };

  // 刪除所有標的
  private clearAllPortfolio () {
    this.delAllPortfolio();
  }
  
  // 開始健檢disabled condition
  private permission () {
    if (this.getPortfolioLength !== 0  && !this.updateModeId.id) {
      return false;
    } else {
      return true;
    }
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
    console.log(this.getPortfolioAll)
  }
}
</script>
