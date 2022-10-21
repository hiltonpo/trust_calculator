<template>
  <div class="app pa-5">
    <div class="header d-flex justify-space-between align-center">
      <v-img src="../../assets/img/finTech/logo_header_left.png" max-width="250" contain/>
      <v-img src="../../assets/img/investDiagnosis/coverLogo.png" max-width="210" contain/>
      <div class="header__space"></div>
    </div>
    <div class="main">
      <div class="main__title white--text">選擇要健檢的投資組合</div>
      <div class="btnGroup d-flex flex-wrap justify-center">
        <div class="btnGroup__btn d-flex flex-column justify-center align-center" tabindex="0" @click="clickYahoo">
          <v-img src="../../assets/img/finTech/tw.png" max-height="220" contain/>
          <div class="d-flex flex-column align-center mt-5">
            <span>Yahoo 股市熱門</span>
            <span>台股組合</span>
          </div>
        </div>
        <div class="btnGroup__btn d-flex flex-column justify-center align-center" tabindex="0" @click="clickFund">
          <v-img src="../../assets/img/finTech/fund.png" max-height="220" contain/>
          <div class="d-flex flex-column align-center mt-5">
            <span>台灣人最愛</span>
            <span>基金組合</span>
          </div>
        </div>
        <div class="btnGroup__btn d-flex flex-column justify-center align-center" tabindex="0" @click="clickUS">
          <v-img src="../../assets/img/finTech/na.png" max-height="220" contain/>
          <div class="d-flex flex-column align-center mt-5">
            <span>精選外國標的</span>
            <span>美股組合</span>
          </div>
        </div>
        <!-- onclick="location.href=''" -->
        <div class="btnGroup__btn d-flex flex-column justify-center align-center" tabindex="0" @click="clickOption">
          <v-img src="../../assets/img/finTech/self.png" max-height="220" contain/>
          <div class="d-flex flex-column align-center mt-5">
            <span>我有自己想法</span>
            <span>體驗自選組合</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer d-flex justify-center">
      <v-btn class="footer__btn" height="100px" width="350px" @click="" outlined rounded>
        返回
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  height: 100%;
  width: 100%;
  background-image: url("../../assets/img/finTech/bg_home.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.header{
  &__space{
    width: 250px;
  }
}
.main{
  margin: 90px 0;
  &__title{
    font-size: 60px;
    text-align: center;
    font: normal normal bold 60px/69px Noto Sans TC;
  }
  .btnGroup{
    margin-top: 70px;
    
    &__btn{
      cursor: pointer;
      height: 560px;
      width: 450px;
      margin: 30px;
      font-size: 44px;
      color: white;
      background: #00000029 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      border: 8px solid #FFFFFF;
      border-radius: 25px;
      transition: all .3s linear;
    }
    &__btn:hover{
      background: #fff;
      color: #000;
    }
  }
}
.footer{
  &__btn{
    position: relative;
    font-size: 44px;
    color: white;
    background: rgb(255,255,255,0.14);
    transition: all .3s linear;
    &:hover{
      background: #fff;
      color: #000;
      opacity: 1;
    }
  }
  
}
</style>

<script lang="ts">
import { forEach } from "lodash-es";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, Getter, Mutation } from "vuex-class";
import { getCookie, removeCookie, rules, setCookie } from "@/utility/utility";
import { stockData, optionHealthCheck } from "@/utility/globalData";
import router from "@/router";

@Component
export default class ChoosePortfolio extends Vue {
  private CommitSettype(type: string){
    this.$store.commit('setType', type);
  }

  public clickYahoo(){
    this.CommitSettype('yahoo');
    console.log(this.$store.getters.getType);
  }

  public clickFund(){
    this.CommitSettype('fund');
  }

  public clickUS(){
    this.CommitSettype('US');
  }

  public clickOption(){
    this.CommitSettype('option');
  }

  public clickReturn(){
    console.log('back');
  }
}
</script>
