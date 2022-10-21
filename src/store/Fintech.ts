import { clone, filter, remove } from 'lodash-es';

export default
{
  state: {
    type: 'option', // 四種投組 yahoo、fund、US、option
    portfolio: [],  // 股票標的
    lunchBoxType: '',  // 餐盒類型
    resultType: ''  // 報告結果類型
  },
  mutations: {
    // 增加標的
    setPortfolio (state: any, stock: any) {
      if (state.type === 'option') {
        state.portfolio.push(stock);
      } else {
        state.portfolio = stock;
      }
    },
    // 刪除標的
    delPortfolio (state: any, data: any) {
      const temp = clone(state.portfolio);

      remove(temp, (item: any) => {
        return (item.id === data.id && item.type === data.type);
      });

      state.portfolio = temp;
    },
    // 設定哪種投組
    setType (state: any, type: any) {
      state.type = type;
    },
    // 設定哪種風屬 決定哪種餐盒
    setLunchBoxType (state: any, type: any) {
      state.lunchBoxType = type;
    },
    // 設定哪種報告結果
    setResultType (state: any, type: any) {
      state.resultType = type;
    }
  },
  getters: {
    // 投組全部資料
    getPortfolio (state: any) {
      return state.portfolio;
    },
    // 投組內幾檔股票
    getPortfolioLength (state: any) {
      return state.portfolio.length;
    },
    // yahoo或自選
    getPortfolioStock (state: any) {
      return filter(state.portfolio, { type: 'stock' });
    },
    // 基金
    getPortfolioFund (state: any) {
      return filter(state.portfolio, { type: 'fund' });
    },
    // 美股
    getPortfolioStockUSA (state: any) {
      return filter(state.portfolio, { type: 'USAstock' });
    },
    // 哪種投組 yahoo、基金、美股或自選
    getType (state: any) {
      return state.type;
    },
    // 哪種風屬 決定領哪種類型的便當 => R1積極型、R2穩健型、R3保守型
    getLunchBoxType (state: any) {
      return state.lunchBoxType;
    },
    // 哪種報告結果 => A1:美股、A2:yahoo、A3:基金、A4~10為自選投組
    getResultType (state: any) {
      return state.resultType;
    }
  },
  actions: {
    loadPortfolio ({ state, commit }: any, stock: any) {
      commit('setPortfolio', stock);
    },
    delPortfolio ({ commit }: any, data: any) {
      commit('delPortfolio', data);
    }
  }
};
