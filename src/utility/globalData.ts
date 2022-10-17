export function stockData() {
  const stocklist = [
    { id: '2330', name: '台積電', buy: '411.5', reserve: '200' },
    { id: '6770', name: '力積電', buy: '28.35', reserve: '3500' },
    { id: '2454', name: '聯發科', buy: '562', reserve: '200' },
    { id: '2303', name: '聯電', buy: '38.05', reserve: '2600' },
    { id: '3711', name: '日月光', buy: '74.9', reserve: '1300' },
    { id: '2434', name: '統懋', buy: '278', reserve: '400' },
    { id: '2458', name: '義隆', buy: '78.6', reserve: '1300' },
    { id: '2451', name: '創見', buy: '65.4', reserve: '1500' },
    { id: '2337', name: '旺宏', buy: '31.6', reserve: '3200' },
    { id: '4919', name: '新唐', buy: '100', reserve: '1000' },
    { id: '2886', name: '兆豐金', buy: '29.8', reserve: '3400' },
    { id: '2883', name: '開發金', buy: '11.9', reserve: '8400' },
    { id: '2882', name: '國泰金', buy: '38.1', reserve: '2600' },
    { id: '6005', name: '群益證', buy: '10.1', reserve: '9900' },
    { id: '2885', name: '元大金', buy: '19.15', reserve: '5200' },
    { id: '2890', name: '永豐金', buy: '16.75', reserve: '6000' },
    { id: '2897', name: '王道銀行', buy: '7.99', reserve: '12500' },
    { id: '2892', name: '第一金', buy: '24.65', reserve: '4100' },
    { id: '2884', name: '玉山金', buy: '23.7', reserve: '4200' },
    { id: '2832', name: '台產', buy: '19.85', reserve: '5000' },
    { id: '0050', name: '元大台50', buy: '101.3', reserve: '1000' },
    { id: '00878', name: '國泰永續高股息', buy: '15.8', reserve: '6300' },
    { id: '00885', name: '富邦越南', buy: '12.55', reserve: '8000' },
    { id: '00646', name: '元大S&P 500', buy: '36.09', reserve: '2800' },
    { id: '0056', name: '元大高股息', buy: '25.89', reserve: '3900' },
    { id: '00881', name: '國泰台灣5G+', buy: '12.76', reserve: '7800' },
  ]

  const stockId = stocklist.reduce((cur: any, stockItem: any)=> {
    const { id, name } = stockItem
    return cur.concat(id+' '+name)
  }, [])

  const buy = stocklist.reduce((cur: any, stockItem: any)=> {
    const { buy } = stockItem
    return cur.concat(buy)
  }, [])

  const reserve = stocklist.reduce((cur: any, stockItem: any)=> {
    const { reserve } = stockItem
    return cur.concat(reserve)
  }, [])

  return [stockId, buy, reserve]
}