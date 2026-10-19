# PolySports interview sprint

Updated October 20, 2026. Interview reported by Marc: Tuesday, October 20, 2026. Exact interview time is unknown.

## What the supplied brief establishes

- A live, screen-shared debugging session lasting about 75–90 minutes, with roughly 10 minutes of startup and 50–55 minutes of debugging.
- A Vue 2 B2B wholesale back-office, mostly Options API, with some Composition API and `<script setup>`. Vuex and tooling are in scope. Exact versions are not supplied.
- Vite, Vitest via `npm test`, Docker, and an interviewer-supplied `./up.sh`. The Laravel API works and can be trusted; do not spend practice time implementing PHP or MySQL features.
- Reasoning, communication, investigation, and prioritization matter more than fixing every issue. Some tests expose real bugs.
- Documentation and web search are allowed. The brief does not establish whether AI assistance is allowed during the interview. Practise the mock without AI fixes or hints unless Marc requests assistance, then record it.

These are practice priorities, not predictions about the hidden bugs. The employer code is not available yet.

## Scope change

Park tracker exercise 2.2 and the remaining full-CRUD sequence until after the interview. Keep all existing work intact. The latest reviewed tracker version still has typing, URL validation, ID ownership, reset, and accessibility corrections pending; no new build was run for this planning change.

Keep the useful Vue 3 knowledge from the tracker: props/events, source versus derived state, computed tracking, template bindings, and parent ownership. Add the legacy and diagnostic skills that the actual session requires.

## Time allocation

Use the previously agreed maximum of three hours per study day. These blocks are scope limits, not speed tests. Work on one exercise at a time.

| Day | Time | Focus |
| --- | --- | --- |
| Sunday, October 18 | 50 min | Options API orientation and bug diagnosis, then Vue 2 reactivity caveats |
| | 10 min | Break |
| | 50 min | Trace component → Vuex action → mutation → state/getter → component; namespacing and asynchronous loading/error behavior |
| | 10 min | Break |
| | 50 min | Guided debugging of small synthetic wholesale issues; read a failing Vitest test, reproduce, fix, verify, and check related behavior |
| | 10 min | Checkpoint and exact Monday starting point |
| Monday, October 19 | 50 min | A2b array-replacement drill, up to 10 minutes, then Vuex flow and async debugging, about 40 minutes |
| | 10 min | Break |
| | 40 min | Failing Vitest investigation, about 20 minutes, and mixed API/migration reasoning, about 20 minutes |
| | 10 min | Break |
| | 55 min | Independent debugging mock in an unfamiliar synthetic Vue 2 wholesale frontend, with existing tests and a trusted mock API |
| | 15 min | Review the strongest evidence and remaining gaps; final checkpoint and logistics |
| Tuesday, October 20 | Optional 15–20 min | Recall the investigation routine and verify setup; leave sufficient time before the interview and avoid new topics |

If time is shorter, shorten guided repetitions before removing the timed mock. Do not expand into backend implementation or unrelated ecosystem tools.

The Monday allocation was revised on resumption because only A1 and A2a had been reviewed. These are remaining-work budgets, not claims that the planned Sunday blocks occurred or that three hours remain available at every turn.

## Exercises and evidence

| ID | Task | Acceptance | Status |
| --- | --- | --- | --- |
| A1 | Read an Options API component and diagnose stale derived data and a handler failure | Identify both causes, propose minimal changes, and describe a verification check; code-reading only | Reviewed with explanation and verification guidance; independent cause recall pending |
| A2 | Repair Vue 2 object/array updates | Reproduce and fix missing-property or indexed-array reactivity using an actual Vue 2 runtime; explain version-specific behavior | A2a and A2b reviewed after API guidance; all six tests pass; mechanism explained with React/Vue 3 comparison |
| A3 | Trace and repair Vuex flow | Read state/getters/mutations/actions and namespaces; verify success and rejection paths, loading cleanup, and returned promises | A3a and A3b reviewed with assistance; all thirteen tests pass |
| A4 | Guided failing-test investigation | Explain a test's user-visible expectation, reproduce the defect, make a small fix, and run relevant regression checks | Reviewed with demonstrated solution and React comparison; independent understanding unconfirmed |
| B1 | Mixed API and migration diagnosis | Check actual versions before choosing a fix; explain a safe staged migration with dependency checks and tests | B1a source repair accepted with explicit guidance; B1b verbal plan reviewed with dependency, API-style, and verification gaps explained |
| B2 | Independent 55-minute debugging mock | Prioritize, investigate aloud, fix what time permits, and present evidence and remaining issues | Code accepted with assistance: original API restored, twelve tests pass, browser flows verified; elapsed time and reasoning debrief pending |
| B3 | Repair and verbal review | Re-explain weak concepts and independently repair a variation | Short verbal recall reviewed: correct error prediction and splice choice, with argument clarification; no independent executed variation |

Current checkpoint: Marc ended tutoring on October 20 to rest before the interview. Stop drills and do not prompt the unanswered drill 12 checkpoint unless he explicitly resumes. Saved next question, if requested before the interview: what to inspect when component orders has three records but visibleOrders has zero. After the interview, begin with his account of actual tasks/outcomes. B2 is accepted with twelve tests passing and browser flows verified, with assistance recorded; elapsed time unknown. Recall results and remaining gaps are in LEARNING_LOG.md. Personal Teams/Devtools setup is unverified. No reminder or autonomous follow-up scheduled.

## Technical coverage

- Options API: `data()`, `computed`, `methods`, `watch`, lifecycle hooks, component `this`, props, events, and local draft ownership. Read before considering a rewrite.
- Vue 2 reactivity: new object properties, array index assignment, reactive alternatives, declared state, and DOM-update timing. Vue 2.7 Composition API still uses Vue 2 reactivity.
- Vuex: state/getters, synchronous mutations, asynchronous actions, `commit` versus `dispatch`, namespaces, reactive store reads versus local snapshots, and mutation ownership.
- Async behavior: return/await promises, reset loading in failure paths, preserve useful errors, prevent stale responses from replacing current results when relevant.
- Tooling: read package versions, entry point, Vite configuration and aliases, console errors, Network requests, store modules, and test scripts. Diagnose build errors before changing dependencies.
- Migration discussion: dependency/plugin compatibility; bootstrap changes; component `v-model` contract; removed filters and instance event APIs; lifecycle changes; slots/listeners/attrs; and relevant render-function changes. Use the official checklist as a lookup, not a memorization exercise.
- Consider `@vue/compat` only after checking whether dependencies and the app are eligible. Plan small verified steps and a rollback path. Working Options API components do not need a wholesale Composition API rewrite just to move runtimes.

## Investigation routine

1. Establish versions, startup instructions, entry point, and available tests. Run the supplied baseline checks.
2. Reproduce one concrete symptom. State the observed behavior and expected behavior.
3. Follow the relevant path through component, store, and response data. Use console, Network, Devtools, and tests to test a hypothesis.
4. State the evidence supporting the cause. Make the smallest justified repair.
5. Run the targeted check, reproduce the original flow again, and check related behavior. Then decide the next issue by impact and confidence.

Narrate in short sentences: observation, hypothesis, next check, result. If a test is green but the UI is still wrong, investigate the mismatch rather than declaring success. Avoid speculative refactors and dependency upgrades.

## Local logistics checked October 18

- Docker CLI 27.4.0 and Compose v2.31.0-desktop.2 are available.
- Docker daemon reports 27.4.0. `docker run --rm hello-world` printed its success message. This is a local Docker smoke check, not verification of the employer application.
- Local images `mysql:8` and `php:8.5-cli` are already present. No base-image downloads were needed. About 30 GiB of host space was reported; Docker's internal disk allocation was not checked.
- Teams webcam, full-screen sharing, and no blurred/virtual background still need a personal rehearsal. Vue Devtools extension availability was not checked.
- Employer repository access, `./up.sh`, and its Vitest suite cannot be checked before the code is supplied.

## Documentation

- [Vue 2 computed properties](https://v2.vuejs.org/v2/guide/computed.html) and [methods](https://v2.vuejs.org/v2/api/#methods).
- [Vue 2.7 migration notes](https://v2.vuejs.org/v2/guide/migration-vue-2-7.html). Vue 2.7 includes Composition API and `<script setup>`; syntax alone does not establish a Vue 3 runtime.
- [Vue migration build](https://v3-migration.vuejs.org/migration-build.html). Compatibility behavior has dependency and runtime limits; it is not a universal upgrade switch.
- [Vuex 3 actions](https://v3.vuex.vuejs.org/guide/actions.html) and [module namespaces](https://v3.vuex.vuejs.org/guide/modules.html#namespacing).
- [Vitest getting started](https://vitest.dev/guide/) and [mock functions](https://vitest.dev/api/mock.html).

Maintain exercise status here and record assistance, actual verification, remaining gaps, and the exact next task in `LEARNING_LOG.md`.
