# A1: Options API diagnosis

Budget: about 10 minutes. This is a guided code-reading drill. The snippet is not mounted or executed in the tracker, and does not establish Vue 2 runtime behavior.

Options API puts component state in the object returned by `data()`, derived values in `computed`, handlers in `methods`, and startup work in lifecycle hooks such as `created` or `mounted`. Ordinary methods access component state through `this`. These categories describe where code belongs; they are not one-to-one equivalents of React hooks.

A wholesale orders page has two reports:

1. Clicking **Mark paid** throws an error.
2. After the click-handler issue is repaired, the pending count still does not decrease.

Assume both orders are valid synthetic records, the API is irrelevant to this drill, and no network work occurs here.

```vue
<script>
const initialOrders = [
  { id: 'PO-101', customer: 'Cedar Retail', status: 'pending' },
  { id: 'PO-102', customer: 'Harbor Stores', status: 'paid' }
]

export default {
  data() {
    return {
      orders: initialOrders.map(order => ({ ...order })),
      pendingOrders: initialOrders.filter(order => order.status === 'pending')
    }
  },
  methods: {
    markPaid: (id) => {
      const order = this.orders.find(order => order.id === id)
      if (order) order.status = 'paid'
    }
  }
}
</script>

<template>
  <section>
    <p>Pending orders: {{ pendingOrders.length }}</p>
    <button type="button" @click="markPaid('PO-101')">Mark paid</button>
  </section>
</template>
```

Your task: identify the cause of each report, describe the smallest repair for each, and give one check that would verify the pending-count behavior. Keep the Options API structure. Reply with your diagnosis first; no application rewrite is needed.

The intended behavior is a count of 1 initially and 0 after marking PO-101 paid, with no click error and no independently synchronized copy of the pending orders.
