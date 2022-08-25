<template>
  <div :id="chartID" style="width: 100%; height: 450px;"></div>
</template>

<style lang="scss" scoped>
#lineChart {
  width: 100%;
  height: 430px;
  @media screen and (max-width: 960px) {
    height: 400px;
  }
}
</style>

<script lang="ts">
// import * as echarts from 'echarts';
import * as echarts from 'echarts/core';
import { assign, forEach } from 'lodash-es';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// import mpDefault from '@/assets/img/mp00.svg';
// import iconRetire from '@/assets/img/plane-solid.svg';
import { initEchartsWhenMounted, renderEchartsDom } from '@/utility/utility';

@Component
export default class LineChart extends Vue {
  @Prop({ default: () => { return {}; } }) lineChartOption!: any;
  @Prop({ default: 0 }) tabCarousel!: any;
  @Prop({ default: '' }) chartID!: any;

  private lineChart: any;
  private iconRetireSVG = iconRetire;
  private mpDefaultSVG = mpDefault;

  private option = {};

  public drawLineChart () {
    this.option = this.lineChartOption;
    renderEchartsDom(this.lineChart, this.option);
    if (this.$route.path === '/Overview.html') {
      forEach(['click', 'mouseover'], (event: string) => {
        this.lineChart.on(event, (params: any) => {
          if (params.componentType === 'markPoint') {
            this.markpointPID(params.data.PID);
          }
        });
      });
    }
  }

  private markpointPID (PID: string) {
    this.$emit('markpointPID', PID);
  }

  public mounted () {
    this.lineChart = initEchartsWhenMounted(this.chartID);
  }

  @Watch('lineChartOption')
  public reRender () {
    setTimeout(() => {
      this.drawLineChart();
      this.lineChart.resize();
      window.addEventListener('onresize', this.lineChart.resize());
    }, 30);
  }
}
</script>
