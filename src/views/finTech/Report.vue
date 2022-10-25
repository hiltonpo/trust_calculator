<template>
  <div class="main grey lighten-4 h-100">
    <header class="d-flex align-center justify-center position-relative overflow-hidden position-fixed">
      <section class="black star"><div class="position-absolute space"></div></section>
      <div class="d-flex avatar">
        <v-img :src="headerImg" width="100vw" contain></v-img>
      </div>
    </header>
    <section class="my-6">
      <!-- <v-img class="report" :src="reportA1" width="100vw" contain></v-img> -->
      <v-img class="report" :src="getReportImg" width="100vw" contain></v-img>
      <v-img class="mx-auto mt-6 mb-12" :src="sloganImg" width="60vw" contain></v-img>
    </section>
    <div>
      <router-link to="/">
        <v-btn class="login-box text-h3 font-weight-bold white--text d-flex align-center pb-2 mx-auto mb-16" height="6vh" width="40vw" rounded>
          <span>完成</span>
        </v-btn>
      </router-link>
    </div>
    <div class="w-100" @click="scrollToSmooth(0, 0)">
      <div class="rounded-circle top position-fixed d-flex align-center justify-center" :class="[ showTop ? 'show' : '' ]">
        <v-icon color="white">fas fa-location-arrow</v-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@keyframes spin {

  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes shine {

  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

/* Space */
.star {
  animation: shine 1s linear infinite;
}
.space {
  position: absolute;
  width: 100vw;
  height: 100vw;
  top: -40vw;
  left: 0;
  background-size: contain;
  animation: spin 60s linear infinite;
  transform-origin: center center;

  /* Had to base64 SVG background for FF compatibility */
  background-image: url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI0MCAyNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0MCAyNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxyZWN0IHg9IjEwNiIgeT0iOTAiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz48cmVjdCB4PSI3NCIgeT0iNjMiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIyMyIgeT0iNjYiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSI1MCIgeT0iMTEwIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iNjMiIHk9IjEyOCIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjxyZWN0IHg9IjQ1IiB5PSIxNDkiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSI5MiIgeT0iMTUxIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iNTgiIHk9IjgiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIxNDciIHk9IjMzIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIi8+PHJlY3QgeD0iOTEiIHk9IjQzIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iMTY5IiB5PSIyOSIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjxyZWN0IHg9IjE4MiIgeT0iMTkiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIxNjEiIHk9IjU5IiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iMTM4IiB5PSI5NSIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjxyZWN0IHg9IjE5OSIgeT0iNzEiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiLz48cmVjdCB4PSIyMTMiIHk9IjE1MyIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPjxyZWN0IHg9IjEyOCIgeT0iMTYzIiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIi8+PHJlY3QgeD0iMjA1IiB5PSIxNzQiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIxNTIiIHk9IjIwMCIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjxyZWN0IHg9IjUyIiB5PSIyMTEiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz48cmVjdCB5PSIxOTEiIGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48cmVjdCB4PSIxMTAiIHk9IjE4NCIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjEiIGhlaWdodD0iMSIvPjwvc3ZnPg==);
}

@keyframes scaleUp {
  0% {
    transform: scale(.96);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(.96);
  }
}
.avatar {
  animation-name: scaleUp;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
}
.main {
  min-height: 100vh;
}

header {
  height: 10vh;
  background: url(~@/assets/img/finTech/header_bg_p3.png);
  background-size: cover;
  top: 0;
  left: 0;
  z-index: 3;
}

.report {
  margin-top: 11vh;
}

.login-box {
  background: linear-gradient(90deg, #E07CFE 0%, #7166F9 100%);
  animation: btn-anim1 1s linear infinite;
  span {
    text-shadow: 3px 5px 8px  rgba(0, 0, 0, .6);
  }
}
$--base: 7vw;
.top {
  background: #7166F9;
  width: $--base;
  height: $--base;
  bottom: 1vh;
  right: 1vh;
  opacity: 0;
  transition: all .3s;
  i {
    transform: rotate(-45deg) scale(1.4);
  }

  &.show {
    opacity: 1;
  }
}

</style>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';

import { rules } from '@/utility/utility';
import { stockData, lunchBoxType, resultType } from '@/utility/globalData';
import router from '@/router';
import { filter } from 'lodash-es';

import FintechHeader from '@/components/FintechHeader.vue';
import FintechDialog from '@/components/FintechDialog.vue';

Vue.component('FintechHeader', FintechHeader);
Vue.component('FintechDialog', FintechDialog);

@Component({
  data () {
    return {
      headerImg: require('@/assets/img/finTech/report_header.png'),
      A1: require('@/assets/img/finTech/report/A1.png'),
      A2: require('@/assets/img/finTech/report/A2.png'),
      A3: require('@/assets/img/finTech/report/A3.png'),
      A4: require('@/assets/img/finTech/report/A4.png'),
      A5: require('@/assets/img/finTech/report/A5.png'),
      A6: require('@/assets/img/finTech/report/A6.png'),
      A7: require('@/assets/img/finTech/report/A7.png'),
      A8: require('@/assets/img/finTech/report/A8.png'),
      A9: require('@/assets/img/finTech/report/A9.png'),
      A10: require('@/assets/img/finTech/report/A10.png'),
      sloganImg: require('@/assets/img/finTech/report/full-service.jpg')
    };
  }
})
export default class Report extends Vue {
  @Getter('getResultType') getResultType!: string;
  private distance = 0;
  private fullDistance = 0;
  private getReportImg: any = null;

  private getScrollDistance () {
    this.distance = document.documentElement.scrollTop;
  }

  private mounted () {
    this.getReportImg = (this as any)[this.getResultType || 'A1'];
    const body = document.documentElement;
    this.fullDistance = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      body.clientHeight,
      body.scrollHeight,
      body.offsetHeight
    );
    window.addEventListener('scroll', this.getScrollDistance);
  }

  private scrollToSmooth (top: number, left: number) {
    window.scrollTo({
      top,
      left,
      behavior: 'smooth'
    });
  }

  get showTop () {
    return (this.distance / this.fullDistance) > 0.15;
  }
}
</script>
