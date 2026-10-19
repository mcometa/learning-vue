import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createOrdersAsyncStore(api) {
  return new Vuex.Store({
    strict: true,
    modules: {
      orders: {
        namespaced: true,
        state: () => ({ items: [], loading: false, error: null }),
        mutations: {
          setOrders(state, orders) {
            state.items = orders
          },
          setLoading(state, loading) {
            state.loading = loading
          },
          setError(state, error) {
            state.error = error
          }
        },
        actions: {
          async load({ commit }) {
            commit('setLoading', true)
            commit('setError', null)

            try {
              const orders = await api.listOrders()
              commit('setOrders', orders)
              return orders
            } catch (error) {
              commit('setError', error.message)
              throw error
            } finally {
              commit('setLoading', false)
            }
          }
        }
      }
    }
  })
}
