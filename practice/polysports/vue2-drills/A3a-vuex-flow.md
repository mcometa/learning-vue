# A3a: the page requests orders, but no API call starts

Budget: 10 minutes. Read `src/orders-store.js` and `src/orders-page.js`. Repair only `orders-page.js`. The store and synthetic API are trusted for this first drill.

This practice package uses Vue 2.7.16 and Vuex 3.6.2. These are chosen exercise versions, not confirmed employer versions. Tests use actual Vue/Vuex instances without a DOM.

## Vocabulary

| Part | Responsibility |
| --- | --- |
| State | Shared stored data, here the order items |
| Getter | Derived value, here pendingCount |
| Mutation | Synchronous state update, here setOrders |
| Action | Coordinates work, including async API calls, here load; commits mutations to update state |

`dispatch` invokes an action. `commit` invokes a mutation. This distinction applies even if their names happen to match. Mutations must stay synchronous so state transitions can be tracked clearly.

The store is injected into the component as `this.$store`. The orders module has `namespaced: true`, so its externally addressed action is `orders/load`, mutation is `orders/setOrders`, and getter is `orders/pendingCount`. Inside that module's action, the provided commit is already scoped to orders, so `commit('setOrders', records)` addresses its own mutation.

The request path is component → dispatch action → await API → commit mutation → state changes → getter/component computed values update. Components may also commit mutations directly for synchronous changes; an action is useful here because fetching is asynchronous.

The action returns a promise, and dispatch exposes its completion. Keeping the component method's return value lets its caller await loading. This waits for action completion, whereas nextTick waits for Vue's update cycle.

## Task

The page's loadOrders method is called, but no API call starts. Trace it to the store registration and make the smallest repair.

Run from the repository root:

```sh
npm --prefix practice/polysports/vue2-drills run test:vuex
```

Acceptance:

- All three Vuex tests pass.
- A component load request calls listOrders exactly once and can be awaited.
- The component exposes two loaded orders and pendingCount equals 1.
- Keep the existing store, getter, mutation ownership, and computed bindings.

After the repair, explain which action runs, which mutation changes the records, and how pendingCount reaches the component. Async loading/error cleanup is a follow-up exercise, not an extra requirement for this task.

Docs: [Vuex 3 actions](https://v3.vuex.vuejs.org/guide/actions.html) and [module namespaces](https://v3.vuex.vuejs.org/guide/modules.html#namespacing).
