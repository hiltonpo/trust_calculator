<template>
  <v-row class="mx-0" :class="{'flex-row-reverse': reverse}">
    <v-col cols="12" sm="5">
      <v-row>
        <div class="title-icon mr-4">
          <v-icon class="icon elevation-2 cyan--text text-lighten-3">{{ icon }}</v-icon>
        </div>
        <div>
          <div class="title text-h5">
            {{ title }}
          </div>
          <div class="subtitle text-h6">
            {{ subtitle }}
          </div>
        </div>
      </v-row>
      <v-row>
        <v-col class="pa-0" cols="12">
          <slot></slot>
        </v-col>
      </v-row>
      <v-row>
        <v-btn class="pt-0 white--text mt-8" color="red lighten-2" depressed large rounded @click="btnClick">{{ btnWord }} </v-btn>
      </v-row>
    </v-col>
    <v-col cols="0" sm="1">
    </v-col>
    <v-col cols="12" sm="6">
      <div>
        <v-img height="300px" contain :src="rightImage"></v-img>
      </div>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>

.title-icon
{
  font-size: 30px;
}
.title-icon .icon
{
  margin-left:2px;
  padding: 20px;
  border-radius: 60px;
}

</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class TheoryCard extends Vue {
  @Prop({ default: '' }) icon!: string;
  @Prop({ default: '' }) title!: string;
  @Prop({ default: '' }) subtitle!: string;
  @Prop({ default: '' }) rightImage!: string;
  @Prop({ default: '' }) btnWord!: string;
  @Prop({ default: false }) reverse!: boolean;

  private btnClick () {
    this.$emit('jumpLocation');
  }
}
</script>
