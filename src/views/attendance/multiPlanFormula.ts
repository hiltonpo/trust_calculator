import * as echarts from 'echarts/core';
import { toThousand } from '@/utility/utility';

export const preffix = 'TWD $';
export const suffix = {
  year: '年',
  old: '歲',
  everyMonth: '/每月',
  everyYear: '/每年',
  percentage: '%'
};

// slider配色
export const sliderColor = {
  barColor: '#CC9C50',
  trackColor: '#FFFFFF',
  thumbColor: '#F2EADA'
};

// 退休計畫固定參數 投資報酬率、通膨率、定存利率
const constant = {
  Rinvest: 0.065,
  Rinflation: 0.02,
  Rdeposit: 0
};

// 基本資訊輸入參數 (給予初始預設值): 現在年齡、是否變更定期定額、單筆投入、定期定額、定期定額變更金額、定期定額變更年齡、定期定額投資年限
const inputBasic = {
  nowAge: 25, // 歲
  isChangeReg: false,
  invMoney: 100, // 萬
  regMoney: 15000, // 元
  regMoneyChange: 1000, // 元
  regAgeChange: 40, // 歲
  regYear: 300, // 年
};

// 退休輸入參數: 退休年齡、退休每月提領、提領年限歲數
const inputRetire = {
  retireAge: 65,   // 歲
  withdraw: 50000, // 元
  withdrawAge: 85, // 歲
};

// 買房輸入參數: 頭款提領年限、頭期款、頭期款是否折現、每年房貸、房貸繳交期間
const inputHouse = {
  withdrawYear: 20, // 年
  downPayment: 500, // 萬
  isDiscount: true,
  loan: 24, // 萬
  loanYear: 20  // 年
};

// 其他目標輸入參數
const inputCommon = {
  withdrawYear: 20, // 年
  withdraw: 500, // 萬
  isDiscount: true,
  isRepeat: true,
  repeatYear: 24, // 年
};


// /** *****************************************  For 退休計畫  ****************************************/
// //  退休前資產累積  (year為投資第幾年、r為投報率=>好、普通、差)
// function assetBeforeRetire (input: any, constant: any) {
//   return (year: number, r: number) => {
//     const depositRatio = 1 + constant.Rdeposit; // 總定存投報率
//     const investRatio = 1 + r; // 總投資投報率
//     const totalDeposit = (t: number) => { // 累積定存資產
//       return input.deposit * 10000 * (depositRatio ** year);
//     };
//     const recrusionAssetBefore: any = (year: number, r: number) => { // 累積投資資產
//       const inital = input.invMoney * 10000; // 初始單筆金額
//       const totalRegMoney = input.regMoney * 12; // 每年定期總額
//       const total = (inital + totalRegMoney) * investRatio; // 當年度投資資產 = (初始單筆金額+每年定期累積金額)X年化報酬率
//       if (year === 0) {
//         return inital;
//       } else if (year === 1) {
//         return total;
//       } else {
//         return (recrusionAssetBefore(year - 1, r) + totalRegMoney) * investRatio;
//       };
//     };

//     return Math.round(recrusionAssetBefore(year, r) + totalDeposit(year)); // 退休前資產累積 = 累積定存資產 + 累積投資資產
//   };
// }

// //  退休後資產累積  (year為退休第幾年、r為投報率=>好、普通、差)
// function assetAfterRetire (input: any, constant: any) {
//   return (year: number, r: number) => {
//     const depositRatio = 1 + constant.Rdeposit; // 總定存投報率
//     const inflationRatio = 1 + constant.Rinflation; // 總通膨投報率
//     const investRatio = 1 + r; // 總投資投報率
//     const investYear = input.retireAge - input.nowAge; // 投資年數
//     const assetB4Retire = assetBeforeRetire(input, constant)(investYear, r); // 退休前累積資產

//     // 總加權報酬率(退休後使用的報酬率) = 1 + (累積投資資產 X 總投資投報率 + 累積定存資產 X 總定存投報率) / 總累積資產
//     const avgRatio = 1 + (assetB4Retire * r - input.deposit * 10000 * (depositRatio ** investYear) * investRatio + input.deposit * 10000 * (depositRatio ** investYear) * depositRatio) / assetB4Retire;

//     const recrusionAssetAfter: any = (year: number, r: number) => {
//       const inital = assetBeforeRetire(input, constant)(investYear, r); // 初始退休累積資產
//       const totalRegWithdraw = (t: number) => { // 每年提領金額(考慮每年通膨)
//         return input.withdraw * 12 * (inflationRatio ** t);
//       };
//       const total = (inital - totalRegWithdraw(0)) * avgRatio; // 當年度投資資產 = (初始單筆金額retu+每年定期累積金額)X年化報酬率
//       if (year < 2) {
//         return total;
//       } else {
//         return (recrusionAssetAfter(year - 1, r) - totalRegWithdraw(year - 1)) * avgRatio; // 提領後資產累積
//       }
//     };
//     return recrusionAssetAfter(year, r) <= 0 ? 0 : Math.round(recrusionAssetAfter(year, r));
//   };
// }

// // 最佳解建議參數：假如總提領金額 > 退休前累積資產(市場一般情況)，則計算單筆 或 定期定額 所需要調整的金額大小
// export function optimalSolution (withdrawAll: any, assetBeforeRetire: any, year: any) {
//   return (constant: any, input: any) => {
//     const depositRatio = 1 + constant.Rdeposit; // 總定存投報率
//     const investRatio = 1 + constant.Rinvest[input.kyc][1]; // 總投資投報率
//     const totalDeposit = (t: number) => {
//       // 累積定存資產
//       return input.deposit * 10000 * depositRatio ** t;
//     };
//     if (withdrawAll > assetBeforeRetire) {
//       // 只調整單筆金額大小，定期定額設為常數
//       const deltaInv = () => {
//         return (
//           (withdrawAll -
//             (totalDeposit(year) +
//               (12 * input.regMoney * (investRatio ** (year + 1) - investRatio)) /
//                 (investRatio - 1))) /
//           investRatio ** year
//         );
//       };
//       // 只調整定期定額金額大小，單筆設為常數
//       const deltaReg = () => {
//         return (
//           ((withdrawAll -
//             (totalDeposit(year) + input.invMoney * 10000 * investRatio ** year)) *
//             (investRatio - 1)) /
//           (12 * (investRatio ** (year + 1) - investRatio))
//         );
//       };

//       return [true, [toThousand(Number(deltaInv() / 10000)), toThousand(Math.round(Number(deltaReg() / 1000)) * 1000)]];
//     }

//     return [false, []];
//   };
// }

// // 計算X軸資料、Y軸資料、退休前累積資產array、退休後累積資產array、總提領金額
// export function chartDataCalculation (input: any, situation: any, constant: any) {
//   // X軸資料(array)： 現在年齡 至 預期壽命
//   const XLineData = new Array(input.lifeAge - input.nowAge + 1).fill(0).map((item, index) => input.nowAge + index);
//   // Y軸資料(array)： 退休前資產累積 至 退休後資產累積 (分成 較好投報率、正常投報率、較差投報率 三條折線)
//   const YLineData: Record<string, any> | any = {};

//   // X軸資料分成兩段： 現在年齡 至 退休年齡(含) & 退休年齡+1 至 預期壽命
//   const beforeRetireAgeData = new Array(input.retireAge - input.nowAge + 1).fill(0).map((item, index) => index);
//   const afterRetireAgeData = new Array(input.lifeAge - input.retireAge).fill(0).map((item, index) => index + 1);

//   // 退休前累積資產(array)： 分成 較好投報率、正常投報率、較差投報率 三條折線
//   const beforeRetireAssetData: any = situation.reduce((all: any, cur: any, Rindex: any) => {
//     all[cur] = beforeRetireAgeData.map((year, index) => { return assetBeforeRetire(input, constant)(year, constant.Rinvest[input.kyc][Rindex]); });
//     return all;
//   }, {});
//   // 退休後累積資產(array)： 分成 較好投報率、正常投報率、較差投報率三條折線
//   const afterRetireAssetData: any = situation.reduce((all: any, cur: any, Rindex: any) => {
//     all[cur] = afterRetireAgeData.map((year, index) => { return assetAfterRetire(input, constant)(year, constant.Rinvest[input.kyc][Rindex]); });
//     return all;
//   }, {});

//   // 預計提領總金額
//   const withdrawAll: any = afterRetireAgeData.reduce((all: any, cur: any) => {
//     return Math.round(all + input.withdraw * 12 * ((1 + constant.Rinflation) ** cur));
//   }, 0);

//   // 將 退休前+退休後累積資產(三種報酬率)、提領金額 塞進Y軸資料
//   (function fillDataToYLine (situation, arrayFillBefore, arrayFillAfter) {
//     for (const item of situation) {
//       if (item !== 'withdraw') {
//         YLineData[item] = beforeRetireAssetData[item].concat(afterRetireAssetData[item]);
//       } else {
//         // Y軸座標起始(0)->最高點(提領總額)->終點(0)
//         YLineData[item] = [0, ...arrayFillBefore, withdrawAll, ...arrayFillAfter, 0];
//       };
//     }
//   })(situation, new Array(beforeRetireAgeData.length - 2).fill(''), new Array(afterRetireAgeData.length - 1).fill(''));

//   return [XLineData, YLineData, beforeRetireAssetData, afterRetireAssetData, withdrawAll];
// }

/**
 * 以下兩個函式為 Echarts 升級 版本後修復 Dom 重複 init 警告所用
 */
export function initEchartsWhenMounted (domIdStr: string) {
  const ele: any = document.getElementById(domIdStr);
  if (ele.getAttribute('_echarts_instance_') === null) {
    return echarts.init(ele as HTMLCanvasElement);
  }
}

export function renderEchartsDom (thisObj: any, option: any) {
  setTimeout(() => {
    // thisObj.clear(); // 清除樣式
    thisObj && thisObj.setOption(option, true);
    thisObj && thisObj.resize();
  }, 10);
}
