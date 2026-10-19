# A4: the store loads, but the summary page stays empty

Budget: 15–20 minutes. This is guided debugging, not a mock. Repair only `src/orders-summary-page.js`.

Reported behavior: fetching orders succeeds and the Vuex pending getter is correct, but the summary component still has no orders. A refresh elsewhere in the app also fails to reach that component.

The existing orders store and synthetic API are trusted. Do not rewrite their code, change the tests, recreate the component to refresh it, force updates, or manually synchronize a duplicate orders array. The summary should remain connected to the shared records throughout its lifetime.

## Running and reading the tests

From the repository root:

```sh
npm --prefix practice/polysports/vue2-drills run test:vitest
```

This runs Vitest once and exits. The existing Node test suite remains available through the original test script. This drill uses Vitest 4.1.6, Vue 2.7.16, and Vuex 3.6.2, chosen for practice. Employer versions remain unknown.

The test is `vitest/orders-summary.test.js`. Read its setup, action, and expectation before inspecting the component.

- `test(description, function)` names a behavior to check.
- `expect(actual).toHaveLength(2)` means the actual array should contain two elements.
- `vi.fn().mockResolvedValue(records)` supplies a synthetic async API function and records calls, so no server is required.
- Expected is what the requirement says should happen; received/actual is what the code produced.

Your investigation:

1. State what the passing test proves about the API and Vuex store.
2. Read the first failing assertion. State the expected and actual values.
3. Trace where the component gets its records and when that connection is established.
4. Make the smallest justified fix in the component.
5. Run the Vitest checks and the previous regression suite.

Acceptance: all three Vitest checks pass, all thirteen earlier Node checks still pass, and the same component reflects both its own load and later store replacements. Explain the cause and why your fix keeps the view connected to current store data.

These tests exercise real component instances, Vue reactivity, and Vuex in a Node environment. They do not mount a DOM or verify browser rendering. A browser-level mock remains separate practice.

Docs: [Vitest guide](https://vitest.dev/guide/) and [mock functions](https://vitest.dev/api/mock.html).
