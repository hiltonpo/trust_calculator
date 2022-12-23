
// 數字添加千分位逗點 適用負數與小數點
export function toThousand (num: number, digits = 0) {
  function thousand (integerStr: string) {
    const arr = [];
    let integerLength = integerStr.length;
    while (true) {
      arr.unshift(integerStr.substring(Math.max(integerLength - 3, 0), integerLength));
      integerLength = integerLength - 3;
      if (Math.max(integerLength, 0) === 0) break;
    }
    return arr.join(',');
  }

  const money = (Number(num)).toFixed(digits);
  const float = money.split('.')[1];
  let number;
  // 負數 不含小數點
  if (money.includes('-') && digits) {
    number = money.toString().substr(1, money.length).split('.')[0];
    return `-${thousand(number)}.${float}`;
  }
  // 負數 含小數點
  if (money.includes('-') && !digits) {
    return thousand(money);
  }
  // 正數 不含小數點
  if (!money.includes('-') && !digits) {
    return thousand(money);
  }
  // 正數 含小數點
  if (!money.includes('-') && digits) {
    number = money.toString().split('.')[0];
    return `${thousand(number)}.${float}`;
  }
}

// 千分位轉換number原型
export function commasToNumber (commas: string) {
  const value = commas.split(',').join('');
  return Number(value) || 0;
}

// 加上千分位逗點
export function addCommas (money: number) {
  if (isNaN(Number(money)) === false) return toThousand(money);
  if (isNaN(Number(money)) !== false) return '0';
}

// /** ****  For 退休計畫  *******/
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
//       const total = (inital - totalRegWithdraw(0)) * avgRatio; // 當年度投資資產 = (初始單筆金額+每年定期累積金額)X年化報酬率
//       if (year < 2) {
//         return total;
//       } else {
//         return (recrusionAssetAfter(year - 1, r) - totalRegWithdraw(year - 1)) * avgRatio; // 提領後資產累積
//       }
//     };
//     return recrusionAssetAfter(year, r) <= 0 ? 0 : Math.round(recrusionAssetAfter(year, r));
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

// /** ***** 財富累積計畫  *******/
// // 累積資產 (year為退休第幾年、r為投報率=>好、普通、差)
// function asset_Aum (input: any, constant: any) {
//   return (year: number, r: number) => {
//     const investRatio = 1 + r; // 總投資投報率
//     const recrusionAsset_Aum: any = (year: number, r: number) => { // 累積投資資產
//       const inital = input.invMoney * 10000; // 初始單筆金額
//       const totalRegMoney = input.regMoney * 12; // 每年定期總額
//       const total = (inital + totalRegMoney) * investRatio; // 當年度投資資產 = (初始單筆金額+每年定期累積金額)X年化報酬率
//       if (year === 0) {
//         return inital;
//       } else if (year === 1) {
//         return total;
//       } else {
//         return (recrusionAsset_Aum(year - 1, r) + totalRegMoney) * investRatio;
//       };
//     };
//     return Math.round(recrusionAsset_Aum(year, r)); // 退休前資產累積 = 累積定存資產 + 累積投資資產
//   };
// }

// // 計算X軸資料、Y軸資料
// export function chartDataCalculation_Aum (input: any, situation: any, constant: any) {
//   // X軸資料(array)： 現在年齡 至 現在年齡+投資期間
//   const XLineData = new Array(input.invYear + 1).fill(0).map((item, index) => input.nowAge + index);
//   // Y軸資料(array)： 資產累積 (分成 較好投報率、正常投報率、較差投報率 三條折線)
//   const YLineData: Record<string, any> | any = {};

//   // 投資期間(array)： 0 至 目標投資年限
//   const invYearData = new Array(input.invYear + 1).fill(0).map((item, index) => index);

//   // Y軸資料：累積資產(分成 較好投報率、正常投報率、較差投報率 三條折線)
//   // 另外如果調整風險等級kyc 會有不同種之利率  註:kyc:0(保守), 1(穩健), 2(成長), 3(積極)
//   const AssetAumData: any = situation.reduce((all: any, cur: any, Rindex: any) => {
//     all[cur] = invYearData.map((year, index) => { return asset_Aum(input, constant)(year, constant.Rinvest[input.kyc][Rindex]); });
//     return all;
//   }, {});

//   for (const item of situation) {
//     YLineData[item] = AssetAumData[item];
//   }

//   return [XLineData, YLineData, AssetAumData];
// }

// /**
//  * 以下兩個函式為 Echarts 升級 版本後修復 Dom 重複 init 警告所用
//  */
// export function initEchartsWhenMounted (domIdStr: string) {
//   const ele: any = document.getElementById(domIdStr);
//   if (ele.getAttribute('_echarts_instance_') === null) {
//     return echarts.init(ele as HTMLCanvasElement);
//   }
// }

// export function renderEchartsDom (thisObj: any, option: any) {
//   setTimeout(() => {
//     // thisObj.clear(); // 清除樣式
//     thisObj && thisObj.setOption(option, true);
//     thisObj && thisObj.resize();
//   }, 10);
// }
