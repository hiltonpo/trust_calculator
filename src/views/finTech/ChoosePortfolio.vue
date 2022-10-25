<template>
  <div class="app pa-5">
    <div class="header d-flex justify-space-between align-center">
      <v-img class="avatar" src="../../assets/img/finTech/logo_header_left.png" max-width="250" contain/>
      <v-img src="../../assets/img/investDiagnosis/coverLogo.png" max-width="210" contain/>
      <div class="header__space"></div>
    </div>
    <div class="main">
      <div class="main__title white--text">選擇要健檢的投資組合</div>
      <div class="btnGroup d-flex flex-wrap justify-center">
        <div v-for="(button, index) in typeRoot" :key="index"
          :class="[ shineIndex === index ? `active`: ``]"
          class="btnGroup__btn d-flex flex-column justify-center align-center" tabindex="0" @click="clickType(button.type), shineIndex = index">
          <v-img :src="button.img" max-height="220" contain/>
          <div class="d-flex flex-column align-center mt-5">
            <span>{{ button.title }}</span>
            <span>{{ button.summary }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer d-flex justify-center">
      <router-link to="/">
        <v-btn class="footer__btn" height="100px" width="350px" outlined rounded>
          返回
        </v-btn>
      </router-link>

    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep {
  --move-height: -5px;
  --move-speed: .8s;
}
@import url(~@/styles/fintech.scss);
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
      opacity: .6;
      transition: all .3s linear;
      transform: scale(0.96);
    }
    &__btn:hover{
      background: #fff;
      color: #000;
      transform: scale(1);
    }
    &__btn.active{
      box-shadow: 3vw 3vw 5vw rgba(0, 0, 0, 0.719);
      transform: scale(1);
      opacity: 1;
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
import { forEach, findKey } from 'lodash-es';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';
import { typeRoot } from '@/utility/globalData';
import router from '@/router';
import imgYahoo from '@/assets/img/finTech/tw.png';
import imgFund from '@/assets/img/finTech/fund.png';
import imgUS from '@/assets/img/finTech/na.png';
import imgOption from '@/assets/img/finTech/self.png';

@Component
export default class ChoosePortfolio extends Vue {
  @Mutation('setType') setType!: (type: any) => void;
  @Getter('getType') getType!: any;

  private imgYahoo = imgYahoo;
  private imgFund = imgFund;
  private imgUS = imgUS;
  private imgOption = imgOption;
  private shineIndex = 0;
  private counter: any = null;

  private typeRoot = typeRoot;

  private created () {
    this.shineIndex = this.getIndex(this.getType || 0);
  }

  private mounted () {
    this.counter = setInterval(() => {
      this.shineIndex < (this.typeRoot.length - 1) ? this.shineIndex++ : this.shineIndex = 0;
    }, 1300);
  }

  private getIndex (type: string) {
    const types = {
      0: 'yahoo', 1: 'fund', 2: 'US', 3: 'option'
    };
    return Number(findKey(types, (item: any) => item === type));
  }

  private CommitSettype (type: string) {
    this.setType(type);
    if (type === 'option') {
      this.$router.push('/InputPortfolio');
    } else {
      this.$router.push('/InputResult');
    }
  }

  public clickType (type: string) {
    this.CommitSettype(type);
    // console.log(this.$store.getters.getType);
  }

  public clickReturn () {
    console.log('back');
  }

  private destroyed () {
    clearInterval(this.counter);
  }
}
</script>
