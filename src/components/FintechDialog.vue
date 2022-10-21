<template>
  <v-dialog v-model="show" max-width="60vw">
    <div class="dialog">
      <v-card class="text-center white py-3 position-relative deep-purple lighten-5">
        <!-- <v-icon
          color="grey lighten-1"
          style="position:absolute; top: 12px; right: 12px;"
          @click="deleteDialog = false" large
        >
          fas fa-times-circle
        </v-icon> -->
        <v-card-text class="pa-0 py-6 ">
          <div class="text-h6 font-weight-bold pa-4 d-flex justify-center">
            <v-icon class="mr-3" color="#7166F9" x-large>{{ icon }}</v-icon>
            <span class="text-h3 font-weight-bold black--text">{{ dialogContent }}</span>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-dialog>
</template>

<style lang="scss" scoped>
.dialog {
  border: 5px solid #7166F9 !important;
}

.v-dialog__content {
  // align-items: flex-start;
  padding: 8.8vh 0;
}

::v-deep .v-dialog__content {
  padding: 10vh;
}
</style>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class FintechDialog extends Vue {
  @Prop({ default: false }) dialog!: boolean;
  @Prop({ default: 'dialog 內容' }) dialogContent!: string;
  @Prop({ default: 'fas fa-check-circle' }) icon!: string;

  private show = false;

  @Watch('dialog')
  private switchDialog () {
    this.show = this.dialog;
  }
}
</script>
