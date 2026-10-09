# Vue interview practice curriculum

## Purpose and schedule

Prepare Marc, an experienced React and TypeScript engineer, to build and explain a small Vue application during an interview. Use the Job Application Tracker for guided practice, followed by independent variations and timed mocks.

The employer uses Vue and Laravel, but its versions and exam format are unknown. This is our preparation plan, not a claim about the employer's exam.

Use five core sessions of three hours each within one calendar week. Reserve the other two days for other interview preparation, rest, or targeted catch-up. Sessions need not be consecutive. The total allocation is 15 hours, including breaks and checkpoints.

Each session has three 50-minute work blocks, two 10-minute breaks between blocks, and a final 10-minute checkpoint. Exercise estimates guide scope; they are not speed targets. Adapt to available time and observed gaps. Preserve full CRUD and at least one timed mock before adding optional ecosystem work.

## How to read progress

- Reviewed: implemented by Marc and checked by the tutor. This does not establish independent recall or mastery.
- Assigned: the exercise has been given, but the result has not been reviewed.
- Planned: the exercise has not yet been assigned.
- Assistance and verification details belong in `LEARNING_LOG.md`.

Current position: Session 1, exercise 1.1, reactive status practice.

## Session 1: reactive state and derived lists

| Exercise | Topics and task | Acceptance or checkpoint | Status |
| --- | --- | --- | --- |
| 1.0 Setup | Minimal Vue 3, TypeScript, SFC, and script setup app | App builds and local preview starts; tutor handles setup only | Reviewed |
| 1.1 Reactive status | `ref`, `.value`, interpolation, and `@click`; change and reset one status | Both transitions work in the browser | Planned |
| 1.2 Typed state | String unions, `type` versus `interface`, annotations versus assertions, typed refs and handler arguments | Type checking passes; Marc correctly predicts rejection of a status outside the union | Planned |
| 1.3 Seeded list | Typed application model, reactive array, `v-for`, stable ID keys, optional fields, and `v-if` | Three synthetic records render required fields; missing optional fields leave no empty bullets; old demo controls removed | Planned |
| 1.4 Search | Labelled input, `v-model`, and `computed`; search company or role | Ignore case and surrounding whitespace; empty query shows all; unmatched query shows an empty message; preserve source records | Planned |
| 1.5 Status filter | Typed select value and combined derived filtering | All option shows every status; search and status conditions both apply; controls can be reset | Planned |
| 1.6 Counts | Derived totals and counts for all five statuses | Counts reflect the full application collection; visible result count reflects active filters | Planned |
| 1.7 Independent rebuild | Rebuild filtering without copying the first implementation; explain dependency tracking | Behaviour still passes; identify which reactive reads make the computed value update | Planned |

Use short checkpoints to practise ref access, const bindings, dependency tracking, and stable key identity after implementation.

Suggested blocks: state/model/list; search/filter/counts; independent rebuild and debugging. Current exercises may take longer, so move unfinished work to the next session if needed.

## Session 2: component ownership, creation, and details

| Exercise | Topics and task | Acceptance or checkpoint | Status |
| --- | --- | --- | --- |
| 2.1 Component boundaries | Move list rendering into a component; practise typed props and events | Parent owns application records; child requests changes through events | Planned |
| 2.2 Validated creation | Form draft, field bindings, validation, submit event, and reset | Required values are valid; invalid submission leaves records unchanged; valid submission creates one unique record | Planned |
| 2.3 List/detail selection | Selection by ID and a detail view | Select a record and display its fields without duplicating the stored record | Planned |
| 2.4 Data-flow debugging | Diagnose an introduced parent/child ownership mistake | Explain the problem and repair it independently | Planned |

Suggested blocks: recall and component extraction; creation and validation; selection, debugging, and explanation.

## Session 3: editing, cancellation, and deletion

| Exercise | Topics and task | Acceptance or checkpoint | Status |
| --- | --- | --- | --- |
| 3.1 Separate edit draft | Prefill an edit form without mutating the saved record | Typing leaves saved data unchanged; valid save updates the intended record | Planned |
| 3.2 Cancellation | Discard draft changes and reopen editing | Cancel preserves saved data; reopening starts from the current saved record | Planned |
| 3.3 Confirmed deletion | Confirm or cancel a delete request; maintain selection | Cancel preserves the record; confirm deletes only that record; selected detail remains valid | Planned |
| 3.4 Independent CRUD variation | Rebuild an edit or delete path without copied code | Full local CRUD works; explain state ownership and draft separation | Planned |

Suggested blocks: edit drafts and validation; cancellation and deletion; independent rebuild and complete CRUD check.

## Session 4: async behaviour, persistence, and tests

| Exercise | Topics and task | Acceptance or checkpoint | Status |
| --- | --- | --- | --- |
| 4.1 Mock service and persistence | Async mock operations backed by local persistence | Saved CRUD changes survive reload; synthetic data and storage failures have defined behaviour | Planned |
| 4.2 Visible request states | Loading, empty, submitting, failure, and retry | Users can distinguish states; repeated submits do not duplicate records; failure preserves useful input; retry recovers | Planned |
| 4.3 Behaviour tests | Add a small number of meaningful tests with tooling chosen for the project | Test important user-visible success and failure paths, such as cancellation or failed save and retry | Planned |
| 4.4 Isolated stale-request exercise | Deliberately resolve requests out of order | Older results do not replace newer results; explain the protection used | Planned |

Suggested blocks: mock service and storage; failures and recovery; behaviour tests and isolated stale-request practice. Finish pending CRUD before optional abstractions.

## Session 5: independent mocks and verbal practice

| Exercise | Topics and task | Acceptance or checkpoint | Status |
| --- | --- | --- | --- |
| 5.1 Mock A | Independent minimal CRUD requirement, 40–45 minutes | Review correctness, Vue understanding, failure handling, clarity, and explanation after the attempt | Planned |
| 5.2 Repair and recall | Repair demonstrated weak areas and answer verbal Vue questions | Explain fixes and earlier concepts without relying on copied answers | Planned |
| 5.3 Mock B | Different frontend requirement, 40–45 minutes | Apply Vue concepts to a new task; use the same review dimensions | Planned |
| 5.4 Final checkpoint | Record demonstrated strengths, assistance, and remaining gaps | Identify concrete further practice; completion alone does not establish interview readiness | Planned |

Agree on docs and AI-completion rules before each mock. During an attempt the tutor does not edit code or reveal fixes through checks. Requested hints are allowed and recorded as assistance. Marc reports elapsed time.

Use the first and third work blocks for mocks and the middle block for repair and verbal questions.

## Final topic: Vue 2 to Vue 3 migration concepts

Status: noted, awaiting details from Marc.

Add a concepts-focused migration lesson after the existing curriculum. Marc will provide more context next time. Specific coverage, exercises, and time allocation remain undecided; do not begin this lesson yet or assume a migration implementation task.

## Deferred scope

Router, Pinia, advanced slots, Nuxt, SSR, and Laravel/backend implementation stay deferred unless employer information requires them or time remains after the core work. Styling stays secondary to usable, labelled controls.

## Maintenance

At the start of a session, read this curriculum and the learning log. Update exercise status after reviews and record the exact next exercise in the log. Mark independent performance separately from work completed with hints. Adjust the remaining plan when time or employer information changes, without silently expanding scope.
