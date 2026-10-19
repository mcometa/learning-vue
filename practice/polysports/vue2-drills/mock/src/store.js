import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore(api) {
  return new Vuex.Store({
    strict: true,
    modules: {
      orders: {
        namespaced: true,
        state: () => ({ items: [], loading: false, saving: false, error: null }),
        getters: {
          pendingCount(state) {
            return state.items.filter(order => order.status === 'pending').length
          },
          selectedIds(state) {
            return state.items.filter(order => order.selected).map(order => order.id)
          }
        },
        mutations: {
          setOrders(state, orders) { state.items = orders },
          setLoading(state, value) { state.loading = value },
          setSaving(state, value) { state.saving = value },
          setError(state, message) { state.error = message },
          toggleSelected(state, id) {
            const order = state.items.find(item => item.id === id)
            const index = state.items.findIndex(order => order.id === id)

            if (order) {
              state.items.splice(index, 1, {...order, selected: !order.selected})
            }
          },
          replaceOrder(state, updated) {
            const index = state.items.findIndex(order => order.id === updated.id)
            // console.log(index, state.items[index])
            if (index !== -1) state.items.splice(index, 1, updated)

              // state.items[index] = updated
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
          },
          async markPaid({ commit }, id) {
            commit('setSaving', true)
            commit('setError', null)
            try {
              const updated = await api.markPaid(id)
              commit('replaceOrder', updated)
              return updated
            } catch (error) {
              commit('setError', error.message)
              throw error
            } finally {
              commit('setSaving', false,)
            }
          }
        }
      }
    }
  })
}
