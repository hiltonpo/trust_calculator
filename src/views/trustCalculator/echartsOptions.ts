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
  const { retireAge } = markpointXY;
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
      extraCssText:'width:450px;max-height:350px;',
      formatter: (params: any) => {
        const colorSpan = (color: string) => `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${color}">
        </span><span style="color: ${color};">`;
        const string = `<div class="d-flex flex-wrap justify-space-between pb-2">
          <span class="mr-2"><%= name %></span>
          <div class="d-flex flex-wrap justify-space-between" style="min-width: 100px">
            <span class="mr-1">${preffix}</span><span><% print(toThousand(value)); %></span>
          </div>
        </div>`;
        const compiled = template(string, { imports: { toThousand: toThousand } });
        console.log(params[3].data)
        return `<div class="text-caption">
          <p class="pa-2 text-center mb-0 text-h4" style="background-color: #37406C;">
            ${params[0].axisValueLabel} 歲 累積總資產比較
          </p>
          <section class="mb-0 pa-3 text-h5">
            ${colorSpan('#00BCD4')}<strong>預計累積資產</strong></span> <br />
            ${compiled({ name: params[0].seriesName, value: params[0].data })}
            ${compiled({ name: params[1].seriesName, value: params[1].data })}
            ${compiled({ name: params[2].seriesName, value: params[2].data })}
            <br/>
            <div>
            ${params[3].data ? `${colorSpan('#FF8F00')}預計提領金額(總計)</span> <br />
            ${compiled({ name: params[3].seriesName, value: params[3].data })}` : ''}
            </div>
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
        name:'歲數',
        nameLocation: 'middle',
        nameTextStyle: {
          padding: [26, 0, 0, 0],
          fontSize: 24,
          fontWeight: 'bold'
        },
        type: 'category',
        boundaryGap: true,
        data: XLinedata,
        postion: 6.5,
        axisLabel: {
          rotate: 40,
          fontSize: 18,
        },
        axisTick: {
          show: false
        },
        axisLine: {
          onZero: false
        }
      }
    ],
    yAxis: [
      {
        name:'金\n額',
        nameLocation: 'left',
        nameTextStyle: {
          padding: [0, 320, 0, 0],
          fontSize: 26,
          fontWeight: 'bold'
        },
        type: 'value',
        axisLabel: {
          formatter (params: any) {
            return toThousand(params / 10000) + ' 萬';
          },
          margin: 30,
          fontSize: 24,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(160, 160, 160, 0.5)'
          }
        },
        offset: -7,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
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
          label: { 
            show: true,
            fontWeight: 'bold',
            fontSize: '28px',
            color:'#977C00',
            formatter(params:any) {
              return `退休年齡 ${retireAge} 歲`;
            }

          },
          data: [{ xAxis: assetMarkpointX }],
          lineStyle: {
            type:'dotted',
            width: 6,
            color: '#EAC100',
          },
        },
        markPoint: {
          symbolSize: [60, 60], // 图形大小
          data: [
            {
              coord: markpointXY.assetCoord,
              symbolRotate: -50
            }
          ],
          itemStyle: {
            color: '#00BCD4',
          },
          tooltip: {
            show: true,
            trigger: 'item',
            padding: 0,
            extraCssText:'width:450px;height:180px;',
            formatter (params: any) {
              const [year, value] = params.data.coord;
              console.log(params)
              return `<div class="font-weight-medium">
                <p class="pa-2 text-center mb-0 text-h4" style="background-color: #37406C;">
                  累積資產(市場一般情況)
                </p>
                <section class="pa-3">
                <div class="d-flex justify-space-between text-h5">
                  <span class="mr-2">退休時預計累積資產</span><span>TWD $ ${toThousand(value)}</span>  
                </div>
                <div class="d-flex justify-space-between text-h5">
                  <span class="mr-2">投資期間</span><span>${year} 年</span>  
                </div>
                </section>
              </div>`;
            }
          }
        },
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
          symbolSize: [60, 60], // 图形大小
          data: [
            {
              coord: markpointXY.withdrawCoord,
              symbolRotate: -50
            }
          ],
          itemStyle: {
            color: '#9D9D9D',
          },
          tooltip: {
            show: true,
            trigger: 'item',
            padding: 0,
            extraCssText:'width:450px;height:180px;',
            formatter (params: any) {
              const [year, value] = params.data.coord;
              // console.log(params);
              return `<div class="font-weight-medium">
                <p class="pa-2 text-center mb-0 text-h4" style="background-color: #37406C;">
                  提領金額
                </p>
                <section class="pa-3">
                <div class="d-flex justify-space-between text-h5">
                  <span class="mr-2">預計提領總金額約</span><span>TWD $ ${toThousand(value)}</span>  
                </div>
                <div class="d-flex justify-space-between text-h5">
                  <span class="mr-2">退休年數</span><span>${year} 年</span>  
                </div>
                </section>
              </div>`;
            }
          }
        },
        z: -2,
        data: YLinedata.withdraw,
        connectNulls:true
      }
    ]
  };
  return lineChartOption;
}
