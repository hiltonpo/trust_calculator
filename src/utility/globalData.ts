const optionList = [
  { id: '2330', name: '台積電', buy: '411.5', reserve: '200', classes: '半導體'},
  { id: '6770', name: '力積電', buy: '28.35', reserve: '3500', classes: '半導體' },
  { id: '2454', name: '聯發科', buy: '562', reserve: '200', classes: '半導體' },
  { id: '2303', name: '聯電', buy: '38.05', reserve: '2600', classes: '半導體' },
  { id: '3711', name: '日月光', buy: '74.9', reserve: '1300', classes: '半導體' },
  { id: '2434', name: '統懋', buy: '278', reserve: '400', classes: '半導體' },
  { id: '2458', name: '義隆', buy: '78.6', reserve: '1300', classes: '半導體' },
  { id: '2451', name: '創見', buy: '65.4', reserve: '1500', classes: '半導體' },
  { id: '2337', name: '旺宏', buy: '31.6', reserve: '3200', classes: '半導體' },
  { id: '4919', name: '新唐', buy: '100', reserve: '1000', classes: '半導體' },
  { id: '2886', name: '兆豐金', buy: '29.8', reserve: '3400', classes: '金融' },
  { id: '2883', name: '開發金', buy: '11.9', reserve: '8400', classes: '金融' },
  { id: '2882', name: '國泰金', buy: '38.1', reserve: '2600', classes: '金融' },
  { id: '6005', name: '群益證', buy: '10.1', reserve: '9900', classes: '金融' },
  { id: '2885', name: '元大金', buy: '19.15', reserve: '5200', classes: '金融' },
  { id: '2890', name: '永豐金', buy: '16.75', reserve: '6000', classes: '金融' },
  { id: '2897', name: '王道銀行', buy: '7.99', reserve: '12500', classes: '金融' },
  { id: '2892', name: '第一金', buy: '24.65', reserve: '4100', classes: '金融' },
  { id: '2884', name: '玉山金', buy: '23.7', reserve: '4200', classes: '金融' },
  { id: '2832', name: '台產', buy: '19.85', reserve: '5000', classes: '金融' },
  { id: '0050', name: '元大台50', buy: '101.3', reserve: '1000', classes: 'ETF' },
  { id: '00878', name: '國泰永續高股息', buy: '15.8', reserve: '6300', classes: 'ETF' },
  { id: '00885', name: '富邦越南', buy: '12.55', reserve: '8000', classes: 'ETF' },
  { id: '00646', name: '元大S&P 500', buy: '36.09', reserve: '2800', classes: 'ETF' },
  { id: '0056', name: '元大高股息', buy: '25.89', reserve: '3900', classes: 'ETF' },
  { id: '00881', name: '國泰台灣5G+', buy: '12.76', reserve: '7800', classes: 'ETF' },
]

const yahooList = [
  { id: '00878', name: '國泰永續高股息', buy: '15.8', reserve: '10100' },
  { id: '0050', name: '元大台50', buy: '101.3', reserve: '1500' },
  { id: '0056', name: '元大高股息', buy: '25.89', reserve: '5400' },
  { id: '2330', name: '台積電', buy: '411.5', reserve: '300' },
  { id: '2002', name: '中鋼', buy: '26.9', reserve: '3700' },
  { id: '2886', name: '兆豐金', buy: '29.8', reserve: '2700' },
  { id: '2812', name: '台中商銀', buy: '12.85', reserve: '5400' },
  { id: '3231', name: '緯創', buy: '26.55', reserve: '2600' },
  { id: '00881', name: '國泰5G+', buy: '12.76', reserve: '5500' },
  { id: '2317', name: '鴻海', buy: '105', reserve: '700' },
]

const fundList = [
  { id: '', name: '安聯收益成長基金-AT累積類股(美元)', buy: '19.56', reserve: '160' },
  { id: '', name: '聯博全球高收益債券基金-TA類型(美元)', buy: '7.94', reserve: '400' },
  { id: '', name: '聯博-美國收益基金A股美元', buy: '6.26', reserve: '500' },
  { id: '', name: '摩根投資基金-環球高收益債券基金-JPM環球高收益債券(美元)-A股(累計)', buy: '179.15', reserve: '20' },
  { id: '', name: 'NN(L)新興市場債券基金X股美元', buy: '275.66', reserve: '10' },
  { id: '', name: '安聯台灣大壩基金-A類型-新臺幣', buy: '48.77', reserve: '2050' },
  { id: '', name: '野村優質基金-累積類型新臺幣計價', buy: '66.73', reserve: '1500' },
  { id: '', name: '安聯台灣智慧基金', buy: '62.75', reserve: '1590' },
]

const USList = [
  { id: '', name: 'AAPL', buy: '142.99', reserve: '70' },
  { id: '', name: 'VTI', buy: '182.74', reserve: '54' },
  { id: '', name: 'ARKK', buy: '36.04', reserve: '277' },
  { id: '', name: 'TSLA', buy: '221.72', reserve: '45' },
  { id: '', name: 'NVDA', buy: '119.6', reserve: '84' },
  { id: '', name: 'VOO', buy: '336.22', reserve: '30' },
  { id: '', name: 'QQQ', buy: '268.82', reserve: '37' },
  { id: '', name: 'MSFT', buy: '234.24', reserve: '43' },
  { id: '', name: 'BA', buy: '132.4', reserve: '76' },
  { id: '', name: 'DIS', buy: '96.64', reserve: '103' },
]


function render(list: any) {
  const stockId = list.reduce((cur: any, stockItem: any)=> {
    const { id, name } = stockItem;
    return cur.concat(id+' '+name);
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
  if (type === 'option') {
    return render(optionList);
  } else if (type === 'yahoo') {
    return render(yahooList);
  } else if (type === 'fund') {
    return render(fundList);
  } else if (type === 'US') {
    return render(USList);
  } else {
    return [];
  };
}

export function optionHealthCheck(rowData: any) {
  const classAll = rowData.reduce((cur: any, stockItem: any)=> {
    const { classes } = stockItem;
    return cur.concat(classes);
  }, [])
  console.log(classAll);
}