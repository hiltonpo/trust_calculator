import { clone, cloneDeep, filter, forEach, map, remove } from 'lodash-es';

export default
{
  state: {
    type: 'option',
    portfolioAll:[],
  },
  mutations: {
    setPortfolioAll(state: any, stock: any) {
      state.portfolioAll.push(stock);
    },
    delAllPortfolio (state: any) {
      state.portfolioAll = [];
    },
    delPortfolio (state: any, data: any) {
      const temp = clone(state.portfolioAll);

      remove(temp, (item: any) => {
        return (item.id === data.id && item.type === data.type);
      });

      state.portfolioAll = temp;
    },
    setType(state: any, type: any) {
      state.type = type;
    }
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
    getType(state: any) {
      return state.type;
    }
  },
  actions: {
    loadPortfolioAll({state, commit}: any, stock: any) {
      commit('setPortfolioAll', stock);
    },
    delAllPortfolio ({ commit }: any) {
      commit('delAllPortfolio');
    },
    delPortfolio ({ commit }: any, data: any) {
      commit('delPortfolio', data);
    }
  }
};
