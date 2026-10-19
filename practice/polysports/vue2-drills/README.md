# A2a: selection changes, computed result stays stale

Budget: 10–15 minutes. Repair only `src/order-selection.js` and explain the cause. The fixture is deliberately faulty.

This isolated package uses Vue 2.7.16, chosen for practice. It does not establish the employer's version. The tests create real Vue instances and exercise reactivity without a browser or DOM. They use Node's built-in test runner; a later drill will cover the interview's Vitest workflow. The tracker and its Vue 3 dependencies are separate.

Run from the repository root:

```sh
npm --prefix practice/polysports/vue2-drills test
```

Reported symptom: selecting PO-101 changes its `selected` property to true, but `selectedIds` remains empty even after the next update tick.

Acceptance:

- All three tests pass.
- Selecting PO-101 makes `selectedIds` contain exactly PO-101.
- Selecting it again clears the derived selection.
- Both original order records remain present.
- Keep the computed property and Options API. Do not use force-update calls or manually maintain a second selection array.

Start by reading the failing assertion and tracing the mutation back to the initial data. Explain why changing the source property does not invalidate the computed result in this Vue version.
