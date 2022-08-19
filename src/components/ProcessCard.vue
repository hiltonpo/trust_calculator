<template>
  <div class="process-card elevation-2 pa-5">
    <div class="number">
      <img :src="numberIcon" />
    </div>
    <div class="icon">
      <img :src="icon" />
    </div>
    <div class="title">
      {{ title }}
    </div>
    <div class="content grey--text">
      {{ content }}
    </div>
  </div>
</template>

<style lang="scss" scoped>

.process-card
{
  background: #fff;
  width: 100%;
  height: 100%;
}

.number img , .icon img
{
  margin: 0 auto;
  display: block;
}

.title , .content
{
  text-align: center;
}

</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ProcessCard extends Vue {
  @Prop({ default: '' }) numberIcon!: string;
  @Prop({ default: '' }) icon!: string;
  @Prop({ default: '' }) title!: string;
  @Prop({ default: '' }) content!: string;
}
</script>
