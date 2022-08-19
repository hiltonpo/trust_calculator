<template>

  <v-row>
    <v-col cols="12" sm="5" class="px-5">
      <ChipTitle :chip="stepName" :title="title"></ChipTitle>
      <div class="content mb-8">
        {{ content }}
      </div>
      <v-divider></v-divider>
      <div class="left-img mt-3">
        <img :src="leftImage">
      </div>
      <v-btn class="white--text mt-4" color="red lighten-2" depressed large rounded v-show="showBtn" @click="btnClick">
        {{ $t('createGoal')}}
      </v-btn>
    </v-col>
    <v-col cols="12" sm="7" class="d-flex align-center px-5 px-sm-8">
      <v-img class="elevation-2" :src="rightImage"></v-img>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>

.chip
{
  display: table;
  padding:5px 10px;
  border-radius: 30px;
}

.left-img img
{
  width: 90%;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ProcessStep extends Vue {
  @Prop({ default: false }) showBtn!: boolean;
  @Prop({ default: '' }) stepName!: string;
  @Prop({ default: '' }) title!: string;
  @Prop({ default: '' }) content!: string;
  @Prop({ default: '' }) leftImage!: string;
  @Prop({ default: '' }) rightImage!: string;

  public btnClick () {
    this.$emit('jumpLocation');
  }
}
</script>
