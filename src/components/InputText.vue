<template>
  <div>
    <div class="block">
      <div class="icon">
        <div>
          <IconImg :img="image"></IconImg>
        </div>
      </div>
      <input class="input-text" type="text" v-model="text" :placeHolder="placeHolder" />
      <div class="tailText"> {{ tailText }} </div>
    </div>
    <div class="alert-text" v-if = "!correct" >
      {{ $t('formatError') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>

.block
{
  position: relative;
  background: #F0F4F8;
  width: 100%;
  display: flex;
}

.icon
{
  width:50px;
  height:60px;
}

.icon div
{
  position: relative;
  top:50%;
  transform:translateY(-50%);
  width:20px;
  height:20px;
  margin: 0 auto;
  display: block;
}

.input-text
{
  width: 244px;
  height: 60px;
  padding: 10px 10px;
  font-size: 12pt;
}

.tailText
{
  position: absolute;
  right:10px;
  margin-top: 22px;
  font-size: 10px;
}

.alert-text
{
  margin-left: 60px;
  color: #EF5350;
}
</style>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class InputText extends Vue {
  @Prop({ default: '' }) image!: string;
  @Prop({ default: '' }) placeHolder!: string;
  @Prop({ default: '' }) tailText!: string;
  @Prop({ default: 'text' }) inputCheckType!: string;
  @Prop({ default: () => [3000, 20000] }) moneyCheck!: number[];

  // phone
  private text = '';
  private correct = true;

  @Watch('text')
  private textChange (): void {
    if (this.check()) {
      this.$emit('textChange', this.text);
    } else {
      this.$emit('textChange', '');
    }
  }

  private check (): boolean {
    if (this.inputCheckType === 'phone') { // 電話檢查
      const patt = /[0][9][0-9]{8}/g;
      this.correct = patt.test(this.text) && this.text.length === 10;
    } else if (this.inputCheckType === 'money') { // 金額大小檢查
      const money = Number(this.text);
      this.correct = !(money < this.moneyCheck[0] || money > this.moneyCheck[1] || isNaN(money));
    } else if (this.inputCheckType === 'email') { // email 格式檢查
      const patt = new RegExp('^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z]+$', 'g');
      this.correct = patt.test(this.text);
    }

    return this.correct;
  }
}
</script>
