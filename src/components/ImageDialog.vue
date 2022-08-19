<template>
  <div>
    <v-dialog v-model="show" max-width="800">
      <div class="white position-relative pa-0">
        <div class="dialog-close position-absolute">
          <v-icon @click="close" :color="closeColor">fas fa-times-circle</v-icon>
        </div>
        <div class="text-h5 text-center">
            <a :href="href" target="_blank"><v-img :src="img"></v-img></a>
        </div>
        <div class="text-h5 text-center" v-if="img2!==''">
            <a :href="href2" target="_blank"><v-img :src="img2"></v-img></a>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .dialog-close {
    top: 15px;
    right: 15px;
    z-index: 999;
  }
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CommonDialog extends Vue {
  @Prop({ default: () => '' }) img!: string;
  @Prop({ default: () => '' }) img2!: string;
  @Prop({ default: () => '' }) href!: string;
  @Prop({ default: () => '' }) href2!: string;
  @Prop({ default: () => 'grey' }) closeColor!: string;

  private show = true;

  private showDialog () {
    this.show = true;
  }

  private correct () {
    this.$emit('correct');
    this.close();
  }

  private close () {
    this.show = false;
  }
}
</script>
