import assert from 'node:assert/strict'
import test from 'node:test'
import Vue from 'vue'
import orderReplacement from '../src/order-replacement.js'

function createPage(t) {
  const vm = new Vue(orderReplacement)
  t.after(() => vm.$destroy())
  return vm
}

test('pending IDs initially contain only PO-101', t => {
  const vm = createPage(t)
  assert.deepEqual(vm.pendingIds, ['PO-101'])
})

test('applying a paid order response updates the derived pending IDs', async t => {
  const vm = createPage(t)
  assert.deepEqual(vm.pendingIds, ['PO-101'])
  const otherOrder = vm.orders[1]

  vm.applyOrderUpdate({ id: 'PO-101', customer: 'Cedar Retail', status: 'paid' })
  assert.equal(vm.orders[0].status, 'paid', 'the stored order should contain the response')
  await Vue.nextTick()
  assert.deepEqual(vm.pendingIds, [], 'the paid order should leave the pending result')
  assert.equal(vm.orders.length, 2)
  assert.equal(vm.orders[1], otherOrder, 'the unrelated order should be preserved')
})

test('an unknown response ID leaves the existing orders unchanged', async t => {
  const vm = createPage(t)
  const originalIds = vm.orders.map(order => order.id)
  assert.deepEqual(vm.pendingIds, ['PO-101'])

  vm.applyOrderUpdate({ id: 'PO-999', customer: 'Unknown Retail', status: 'paid' })
  await Vue.nextTick()
  assert.deepEqual(vm.orders.map(order => order.id), originalIds)
  assert.deepEqual(vm.pendingIds, ['PO-101'])
})
