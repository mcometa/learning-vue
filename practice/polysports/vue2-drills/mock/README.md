# Wholesale order debugging mock

Time budget: 55 minutes, followed by review. Start your own timer once you have read this brief and can open the app.

This is a synthetic practice exercise, not the employer's code or a prediction of its issues. Use the supplied Vue 2.7.16, Vuex 3.6.2, Vite 7.3.1, and Vitest 4.1.6. The existing package installs are shared with earlier drills; all mock source and tests are isolated in this folder.

## Run

From the learning-vue repository root:

```sh
npm --prefix practice/polysports/vue2-drills run mock:dev
npm --prefix practice/polysports/vue2-drills run test:mock
```

Open http://127.0.0.1:5174/. The tutor may already have started the server. Tests can be focused using Vitest's `-t` option, for example append `-- -t "refresh loads"` to the test command.

## Situation

The operations team reports unreliable behavior on the wholesale order screen:

- Customer search sometimes misses records they expect to find.
- Row selection and payment summaries sometimes disagree with the latest interaction.
- Failed payment saves can leave confusing feedback and prevent further work.

Investigate, prioritize, and repair what you can. You are not expected to fix every issue. Explain what you observe, your hypothesis, the check you will make, and what the result establishes.

## Expected behavior

- Initial loading shows three orders and two pending payments.
- Search matches customer names without regard to case or surrounding whitespace. Whitespace-only search shows all records. Search and status filtering both apply, without changing the stored records.
- Selection summaries reflect toggles immediately and can be toggled off again.
- A successful payment uses the confirmed API record and updates the displayed row and summaries without requiring Refresh.
- A failed save preserves records, exposes its error, releases the saving state, and allows retry. Action callers can distinguish failure from success. The page shows success feedback only after success.

## Boundaries and verification

- `src/api.js` is the trusted backend substitute. Its failure switch is intentional. Do not edit it or change the test expectations to hide failures.
- Repair frontend source under `mock/src/`. Preserve the existing runtime, store ownership, and component structure; avoid unrelated rewrites. Do not change earlier drills or the tracker.
- `OrdersPage.js` uses Options API; `StatusFilter.js` uses Composition API with setup. These are JavaScript component definitions with runtime-compiled templates, not SFCs or script setup. Docker and Laravel are omitted from this local mock.
- Vitest tests run real Vue/Vuex instances in Node. They verify state, computed values, and action contracts. They do not mount the DOM or exercise every browser interaction. Check the original browser flows too. A successful build alone does not establish correct behavior.
- Documentation and web search are allowed. Disable AI inline completion for an independent attempt. The tutor will not provide solutions, edit exercise source, or run diagnostic checks during your attempt. A requested hint is allowed and will be recorded as assistance.
- Use your own timer and report elapsed time. Reserve the last five minutes to review your changes and evidence.

## Handoff

When time is up, stop editing and send `review`, your elapsed time, and a short account of your priorities, verified repairs, and remaining issues. Review will cover correctness, Vue understanding, failure handling, clarity, and explanation. No independent-readiness claim follows from test count alone.
