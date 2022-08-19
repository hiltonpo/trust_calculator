<template>
  <div class="mb-6">
    <v-chip class="cyan--text text--darken-1 mt-4 mb-4" color="cyan lighten-4">
      <span class="font-weight-medium chip px-3">{{ chip }}</span>
    </v-chip>
    <br/>
    <span class="text-h4" v-html="title"></span>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ChipTitle extends Vue {
  @Prop({ default: '' }) chip!: string;
  @Prop({ default: '' }) title!: string;
}
</script>
