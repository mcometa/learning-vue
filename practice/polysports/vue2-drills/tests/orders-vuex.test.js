import assert from 'node:assert/strict'
import test from 'node:test'
import Vue from 'vue'
import Vuex from 'vuex'
import { createOrdersStore } from '../src/orders-store.js'
import ordersPage from '../src/orders-page.js'

function records() {
  return [
    { id: 'PO-101', customer: 'Cedar Retail', status: 'pending' },
    { id: 'PO-102', customer: 'Harbor Stores', status: 'paid' }
  ]
}

function createPage(t, store) {
  const vm = new Vue({ ...ordersPage, store })
  t.after(() => vm.$destroy())
  return vm
}

test('the Vuex 3 store action loads records and updates its getter', async () => {
  assert.equal(Vuex.version, '3.6.2')
  const response = records()
  const store = createOrdersStore({ async listOrders() { return response } })

  await store.dispatch('orders/load')

  assert.deepEqual(store.state.orders.items, response)
  assert.equal(store.getters['orders/pendingCount'], 1)
})

test('component computed values follow committed store changes', async t => {
  const store = createOrdersStore({ async listOrders() { return [] } })
  const vm = createPage(t, store)
  assert.equal(vm.orders.length, 0)
  assert.equal(vm.pendingCount, 0)

  store.commit('orders/setOrders', records())
  await Vue.nextTick()

  assert.equal(vm.orders.length, 2)
  assert.equal(vm.pendingCount, 1)
})

test('the component load request calls the API once and exposes loaded orders', async t => {
  let calls = 0
  const response = records()
  const store = createOrdersStore({
    async listOrders() {
      calls += 1
      return response
    }
  })
  const vm = createPage(t, store)
  assert.equal(vm.orders.length, 0)

  const completion = vm.loadOrders()
  assert.equal(calls, 1, 'requesting orders should start one API call')
  assert.equal(typeof completion?.then, 'function', 'callers should be able to await loading')
  await completion

  assert.deepEqual(vm.orders, response)
  assert.equal(vm.pendingCount, 1)
})
