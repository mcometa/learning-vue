import { afterEach, describe, expect, test } from 'vitest'
import Vue from 'vue'
import { createApi, seedOrders } from '../src/api.js'
import { createStore } from '../src/store.js'
import { createOrdersPage } from '../src/OrdersPage.js'

const pages = []
afterEach(() => {
  pages.forEach(page => page.$destroy())
  pages.length = 0
})

function setup() {
  const api = createApi({ delayMs: 0 })
  const store = createStore(api)
  const page = new Vue({ ...createOrdersPage(api), store })
  pages.push(page)
  return { api, store, page }
}

describe('trusted API controls', () => {
  test('lists three synthetic records and returns independent copies', async () => {
    const api = createApi({ delayMs: 0 })
    const first = await api.listOrders()
    expect(first).toEqual(seedOrders())
    first[0].customer = 'Changed locally'
    expect((await api.listOrders())[0].customer).toBe('Cedar Retail')
  })

  test('a failed save leaves server data intact and the next attempt can succeed', async () => {
    const api = createApi({ delayMs: 0 })
    api.failNextSave()
    await expect(api.markPaid('WS-201')).rejects.toThrow('Payment service unavailable')
    expect((await api.listOrders())[0].status).toBe('pending')
    await expect(api.markPaid('WS-201')).resolves.toMatchObject({ id: 'WS-201', status: 'paid' })
  })
})

describe('order screen behavior', () => {
  test('refresh loads records and exposes the correct initial pending count', async () => {
    const { page, store } = setup()
    await page.refresh()
    expect(Vue.version).toBe('2.7.16')
    expect(store.state.orders.loading).toBe(false)
    expect(page.orders).toEqual(seedOrders())
    expect(page.pendingCount).toBe(2)
  })

  test('search ignores letter case and surrounding whitespace', async () => {
    const { page } = setup()
    await page.refresh()
    page.search = '  cEdAr  '
    expect(page.visibleOrders.map(order => order.id)).toEqual(['WS-201'])
  })

  test('whitespace-only search acts like an empty search', async () => {
    const { page } = setup()
    await page.refresh()
    page.search = '   '
    expect(page.visibleOrders).toHaveLength(3)
  })

  test('search and status filtering both apply without changing stored records', async () => {
    const { page } = setup()
    await page.refresh()
    page.search = 'Stores'
    page.status = 'pending'
    expect(page.visibleOrders).toHaveLength(0)
    page.status = 'paid'
    expect(page.visibleOrders.map(order => order.id)).toEqual(['WS-202'])
    expect(page.orders).toHaveLength(3)
  })

  test('selection summary updates on the same page when a row is toggled twice', async () => {
    const { page } = setup()
    await page.refresh()
    expect(page.selectedIds).toEqual([])
    page.toggleSelected('WS-201')
    await Vue.nextTick()
    expect(page.selectedIds).toEqual(['WS-201'])
    page.toggleSelected('WS-201')
    await Vue.nextTick()
    expect(page.selectedIds).toEqual([])
  })

  test('a confirmed payment updates existing computed summaries without a refresh', async () => {
    const { page, store } = setup()
    await page.refresh()
    expect(page.pendingCount).toBe(2)
    page.status = 'pending'
    expect(page.visibleOrders).toHaveLength(2)
    await page.markPaid('WS-201')
    await Vue.nextTick()
    expect(store.state.orders.items[0].status).toBe('paid')
    expect(page.pendingCount).toBe(1)
    expect(page.visibleOrders.map(order => order.id)).toEqual(['WS-203'])
    expect(page.notice).toBe('Payment saved.')
  })

  test('a successful save action returns the confirmed server record', async () => {
    const { page, store } = setup()
    await page.refresh()
    await expect(store.dispatch('orders/markPaid', 'WS-201')).resolves.toMatchObject({ id: 'WS-201', status: 'paid' })
    expect(store.state.orders.saving).toBe(false)
  })

  test('a failed payment releases saving state and preserves records', async () => {
    const { page, api, store } = setup()
    await page.refresh()
    const before = structuredClone(seedOrders())
    api.failNextSave()
    await store.dispatch('orders/markPaid', 'WS-201').catch(() => {})
    expect(store.state.orders.items).toEqual(before)
    expect(store.state.orders.saving).toBe(false)
    expect(store.state.orders.error).toContain('Payment service unavailable')
  })

  test('a failed payment is observable as a rejection by action callers', async () => {
    const { page, api, store } = setup()
    await page.refresh()
    api.failNextSave()
    await expect(store.dispatch('orders/markPaid', 'WS-201')).rejects.toThrow('Payment service unavailable')
  })

  test('a failed payment does not show success feedback and can be retried', async () => {
    const { page, api, store } = setup()
    await page.refresh()
    api.failNextSave()
    await page.markPaid('WS-201')
    expect(page.notice).toBe('')
    expect(store.state.orders.items[0].status).toBe('pending')
    await page.markPaid('WS-201')
    expect(store.state.orders.error).toBe(null)
    expect(store.state.orders.saving).toBe(false)
    expect(page.notice).toBe('Payment saved.')
    expect(store.state.orders.items[0].status).toBe('paid')
  })
})
