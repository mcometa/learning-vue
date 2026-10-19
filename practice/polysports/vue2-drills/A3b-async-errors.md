# A3b: failed load leaves the page loading and looks successful to its caller

Budget: 10–15 minutes. Repair only the load action in `src/orders-async-store.js`. Earlier accepted exercises stay intact.

TanStack Query manages request statuses for you. In this Vuex exercise, loading and error are ordinary declared state fields. The load action must coordinate them through the provided synchronous mutations.

`store.dispatch` exposes the action's returned promise. If the action catches an API rejection and returns a value, its caller sees successful completion with that value. For this exercise, the contract requires both a stored error message and rejection with the original error, so the caller can handle failure too. Other application contracts may deliberately consume errors; do not assume every caught error must always be rethrown.

An async action can use normal JavaScript try/catch/finally. Finally is useful for cleanup that must run after success or failure. This is request cleanup; nextTick does not wait for the network request.

Reported symptoms:

- After the API rejects, the error message is stored but loading remains true.
- A caller awaiting dispatch receives successful completion even though the request failed.

Run from the repository root:

```sh
npm --prefix practice/polysports/vue2-drills run test:async
```

Acceptance:

- All four async tests pass.
- Loading is true while the API is pending, then false after either outcome.
- Success stores and returns the received records.
- Failure preserves previous records, stores the message, and rejects with the original error.
- Retrying clears the old error; successful retry stores fresh records.
- Keep state writes in mutations and repair only the action. Do not change the tests or suppress the rejection contract.

Tests run real Vue 2.7.16/Vuex 3.6.2 instances without a DOM. The API is a trusted synthetic stub. No new dependencies are needed.
