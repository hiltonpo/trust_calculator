<template>
  <v-app>
    <v-main>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TrustCalculator from '@/views/trustCalculator/TrustCalculator.vue';

Vue.component('TrustCalculator', TrustCalculator);

@Component
export default class App extends Vue {

}
</script>
