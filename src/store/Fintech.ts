import { clone, cloneDeep, filter, forEach, map, remove } from 'lodash-es';

export default
{
  state: {
    portfolioAll:[],

  },
  mutations: {
    setPortfolioAll(state: any, stock: any) {
      state.portfolioAll.push(stock);
    },
    delPortfolio (state: any, data: any) {
      const temp = clone(state.investDiagnosisPortfolio);

      remove(temp, (item: any) => {
        return (item.id === data.id && item.type === data.type);
      });

      state.investDiagnosisPortfolio = temp;
    },
  },
  getters: {
    getPortfolioAll(state: any) {
      return state.portfolioAll;
    },
    getPortfolioStock (state: any) {
      return filter(state.portfolioAll, { type: 'stock' });
    },
    getPortfolioFund (state: any) {
      return filter(state.portfolioAll, { type: 'fund' });
    },
    getPortfolioStockUSA (state: any) {
      return filter(state.portfolioAll, { type: 'USAstock' });
    },
    getPortfolioLength (state: any) {
      return state.portfolioAll.length;
    },
  },
  actions: {
    loadPortfolioAll({state, commit}: any, stock: any) {
      commit('setPortfolioAll', stock);
    },

    delPortfolio ({ commit }: any, data: any) {
      commit('delPortfolio', data);
    }
  }
};
