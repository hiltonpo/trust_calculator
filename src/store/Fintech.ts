import { clone, cloneDeep, filter, forEach, map, remove } from 'lodash-es';
import { stockData } from '@/utility/globalData';

export default
{
  state: {
    type: 'option', // yahoo fund US option
    portfolio: [],
    lunchBoxType: '',
    resultType: ''
  },
  mutations: {
    setPortfolio (state: any, stock: any) {
      if (state.type === 'option') {
        state.portfolio.push(stock);
      } else {
        state.portfolio = stock;
      }
    },
    delPortfolio (state: any, data: any) {
      const temp = clone(state.portfolio);

      remove(temp, (item: any) => {
        return (item.id === data.id && item.type === data.type);
      });

      state.portfolio = temp;
    },
    setType (state: any, type: any) {
      state.type = type;
    },
    setLunchBoxType (state: any, type: any) {
      state.lunchBoxType = type;
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
