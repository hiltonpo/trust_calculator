import * as echarts from 'echarts/core';
import { map, template } from 'lodash-es';

// import smileFace from '@/assets/img/smileFace.svg';
import { toThousand } from '@/utility/utility';
import { preffix } from '@/utility/utility';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';

const chartColor: any = {
  alpha: '#16b6d2',
  global: '#aaa',
  taiwan: '#F29DA7',
  grid: '#eee'
};


// 目標規劃 圖表的 echart 設定檔
export function orderLineChartOption (markpointSVGpath: string, markpointXY: any, XLinedata: any, YLinedata: any, max: number) {
  const [assetMarkpointX, assetMarkpointY] = markpointXY.assetCoord;
  const lineChartOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
      textStyle: {
        color: '#fff',
      },
      backgroundColor: '#262F5A',
      borderColor: '#00838F',
      borderWidth: 1,
      padding: 0,
      axisPointer: {
        lineStyle: {
          type: 'solid',
          cap: 'butt',
          color: '#262F5A',
          width: 2
        },
        snap: true,
        z: -1
      },
      extraCssText:'width:450px;height:300px;',
      formatter: (params: any) => {
        const colorSpan = (color: string) => `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${color}">
        </span><span style="color: ${color};">`;
        const string = `<div class="d-flex flex-wrap justify-space-between">
          <span class="mr-2"><%= name %></span>
          <div class="d-flex flex-wrap justify-space-between" style="min-width: 100px">
            <span class="mr-1">${preffix}</span><span><% print(toThousand(value)); %></span>
          </div>
        </div>`;
        const compiled = template(string, { imports: { toThousand: toThousand } });
        return `<div class="text-caption">
          <p class="pa-2 text-center mb-0 text-h4" style="background-color: #37406C;">
            ${params[0].axisValueLabel} 年 累積總資產比較
          </p>
          <section class="mb-0 pa-3 text-h5">
            ${colorSpan('#00BCD4')}<strong>預計累積資產</strong></span> <br />
            ${compiled({ name: params[0].seriesName, value: params[0].data })}
            ${compiled({ name: params[1].seriesName, value: params[1].data })}
            ${compiled({ name: params[2].seriesName, value: params[2].data })}
            <br/>
            ${colorSpan('#FF8F00')}預計提領金額(總計)</span> <br />
            ${compiled({ name: params[3].seriesName, value: params[3].data })}
          </section>
        </div>`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: XLinedata,
        offset: 6.5,
        axisLabel: {
          rotate: 40
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter (params: any) {
            return params / 1000 + ' K';
          },
          margin: 30
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(160, 160, 160, 0.3)'
          }
        },
        offset: -7,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        max: max,
        z: -1
      }
    ],
    series: [
      {
        name: '市場較好情況',
        type: 'line',
        symbol: 'none',
        lineStyle: {
          color: '#B2EBF2'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
            offset: 0,
            color: '#26C6DA'
          }, {
            offset: 1,
            color: '#D2E9FF'
          }])
        },
        emphasis: {
          disabled: true
        },
        z: -2,
        data: YLinedata.better
      },
      {
        name: '市場一般情況',
        type: 'line',
        symbol: 'none',
        showSymbol: false,
        symbolSize: 6,
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          data: [{ xAxis: assetMarkpointX }],
          lineStyle: {
            type:'dotted',
            width: 6,
            color: '#fdc746',
          },
          tooltip: {
            show: true,
            trigger: 'item',
            padding: 0,
            formatter (params: any) {
              const [year, value] = params.data.coord;
              // console.log(params);
              return `<div class="font-weight-medium">
                <p class="pa-2 text-center mb-0 text-subtitle-2" style="background-color: #37406C;">
                  計劃資訊
                </p>
                <section class="pa-3">
                <div class="d-flex justify-space-between">
                  <span class="mr-2">目標金額</span><span>USD $ ${Number(value).toFixed(2)}</span>  
                </div>
                <div class="d-flex justify-space-between">
                  <span class="mr-2">達成年份</span><span>${year} 年</span>  
                </div>
                </section>
              </div>`;
            }
          }
        },
        // markPoint: {
        //   symbolSize: [43, 53], // 图形大小
        //   data: [
        //     { coord: [20, 10000000] }
        //   ],
        //   label: {
        //     show: false
        //   },
        //   symbol: 'circle',
        //   symbolOffset: ['0%', '0%'],
        //   tooltip: {
        //     show: true,
        //     trigger: 'item',
        //     padding: 0,
        //     formatter (params: any) {
        //       const [year, value] = params.data.coord;
        //       // console.log(params);
        //       return `<div class="font-weight-medium">
        //         <p class="pa-2 text-center mb-0 text-subtitle-2" style="background-color: #37406C;">
        //           計劃資訊
        //         </p>
        //         <section class="pa-3">
        //         <div class="d-flex justify-space-between">
        //           <span class="mr-2">目標金額</span><span>USD $ ${Number(value).toFixed(2)}</span>  
        //         </div>
        //         <div class="d-flex justify-space-between">
        //           <span class="mr-2">達成年份</span><span>${year} 年</span>  
        //         </div>
        //         </section>
        //       </div>`;
        //     }
        //   }
        // },
        lineStyle: {
          color: '#00BCD4'
        },
        itemStyle: {
          color: '#262F5A'
        },
        emphasis: {
          disabled: true
        },
        z: 1,
        data: YLinedata.normal
      },
      {
        name: '市場較差情況',
        type: 'line',
        symbol: 'none',
        lineStyle: {
          color: '#B2EBF2'
        },
        areaStyle: {
          color: 'rgb(255, 255, 255)', // color of the background
          opacity: 1 // <--- solution
        },
        emphasis: {
          disabled: true
        },
        z: -2,
        data: YLinedata.poor
      },
      {
        name: '預計總提領金額',
        type: 'line',
        symbol: 'none',
        lineStyle: {
          color: '#9D9D9D',
          width: 5,
          type: 'dotted'
        },
        areaStyle: {
          color: 'rgb(255, 255, 255)', // color of the background
          opacity: 0 // <--- solution
        },
        emphasis: {
          disabled: true
        },
        markPoint: {
          symbolSize: [60, 50], // 图形大小
          data: [
            {coord: markpointXY.withdrawCoord}
          ],
          itemStyle: {
            color: '#9D9D9D',
          },
        },
        z: -2,
        data: YLinedata.withdraw,
        connectNulls:true
      }
      // {
      //   name: '預估投入金額',
      //   type: 'line',
      //   symbol: 'none',
      //   itemStyle: {
      //     show: '#FF8F00'
      //   },
      //   lineStyle: {
      //     color: 'transparent'
      //   },
      //   z: -2,
      //   data: YLinedata.invMoney
      // }
    ]
  };
  return lineChartOption;
}
