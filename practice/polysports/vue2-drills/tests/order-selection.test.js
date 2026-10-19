import assert from 'node:assert/strict'
import test from 'node:test'
import Vue from 'vue'
import orderSelection from '../src/order-selection.js'

function createPage(t) {
  const vm = new Vue(orderSelection)
  t.after(() => vm.$destroy())
  return vm
}

test('the drill runs against Vue 2.7.16', () => {
  assert.equal(Vue.version, '2.7.16')
})

test('both orders start unselected', t => {
  const vm = createPage(t)
  assert.deepEqual(vm.selectedIds, [])
  assert.equal(vm.orders.length, 2)
})

test('selecting and deselecting an order updates the derived selection', async t => {
  const vm = createPage(t)
  assert.deepEqual(vm.selectedIds, [])

  vm.toggleSelection('PO-101')
  assert.equal(vm.orders[0].selected, true, 'the source property should change')
  await Vue.nextTick()
  assert.deepEqual(vm.selectedIds, ['PO-101'], 'derived selection should include the selected order')

  vm.toggleSelection('PO-101')
  await Vue.nextTick()
  assert.deepEqual(vm.selectedIds, [], 'toggling again should clear selection')
  assert.equal(vm.orders.length, 2, 'selection should preserve the order records')
})
