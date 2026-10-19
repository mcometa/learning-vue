import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createOrdersStore(api) {
  return new Vuex.Store({
    strict: true,
    modules: {
      orders: {
        namespaced: true,
        state: () => ({ items: [] }),
        getters: {
          pendingCount(state) {
            return state.items.filter(order => order.status === 'pending').length
          }
        },
        mutations: {
          setOrders(state, orders) {
            state.items = orders
          }
        },
        actions: {
          async load({ commit }) {
            const orders = await api.listOrders()
            commit('setOrders', orders)
            return orders
          }
        }
      }
    }
  })
}
