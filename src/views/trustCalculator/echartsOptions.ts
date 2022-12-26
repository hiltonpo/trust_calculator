import * as echarts from 'echarts/core';
import { map, template } from 'lodash-es';

// import smileFace from '@/assets/img/smileFace.svg';
import { toThousand } from '@/utility/utility';
import { preffix } from '@/views/trustCalculator/trustFormula';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';

const chartColor: any = {
  alpha: '#16b6d2',
  global: '#aaa',
  taiwan: '#F29DA7',
  grid: '#eee'
};

const situationColor: any = {
  better: '#A6C7A5',
  normal: '#6BB169',
  poor: '#438B41'
};

// 退休計畫 圖表的 echart 設定檔
export function retireLineChartOption (markpointSVGpath: string, markpointXY: any, XLinedata: any, YLinedata: any, max: number, chartWidth: any) {
  const breakpoint = 1000;

  const labelResizer = function () {
    return {
      x: chartWidth - (chartWidth < breakpoint ? chartWidth < 600 ? 100 : 150 : 250),
      moveOverlap: 'shiftY'
    };
  };

  const scatterSettings: any = {
    labelLayout: labelResizer,
    z: 5,
    symbolSize: 8,
    type: 'scatter'
  };

  const labelLine: any = {
    labelLine: {
      show: true,
      lineStyle: {
        color: 'black'
      }
    }
  };

  const [assetMarkpointX, assetMarkpointY] = markpointXY.assetCoord[0];
  const { withdrawCoord, retireAge } = markpointXY;

  const start = () => {
    return 'start';
  };

  const lineChartOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
      textStyle: {
        color: '#fff'
      },
      backgroundColor: '#262F5A',
      borderColor: '#00838F',
      borderWidth: 1,
      padding: 0,
      position: function (pos: any, params: any, dom: any, rect: any, size: any) {
        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        const obj: any = { top: 60 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      },
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
      // extraCssText: 'width:550px;max-height:350px;',
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
        return `<div class="text-caption">
          <p class="pa-2 text-center mb-0 text-h5" style="background-color: #37406C;">
            ${params[0].axisValueLabel} 歲 得到/需要金額比較
          </p>
          <section class="mb-0 pa-3 text-h6">
            ${colorSpan('#00BCD4')}<strong>預計得到金額</strong></span> <br />
            ${compiled({ name: params[0].seriesName, value: params[0].data })}
            ${compiled({ name: params[1].seriesName, value: params[1].data })}
            ${compiled({ name: params[2].seriesName, value: params[2].data })}
            <div>
            ${params[3].data ? `${colorSpan('#FF8F00')}預計需要金額</span> <br />
            ${compiled({ name: '退休總花費金額', value: params[3].data })}` : ''}
            </div>
          </section>
        </div>`;
        // return '';
      }
    },
    grid: {
      left: '2%',
      right: '4%',
      bottom: '4%',
      containLabel: true
    },
    xAxis: [
      {
        name: '歲數',
        nameLocation: 'middle',
        nameTextStyle: {
          padding: [6, 0, 0, 0],
          fontSize: 14,
          fontWeight: 'bold'
        },
        type: 'category',
        boundaryGap: true,
        data: XLinedata,
        postion: 6.5,
        axisLabel: {
          rotate: 0,
          fontSize: 12,
          showMaxLabel: true
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
        name: '金\n額',
        nameLocation: 'left',
        nameTextStyle: {
          padding: [0, 120, 180, 0],
          fontSize: 14,
          fontWeight: 'bold'
        },
        type: 'value',
        axisLabel: {
          formatter (params: any) {
            return toThousand(params / 10000) + ' 萬';
          },
          margin: 10,
          fontSize: 12
          // rotate:20
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(160, 160, 160, 0.5)'
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
        ...scatterSettings,
        ...labelLine,
        name: '市場較好情況',
        type: 'line',
        symbol: (value: any, params: any) => {
          if (YLinedata.normal.length - 1 === params.dataIndex) {
            return 'circle';
          } else {
            return 'none';
          }
        },
        label: {
          show: false,
          position: [10, -15],
          fontSize: 16,
          formatter (params: any) {
            if (YLinedata.better.length - 1 === params.dataIndex) {
              return '較好情況';
            } else {
              return '';
            };
          }
        },
        markPoint: {
          symbolSize: [20, 20], // 图形大小
          data: [
            {
              coord: markpointXY.assetCoord[0],
              symbolRotate: 50
            }
          ],
          itemStyle: {
            color: situationColor.better
          }
        },
        lineStyle: {
          color: 'none'
        },
        itemStyle: {
          color: 'none'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
            offset: 0,
            color: '#A6C7A5'
          }, {
            offset: 1,
            color: '#A6C7A5'
          }])
        },
        emphasis: {
          disabled: true
        },
        z: -2,
        data: YLinedata.better
      },
      {
        ...scatterSettings,
        ...labelLine,
        name: '市場一般情況',
        type: 'line',
        symbolSize: 6,
        symbol: (value: any, params: any) => {
          if (YLinedata.normal.length - 1 === params.dataIndex) {
            return 'circle';
          } else {
            return 'none';
          }
        },
        label: {
          show: false,
          position: [10, -15],
          fontSize: 16,
          formatter (params: any) {
            if (YLinedata.better.length - 1 === params.dataIndex) {
              return '一般情況';
            } else {
              return '';
            };
          }
        },
        markPoint: {
          symbolSize: [20, 20], // 图形大小
          data: [
            {
              coord: markpointXY.assetCoord[1],
              symbolRotate: 50
            }
          ],
          itemStyle: {
            color: situationColor.normal
          }
        },
        lineStyle: {
          color: '#438B41'
        },
        itemStyle: {
          color: 'none'
        },
        emphasis: {
          disabled: true
        },
        z: 1,
        data: YLinedata.normal
      },
      {
        ...scatterSettings,
        ...labelLine,
        name: '市場較差情況',
        type: 'line',
        symbol: (value: any, params: any) => {
          if (YLinedata.normal.length - 1 === params.dataIndex) {
            return 'circle';
          } else {
            return 'none';
          }
        },
        label: {
          show: false,
          position: [10, -15],
          fontSize: 16,
          formatter (params: any) {
            if (YLinedata.better.length - 1 === params.dataIndex) {
              return '較差情況';
            } else {
              return '';
            };
          }
        },
        markPoint: {
          symbolSize: [20, 20], // 图形大小
          data: [
            {
              coord: markpointXY.assetCoord[2],
              symbolRotate: 50
            }
          ],
          itemStyle: {
            color: situationColor.poor
          }
        },
        lineStyle: {
          color: 'none'
        },
        itemStyle: {
          color: 'none'
        },
        areaStyle: {
          color: '#F2EADA', // color of the background
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
        markPoint: {
          symbolSize: [20, 20], // 图形大小
          data: [
            {
              coord: withdrawCoord,
              symbolRotate: 50
            }
          ],
          itemStyle: {
            color: '#CC9C50'
          }
        },
        symbolSize: 50,
        lineStyle: {
          color: '#707070',
          width: 3,
          type: 'dotted'
        },
        areaStyle: {
          color: 'rgb(255, 255, 255)', // color of the background
          opacity: 0 // <--- solution
        },
        emphasis: {
          disabled: true
        },
        z: 2,
        data: YLinedata.withdraw,
        connectNulls: true
      }, {
        type: 'scatter',
        data: YLinedata.withdraw,
        markLine: {
          symbol: ['none', 'none'],
          symbolSize: 0,
          data: [
            [
              {
                coord: withdrawCoord
              },
              {
                coord: [withdrawCoord[0], 0]
              }
            ],
            [
              {
                coord: withdrawCoord,
                lineStyle: {
                  type: 'dotted',
                  width: 2,
                  color: '#CC9C50'
                },
                label: {
                  show: true,
                  position: 'end',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  // distance: 2,
                  color: '#FFFFFF',
                  backgroundColor: '#CC9C50',
                  borderRadius: 5,
                  padding: 8,
                  borderWidth: 2,
                  formatter (params: any) {
                    return `您需要的退休金\n ${preffix} ${toThousand(Number(withdrawCoord[1] / 10000))} 萬`;
                  }
                }
              },
              {
                coord: [withdrawCoord[0], max]
              }
            ]
          ],
          lineStyle: {
            type: 'solid',
            width: 3,
            color: '#CC9C50'
          }
        },
        itemStyle: {
          opacity: 0
        }
      }
    ]
  };
  return lineChartOption;
}

// 累積財富計畫 圖表的 echart 設定檔
export function assetLineChartOption (markpointSVGpath: string, markpointXY: any, XLinedata: any, YLinedata: any, max: number, chartWidth: any) {
  const breakpoint = 1000;

  const labelResizer = function () {
    return {
      x: chartWidth - (chartWidth < breakpoint ? chartWidth < 600 ? 100 : 150 : 250),
      moveOverlap: 'shiftY'
    };
  };

  const scatterSettings: any = {
    labelLayout: labelResizer,
    z: 5,
    symbolSize: 8,
    type: 'scatter'
  };

  const labelLine: any = {
    labelLine: {
      show: true,
      lineStyle: {
        color: 'black'
      }
    }
  };

  const [assetMarkpointX, assetMarkpointY] = markpointXY.assetCoord[0];
  const { retireAge, assetCoord } = markpointXY;

  const lineChartOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
      textStyle: {
        color: '#fff'
      },
      backgroundColor: '#262F5A',
      borderColor: '#00838F',
      borderWidth: 1,
      padding: 0,
      position: function (pos: any, params: any, dom: any, rect: any, size: any) {
        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        const obj: any = { top: 60 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      },
      axisPointer: {
        lineStyle: {
          type: 'solid',
          cap: 'butt',
          color: '#262F5A',
          width: 2
        },
        snap: true,
        z: 20
      },
      // extraCssText: 'width:570px;max-height:350px;',
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
        // return `<div class="text-caption">
        //   <p class="pa-2 text-center mb-0 text-h5" style="background-color: #37406C;">
        //     ${params[0].axisValueLabel} 歲 得到/需要金額比較 ${params[0].dataIndex === assetMarkpointX ? '<span style="color: pink; font-size: 24px"><strong>(已達投資年限)</strong></span>' : ''}
        //   </p>
        //   <section class="mb-0 pa-3 text-h6">
        //     ${colorSpan('#00BCD4')}<strong>預計得到金額</strong></span> <br />
        //     ${compiled({ name: params[0].seriesName, value: params[0].data })}
        //     ${compiled({ name: params[1].seriesName, value: params[1].data })}
        //     ${compiled({ name: params[2].seriesName, value: params[2].data })}
        //   </section>
        // </div>`;
        return '';
      }
    },
    grid: {
      left: '2%',
      right: '4%',
      bottom: '4%',
      containLabel: true
    },
    xAxis: [
      {
        name: '歲數',
        nameLocation: 'middle',
        nameTextStyle: {
          padding: [6, 0, 0, 0],
          fontSize: 14,
          fontWeight: 'bold'
        },
        type: 'category',
        boundaryGap: true,
        data: XLinedata,
        postion: 6.5,
        axisLabel: {
          fontSize: 12,
          showMaxLabel: true
        },
        axisTick: {
          show: false
        },
        axisLine: {
          onZero: false
        },
      }
    ],
    yAxis: [
      {
        name: '金\n額',
        nameLocation: 'left',
        nameTextStyle: {
          padding: [0, 120, 180, 0],
          fontSize: 14,
          fontWeight: 'bold'
        },
        type: 'value',
        axisLabel: {
          formatter (params: any) {
            return toThousand(params / 10000) + ' 萬';
          },
          margin: 10,
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(160, 160, 160, 0.5)'
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
        z: 30
      }
    ],
    series: [
      {
        ...scatterSettings,
        ...labelLine,
        name: '市場較好情況',
        type: 'line',
        symbol: (value: any, params: any) => {
          // console.log(params)
          if (YLinedata.better.length - 1 === params.dataIndex) {
            return 'circle';
          } else {
            return 'none';
          }
        },
        symbolSize: 10,
        label: {
          show: false,
          position: [10, -15],
          fontSize: 16,
          formatter (params: any) {
            if (YLinedata.better.length - 1 === params.dataIndex) {
              return '較好情況';
            } else {
              return '';
            };
          }
        },
        lineStyle: {
          color: 'none'
        },
        itemStyle: {
          color: situationColor.better
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
            offset: 0,
            color: '#A6C7A5'
          }, {
            offset: 1,
            color: '#A6C7A5'
          }])
        },
        emphasis: {
          disabled: true
        },
        z: 5,
        data: YLinedata.better
      },
      {
        ...scatterSettings,
        ...labelLine,
        name: '市場一般情況',
        type: 'line',
        symbol: (value: any, params: any) => {
          if (YLinedata.normal.length - 1 === params.dataIndex) {
            return 'circle';
          } else {
            return 'none';
          }
        },
        label: {
          show: false,
          position: [10, -15],
          fontSize: 16,
          formatter (params: any) {
            if (YLinedata.better.length - 1 === params.dataIndex) {
              return '一般情況';
            } else {
              return '';
            };
          }
        },
        showSymbol: true,
        symbolSize: 10,
        lineStyle: {
          color: '#438B41'
        },
        itemStyle: {
          color: situationColor.normal
        },
        emphasis: {
          disabled: true
        },
        z: 20,
        data: YLinedata.normal
      },
      {
        ...scatterSettings,
        ...labelLine,
        name: '市場較差情況',
        type: 'line',
        symbol: (value: any, params: any) => {
          if (YLinedata.poor.length - 1 === params.dataIndex) {
            return 'circle';
          } else {
            return 'none';
          }
        },
        symbolSize: 10,
        label: {
          show: false,
          position: [10, -15],
          fontSize: 16,
          formatter (params: any) {
            if (YLinedata.better.length - 1 === params.dataIndex) {
              return '較差情況';
            } else {
              return '';
            };
          }
        },
        lineStyle: {
          color: 'none'
        },
        itemStyle: {
          color: situationColor.poor
        },
        areaStyle: {
          color: '#F2EADA', // color of the background
          opacity: 1 // <--- solution
        },
        emphasis: {
          disabled: true
        },
        z: 10,
        data: YLinedata.poor
      },
      {
        type: 'scatter',
        data: YLinedata.better,
        markLine: {
          symbol: ['none', 'none'],
          symbolSize: 0,
          data: [
            [
              {
                coord: assetCoord[0]
              },
              {
                coord: [assetCoord[0][0], 0]
              }
            ]
          ],
          lineStyle: {
            type: 'solid',
            width: 3,
            color: '#CC9C50'
          }
        },
        itemStyle: {
          opacity: 0
        }
      },
      {
        type: 'scatter',
        markPoint: {
          symbolSize: 0, // 图形大小
          label: {
            show: true,
            position: [-120, -70],
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#FFFFFF',
            backgroundColor: situationColor.normal,
            borderRadius: 5,
            padding: 8,
            borderWidth: 2,
            formatter (params: any) {
              return `資產預計成長到\n${preffix} ${toThousand(Number(assetCoord[1][1] / 10000))} 萬`;
            }
          },
          data: [
            {
              coord: assetCoord[1]
            }
          ],
          itemStyle: {
            color: situationColor.poor
          }
        },
        z: 30
      }
    ]
  };
  return lineChartOption;
}
