# A2b: stored order changes, pending result stays stale

Budget: 5–10 minutes. Repair only `src/order-replacement.js`. Keep your successful A2a repair intact.

Vue 2 does not detect array-element replacement through an index assignment. It observes array mutation methods such as splice, and can also track replacement of a declared array property with a new array. The existing-property fix from A2a addresses a different limitation.

The JavaScript splice method takes a starting index, a number of elements to remove, and any elements to insert. Vue 2 observes the resulting array mutation. Vue 2 also supports this.$set for reactive indexed replacement.

Reported symptom: after applying a response that marks PO-101 paid, orders[0].status contains paid, but the computed pendingIds still contains PO-101.

Run from the repository root:

```sh
npm --prefix practice/polysports/vue2-drills run test:replacement
```

Acceptance:

- All three replacement tests pass.
- Applying the known response removes PO-101 from pendingIds without deleting its source record.
- Preserve the other order and ignore unknown response IDs.
- Keep pendingIds computed. Do not force updates or manually synchronize a second pending list.

Use the smallest justified change in applyOrderUpdate and explain which Vue 2 limitation it fixes. These are real Vue 2.7.16 reactivity tests without a browser or DOM. The trusted response is synthetic; no API implementation is involved.
