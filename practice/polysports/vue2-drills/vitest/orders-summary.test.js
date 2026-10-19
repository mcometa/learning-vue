import { afterEach, expect, test, vi } from 'vitest'
import Vue from 'vue'
import { createOrdersStore } from '../src/orders-store.js'
import ordersSummaryPage from '../src/orders-summary-page.js'

const pages = []

afterEach(() => {
  for (const page of pages) page.$destroy()
  pages.length = 0
})

function records() {
  return [
    { id: 'PO-101', customer: 'Cedar Retail', status: 'pending' },
    { id: 'PO-102', customer: 'Harbor Stores', status: 'paid' }
  ]
}

function createPage(api) {
  const store = createOrdersStore(api)
  const page = new Vue({ ...ordersSummaryPage, store })
  pages.push(page)
  return { store, page }
}

test('loading calls the API once and updates the Vuex records and pending getter', async () => {
  expect(Vue.version).toBe('2.7.16')
  const response = records()
  const api = { listOrders: vi.fn().mockResolvedValue(response) }
  const { store, page } = createPage(api)

  await page.loadOrders()

  expect(api.listOrders).toHaveBeenCalledTimes(1)
  expect(store.state.orders.items).toEqual(response)
  expect(store.getters['orders/pendingCount']).toBe(1)
})

test('loaded orders reach the component and its pending count', async () => {
  const api = { listOrders: vi.fn().mockResolvedValue(records()) }
  const { page } = createPage(api)
  expect(page.orders).toHaveLength(0)

  await page.loadOrders()
  await Vue.nextTick()

  expect(page.orders).toHaveLength(2)
  expect(page.pendingCount).toBe(1)
})

test('a refresh elsewhere in the app updates the same component without recreating it', async () => {
  const api = { listOrders: vi.fn().mockResolvedValue([]) }
  const { store, page } = createPage(api)

  store.commit('orders/setOrders', records())
  await Vue.nextTick()
  expect(store.state.orders.items).toHaveLength(2)

  const refreshed = [{ id: 'PO-103', customer: 'Maple Retail', status: 'paid' }]
  store.commit('orders/setOrders', refreshed)
  await Vue.nextTick()

  expect(page.orders).toEqual(refreshed)
  expect(page.pendingCount).toBe(0)
  expect(api.listOrders).not.toHaveBeenCalled()
})
