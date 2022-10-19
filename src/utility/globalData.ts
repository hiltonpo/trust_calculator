// 自選投組
const optionList = [
  { id: '2330 台積電', buy: '411.5', reserve: '200', classes: '半導體'},
  { id: '6770 力積電', buy: '28.35', reserve: '3500', classes: '半導體' },
  { id: '2454 聯發科', buy: '562', reserve: '200', classes: '半導體' },
  { id: '2303 聯電', buy: '38.05', reserve: '2600', classes: '半導體' },
  { id: '3711 日月光', buy: '74.9', reserve: '1300', classes: '半導體' },
  { id: '2434 統懋', buy: '278', reserve: '400', classes: '半導體' },
  { id: '2458 義隆', buy: '78.6', reserve: '1300', classes: '半導體' },
  { id: '2451 創見', buy: '65.4', reserve: '1500', classes: '半導體' },
  { id: '2337 旺宏', buy: '31.6', reserve: '3200', classes: '半導體' },
  { id: '4919 新唐', buy: '100', reserve: '1000', classes: '半導體' },
  { id: '2886 兆豐金', buy: '29.8', reserve: '3400', classes: '金融' },
  { id: '2883 開發金', buy: '11.9', reserve: '8400', classes: '金融' },
  { id: '2882 國泰金', buy: '38.1', reserve: '2600', classes: '金融' },
  { id: '6005 群益證', buy: '10.1', reserve: '9900', classes: '金融' },
  { id: '2885 元大金', buy: '19.15', reserve: '5200', classes: '金融' },
  { id: '2890 永豐金', buy: '16.75', reserve: '6000', classes: '金融' },
  { id: '2897 王道銀行', buy: '7.99', reserve: '12500', classes: '金融' },
  { id: '2892 第一金', buy: '24.65', reserve: '4100', classes: '金融' },
  { id: '2884 玉山金', buy: '23.7', reserve: '4200', classes: '金融' },
  { id: '2832 台產', buy: '19.85', reserve: '5000', classes: '金融' },
  { id: '0050 元大台50', buy: '101.3', reserve: '1000', classes: 'ETF' },
  { id: '00878 國泰永續高股息', buy: '15.8', reserve: '6300', classes: 'ETF' },
  { id: '00885 富邦越南', buy: '12.55', reserve: '8000', classes: 'ETF' },
  { id: '00646 元大S&P 500', buy: '36.09', reserve: '2800', classes: 'ETF' },
  { id: '0056 元大高股息', buy: '25.89', reserve: '3900', classes: 'ETF' },
  { id: '00881 國泰台灣5G+', buy: '12.76', reserve: '7800', classes: 'ETF' },
]
// yahoo投組
const yahooList = [
  { id: '00878 國泰永續高股息', buy: '15.8', reserve: '10100', type: 'stock' },
  { id: '0050 元大台50', buy: '101.3', reserve: '1500', type: 'stock' },
  { id: '0056 元大高股息', buy: '25.89', reserve: '5400', type: 'stock' },
  { id: '2330 台積電', buy: '411.5', reserve: '300', type: 'stock' },
  { id: '2002 中鋼', buy: '26.9', reserve: '3700', type: 'stock' },
  { id: '2886 兆豐金', buy: '29.8', reserve: '2700', type: 'stock' },
  { id: '2812 台中商銀', buy: '12.85', reserve: '5400', type: 'stock' },
  { id: '3231 緯創', buy: '26.55', reserve: '2600', type: 'stock' },
  { id: '00881 國泰5G+', buy: '12.76', reserve: '5500', type: 'stock' },
  { id: '2317 鴻海', buy: '105', reserve: '700', type: 'stock' },
]
// 基金投組
const fundList = [
  { id: '安聯收益成長基金-AT累積類股(美元)', buy: '19.56', reserve: '160', type: 'fund' },
  { id: '聯博全球高收益債券基金-TA類型(美元)', buy: '7.94', reserve: '400', type: 'fund' },
  { id: '聯博-美國收益基金A股美元', buy: '6.26', reserve: '500', type: 'fund' },
  { id: '摩根投資基金-環球高收益債券基金-JPM環球高收益債券(美元)-A股(累計)', buy: '179.15', reserve: '20', type: 'fund' },
  { id: 'NN(L)新興市場債券基金X股美元', buy: '275.66', reserve: '10', type: 'fund' },
  { id: '安聯台灣大壩基金-A類型-新臺幣', buy: '48.77', reserve: '2050', type: 'fund' },
  { id: '野村優質基金-累積類型新臺幣計價', buy: '66.73', reserve: '1500', type: 'fund' },
  { id: '安聯台灣智慧基金', buy: '62.75', reserve: '1590' },
]
// 美股投組
const USList = [
  { id: 'AAPL', buy: '142.99', reserve: '70', type: 'USAstock' },
  { id: 'VTI', buy: '182.74', reserve: '54', type: 'USAstock' },
  { id: 'ARKK', buy: '36.04', reserve: '277', type: 'USAstock' },
  { id: 'TSLA', buy: '221.72', reserve: '45', type: 'USAstock' },
  { id: 'NVDA', buy: '119.6', reserve: '84', type: 'USAstock' },
  { id: 'VOO', buy: '336.22', reserve: '30', type: 'USAstock' },
  { id: 'QQQ', buy: '268.82', reserve: '37', type: 'USAstock' },
  { id: 'MSFT', buy: '234.24', reserve: '43', type: 'USAstock' },
  { id: 'BA', buy: '132.4', reserve: '76', type: 'USAstock' },
  { id: 'DIS', buy: '96.64', reserve: '103', type: 'USAstock' },
]

// 處理資料，將投組按屬性整理成陣列
function render(list: any) {
  const stockId = list.reduce((cur: any, stockItem: any)=> {
    const { id } = stockItem;
    return cur.concat(id);
  }, []);

  const buy = list.reduce((cur: any, stockItem: any)=> {
    const { buy } = stockItem;
    return cur.concat(buy);
  }, []);

  const reserve = list.reduce((cur: any, stockItem: any)=> {
    const { reserve } = stockItem;
    return cur.concat(reserve);
  }, []);
  
  // 自選投組多一個產業類別
  if (Object.getOwnPropertyNames(list[0]).includes('classes')) {
    const classes = list.reduce((cur: any, stockItem: any)=> {
      const { classes } = stockItem;
      return cur.concat(classes);
    }, []);

    return [stockId, buy, reserve, classes];
  };

  return [stockId, buy, reserve];
}

export function stockData(type: any) {
  if (type === 'US') {
    return USList;
  } else if (type === 'yahoo') {
    return yahooList;
  } else if (type === 'fund') {
    return fundList;
  } else if (type === 'option') {
    return render(optionList);
  } else {
    return [];
  };
}

// 風屬：R1=>積極  R2=>穩健  R3=>保守

// 自選投組有七種子組合，可歸類成三種風屬：
// 積極：半、半+ETF
// 穩健：半+金、半+金+ETF、ETF  
// 保守：金+ETF、金
// 風屬：R1=>積極  R2=>穩健  R3=>保守
export function optionLunchBoxType(rowClassData: any) {
  const classAll = rowClassData.reduce((cur: any, stockItem: any)=> {
    const { classes } = stockItem;
    return cur.concat(classes);
  }, [])
  const classAllSet = new Set(classAll);

  if ((classAllSet.has('半導體') && classAllSet.has('ETF') || classAllSet.has('半導體')) && !classAllSet.has('金融')) {
    return 'R1';
  } else if ( (classAllSet.has('半導體') && classAllSet.has('金融')) || (classAllSet.has('ETF') && !classAllSet.has('半導體') && !classAllSet.has('金融')) ) {
    return 'R2';
  } else if ( (classAllSet.has('金融') && classAllSet.has('ETF') ||  classAllSet.has('金融')) && !classAllSet.has('半導體')) {
    return 'R3';
  }
}

// 其他三種投組所分配的風屬
export function lunchBoxType(type: any, rowData: any) {
  if (type === 'US') {
    return 'R1';
  } else if (type === 'yahoo') {
    return 'R2';
  } else if (type === 'fund') {
    return 'R3';
  } else if (type === 'option') { 
    return optionLunchBoxType(rowData);
  } else {
    return null;
  }
}
