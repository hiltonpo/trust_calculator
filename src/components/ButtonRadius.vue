<template>
  <div>
    <div class="block" @click="buttonClick">
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.block
{
  background: #0B6CDB;
  width: 100%;
  border-radius: 13px;
  height:55px;
  color: #fff;
  text-align: center;
  line-height: 55px;
  cursor: pointer;
}

</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ButtonRadius extends Vue {
  @Prop({ default: '' }) text!: string;

  private buttonClick () {
    this.$emit('clickEvent');
  }
}
</script>
