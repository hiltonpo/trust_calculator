import * as echarts from 'echarts/core';
import { map, template } from 'lodash-es';

import smileFace from '@/assets/img/smileFace.svg';
import { toThousand } from '@/utility/utility';
import { preffix } from '@/views/order/utility';

const chartColor: any = {
  alpha: '#16b6d2',
  global: '#aaa',
  taiwan: '#F29DA7',
  grid: '#eee'
};

// 目標規劃 圖表的 echart 設定檔
export function overviewLineChartOption (markpointXY: any, XLinedata: number[], YLinedata: number[], max: number) {
  const markLineYCollection: any = map(markpointXY, ({ coord }: any) => { return { xAxis: coord[0] }; });
  // console.log(markLineYCollection)
  const option = {
    tooltip: {
      show: true,
      // triggerOn: 'axis',
      trigger: 'axis',
      textStyle: {
        color: '#fff'
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
        z: 1
      },
      formatter (params: any) {
        const colorSpan = (color: string) => `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${color}">
        </span><span style="color: ${color};">`;
        const string = `<div class="d-flex flex-wrap justify-space-between">
          <div class="d-flex flex-wrap justify-space-between" style="min-width: 130px">
            <span class="mr-1">${preffix}</span><span><% print(toThousand(value)); %></span>
          </div>
        </div>`;
        const compiled = template(string, { imports: { toThousand: toThousand } });
        return `<div class="text-subtitle-2">
          <section class="text-center px-3 py-2" style="background-color: #37406C;">
            <div>${params[0].axisValueLabel} 年${params[0].seriesName}</div>
          </section>
          <section class="mb-0 px-3 py-2 text-caption">
            ${colorSpan('#00BCD4')}在 <strong>alpha</strong> 投資</span> <br />
            ${compiled({ value: params[0].data })}
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
          margin: -12
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(160, 160, 160, 0.3)'
          }
        },
        offset: 22,
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
        name: '預測金額',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbolSize: 6,
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          data: markLineYCollection,
          lineStyle: {
            color: '#bbb'
          }
        },
        markPoint: {
          symbolSize: [43, 53], // 图形大小
          data: [
            markpointXY
          ],
          // label: {
          //   show: false
          // },
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
        itemStyle: {
          color: '#262F5A'
        },
        lineStyle: {
          color: '#00ACC1'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#26C6DA'
          }, {
            offset: 1,
            color: '#B2EBF2'
          }])
        },
        z: -1,
        data: YLinedata
      }
    ]
  };
  return option;
}

// 目標規劃 圖表的 echart 設定檔
export function orderLineChartOption (markpointSVGpath: string, markpointXY: any, XLinedata: number[], YLinedata: any, max: number) {
  const [markpointX, markpointY] = markpointXY.coord;
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
          <p class="pa-2 text-center mb-0 text-subtitle-2" style="background-color: #37406C;">
            ${params[0].axisValueLabel} 年 累積總金額比較
          </p>
          <section class="mb-0 pa-3">
            ${compiled({ name: params[4].seriesName, value: params[4].data })}
            ${colorSpan('#00BCD4')}在 <strong>alpha</strong> 投資</span> <br />
            ${compiled({ name: params[0].seriesName, value: params[0].data })}
            ${compiled({ name: params[1].seriesName, value: params[1].data })}
            ${compiled({ name: params[2].seriesName, value: params[2].data })}
            ${colorSpan('#FF8F00')}在銀行定存</span> <br />
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
            color: '#B2EBF2'
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
        // symbol: 'none',
        showSymbol: false,
        symbolSize: 6,
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          data: [{ xAxis: markpointX }],
          lineStyle: {
            color: '#bbb'
          }
        },
        markPoint: {
          symbolSize: [43, 53], // 图形大小
          data: [
            markpointXY
          ],
          // label: {
          //   show: false
          // },
          symbol: `image://${markpointSVGpath}`,
          symbolOffset: ['0%', '-58%'],
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
        data: YLinedata.worse
      },
      {
        name: '銀行存款',
        type: 'line',
        symbol: 'none',
        itemStyle: {
          show: '#FF8F00'
        },
        lineStyle: {
          color: '#FF8F00'
        },
        z: -2,
        data: YLinedata.bank
      },
      {
        name: '預估投入金額',
        type: 'line',
        symbol: 'none',
        itemStyle: {
          show: '#FF8F00'
        },
        lineStyle: {
          color: 'transparent'
        },
        z: -2,
        data: YLinedata.invMoney
      }
    ]
  };
  return lineChartOption;
}

// 當前損益 圖表的 echart 設定檔
export function barChartOption (XBardata: number[], YBardata: number[]) {
  const option = {
    color: ['#16b6d2'],
    legend: {
      show: true,
      right: 0,
      bottom: 66,
      itemWidth: 15,
      itemHeight: 15,
      textStyle: {
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      textStyle: {
        color: '#fff'
      },
      backgroundColor: '#262F5A',
      borderColor: 'rgba( 29, 94, 105, .8)',
      padding: 0,
      formatter (params: any) {
        const string = `<div class="d-flex flex-wrap justify-space-between">
          <div class="d-flex flex-wrap justify-space-between" style="min-width: 130px">
            <span class="mr-1">${preffix}</span><span><% print(toThousand(value)); %></span>
          </div>
        </div>`;
        const compiled = template(string, { imports: { toThousand: toThousand } });
        return `<div class="text-subtitle-2">
          <section class="text-center px-3 py-2" style="background-color: #37406C;">
            <div>
              ${params[0].axisValueLabel} 年總市值
            </div>
          </section>
          <section class="mb-0 px-3 py-2">
            ${compiled({ value: params[0].data })}
          </section>
        </div>`;
      }
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: false
      },
      offset: 6.5,
      axisLabel: {
        rotate: 40
      },
      axisTick: {
        show: false
      },
      data: XBardata
    },
    yAxis: {
      type: 'value',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            { offset: 0, color: '#5CD3E8' },
            { offset: 1, color: '#16b6d2' }
          ]
        ),
        normal: {
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black',
              fontSize: 14
            }
          }
        }
      },
      offset: -7,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        formatter (params: number) {
          return params / 1000 + ' K';
        }
      }
    },
    series: [
      {
        name: '總市值',
        data: YBardata,
        type: 'bar',
        stack: 'total',
        barWidth: '40%'
      }
    ]
  };
  return option;
}

export function gaugeChartOption (value: number) {
  const option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [{
      center: ['50%', '75%'],
      radius: '110%',
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      splitNumber: 8,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.25, '#FF6E76'],
            [0.5, '#FDDD60'],
            [0.75, '#58D9F9'],
            [1, '#7CFFB2']
          ]
        }
      },
      pointer: {
        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: '12%',
        width: 20,
        offsetCenter: [0, '-60%'],
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        length: 5,
        distance: 5,
        lineStyle: {
          color: 'auto',
          width: 2
        },
        splitNumber: 2
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        length: 10,
        distance: 5,
        lineStyle: {
          color: 'auto',
          width: 3
        }
      },
      detail: {
        fontSize: 40,
        offsetCenter: [0, '-5%'],
        valueAnimation: true,
        color: 'black'
      },
      data: [
        { value }
      ]
    }
    ]
  };
  return option;
}

export function gaugeChartSmileOption (value: number) {
  const option = {
    series: [{
      title: {
        offsetCenter: [0, '-20%'],
        backgroundColor: {
          image: smileFace
        },
        width: 76,
        height: 76
      },
      center: ['50%', '65%'],
      radius: '100%',
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      splitNumber: 12,
      itemStyle: {
        color: '#58D9F9',
        shadowColor: 'rgba(0,138,255,0.45)',
        shadowBlur: 10,
        shadowOffsetX: 2,
        shadowOffsetY: 2
      },
      progress: {
        show: true,
        roundCap: true,
        width: 18
      },
      pointer: {
        itemStyle: {
          color: 'transparent'
        }
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 18
        }
      },
      axisTick: {
        splitNumber: 2,
        lineStyle: {
          width: 2,
          color: '#999'
        },
        show: false
      },
      splitLine: {
        length: 12,
        lineStyle: {
          width: 3,
          color: '#999'
        },
        show: false
      },
      axisLabel: {
        distance: 30,
        color: '#999',
        show: false
      },
      detail: {
        fontSize: 25,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 1,
        width: '45%',
        height: 26,
        borderRadius: 8,
        offsetCenter: [0, '45%'],
        valueAnimation: true,
        formatter: function (value: any) {
          return `${value}%`;
        }
      },
      data: [{ value }]
    }]
  };
  return option;
}

export function ETFpieChartOption (pieChartData: any) {
  const option = {
    title: {
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: ''
    },
    series: [
      // { // 手機板要隱藏
      //   name: '比例分析',
      //   type: 'pie',
      //   tooltip: {
      //     show: false
      //   },
      //   radius: ['65%', '75%'],
      //   center: ['50%', '50%'],
      //   selectMode: 'single',
      //   selectedOffset: 0,
      //   data: pieChartData,
      //   label: {
      //     color: 'transparent',
      //     position: 'outside',
      //     fontWeight: 'normal',
      //     fontSize: 16,
      //     padding: 40
      //   },
      //   labelLine: {
      //     length: 0,
      //     length2: 0
      //   },
      //   animationType: 'scale',
      //   animationEasing: 'elasticOut',
      //   emphasis: {
      //     disabled: true
      //   }
      // },
      {
        name: '比例分析',
        type: 'pie',
        radius: ['70%', '90%'],
        center: ['50%', '50%'],
        selectMode: 'single',
        selectedOffset: 0,
        tooltip: {},
        startAngle: -90,
        data: pieChartData,
        label: {
          color: 'black',
          position: 'inside',
          fontWeight: 'bold',
          formatter: '{d}%'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        emphasis: {
          scale: true,
          scaleSize: 20,
          label: {
            show: true,
            fontSize: 22
          }
        }
      }
    ]
  };
  return option;
}

export function portfolioLineChartOption (POName: string, { alpha, taiwan, global }: any) {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      backgroundColor: 'rgba(88, 124, 131, .85)',
      borderColor: 'rgba(88, 124, 131, .85)',
      lable: {
        borderColor: '#16b6d2'
      },
      formatter: function (params: any) {
        let html = `<div class='p-2' style="color:#fff;">${params[0].name} <br>`;
        for (let i = 0; i < params.length; i++) {
          html += `
        <div class="w-100 border-1"></div>
        <div class="d-flex justify-space-between">
            <div>
                ${params[i].marker}
                ${params[i].seriesName}：
            </div>
            <div>${params[i].value} % </div>
        </div>
        `;
        }
        html += '</div>';
        return html;
      }
    },
    legend: {
      x: 'right',
      orient: 'vertical'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      x: 'center'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      boundaryGap: true, // X軸不從0開始 會保持距離
      data: alpha.XLinedata,
      axisLabel: { // 日期換行
        formatter: function (value: any, index: number) {
          if (window.innerWidth < 570) {
            const arr = value.split('/');
            const date = arr[1] + '/' + arr[2];
            const html = `${arr[0]}\n${date}`;
            return html;
          }
          return value;
        },
        interval: 100000,
        showMinLabel: true,
        showMaxLabel: true,
        margin: 8,
        lineHeight: 20
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#eee'// y軸格線顏色
        }
      },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value} %'
      },
      // 讓資料最高值頂部有空間
      max: function (value: any) {
        return parseInt(value.max) + 15;
      }
    },
    series: [
      {
        name: POName,
        type: 'line',
        color: chartColor.alpha,
        showSymbol: false,
        data: alpha.YLinedata,
        animation: true
      },
      {
        name: '台灣股市',
        type: 'line',
        color: chartColor.taiwan,
        showSymbol: false,
        data: taiwan.YLinedata,
        animation: true
      },
      {
        name: '全球股市',
        type: 'line',
        color: chartColor.global,
        showSymbol: false,
        data: global.YLinedata,
        animation: true
      }
    ]
  };
  return option;
}

export function portfolioBarChartOption ({ XLinedata, YLinedata }: any, POName: string) {
  const option = {
    color: '#16b6d2',
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      textStyle: {
        color: '#fff'
      },
      backgroundColor: '#262F5A',
      borderColor: 'rgba( 29, 94, 105, .8)',
      padding: 0,
      formatter (params: any) {
        return `<div class="text-subtitle-2">
          <section class="text-center px-3 py-2" style="background-color: #37406C;">
            <div>
              ${POName}｜${params[0].axisValueLabel}
            </div>
          </section>
          <section class="mb-0 px-3 py-2">
          <div class="d-flex flex-wrap justify-space-between">
            <div class="d-flex flex-wrap justify-end" style="min-width: 130px">
              <span class="mr-1">${params[0].data.toFixed(1)}</span><span>%</span>
            </div>
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
        type: 'category',
        data: XLinedata,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 'auto',
          fontSize: 14,
          fontWeight: 'bold'
        }
      }
    ],
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: '123',
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1, [
              { offset: 0, color: '#5CD3E8' },
              { offset: 1, color: '#16b6d2' }
            ])
        },
        label: {
          show: true,
          position: 'top',
          // %數手機板換行
          formatter: function (params: any) {
            if (window.innerWidth > 570) {
              return params.data.toFixed(1) + '%';
            }
            return params.data.toFixed(1) + '\n%';
          },
          // textStyle: {
          //   color: 'black',
          //   fontSize: 14
          // },
          color: 'black',
          fontSize: 11,
          fontWeight: 'bold'
        },
        data: YLinedata
      }
    ]
  };
  return option;
}
