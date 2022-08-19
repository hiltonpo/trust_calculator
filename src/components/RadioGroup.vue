<template>
  <div>
    <div class="block">
        <div class="block-name">{{ radioName }}</div>
        <div class="radio-option">
          <div v-for="(name , index) in options" :key="index">
            <input type="radio" :id="name + index" :name="radioName" :value="name" v-model="choose">
            <label :for="name + index">{{ name }}</label>
          </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.block
{
  width: 100%;
  display: flex;
  padding: 20px 0;
}
.block-name
{
  width:120px;
  margin-left:20px;
}
.radio-option
{
  width:150px;
  margin-left:20px;
  display: flex;
  flex-wrap: wrap;
}
input[type="radio"] {
  margin:0 10px;
  border: 1px solid #000;
}
</style>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class RadioGroup extends Vue {
  @Prop({ default: '' }) radioName!: string;
  @Prop({ default: [] }) options!: string[];
  private choose = '';

  @Watch('choose')
  private change () {
    this.$emit('change', this.choose);
  }
}
</script>
