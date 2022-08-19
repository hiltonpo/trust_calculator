<template>
  <div>
    <div :id="id" :style="{'height': height}">
    </div>
  </div>
</template>

<style lang="scss" scoped>

#line-Chart
{
  width: 100%;
}
</style>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { assign } from 'lodash-es';
import * as echarts from 'echarts/core';
import {
  GridComponent
} from 'echarts/components';
import {
  LineChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';

echarts.use(
  [GridComponent, LineChart, CanvasRenderer]
);
@Component
export default class LineChartComponent extends Vue {
  @Prop() id!: string;
  @Prop() height!: string;
  @Prop({ default: {} }) option!: any;

  private canvas: any = '';

  private mounted () {
    const ele = document.getElementById(this.id);
    this.canvas = echarts.init(ele as HTMLCanvasElement);
    this.renderGraph();
  }

  public resize () {
    this.canvas.resize();
  }

  private renderGraph () {
    const graph = assign({
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [],
        type: 'line'
      }]
    }, this.option);
    this.canvas.setOption(graph);
  }

  @Watch('option')
  private reRender () {
    this.renderGraph();
  }
}
</script>
