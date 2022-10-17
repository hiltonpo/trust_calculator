<template>
  <v-dialog v-model="show" :width="width">
    <div class="white position-relative">
      <div class="dialog-close position-absolute">
        <v-icon @click="cancel" color="white" large>far fa-times-circle</v-icon>
      </div>
      <v-card-title class="white--text d-flex justify-center text-h6 cyan">
        {{ title }}
      </v-card-title>
      <v-card-text class="font-weight-medium pa-4 text-center text-h6">
        {{ text }}
        <!-- 因為登入提示框的內容有html格式，這裡要用v-html，避免此方式影響到其他網頁所以多創一個div做使用 -->
        <div v-html="textForLogin"></div>
        <div v-if="alert!==''"
          class="w-100 red--text text--lighten-2 font-weight-bold text-body-1 pt-4 text-center">
          <v-icon class="mr-1" x-small color="red lighten-2">fas fa-exclamation-triangle</v-icon>{{ alert }}
        </div>
      </v-card-text>
      <!-- 示意圖片 -->
      <v-img
        v-if="imgShow"
        :src="imgSrc"
        width="90%"
        justify-center
        ></v-img>
      <!-- 是或否 -->
      <v-row v-if="YesOrNo" class="justify-center mx-0 pb-3">
        <v-col sm="3" cols="4">
          <v-btn class="white--text" rounded color="cyan" width="100%" @click="correct" large>是</v-btn>
        </v-col>
        <v-col sm="3" cols="4">
          <v-btn class="cyan--text" outlined rounded  @click="cancel" width="100%" large>否</v-btn>
        </v-col>
      </v-row>
      <!-- 執行下個動作 -->
      <v-row v-if="!YesOrNo" class="justify-center mx-0 pb-3">
        <v-col sm="3" cols="3">
          <v-btn class="white--text" rounded color="cyan" width="100%" @click="correct" large>{{ nextBtnText }}</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-dialog>
</template>

<style lang="scss" scoped>
.col-3 {
  max-width: 100%;
}
::v-deep.v-responsive{
  margin: 0 auto;
}
::v-deep.v-responsive{
  margin: 0 auto;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CommonDialog extends Vue {
  @Prop({ default: () => '確認執行' }) title!: string;
  @Prop({ default: () => '' }) text?: string;
  @Prop({ default: () => '' }) textForLogin?: string;
  @Prop({ default: () => '' }) alert!: string;
  @Prop({ default: () => 600 }) width?: string;
  @Prop({ default: () => true }) YesOrNo?: boolean;
  @Prop({ default: () => '下一步' }) nextBtnText?: string;
  @Prop({ default: () => false }) imgShow?: boolean;
  @Prop({ default: () => '' }) imgSrc?: string;

  private show = false;

  private showDialog () {
    this.show = true;
  }

  private correct () {
    this.$emit('correct');
    this.cancel();
  }

  private cancel () {
    this.$emit('cancel');
    this.show = false;
  }
}
</script>
