<template>
  <div v-show="show" class="fixed-promo justify-end align-end pointer-events-none"
    :class="[ show ? 'd-flex' : '' ]"
    :style="`bottom: ${bottom}; right: ${right};`">
    <section class="normal scale-smaller-1 mb-sm-16 pb-md-3 mx-2" style="transform-origin: right bottom; pointer-events: auto;">
      <div class="d-flex justify-end cursor-pointer" @click="hideFixedButton">
        <v-icon large>fas fa-times-circle</v-icon>
      </div>
      <!-- 當頁面是Yahoo投資健檢介紹頁時候，連結更改 ABtest取消 -->
      <div class="mt-1 d-flex justify-end">
        <a :href="href" target="_blank">
          <v-btn class="white--text text-h6 pa-0" color="#BE0000" style="height: 60px">了解 <br> 更多</v-btn>
        </a>
      </div>
    </section>
    <!-- 客製化手機板 -->
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .fixed-promo {
    position: fixed;
    z-index: 200;
    width: 100vw;
    // height: 100vh;
    right: 0;
    top: 100vh;
    // @media screen and (max-width: 768px) {
    //   width: 25vw;
    //   right: -15px;
    // }
    section {
      &.normal { // 手機電腦同一張圖
        width: 20vmin;
        @media screen and (max-width: 796px) {
          width: 15vmax;
        }
        @media screen and (max-width: 600px) {
          width: 100px;
        }
      }
    }
  }
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FixedButton extends Vue {
  @Prop({ default: '24px' }) size?: string;
  @Prop({ default: '' }) imgSrc!: string;
  @Prop({ default: '8vh' }) bottom?: string;
  @Prop({ default: '0' }) right?: string;
  @Prop({ default: '' }) href?: string;

  private show = true;
  private hideFixedButton () {
    this.show = false;
  }
}
</script>
