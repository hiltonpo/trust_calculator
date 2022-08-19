<template>
  <div class="icon">
    <v-img :src="img">
    </v-img>
  </div>
</template>

<style lang="scss" scoped>

.icon
{
  width: 100%;
  height: 100%;
}

</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class IconImg extends Vue {
  @Prop({ default: '' }) img!: string;
}
</script>
