import assert from 'node:assert/strict'
import test from 'node:test'
import { createOrdersAsyncStore } from '../src/orders-async-store.js'

function records() {
  return [{ id: 'PO-101', customer: 'Cedar Retail', status: 'pending' }]
}

function deferred() {
  let resolve
  const promise = new Promise(complete => { resolve = complete })
  return { promise, resolve }
}

test('a successful load stays pending until the API responds, then stores its data', async () => {
  const request = deferred()
  const store = createOrdersAsyncStore({ listOrders() { return request.promise } })
  let completed = false
  const completion = store.dispatch('orders/load').then(value => {
    completed = true
    return value
  })

  assert.equal(store.state.orders.loading, true)
  assert.equal(store.state.orders.error, null)
  await Promise.resolve()
  assert.equal(completed, false)

  const response = records()
  request.resolve(response)
  assert.deepEqual(await completion, response)
  assert.deepEqual(store.state.orders.items, response)
  assert.equal(store.state.orders.loading, false)
})

test('a failed load preserves previous orders, records an error, and stops loading', async () => {
  const failure = new Error('Orders service unavailable')
  const store = createOrdersAsyncStore({ async listOrders() { throw failure } })
  const previous = records()
  store.commit('orders/setOrders', previous)

  await store.dispatch('orders/load').catch(() => undefined)

  assert.deepEqual(store.state.orders.items, previous)
  assert.equal(store.state.orders.error, failure.message)
  assert.equal(store.state.orders.loading, false, 'loading should stop after rejection')
})

test('a failed load rejects so the caller can observe the original failure', async () => {
  const failure = new Error('Orders service unavailable')
  const store = createOrdersAsyncStore({ async listOrders() { throw failure } })

  await assert.rejects(store.dispatch('orders/load'), error => error === failure)
})

test('a successful retry clears the old error and updates the records', async () => {
  const request = deferred()
  let attempts = 0
  const store = createOrdersAsyncStore({
    listOrders() {
      attempts += 1
      if (attempts === 1) return Promise.reject(new Error('Temporary failure'))
      return request.promise
    }
  })
  await store.dispatch('orders/load').catch(() => undefined)
  assert.equal(store.state.orders.error, 'Temporary failure')

  const retry = store.dispatch('orders/load')
  assert.equal(store.state.orders.error, null, 'clear the previous error when retry begins')
  assert.equal(store.state.orders.loading, true)

  const response = records()
  request.resolve(response)
  assert.deepEqual(await retry, response)
  assert.deepEqual(store.state.orders.items, response)
  assert.equal(store.state.orders.error, null)
  assert.equal(store.state.orders.loading, false)
})
