# Vue learning log

The topic and exercise roadmap is in `CURRICULUM.md`. Entries below are chronological; the latest checkpoint describes the current next task.

## 2026-10-09, Session 1, Learn mode

- App root: `/Users/marc/Workspace/my_projects/learning-vue`.
- Planned session: three hours, including breaks and checkpoint.
- Setup: official bare Vue 3 and TypeScript starter. No exercise implementation added.
- Setup verification: `npm run build` passed, including type checking. Local development server started at http://127.0.0.1:5173/. Browser interaction has not been verified.
- Demonstrated understanding: not assessed yet.
- Assistance: tutor handled project setup only.
- Remaining mistakes: not assessed yet.
- Next exercise, 10–15 minutes: in `src/App.vue`, display a reactive application status initially set to `applied`, add a button that changes it to `interviewing`, and add a reset button that restores `applied`. Use Composition API, script setup, and Vue template event bindings. Check both transitions in the browser, then request review.
- Next teaching topic after review: typed synthetic application records and a seeded list with `v-for` and stable keys.

## Session 1, first exercise review

- Marc implemented the tracker heading, a status ref, a shared update handler, and both buttons.
- Browser verification: initial `applied`, Start interview changes it to `interviewing`, Reset restores `applied`.
- Demonstrated in code: ref mutation through `.value`, template interpolation without `.value`, and template event expressions passing arguments. Verbal explanation is pending.
- Verification: `npm run build` failed because `src/App.vue:8` has TS7006, an implicitly-any `status` parameter. Vite bundling succeeded, but the overall build did not pass.
- Assistance: tutor reviewed and exercised the UI; no practice source was changed. Suggested a shared status union for the ref and handler.
- Exact next task, about 5 minutes: define a status union for `applied` and `interviewing`, use it to type the ref and update-handler parameter, then request review again. Expand to all five application statuses when building the application model.
- Pending checkpoint question after the correction: why does the script use `.value` while the template does not?

## Session 1, typing follow-up

- Marc added the status union, typed the ref and handler, and asserted the initial value with `as StatusType`.
- Verification: `npm run type-check` passed.
- Marc reported taking longer than five minutes because typing the constant and ref was unfamiliar. Treat future estimates as scope guides; allow learning time for unfamiliar syntax.
- Assistance: direct explanation of type aliases versus interfaces, constant bindings versus mutable ref values, and annotation versus assertion.
- Next checkpoint: explain why a `const` ref can still have its `.value` changed. Optional correction: replace `as StatusType` on INITIAL_STATUS with a checked annotation or use literal inference.

## Session 1, status typing review

- Reviewed current App.vue. StatusType restricts the ref and update-handler parameter to `applied` or `interviewing`.
- Verification: `npm run type-check` passed again. Browser behavior was verified in the first review; it was not rerun for this typing review.
- No blocking issues for the first exercise. INITIAL_STATUS still uses `as StatusType`; a checked annotation remains a suggested improvement.
- No practice source changed by the tutor.
- Exact next checkpoint: predict whether assigning `offered` to jobApplicationStatus.value compiles, and explain why. Then proceed to the typed seeded list exercise.

## Session 1, status checkpoint and seeded list task

- Marc correctly explained that assigning `offered` is rejected because the current union contains only `applied` and `interviewing`.
- Next exercise, 20–30 minutes as a scope guide: replace the single-status demo in App.vue with a typed reactive seeded list. Expand StatusType to all five statuses. Define JobApplication with required string id, company, role, applicationDate, typed status, and optional string jobUrl and notes. Seed three synthetic records with distinct IDs and varied statuses. Render a semantic list with company, role, status, and date using v-for and each record's ID as its key. Keep fields optional where specified and keep styling minimal.
- Assistance: short introduction to v-for and stable keys; no practice implementation supplied.

## Session 1, seeded list review

- Completed in code: five-status union, JobApplication interface, optional jobUrl and notes, typed applications ref, three distinct synthetic records, and v-for with each application ID as its key.
- Verification: production bundling and type checking passed through `npm run build`. Browser accessibility state confirms all three records display company, role, date, and status.
- Remaining issues: prior single-status ref/handler/constants and buttons remain, but their state is no longer displayed and they do not update any application record. Missing optional fields produce empty list items in the preview.
- Assistance: tutor reviewed actual files and preview; no practice source changed.
- Exact next exercise, about 10 minutes as a scope guide: remove the old single-status demo state, handler, and buttons; render optional field rows only when their values exist. Keep all required fields and stable ID keys. Request review after cleanup.
- Pending list checkpoint: explain why record IDs are preferable to array positions as keys when filtering or reordering.

## Session 1, seeded list cleanup review

- Completed: removed the old single-status state, handler, constant, and buttons. Added conditional rendering for jobUrl and notes.
- Verification: `npm run build` passed, including type checking. Browser inspection confirms all three records remain visible, missing optional fields leave no empty bullets, and old buttons are gone.
- Demonstrated in code: optional properties and conditional template rendering, typed reactive array, and stable ID keys.
- Assistance: tutor identified cleanup issues in the prior review; Marc implemented the changes. No practice source changed by the tutor.
- No blocking issues in the current list exercise.
- Exact next checkpoint: explain why application.id is preferable to the array index as the key when filtering the list. Following topic: company/role search using v-model and computed.

## Session 1, key explanation and search task

- Marc chose application.id based on React experience and recognized uniqueness. Tutor clarified that React allows index keys, but filtering or reordering can attach a position-based key to a different record. Stable identity, as well as uniqueness among siblings, matters.
- Next exercise, 20–30 minutes as a scope guide: add a labelled Search applications input bound to a searchQuery ref using v-model. Derive filteredApplications with computed from applications and searchQuery. Match company or role case-insensitively, trim surrounding query whitespace, show all records for an empty query, render the computed list, and show No applications match your search when there are no matches. Preserve the original applications array.
- Assistance: tutor introduced v-model and computed dependency tracking; no search implementation supplied.

## Curriculum addition

- Marc requested Vue 2 to Vue 3 migration concepts as the final curriculum topic. Recorded in CURRICULUM.md, awaiting the details he will provide next time.
- No migration lesson or implementation started. Current exercise remains Session 1, exercise 1.4, company and role search.

## 2026-10-10, Session 1, search review

- Reviewed actual App.vue. Marc added searchQuery with v-model, a computed filtered list, and an empty-result message. He switched applications to a reactive array; direct array access is correct for this state choice.
- Verification: `npm run build` passed, including type checking. Browser tests confirmed full-name matching ignores case and surrounding whitespace, unmatched queries show the empty message, and clearing the input restores all three records.
- Browser failures: `CEDAR`, `vue`, and ` cedar ` return no matches because predicates use exact equality. A spaces-only query returns no matches because the empty-query branch checks raw input rather than normalized input.
- Accessibility issue: visible Filter text is not an associated input label; the textbox has no accessible name in the preview.
- Cleanup suggestion: remove unused hasResults/some and console.log from the computed getter; the result length already supports the empty state.
- Assistance: tutor identified failures and suggested substring matching and normalizing once before branching. No practice source changed.
- Exact next exercise, about 10–15 minutes as a scope guide: normalize the query once, treat a normalized empty query as no filter, match company or role by substring, associate a visible Search applications label with the input, and remove the unused debug pass. Then request review. Exercise 1.4 remains incomplete.

## 2026-10-10, Session 1, search correction review

- Marc changed equality checks to includes, associated the input label, and removed the unused some/log pass.
- Browser verification: CEDAR, vue, and surrounding-space queries match the intended records; unmatched input shows the empty message; spaces-only and empty input show all three records. The input now has an accessible name.
- `npm run build` failed type checking: TS2367 at App.vue:49 compares the trim function to a string without calling it; TS18048 at App.vue:81 reports possible undefined because of the bare return in the computed getter. Vite bundling succeeded.
- Current runtime whitespace behaviour succeeds through includes with an empty string; the new guard never runs. Once the guard is corrected, it must return applications rather than undefined.
- Assistance: tutor supplied a small normalized-query and early-return snippet after the second attempt, and asked Marc to use that query in both predicates. No practice source changed.
- Exact next exercise, about 10 minutes as a scope guide: normalize searchQuery.value by calling trim and toLowerCase once, return applications when that normalized query is empty, use the normalized query in both includes calls, remove the redundant raw-input branch, and request review. Exercise 1.4 remains incomplete until type checking passes.

## 2026-10-10, Session 1, search acceptance review

- Marc fixed the trim call and returns applications for normalized empty input. The computed getter always returns an array.
- Verification: `npm run build` passed, including type checking. Browser cases passed for CEDAR, vue, surrounding-space input, unmatched input, spaces-only input, and clearing the input. Clearing restores all records; the source array is not mutated by filtering. Label association remains correct.
- No blocking issues. Optional cleanup: normalize once and remove the redundant raw-input branch and fallback; not required to complete this exercise.
- Assistance: completed after tutor review feedback and a small early-return snippet; independent filtering rebuild remains planned in exercise 1.7. No practice source changed by the tutor.
- Exercise 1.4 is reviewed complete. Exact next checkpoint: explain what Vue tracks in filteredApplications that makes typing update results without a dependency array. After the explanation, assign exercise 1.5, combined search and status filter.

## 2026-10-10, Session 1, dependency checkpoint and status filter

- Marc correctly identified searchQuery as a computed dependency. Tutor clarified that Vue tracks searchQuery.value and, while filtering, the reactive array reads and company/role properties. This was a partial explanation, supplemented by the tutor.
- Exact next exercise, 20–30 minutes as a scope guide: add a labelled status select with All and all five application statuses, bind it to a typed ref accepting StatusType or all, and default to all. Extend filteredApplications so a record must match both the search criterion and selected status, with all skipping the status restriction. Empty search still respects status. Preserve source records, keep a no-matches message accurate for combined filters, and add Reset filters to clear the search and restore all.
- Acceptance cases: vue plus interviewing shows Harbor Systems; cedar plus interviewing shows no results; empty search plus offered shows Maple Studio; Reset filters restores all three records. Keep distinct accessible labels for search and status.
- Assistance: select v-model introduction and acceptance cases only. No practice source changed.

## 2026-10-10, Session 1, status filter review

- Marc added a labelled status select, combined filtering, and Reset. Source records remain intact.
- Verification: `npm run build` passed, including type checking. Browser tests passed for vue/interviewing, cedar/interviewing, empty query with offered or applied, rejected and withdrawn empty states, All with a spaced mixed-case search, spaces-only search with offered, and Reset. DOM inspection confirmed Reset clears the query and sets status to all; all three records return.
- Type-model correction: StatusType includes all, which wrongly allows JobApplication.status to be all. The selected status ref is inferred as string and is not restricted to the filter values. Keep the five domain statuses and use StatusType | all for the filter ref.
- Logic cleanup: !status checks the ref object and is always false, so the first guard never executes. Remove that guard; existing filter branches already handle empty search.
- Minor cleanup: remove default on the All option; v-model state supplies selection. Prefer an empty message referring to filters because status alone can exclude everything.
- Assistance: tutor identified type ownership and ref-object versus inner-value issues. No practice source changed.
- Exact next exercise, about 10–15 minutes as a scope guide: restore StatusType to five application statuses, type the selected filter ref as StatusType | all, remove the dead guard and default attribute, and request review. Exercise 1.5 remains pending these corrections.

## 2026-10-10, Session 1, status filter correction review

- Marc restored StatusType to five application statuses, restricted the filter ref to StatusType | all, removed the dead ref-object guard, and removed the default attribute on the All option.
- Verification: `npm run build` passed, including type checking. This review inspected source and ran project checks; browser cases passed in the previous review and were not repeated because these changes do not alter the working filter paths.
- No blocking issues for exercise 1.5. Optional copy improvement remains: refer to filters rather than search in the no-matches message. Repeated query normalization and filter logic can be simplified during the independent rebuild exercise.
- Assistance: completed after tutor feedback and a small typed-ref example. No practice source changed by the tutor.
- Exercise 1.5 is reviewed complete. Exact next checkpoint: explain why all is part of the filter type but not JobApplication.status. After that, assign exercise 1.6, total, per-status, and visible-result counts using computed values.

## 2026-10-10, Session 1, filter-type checkpoint and counts

- Marc correctly explained that JobApplication.status cannot be all. The tutor clarified that all is a filter choice rather than an application's actual status.
- Exact next exercise, 15–25 minutes as a scope guide: derive and display the total application count, counts for each of the five statuses, and a Showing X of Y summary using computed values. Total and per-status counts use the complete applications array; X uses filteredApplications and Y uses the complete total. Show zero counts explicitly, preserve current search/filter behaviour, and do not store counters that require manual synchronization.
- Acceptance with current seeds: total 3; applied 1, interviewing 1, offered 1, rejected 0, withdrawn 0. vue/interviewing shows 1 of 3, cedar/interviewing shows 0 of 3, Reset shows 3 of 3; per-status counts remain unchanged during filtering.
- Assistance: tutor introduced computed aggregates and specified acceptance counts; no implementation supplied or practice source changed.

## 2026-10-10, Session 1, counts review

- Marc added inline per-status counts and a Showing X of Y summary. All five status counts include zeros and use the full applications array; visible count uses filteredApplications.
- Browser verification: correct status totals 1,1,1,0,0; vue/interviewing shows 1 of 3, cedar/interviewing shows 0 of 3, Reset shows 3 of 3. Status totals stay unchanged during filtering. The separate total sentence has no number.
- `npm run build` failed with TS2339 at App.vue:70: totalAppliationCount is not declared. Vite bundling succeeded.
- Learning objective still pending: counts are computed inline in the template, not through computed declarations. Inline expressions do update reactively; they are not inherently incorrect, but this exercise specifically practises named computed aggregates.
- Assistance: tutor identified the undeclared total and requested named computed values for total, visible count, and an object containing all five status counts. No practice source changed.
- Exact next exercise, about 10–15 minutes as a scope guide: add these computed declarations in script setup, use a consistent totalApplicationCount name, and update template bindings to read them. Keep status totals based on applications and visible count based on filteredApplications. Request review. Exercise 1.6 remains incomplete.

## 2026-10-10, Session 1, counts follow-up review

- Marc replaced the undeclared total binding with applications.length. Build and type checking now pass. Browser inspection confirms the total sentence displays 3 and the summary displays Showing 3 of 3.
- Computed aggregate declarations have not been added; total, visible count, and per-status expressions remain inline in the template. Prior browser filter/count cases remain applicable because those expressions were not changed.
- Assistance: tutor supplied the small totalApplicationCount computed declaration and template binding as an example, then asked Marc to apply that pattern to visible count and the status-count object. No practice source changed.
- Exact next exercise: move the count calculations into named computed values in script setup and render those values in the template. Exercise 1.6 remains incomplete; build now passes.

## 2026-10-10, Session 1, computed counts acceptance review

- Marc added totalApplicationCount, visibleApplicationCount, and statusCounts as computed values. The template reads the computed results. All getters derive values without mutating source state.
- Verification: `npm run build` passed, including type checking. Browser tests passed: total 3 and status counts 1,1,1,0,0 remain unchanged during filtering; vue/interviewing shows 1 of 3, cedar/interviewing shows 0 of 3, Reset shows 3 of 3.
- No blocking issues. The five filter calls in statusCounts are acceptable for this small practice app; no optimization requested.
- Assistance: completed after review feedback and a small computed-total example. Independent rebuilding remains pending. No practice source changed by the tutor.
- Exercise 1.6 is reviewed complete. Exact next checkpoint: with empty search and interviewing selected, predict total, visible, and status counts if Cedar Labs changes from applied to interviewing. After that, assign exercise 1.7, independently rebuild the combined filtering getter without copying its implementation.

## 2026-10-10, Session 1, counts prediction and independent rebuild

- Marc correctly predicted that Cedar Labs would appear in the interviewing-filtered list because applications is reactive. The tutor supplied the remaining predicted counts: total 3, visible 2, applied 0, interviewing 2, offered 1, rejected 0, withdrawn 0. Full numerical prediction was not independently demonstrated.
- Exact next exercise, 20–30 minutes as a scope guide: replace only filteredApplications' getter, rebuilding without copying or viewing the current body. Normalize search once per getter evaluation and use one filter call combining company/role matching with the selected status. Preserve source records, controls, reset, and computed counts. Empty/whitespace query imposes no search restriction; all imposes no status restriction. Test earlier matching, no-match, combined-filter, and reset cases.
- Marc may consult official docs. Try the first attempt without solution hints; any requested assistance will be recorded. After implementation, request review with a short explanation of tracked reactive reads. No practice source changed by the tutor.

## 2026-10-11, Session 1, normalization clarification

- Marc asked what normalize means. Tutor explained converting search input to a consistent comparison form by removing surrounding whitespace and lowercasing, using a standalone string example.
- For this exercise, calculate that comparison value once inside the computed getter before filtering and reuse it. Preserve the displayed input and original records.
- Assistance: conceptual clarification only; no combined-filter implementation supplied. Current task remains exercise 1.7, independent filtering rebuild.

## 2026-10-11, Session 1, filtering rebuild review

- Marc normalized the query once inside the computed getter and reused it. The implementation still chains two filter calls, so the one-filter exercise requirement is not yet satisfied.
- Verification: `npm run build` passed, including type checking. Browser tests passed for case-insensitive partial search, combined match and mismatch, empty search with offered/rejected, spaces-only search with All/interviewing, unmatched search, Reset, and correct visible/status counts.
- The All branch returns -1 from the second filter predicate. This keeps items because -1 is truthy, but a boolean clearly expresses keep/drop intent.
- Assistance: normalization clarification before this attempt; review feedback now suggests separate boolean search/status matches combined within one predicate. No full combined-filter solution supplied and no practice source changed. Whether the previous implementation was consulted is not independently observable.
- Exact next exercise, about 10 minutes as a scope guide: combine search and status conditions into one filter callback returning a boolean, preserve normalization once and tested behaviour, then request review with a short explanation of tracked reactive reads. Exercise 1.7 remains pending structure and explanation.

## 2026-10-12, Session 1, single-filter acceptance review

- Marc now uses one filter call, normalizes the query once per computed evaluation, and returns boolean conditions for All or a specific status. Both search and status are respected.
- Verification: `npm run build` passed, including type checking. Browser cases passed for mixed-case spaced partial search, combined match and mismatch, empty query with offered/rejected, spaces-only input with All/interviewing, unmatched search, Reset, visible counts, and unchanged full-collection status counts.
- No blocking code issues. Duplicate search expressions between All and specific-status branches could be simplified, but this is optional and does not warrant another correction loop.
- Assistance: implemented after normalization clarification and review hints about combining conditions and boolean returns. Independent recall without those hints has not been established. No practice source changed by the tutor.
- All Session 1 coding exercises are reviewed. Exact next checkpoint: name the reactive values read in filteredApplications and explain why changing the status dropdown updates its results. After that, close the Session 1 checkpoint and assign Session 2 exercise 2.1, component boundaries with typed props and events.

## 2026-10-12, Session 1 checkpoint

- Completed and reviewed: reactive status/events, typed state, seeded list with optional fields and stable keys, company/role search, combined status filter/reset, computed counts, and a filtering rebuild using one filter call and query normalization once.
- Latest verification: build and type checks passed; browser matching, whitespace, no-match, combined filtering, reset, and count cases passed.
- Demonstrated in code: Composition API state, template bindings/directives, typed refs, and computed derived lists/counts. Verbal explanations correctly identified status-union constraints, actual status versus All filter choice, query dependency, and reactive record changes affecting list membership.
- Final explanation: Marc named applications and status reads but described changing application values based on status. Tutor clarified that v-model updates status.value and Vue recalculates filteredApplications from tracked reads, including searchQuery.value, rather than changing the stored applications.
- Assistance used: typing explanations and snippets, review feedback on matching/whitespace/labels and ref reads, computed-count example, normalization definition, boolean predicate hint, and dependency-tracking clarification. Independent recall across all concepts is not established.
- No blocking code mistakes remain. Recall still useful for .value versus template unwrapping, const ref mutation, stable key identity, and source versus derived state. Minor copy/formatting cleanup is optional.
- Session 1 content is complete with assistance noted. Elapsed study time was not measured; this checkpoint does not assert use of the planned three hours.

## Session 2, exercise 2.1 assigned

- Objective: typed props/events and parent-owned state.
- Exact next exercise, 25–35 minutes as a scope guide: export StatusType and JobApplication from src/types.ts; create src/components/JobApplicationList.vue and move list/empty-state rendering into it. Declare a typed applications prop using defineProps and pass filteredApplications from App.vue. Keep records, filters, reset, and counts in the parent.
- Add a native Select button per row with the company in its label. Declare a typed select event with a string application-ID payload using defineEmits. Parent handles it, stores selectedApplicationId, and displays the selected ID. Full detail display comes in exercise 2.3.
- Acceptance: filtering and counts retain current behaviour; child reads the prop without mutating it or owning duplicate record state; selecting different rows updates the displayed ID in the parent; build/type checking pass.
- Assistance: brief introduction to compiler macros and custom-event flow, with official docs; no implementation supplied and no practice source changed.

## 2026-10-12, initial commit checkpoint

- Baseline: working Session 1 tracker with three synthetic records, company/role search, combined status filtering, Reset, and computed total/status/visible counts.
- Verification for this checkpoint: `npm run build` passed, including type checking. Previous browser reviews verified filtering, empty states, Reset, and counts; those UI checks were not repeated for the commit.
- Session 1 is reviewed with assistance documented. Source-versus-derived-state explanations still need recall practice.
- Current task remains Session 2 exercise 2.1: shared types, list extraction, typed props/events, and parent-owned selection. It has not been implemented yet.
- The curriculum, learning log, and project tutoring contract accompany the baseline. Machine-local instructions are not part of the repository AGENTS.md.
