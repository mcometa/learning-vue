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

## 2026-10-14, Session 2, component boundary review

- Marc exported StatusType and JobApplication in src/types.ts, extracted list and empty-state rendering into JobApplicationList.vue, passed filteredApplications as a prop, declared a select event with a string ID payload, and handled selection in App.vue. Records, filtering, counts, and selection stay in the parent; child reads the prop and emits without changing records.
- Browser verification: selecting Cedar Labs, Harbor Systems, and Maple Studio displays app-001, app-002, and app-003 in the parent. vue/interviewing shows Harbor Systems with 1 of 3; cedar/interviewing shows an empty child list and message with 0 of 3. Full status counts stay unchanged. Reset restores all three row buttons.
- `npm run build` failed type checking with TS2552 at JobApplicationList.vue:5, undefined JobApplications instead of the imported JobApplication, and TS7006 at App.vue:70, implicit-any id parameter. Vite bundling succeeded.
- The named parent handler needs its own string parameter annotation even though the child's emitted payload has a type. selectedApplicationId is parent-owned and may initially be undefined; this is acceptable for the current exercise.
- Assistance: tutor identified two typing errors. No practice source changed. Exercise 2.1 remains pending corrections.
- Exact next task: correct the prop type to JobApplication[] and annotate the parent handler's id parameter as string, then request review. After passing, explain why the child emits selection rather than owning or changing the parent's selected ID.

## 2026-10-14, Session 2, component boundary acceptance review

- Marc corrected the child prop to JobApplication[] and annotated the parent's selection handler parameter as string. Shared exported types and the typed select event agree on the record and ID shapes.
- Verification: `npm run build` passed, including type checking. Browser selection, prop-driven filtering, no-match rendering, reset, and counts were verified in the previous review; only type declarations changed in this correction, so UI checks were not repeated.
- No blocking issues. Parent owns records, filters, counts, and selection; child renders the received array and emits the selected ID without mutating records or owning duplicate source state.
- Assistance: two typing corrections identified by the tutor; Marc implemented them. No practice source changed by the tutor.
- Exercise 2.1 is reviewed complete. Exact next checkpoint: explain why JobApplicationList emits select rather than setting selectedApplicationId itself. Following exercise 2.2 introduces a separate creation draft, validation, and a typed create event handled by the parent.

## 2026-10-14, Session 2, ownership checkpoint and creation task

- Marc correctly described the existing communication path: child emits select and the parent updates selectedApplicationId. Tutor clarified that parent ownership is the design reason, even if the child could receive the selected ID as a prop.
- Exact next exercise, 40–50 minutes as a scope guide: create JobApplicationForm.vue with its own reactive draft and labelled controls for company, role, applicationDate, status, optional jobUrl, and optional notes. Company and role must be nonempty after trimming; date must be valid and present; status must be one of the five actual application statuses. If a URL is supplied, require an HTTP or HTTPS URL.
- Use @submit.prevent. Invalid input shows useful validation feedback, keeps entered values, and emits no create event. Valid input emits a typed create event carrying a fresh validated object without an ID. The parent generates a unique ID and adds exactly one new saved record. Reset the form after successful local creation; keep saved data separate from the draft.
- Acceptance: typing alone leaves list/counts unchanged; whitespace-only company/role and invalid optional URL cannot create a record; valid creation with blank optional fields adds one record and updates counts; a second creation preserves the first record and has a distinct ID. Reset list filters when checking a newly created record that an active filter might hide.
- Assistance: brief explanation of form draft ownership and @submit.prevent with official docs. No implementation supplied and no practice source changed.

## 2026-10-14, Session 2, props and emits syntax clarification

- Marc asked for alternatives to type-based defineProps and call-signature defineEmits, and reported that this syntax took time to understand.
- Tutor confirmed the current approach is valid, explained required prop types and event call signatures, and compared inline versus named prop contracts, Vue 3.3+ named-tuple emits, and runtime declarations. Installed Vue version checked: 3.5.43.
- Suggested retaining the current typed props and using the more readable named-tuple emits if preferred. Explained that a props binding is needed for script access, while the current unassigned defineProps call works for template access.
- Runtime array event declarations do not type-check payload arguments; type contracts do not replace form validation.
- Assistance: conceptual explanation and declaration alternatives only. No practice source changed. Current exercise remains 2.2, validated creation.

## 2026-10-14, Session 2, creation validation clarification

- Marc requested concrete validation expectations for exercise 2.2.
- Validate on submit with plain client-side checks and useful field feedback. Company and role must contain characters after trimming; applicationDate must be a nonempty real calendar date represented as YYYY-MM-DD; status must be one of the five actual application statuses. A blank optional jobUrl is accepted; a provided trimmed value must be an absolute valid HTTP/HTTPS URL. Notes are optional free text.
- Invalid submission preserves the draft, emits no create event, and leaves records/counts unchanged. Valid submission emits the fresh cleaned payload; outdated validation errors should clear after correction and resubmission.
- Assistance: clarified rules, examples, and failure behaviour only. No validation implementation supplied and no practice source changed. Current task remains exercise 2.2.

## 2026-10-14, Session 2, native validation approach

- Marc proposed native date/url input types and required attributes. Tutor accepted native browser constraints and messages for the exercise rather than requiring duplicate manual date or URL-syntax validation.
- Remaining rules beyond those attributes alone: required text can still contain only whitespace, so trim company/role and reject normalized empty values; URL syntax accepts schemes beyond HTTP/HTTPS, so constrain the optional URL protocol. The creation status select contains only the five actual statuses.
- Job URL and notes stay optional. Native validity must block normal submission when fields fail; the custom rules must also prevent creation and preserve the draft.
- Current task remains exercise 2.2. No practice source changed.

## 2026-10-16, Session 2, first creation-form review

- Reviewed JobApplicationForm.vue, App.vue, and shared types. Marc added local form bindings, @submit.prevent, date/URL input types, a URL pattern, and submit-time trimming. Creation is incomplete.
- Verification: npm run build failed type checking. Diagnostics include an incorrect ../../types import (the shared file is ../types), reactive called without an initial object, undefined errorMessage, and a computed value used as an input event handler. Making company and role optional in JobApplication also breaks the existing search's string reads. Vite bundling succeeded; this does not establish a working form. Browser validation, successful creation, and reset were not verified.
- State corrections: preserve required company/role fields in the saved record model, use an ID-free creation draft with explicit initial values, and read its string properties directly. formData.company.value, formData.role.value, and formData.jobUrl.value incorrectly treat strings on a reactive object as refs.
- Remaining validation gaps: company/role/date lack required attributes; trimmed empty text is not rejected; the creation status select includes all; two URL inputs bind the same property and one incorrectly makes the optional URL required. validateUrl is a computed getter with side effects and no returned value, rather than an event handler or pure derived error. Controls need associated labels and a status ID distinct from the parent's filter. The generic Object.keys trim loop also needs type-safe property access once the imported type is fixed; explicit cleaned fields would be simpler for this form.
- Submission currently logs the draft. No typed create event, parent listener/ID generation/insertion, fresh payload separation, or successful reset exists yet.
- Assistance: review explains reactive object properties versus ref.value, initial state versus a type annotation, saved-model required fields, and validation/event issues. No practice source changed by the tutor.
- Exact next task: repair the draft state and its bindings first (import, initialized ID-free object, direct string reads, required saved fields), then address the URL computed/handler and undefined error state so the build passes. Continue the same exercise with validation and parent-owned creation; do not advance to 2.3 yet.

## 2026-10-16, Session 2, creation-form follow-up review

- Marc corrected the import, initialized the reactive draft, removed incorrect property .value reads, restored required saved company/role fields, removed all from the creation status choices, moved active validation into submit, and wired a typed addJobApplication event to a parent handler. The emitted spread creates a separate object and parent insertion updates reactive counts.
- Verification: npm run build still fails type checking. The draft is typed as a complete JobApplication despite having no ID and using an empty-string status outside StatusType. reactive<object> hides the named validation-message fields from TypeScript. Object.keys yields string keys that cannot safely index JobApplication, the debug regex test accepts a possibly undefined jobUrl, and the emitted object defines an ID before spreading a type that also declares ID. Vite bundling passes separately.
- Browser verification at localhost:5173: empty submission displays four required-field errors and keeps 3 records; valid HTTPS URL is incorrectly rejected with the HTTP/HTTPS error; valid submission with blank URL/notes creates a trimmed Pine Review Labs record and updates totals to 4 and applied count to 2. A second Birch Review Studio submission preserves the first saved record, updates totals to 5 and applied count to 3, and receives a different numeric ID in this run. Whitespace-only company is rejected with totals unchanged at 5. Used typing and blur for lazy text bindings after automated fill did not commit them. Tests ran in a temporary tab with in-memory synthetic data.
- Remaining correctness issues: URL regex only permits http, rejecting https and some other valid HTTP URLs; form does not reset after success; generated IDs are numbers from only 900 possible values despite the saved string-ID contract, and the form generates them instead of the owning parent. Controls still lack associated labels and the creation select duplicates the filter's statusDropdown ID. Custom required checks cover empty values, so native required attributes are not mandatory where equivalent checks work. No additional manual date parser is required for the native date control in this exercise.
- Assistance: review recommends an ID-free draft and event payload, a real initial status such as applied, inferred or explicitly shaped validation-message fields, and explicit trimmed fields instead of a generic key loop. Parent should assign a unique string ID; keep the fresh object separation already implemented. Optional cleanup: unused errorMessage/isFormValid/validateForm and debug output.
- No practice source changed by the tutor. Exercise 2.2 remains reviewed with corrections pending. Exact next task: fix the draft/event and error-message types plus unsafe trim/debug accesses until npm run build passes; then correct HTTPS acceptance, parent ID generation, successful reset, and control labels before the next acceptance review.

## 2026-10-18, employer brief and focused interview sprint

- Marc reports the interview is Tuesday, October 20, and requests faster, more focused preparation. He supplied the PolySports candidate brief: 75–90 minute live debugging session, about 50–55 minutes of debugging after startup, Vue 2 wholesale back-office, Options API plus some Composition API/script setup, Vuex, Vite, Vitest, Docker, and a trusted working Laravel API. Exact dependency versions and hidden issues remain unknown. Docs/search are allowed; AI assistance rules are not stated.
- Replaced the active feature-building sequence with INTERVIEW_SPRINT.md. The original tracker curriculum remains as history and deferred work. Exercise 2.2 is paused with corrections pending, not complete. Full CRUD is no longer required before the debugging mock. Vuex and migration concepts are promoted into the active scope; backend implementation remains deferred.
- Plan uses the existing three-hour daily limit: Sunday Options API, Vue 2 reactivity, Vuex, and guided test-driven diagnosis; Monday mixed API/migration work, a 55-minute debugging mock, and targeted repair. Tuesday has only optional short recall and setup rehearsal. User has not reported actual available hours for these particular days; elapsed study time is not measured.
- Official documentation fetched through Context7 for Options API methods/computed behavior, Vue 2.7 backports, and migration-build limits. Clarified that script setup can run on Vue 2.7 and does not establish a Vue 3 runtime. The current tracker uses Vue 3; future Vue 2-specific tests must use an actual Vue 2 runtime.
- Setup verification: Docker CLI and daemon 27.4.0, Compose v2.31.0-desktop.2, and local mysql:8/php:8.5-cli images confirmed. docker run --rm hello-world printed its success message. About 30 GiB host disk space is available. This does not verify Docker disk allocation, Teams, camera/screen share, Vue Devtools, or the unavailable employer repository. Initial daemon reads were sandbox-denied; read-only checks and the smoke test succeeded with tool escalation.
- Tutor created a separate, deliberately faulty Options API code-reading drill in practice/polysports/01-options-api.md, without changing tracker source or installing packages. It is not runnable verification. It covers component this and derived data ownership; no repair solution supplied.
- Exact next exercise: A1, about 10 minutes. Marc identifies the causes of the click failure and stale pending count, describes the smallest Options API repairs, and gives a pending-count verification check. Review his diagnosis before assigning A2, actual Vue 2 reactivity debugging. Assistance is introductory Options API mapping and a symptom-based prompt; independent mastery is not established.

## 2026-10-18, A1 diagnosis feedback

- Marc proposed adding this to the template's pendingOrders and markPaid expressions and initially considered the method correct. This does not identify the two defects. Template names already resolve component members without an explicit this prefix.
- Tutor explained the arrow method's lexical this and supplied the small regular-method replacement. Explained that pendingOrders is initialized once from initialOrders, whereas orders contains cloned records, and supplied a computed getter based on this.orders with instructions to remove the duplicate data field.
- Documentation verified through Context7 for Vue 2 method binding, template event expressions, and computed filtered arrays. No exercise source changed or runtime checks performed. This remains assisted code-reading work, not independently repaired or executed behavior.
- Exact next checkpoint: Marc explains why placing pendingOrders in data does not keep its membership current, and proposes a check for the count changing from 1 to 0 after marking PO-101 paid. Then proceed to A2 with actual Vue 2 reactivity practice.

## 2026-10-18, A1 verification checkpoint and A2a setup

- Marc proposed inspecting order status and array values in Vue Devtools after clicking Mark paid. This is an appropriate inspection approach. Tutor made the expected result explicit: PO-101 becomes paid, pending membership becomes empty, displayed pending count changes from 1 to 0, and both source records remain. These are proposed checks, not browser observations. Cause recall is still assisted and needs a later variation; do not claim independent mastery.
- Created a separate exercise package at practice/polysports/vue2-drills with pinned Vue 2.7.16, an intentionally faulty Options API selection model, and three tests using Node's built-in runner. Tests use actual Vue instances and nextTick; no browser/DOM or Vitest setup is claimed. Existing tracker source and dependencies were not changed.
- Installed the separate practice dependency successfully. The first sandboxed attempt could not resolve the registry and was interrupted; the bounded retry with tool escalation succeeded. The legacy Vue version is intentional for the interview practice, not an inferred employer version.
- Verification: npm --prefix practice/polysports/vue2-drills test yields two passes and one expected failure. Runtime version and initial selection checks pass; selecting changes the source selected property to true, but computed selectedIds remains empty after nextTick. This establishes the intended broken baseline. git diff --check passes.
- Assistance for A2a: brief explanation that Vue 2 observes object properties during initialization, and a prompt to compare initial data with the assigned field. No repair supplied or applied. Official Vue 2 object change-detection documentation checked through Context7.
- Exact next task, about 10–15 minutes: Marc repairs only practice/polysports/vue2-drills/src/order-selection.js, keeps derived selection computed, makes all three tests pass without force-update or a manually synchronized selection array, and explains the cause. Array-index variation and Vuex follow after review.

## 2026-10-18, A2a acceptance review

- Marc added selected:false to each initial order and explained that the missing selected key needed to exist in each object. This correctly repairs the fixture while preserving the computed getter and the existing mutation method.
- Verification: npm --prefix practice/polysports/vue2-drills test passes all three tests against Vue 2.7.16. The behavior check covers selection, deselection, and preservation of both source records. No browser/DOM checks are claimed; the tutor changed no exercise source.
- Assistance before the attempt was the Vue 2 initialization explanation and initial-data comparison hint; Marc wrote the repair. Tutor reinforces that Vue 2 installs reactive getters/setters for initially present fields and explains this.$set as an alternative for adding a property to an observed nested object later. This is a Vue 2 caveat, not a general ban on mutating object fields.
- Exact next checkpoint: would nextTick alone have fixed the original bug, and why? The original failing test already awaited nextTick. Then assign A2b, a short actual Vue 2 array-index replacement variation, before Vuex.

## 2026-10-18, nextTick explanation and teaching adjustment

- Marc explicitly stated that he does not know what await this.$nextTick() does. The prior question introduced an unexplained API; this is not evidence of failed recall. Explain new Vue APIs before testing predictions about them, and answer this conceptual question directly without adding another quiz.
- Tutor explains that reactive state assignment takes effect immediately, while Vue batches DOM updates. Awaiting this.$nextTick() resumes after the pending Vue DOM update cycle, useful before reading or measuring updated DOM. It does not make a missing property reactive, force a render, or wait for a network request. A small async Options API method illustrates the timing.
- Checked the official Vue 2 instance API and async update queue documentation through Context7. No source changes or additional runtime checks were necessary. The A2a three-test passing result remains the latest verification.
- Exact next exercise remains A2b, a short Vue 2 array-index replacement variation, after this explanation. Do not require another nextTick prediction as a gate; comprehension is not independently established by receiving the explanation.

## 2026-10-19, resumption and A2b assigned

- Marc requested the next topic after the nextTick explanation. Proceed without another unexplained-API quiz. Tomorrow's interview makes remaining Vuex, test investigation, migration reasoning, and the timed mock priorities. Revised the Monday budget to 180 minutes including 20 minutes of breaks; this is a scope plan, not observed elapsed or remaining time.
- Added an isolated order-replacement Options API fixture and three existing behavior tests for Marc to debug, plus test:replacement and a short task description. The fixture applies a synthetic trusted order response through direct array-index replacement, leaving a previously evaluated computed pending result stale. No tracker or A2a repair source was changed; no new dependencies were installed.
- Verification: npm --prefix practice/polysports/vue2-drills test gives five passes and one expected failure against Vue 2.7.16. All three existing selection tests pass. New initial pending membership and unknown-ID checks pass; known response storage changes to paid but pendingIds remains PO-101, exposing the intended array reactivity bug. These are real reactivity tests without browser/DOM execution.
- Assistance: introduce Vue 2's indexed-array assignment limitation and the splice operation's arguments before asking for the repair; mention reactive indexed replacement and whole-array replacement as available approaches. Official Vue 2 array caveat documentation fetched through Context7. No replacement solution applied by the tutor.
- Exact next exercise, 5–10 minutes: repair applyOrderUpdate in practice/polysports/vue2-drills/src/order-replacement.js so the three replacement tests pass, preserving other records and ignoring unknown IDs. Keep pendingIds computed, avoid force-update/manual synchronization, and explain the Vue 2-specific cause. After review, begin Vuex action/mutation/state/getter tracing.

## 2026-10-19, A2b acceptance and reactivity comparison

- Marc replaced direct indexed assignment with this.$set(this.orders, index, updatedOrder), preserving the unknown-ID guard and computed pendingIds. The original statement remains commented out. The response object is stored directly rather than cloned; no caller-mutation issue is established in this exercise, and an extra correction loop is not required.
- Verification: npm --prefix practice/polysports/vue2-drills test passes all six tests against Vue 2.7.16. The three replacement checks cover initial pending membership, known response updating derived membership while preserving both records and the other record's identity, and ignoring unknown response IDs. The three earlier selection checks still pass. No exercise source changed by the tutor, and no DOM/browser verification is claimed.
- Marc asked why Vue requires this and compared direct indexed assignment with React. Tutor explains Vue 2's getter/setter observation and wrapped array mutation methods, whose notifications direct indexed replacement bypasses. Vue 3 uses proxies for reactive objects/arrays and can observe this assignment through the proxy. React current-state mutation alone does not schedule a render; changing a copied array and providing it through a state setter is valid.
- Checked official Vue 2, Vue 3, and React documentation through Context7. Assistance includes the earlier indexed-array caveat and $set/splice APIs, followed by the mechanism explanation. Marc wrote the successful repair; independent recall of the mechanism is not established.
- Exact next topic: A3 Vuex. Introduce state, getters, synchronous mutations, async-capable actions, commit versus dispatch, and the component-to-store flow before assigning a small tracing/repair task. Namespacing and async return/error handling should follow in small steps. No A3 fixture or dependency has been added yet.

## 2026-10-19, A3a Vuex introduction and request-flow task

- Marc requested the next topic. Tutor introduces shared state, derived getters, synchronous mutations invoked by commit, and async-capable actions invoked by dispatch. Explains component $store injection and the orders/ namespace used by the fixture; local commit inside the module already has that namespace. This is guided introduction, not a prior-knowledge test.
- Added Vuex 3.6.2 to the isolated Vue 2.7.16 practice package and installed it successfully. Exact employer versions remain unknown. Created a trusted namespaced orders store with an async load action, setOrders mutation, and pendingCount getter; an Options API component has a deliberately incorrect load request. Marc repairs only orders-page.js. API responses are synthetic and trusted, and no backend implementation is involved.
- Official documentation: Context7 queried for action/mutation flow and namespaces. Its constructor examples targeted Vuex 4, so checked the official Vuex 3 installation, actions, and modules pages as a version-specific fallback before implementation. The fixture uses Vue.use(Vuex) and new Vuex.Store.
- Verification: npm --prefix practice/polysports/vue2-drills test yields eight passes and one expected failure. Direct action loading and component computed bindings pass. The component request logs unknown mutation type orders/load and starts zero API calls instead of one. All six earlier reactivity tests still pass. Tests use actual Vue/Vuex instances and Node's test runner without browser/DOM execution; Vitest practice remains pending. No earlier exercise repair or tracker source was changed.
- Exact next exercise, about 10 minutes: read src/orders-store.js and repair only src/orders-page.js so npm --prefix practice/polysports/vue2-drills run test:vuex passes all three checks. A load request must call the API once, remain awaitable, expose two orders, and produce pendingCount 1. Explain which action runs, which mutation changes state, and how the getter reaches the component. Async loading/error cleanup is a follow-up, not an extra requirement now.

## 2026-10-19, Vuex mental model through TanStack Query

- Marc reports extensive recent use of TanStack Query for mostly server state, little recent Redux use, and no useful Vuex mental model. Do not rely on Redux recall or assume the initial vocabulary table established understanding. He asks for a direct conceptual comparison before continuing A3a.
- Tutor explains Vuex as shared reactive in-memory application state with explicit synchronous update handlers and actions that coordinate async work. Shared/centralized does not mean persisted across reloads. TanStack Query itself shares a query cache and manages server-state lifecycle concerns such as caching, stale data, request status, and refetching; comparable Vuex behavior needs application code rather than arising from storing a response.
- Maps query data to stored response data, queryFn coordination loosely to a load action, loading/error statuses to manually managed Vuex fields, and derived values to getters/computed reads. These are comparisons of responsibility, not equivalent APIs. Explicitly distinguishes a TanStack useMutation API request from a Vuex mutation, which synchronously changes local store state; server writes belong in Vuex actions.
- Official Vuex and TanStack Query documentation checked through Context7. No practice code changed or checks rerun for this explanation. The previous baseline remains eight passes and one intentionally failing A3a request test; no repair from Marc has been reviewed yet.
- Exact next task remains A3a after the explanation: trace the component's loadOrders request into the registered load action and setOrders mutation, repair orders-page.js, and run test:vuex. Do not add another quiz or switch his practice app to TanStack Query to answer this question.

## 2026-10-19, dispatch/commit caller versus target clarification

- Marc highlighted apparent inconsistency between actions being invoked through dispatch and an action using commit. Tutor clarifies that the invocation method describes the target: the component dispatches the load action, and that running action commits the setOrders mutation. The mutation then assigns state.items. An action's body can invoke mutations without changing how the action itself is invoked.
- Use explicit caller/call/target examples from the actual orders module instead of repeating only the abstract category table. State/getters are read rather than invoked. Official Vuex action/context documentation checked through Context7 and the current orders-store.js inspected. No source changed or runtime checks rerun; A3a remains pending, with the prior eight-pass/one-failure baseline.
- Exact next task remains the existing A3a component request repair. The clarified component dispatch example gives direct guidance for the faulty line; record the eventual repair as assisted, not an independent diagnosis.

## 2026-10-19, A3a acceptance review

- Marc changed loadOrders to return this.$store.dispatch('orders/load') and correctly explained that actions are dispatched and mutations are committed. The namespace and return value are preserved, so callers can await the action's promise.
- Verification: npm --prefix practice/polysports/vue2-drills test passes all nine tests. The three Vuex checks verify the direct store action, computed component bindings after a commit, and the repaired component request calling the API once and exposing two orders with pendingCount 1. All six reactivity checks still pass. No source changed by the tutor and no browser/DOM verification claimed.
- Assistance: initial vocabulary and namespace explanation, TanStack Query comparison, and explicit caller/target clarification that showed the repaired dispatch call. Marc implemented the change and now states the distinction correctly; independent recall beyond this example remains untested. No blocking issue remains in A3a.
- Exact next checkpoint: identify which function actually writes state.items in the existing flow. Then introduce A3b, a small async loading/error cleanup task that preserves useful data and makes completion/rejection observable. No A3b fixture has been created or assigned yet.

## 2026-10-19, mutation call versus assignment checkpoint

- Marc identified both the setOrders mutation handler and commit('setOrders', orders) as candidates for the state-writing step. Tutor distinguishes the registered handler that performs state.items = orders from the commit call that asks Vuex to invoke it. Vuex supplies the module state and forwards the orders payload to the handler.
- This clarifies the call/implementation boundary; independent recall is still developing. No source changed and no checks rerun. The latest suite result remains nine passing tests. Exact next topic is A3b async loading/error handling after this explanation; the fixture is not yet assigned.

## 2026-10-19, explicit handoffs and A3b assigned

- Marc requested a clearer teaching handoff: after an exercise, explicitly state completion or required corrections, recommend the next named topic, and ask whether to proceed. He should not have to manage the sequence. Saved this preference in AGENTS.md. If he already says next/proceed, continue without another confirmation. He explicitly authorized continuing in this turn.
- A3a is complete with its prior assistance recorded. The exact state-writer answer was given directly after Marc requested it: the setOrders mutation, specifically state.items = orders. Do not leave that clarification as another pending gate or claim independent recall.
- Created a separate A3b orders-async-store.js fixture and four Node behavior tests, plus test:async. Earlier repairs and tracker source are intact; no new dependencies. The deliberately faulty action returns an empty array after storing an error and only clears loading on success. The exercise requires caller-visible rejection and loading cleanup after either outcome.
- Verification: npm --prefix practice/polysports/vue2-drills test gives eleven passes and two expected failures. All earlier nine checks pass. New pending/success and successful-retry checks pass; failure cleanup leaves loading true and the rejection check reports missing expected rejection. Tests exercise actual Vue 2.7.16/Vuex 3.6.2 without a DOM.
- Assistance before the attempt: explain that loading/error are manually managed state fields, dispatch follows the action promise, catch returning a value resolves an async action, and finally can perform cleanup after success or failure. Rethrowing is this exercise's caller contract, not a universal rule for every caught error. Official Vuex promise/action docs checked through Context7. No repair supplied or applied.
- Exact next exercise, 10–15 minutes: repair only the load action in orders-async-store.js so test:async passes all four checks. Preserve previous orders on failure, store the error message, reject with the original error, clear loading after either result, and preserve successful retry/error clearing. Keep state writes in mutations. After acceptance, explicitly recommend A4 Vitest investigation and ask whether Marc wants to proceed.

## 2026-10-19, A3b partial review and rejection/rollback clarification

- Marc moved setLoading(false) into finally and tried returning this.$store.state.items in catch. He reports one remaining test and asks whether prior records should be returned or rolled back after an optimistic update.
- Verification: test:async gives three passes and one failure. Loading cleanup, data preservation, success, and retry checks pass. The rejection check receives a TypeError from accessing state on undefined this.$store, rather than the original API error. The action is not a component and does not have a component $store property; local state is available through the action context if needed. No full-suite rerun or DOM check was performed for this review.
- Tutor explains that commit(setOrders) occurs after awaiting the API, so this is not an optimistic records update: on rejection that commit never runs and previous items remain. Loading/error fields are status changes with their own intended cleanup. A real optimistic update would change items before confirmation and might need restoration, separately from propagating failure.
- Assistance: provides the small catch block with commit(setError, error.message) followed by throw error, preserving the existing finally. Returning old data, an empty array, or an Error value would resolve the async function rather than satisfy the original-error rejection contract. No exercise source changed by the tutor. Official Vuex action/context docs checked through Context7.
- Exact next correction: Marc replaces the catch return with throw error, reruns test:async, and requests review. A3b is not complete yet. After acceptance, recommend A4 and ask whether to proceed, as requested.

## 2026-10-19, A3b acceptance review

- Marc replaced the catch return with throw error while retaining setError and the finally loading cleanup. Success still returns and commits the response; failure preserves prior records and propagates the original error.
- Verification: npm --prefix practice/polysports/vue2-drills test passes all thirteen tests, including all four async checks and the nine previous checks. Verified pending/success behavior, error message and prior-data preservation, loading cleanup, original-error rejection, and successful retry. No browser/DOM verification is claimed, and the tutor changed no exercise source.
- Assistance: initial promise/cleanup explanation, distinction between optimistic rollback and a fetch that commits only after success, action context clarification, and an explicit catch snippet using throw error. Marc implemented both corrections; this is reviewed assisted work, not independent mastery. No blocking issue remains in A3b.
- Exact next recommendation: A4, a short Vitest failure-investigation exercise. Explicitly close A3b and ask whether Marc wants to proceed. A4 has not been assigned or scaffolded yet; preserve time for mixed API/migration work and the debugging mock.

## 2026-10-19, A4 Vitest debugging assigned

- Marc agreed to proceed. Created a separate orders-summary-page.js component fixture and three Vitest checks using the existing trusted orders-store.js and synthetic API. The exercise reports correct API/store data but an empty/stale component. It also checks store replacements initiated elsewhere, so a one-time local data copy does not satisfy the behavior. No earlier repair or tracker source was changed.
- Installed pinned Vitest 4.1.6 and Vite 7.3.1 in the practice package. Vitest's config includes only vitest/**/*.test.js in a Node environment; the existing Node test runner remains unchanged. This exercises actual Vue 2.7.16/Vuex 3.6.2 instances without DOM mounting. Versioned Vitest configuration and mock API docs fetched through Context7.
- Setup encountered npm 10.9.8's edgesOut peer-resolution crash, first with automatic Vite selection and again after pinning Vite 7.3.1. Checked published Vitest metadata: Vite 7 and Node 22 are supported; browser/coverage/UI peers are optional. Installation succeeded with --legacy-peer-deps for the isolated package. No global npm change or tracker dependency change was made. A clean reinstall with that npm version may need the same install flag.
- Verification: test:vitest runs Vitest 4.1.6 and reports one pass and two expected failures. The passing check establishes one API call and correct stored records/getter. The first failure expects component orders length 2 but receives 0; the second expects a later replacement to reach the same component but receives the original empty array. The previous npm test still passes all thirteen Node checks. No solution was applied by the tutor.
- Assistance before attempt: explain test/expect, expected versus received, vi.fn().mockResolvedValue as a synthetic API, and the reproduce/trace/small-fix/regression workflow. No component fix provided. This is guided practice, not a timed mock.
- Exact next exercise, 15–20 minutes: run test:vitest, read vitest/orders-summary.test.js, explain the first failing assertion and what the passing check proves, then repair only src/orders-summary-page.js. All three Vitest checks and thirteen prior Node checks must pass. Keep a live connection to shared records without manual duplicate-state synchronization, forcing updates, recreating the component, or changing trusted store/tests. After acceptance, recommend B1 mixed API/migration work and ask whether to proceed; preserve the independent debugging mock.

## 2026-10-19, A4 debugging-process guidance

- Marc says his debugging feels unsystematic and asks for a proper approach. Tutor recommends reading with a concrete question: reproduce one failure, state expected versus actual, read the full relevant test as setup/action/expectation, use passing checks to narrow the suspect boundary, form one testable hypothesis, inspect the relevant data path, then make one justified change and verify focused plus regression behavior. Add short observation/hypothesis/check narration for the interview.
- Inspected the actual Vitest file and task brief. The first failing case supplies two synthetic API records, starts with an empty component, awaits loadOrders, and expects two component records. Another test checks the API call and store/getter results. Use those facts to narrow investigation without supplying the component fix.
- Observed that Marc commented out await Vue.nextTick() in the first failing test. Explain that temporary experiments should answer a stated question, preserve assertions, and be restored before assessing the source repair. Ask him to restore that line for the agreed baseline. No source or test edits made by the tutor and no test execution for this process-only explanation; the last verified baseline remains one Vitest pass/two failures and thirteen Node passes before this test edit.
- A4 remains in progress with process assistance recorded. Exact next checkpoint: restore the test baseline, read the complete failing test and the passing test, then state what is known to work and the next specific value or code location to inspect. Do not jump to a source fix or a new topic yet.

## 2026-10-19, A4 guided walkthrough after process overload

- Marc says he cannot follow the debugging checklist and asks for help. Reduce to one concrete value and a worked explanation rather than another checklist or a recall gate. Tutor inspects the actual summary component and store.
- Marc has restored the commented nextTick line. Verification: test:vitest still yields one pass/two failures. Store loading is correct, but component orders remains empty after loading and later store replacement. No source or test edits by the tutor.
- Tutor directly explains the reference path: data() initializes local orders with the original empty store array; setOrders later replaces state.items with a different array; the local orders property still references the old array. Supplies a small computed block containing orders and the existing pendingCount, and instructs removal of data() while retaining methods. This is a demonstrated solution, not an independent diagnosis.
- Exact next action: Marc applies that component correction and runs test:vitest, then asks for review. Verify all three Vitest checks plus the thirteen previous Node checks on review. After acceptance, explicitly close A4 and recommend B1 mixed API/migration reasoning, asking whether to proceed. Do not mistake receiving this explanation for demonstrated understanding.

## 2026-10-19, evidence connecting the symptom to the computed fix

- Marc asks how he could know to remove data() and use computed. The previous answer jumped from symptom to a framework-specific solution without demonstrating the diagnostic check. Tutor acknowledges this and explains discovery through source/consumer comparison, followed by the relevant Vue rule; do not frame this as missing intuition or poor reading.
- Ran an isolated diagnostic using the actual summary component and existing trusted store, without modifying files. Before loading: store count 0, component count 0, same array true. After loading and nextTick: store count 2, component count 0, same array false; component still references the initial array, store no longer does. This is actual runtime evidence, not a hypothetical log result or browser observation.
- Tutor shows the small comparisons that establish the mismatch, then traces the local initialization and the store's later array replacement. Explains that data() initializes local state, while a computed read tracks the current store property. That API knowledge must be taught or looked up; the failure message alone does not prescribe the fix. Only the local orders field needs moving; removing the whole data block is incidental because it contains no other fields.
- A4 is still in progress and the component remains unchanged. Existing source/test code was not edited. Exact next action remains the guided component correction and test:vitest, followed by regression verification on review. Avoid presenting another long process checklist or requiring a guessed solution.

## 2026-10-19, A4 code passes; concept explanation through React

- Marc explicitly still does not understand the concept. On inspection he has applied the demonstrated fix: data() removed, computed.orders returns the current store items, and pendingCount/methods retained. Do not equate this implementation with understanding or an independent diagnosis.
- Verification: all three Vitest checks pass and all thirteen previous Node checks pass. The tutor changed no practice source. No browser/DOM execution is claimed.
- Change explanation approach: compare initial Vue data with React useState(query.data ?? []). The local state is initialized before the query response and does not reset when the source value is replaced. Reading current query data directly is the familiar goal; computed serves the ongoing reactive store read in Vue. Official React documentation on mirrored initial state fetched through Context7.
- Created a small interactive before/after explainer in the authorized thread visualization directory, initial-value-and-current-value.html. It contrasts current store data, a value saved once, and a live read, using explicit array A/B labels. It models JavaScript references rather than running Vue. Read-back and both stage-button behaviors verified with a local script. Reload the full visualize skill before creating or updating a visualization.
- Exact next teaching point remains initialization versus current reads. Use the React example and visual, with no new API quiz or long checklist. Once Marc is ready, explicitly close the assisted A4 work, recommend B1 mixed API/migration reasoning, and ask whether to proceed. No B1 fixture is assigned yet; preserve the independent mock.

## 2026-10-19, B1a component contract migration assigned

- Marc requested next after the React/visual explanation, authorizing progression without another confirmation. A4 code is reviewed with a demonstrated solution and all sixteen checks passing; his request to move on does not establish independent understanding. Keep initialization-versus-current-read recall as a later gap rather than another immediate gate.
- Introduce one migration contract: default component v-model uses value/input in Vue 2 and modelValue/update:modelValue in Vue 3. Explain the Vue 2 parent shorthand as a prop plus input listener and the emitted string as the event payload. The fixture has no custom model option or compatibility build. Vue 2.7's script setup support means component syntax does not identify a Vue 3 runtime.
- Created a separate Options API OrderEditor.vue parent and deliberately mismatched script-setup StatusSelect.vue child under practice/polysports/vue2-drills/src/migration, plus a short B1a prompt. These are source-review fixtures, not mounted components or tests; no new dependency or runtime config was added, and no passing exercise source was changed. git diff --check passed. No browser/build verification is claimed for the SFCs.
- Official migration guide fetched through Context7 for default v-model prop/event changes and customization caveats. A tool output-printing error lost the first query results; re-queried the relevant v-model concept successfully. No failure of the user app occurred.
- Exact next task, 5–10 minutes: repair only StatusSelect.vue so its declared prop, template read, declared custom event, and emitted event agree with the actual Vue 2.7 default contract. Keep script setup, the native select change handler, and the parent's v-model. Review by reading source; do not claim existing tests cover this fixture. After acceptance, recommend B1b, a brief incremental migration strategy discussion, and ask whether to proceed. Preserve the independent debugging mock.

## 2026-10-19, local component registration clarification

- Marc asks why the parent needs components: { StatusSelect } after importing the component. Explain the separate roles: import creates a JavaScript binding; the Options API components option registers that binding for use as a component tag in this template. The object uses ordinary property shorthand, equivalent to StatusSelect: StatusSelect.
- Distinguish API style from runtime version: Vue 3 Options API also uses local registration, while script setup exposes imported components to the template automatically, including in the supported Vue 2.7 syntax. Contrast React JSX's direct use of imported JavaScript identifiers only to clarify the registration step.
- Official Vue 2 and Vue 3 registration documentation checked through Context7. No practice source changed or checks rerun for this explanation. Exact next task remains the B1a StatusSelect prop/event repair; this question does not complete the exercise.

## 2026-10-19, B1a first repair review

- Inspected Marc's current StatusSelect.vue and the unchanged parent. The child still declares modelValue/update:modelValue, adds computed around the change function, and replaces the native select value/change bindings with v-model on the prop. The Vue 2 default contract mismatch remains unresolved.
- Source review identifies three corrections: use value/input consistently for the Vue 2 parent; restore a plain top-level handleChange function because computed getters derive values and are not DOM event handlers, and the inner function name is not exposed as a top-level handler; restore :value plus @change on the native select to read the prop and emit a request instead of assigning to a prop through v-model.
- Assistance: explicit correction guidance and explanation of ownership and handler versus computed. No practice source edited. No checks run because existing suites do not import or mount these SFC fixtures; this review provides source evidence only.
- Exact next task: Marc repairs only StatusSelect.vue, retaining script setup and the unchanged parent, then requests review. B1a remains incomplete. After acceptance, recommend B1b staged migration reasoning and ask whether to proceed.

## 2026-10-19, B1a second repair review

- Marc changed the prop to value, restored a plain handleChange function, removed computed, and restored :value plus @change on the native select. These resolve the prop read, handler, and ownership issues identified in the previous review. Parent remains unchanged.
- One contract mismatch remains in two places: defineEmits and emit still name update:modelValue. The Vue 2 default parent listener expects input. Tutor gives the exact two-line event-name correction and explains why the parent otherwise does not receive the expected notification.
- Source review only; existing suites do not cover these SFCs, and no runtime verification or exercise source edits were performed. B1a remains incomplete with assistance recorded. Exact next task: change both custom event names to input, then request review; the Vue 3 migration explanation remains to be checked at acceptance.

## 2026-10-19, B1a code repair accepted

- Marc now declares input in defineEmits and emits input with event.target.value. Together with the value prop, :value binding, and plain @change handler, the child matches the unchanged Vue 2 parent's default v-model contract. It does not assign to a prop. No source correction remains.
- Verification is source review only. These SFC fixtures are not mounted or imported by the existing suites, so no runtime, browser, or test-pass claim is made. Tutor did not edit exercise source or rerun unrelated checks.
- Record the repair as reviewed with explicit guidance, including the exact final event snippet. Marc has not independently explained the Vue 3 prop/event renaming; retain that as a recall gap rather than claiming mastery. The code task is complete.
- Exact next recommendation: B1b, a brief staged Vue 2 to Vue 3 migration discussion, beginning with actual versions and dependency compatibility. Ask whether Marc wants to proceed, then preserve the independent debugging mock. B1b is not assigned yet.

## 2026-10-19, B1b staged migration reasoning assigned

- Marc explicitly authorized proceeding. Teach a migration plan that starts with actual installed versions and dependency support, establishes tests and critical-flow behavior, chooses a viable direct or compatibility-build route, repairs breaking contracts in small verified changes, and deploys with a rollback path. Runtime migration does not require rewriting working Options API components into Composition API.
- Explain @vue/compat as a Vue 3 build with configurable Vue 2-compatible behavior and migration warnings. It can support incremental migration when eligible; it does not guarantee that a Vue 2-only library, especially one using internal APIs, will work. Check the actual dependency rather than assuming compatibility. Official migration-build and Vue API-style documentation fetched through Context7. Do not reuse historical package version examples in the migration guide as current installation recommendations.
- Assign a verbal scenario, not implementation: a hypothetical Vue 2.7 app uses Vuex 3, mostly Options API components, and a table library documented for Vue 2 only. In 3–5 sentences, describe the first migration steps, including the dependency decision, whether to rewrite Options API, and verification. Hypothetical versions are not claims about the employer's app. Budget 2–3 minutes; one answer before advancing.
- No exercise source changed and no checks run for this planning discussion. B1b is assigned, not reviewed. Exact next checkpoint: review Marc's migration plan, correct gaps briefly, then recommend B2 and agree the independent 55-minute mock rules before starting it.

## 2026-10-20, B1b verbal plan reviewed

- Marc independently proposes consulting the official migration guide, investigating @vue/compat before using it, migrating in small pieces, and considering codemods. These demonstrate documentation-led planning and incremental scope. He does not yet address the scenario's Vue 2-only table library, retaining Options API, or verification.
- Tutor supplies those missing parts directly: establish the table library's Vue 3 upgrade/replacement route and do not assume compat supports dependencies using Vue 2 internals; keep working Options API components; establish existing test/critical-flow behavior and rerun relevant checks after each change. Codemods are a possible aid for mechanical changes, with diff review and behavior verification, not evidence of compatibility. No particular codemod was selected, installed, or run.
- Clarify @vue/compat as a Vue 3 runtime with configurable Vue 2-compatible behaviors and migration warnings. Official migration-build docs checked through Context7. No source changes or tests for this verbal review. B1b is reviewed with feedback; the missing scenario decisions were explained by the tutor, not demonstrated independently.
- Exact next recommendation is B2, the independent 55-minute debugging mock plus review. It is now interview day and the interview time remains unknown. Confirm sufficient time before starting, and agree docs/web allowed, no AI solutions or hints unless requested and recorded, with Marc reporting elapsed time. Do not start the mock or create a claim of readiness from this review alone.

## 2026-10-20, B2 independent debugging mock prepared and handed over

- Marc agrees to the proposed 55-minute mock plus review with documentation/web allowed and tutor hints only on request. Created an isolated synthetic wholesale order screen under practice/polysports/vue2-drills/mock using the existing Vue 2.7.16, Vuex 3.6.2, Vite 7.3.1, and Vitest 4.1.6. Added mock:dev, test:mock, and mock:build scripts. No new dependencies, tracker changes, or earlier exercise source changes.
- Scope: browser-mounted Options API page, a Composition API setup-based StatusFilter, namespaced store, trusted synthetic API with intentional save-failure control, and twelve behavior tests. These are runtime-compiled JavaScript component templates, not SFC/script-setup compilation. Docker/Laravel are omitted; this is not employer code. Prompt covers search, selection, payment summaries, failure handling, retry, prioritization, and a final evidence handoff without prescribing repairs.
- Pre-attempt validation only: mock tests report five passes and seven intended failures; API controls pass. Build succeeds. Earlier thirteen Node checks and three Vitest checks all pass. New tests use real Vue/Vuex instances without DOM mounting; browser checks remain necessary. No source repair or solution fixture was generated.
- Started the dev server at http://127.0.0.1:5174/, process session 92243. Initial sandbox port binding returned EPERM; authorized escalation succeeded. Browser tab 1 is marked deliverable. Verified the rendered initial three orders/two pending, status filter Paid showing one record, and restored All statuses/three records. A Playwright exact-label selector found no match; native accessibility control worked. No defect diagnostics were supplied to Marc.
- Saved the original untracked fixture for later diff review at /var/folders/_2/7fb8gkcj2yb4fdzf74358vg00000gn/T/learning-vue-b2-baseline-8jhlonyh/mock. Use it to distinguish Marc's changes and confirm trusted API/tests remain intact. No Git commit created.
- Mock handoff: Marc starts his own 55-minute timer after reading mock/README.md and opening the app. Disable AI inline completion for an independent attempt. Tutor must not edit mock source, run revealing checks, or supply hints during the attempt unless explicitly requested; record any assistance. No autonomous timer/reminder is scheduled and no elapsed time is claimed.
- Exact next checkpoint: wait for Marc's review request with elapsed time, priorities, verified changes, and remaining issues. Then inspect actual source/diffs, run mock and relevant regression checks, inspect browser behavior, and score correctness, Vue understanding, failure handling, clarity, and explanation. B2 is assigned/handed over, not complete or scored.

## 2026-10-20, B2 requested hint on pending count

- Marc requests hints during the attempt. Inspected current store/page and diff against the saved baseline, without running tests or browser diagnostics and without editing exercise source. Mark the mock assisted from this point; elapsed time remains unknown.
- Pending-count formula and component getter access remain correct. Tutor directs attention to the update path and replaceOrder mutation: if stored status changes while a previously read derived count stays stale, investigate whether Vue 2 observes the array replacement. References the earlier array-index reactivity drill, without supplying a repair snippet.
- Current diff also adds selected:false to trusted api.js seed records, contrary to mock boundaries. Ask Marc to restore that file and keep repairs in frontend source. Do not silently restore his work or accept backend edits as independent frontend repairs. Other changes observed include search normalization and a component catch rethrow; not reviewed or verified in this hint turn.
- Exact next action: Marc investigates the replacement mutation, makes his own repair, and runs the focused payment-summary check. Continue the mock; this is not a final review or permission to diagnose remaining issues unasked.

## 2026-10-20, B2 requested help on rejected save promise

- Marc cannot make the action-caller rejects.toThrow assertion pass and requests help. Inspected the current store and page only. No tests, browser diagnostics, or exercise source edits.
- Current action catches the API error, commits the Error object, and returns it. Tutor explains that returning an Error resolves the async function with that value; the specific test requires rejection. Provides the small catch correction committing error.message and throwing the original error, preserving finally cleanup. This is explicit solution assistance for this catch block, not independent repair.
- Clarify that this assertion directly dispatches the store action, so modifying the component's catch cannot change the promise outcome tested here. Current page catch assigns an undeclared alert and rethrows; no broader diagnosis or solution is supplied in this focused turn. Array replacement is now splice in the current source but has not been verified by the tutor during the attempt.
- Exact next action: Marc changes the store catch and reruns the focused action-rejection check. Continue the assisted mock until final review/elapsed-time handoff. Do not claim the assertion passes before verification.

## 2026-10-20, B2 requested hint on action versus UI error contracts

- Marc requests another hint for the remaining error-observability checks. Inspected current store/page and relevant final test cases without running checks or editing exercise source. The action now throws the original error but still commits the Error object; the page now assigns to its getter-only computed error, writes an undeclared alert, and rethrows from its UI handler.
- Explain the two contracts explicitly: a directly dispatched action must reject so any caller can distinguish failure; this screen's final UI handler catches that rejection, suppresses success feedback, and relies on the already-rendered store error without rethrowing. The final UI test awaits the handler as a handled interaction and then checks notice/data/retry, whereas the direct action test explicitly expects rejection. This is not a universal rule to swallow caught errors.
- Give focused correction guidance: store error state holds error.message; page error is read-only computed state and should not be assigned to; alert is not rendered and duplicates existing store error presentation. Keep notice empty on failure and handle the rejection at the UI boundary. Assistance now includes these explicit distinctions and source locations.
- Exact next action: Marc adjusts the error state payload and page handler for their separate contracts, reruns relevant tests himself, and continues the assisted mock or submits final review with elapsed time. No pass result, completion, or score claimed.

## 2026-10-20, B2 latest source review and requested hints

- Marc requests review of latest work and hints while continuing the assisted attempt. Inspected current page/store and baseline diff; no tests or browser checks run and no exercise source edited. An initial directory diff included generated dist/cache output; use source-only and tests-only comparisons for subsequent reviews.
- Source now normalizes search, replaces an array element with splice, throws the store error with saving cleanup in finally, and catches the page failure without rethrowing or success feedback. These are source-level observations, not newly verified test passes.
- Remaining focused guidance: compare markPaid's setError payload with the existing load action; the former still passes an Error while the assertion expects a string. Page still assigns this.error despite its getter-only computed definition, while the action already clears error through a mutation. Ask Marc to correct those source discrepancies and run his focused checks.
- api.js still adds selected:false to trusted seed records. Remind Marc to restore the API and handle missing selected state reactively in frontend code; the current toggle mutation is unchanged and cannot be credited as a frontend repair. Test diff only reorders the saving/error assertions, preserving their expectations; do not describe that as weakened assertions, but request restoring the baseline test for the mock boundary.
- Exact next action: correct the error payload and computed assignment, rerun the relevant failure checks, then restore trusted API/tests and repair selection in frontend source. No completion, final score, independent result, or elapsed time established.

## 2026-10-20, B2 review: current tests pass, original-API selection still fails

- Marc requests review. Current mock suite passes all twelve checks. Source verifies normalized search, reactive splice replacement, store error.message plus original-error rejection, finally saving cleanup, and page-level handled failure without writing computed error. No exercise source edited by tutor.
- Baseline comparison shows api.js still adds selected:false to all trusted seed records. Store toggleSelected remains plain assignment of a previously missing field. Thus the passing selection test depends on changing the supplied API and is not an accepted frontend repair. The only test edit reorders two unchanged assertions; no assertion was removed or weakened.
- Ran a non-mutating diagnostic using the actual current Vue 2.7.16 page/store with the original supplied API imported from the saved baseline. Before toggle selectedIds is []; after toggle the stored selected value is true but selectedIds remains []. This reproduces the remaining original-input selection defect without restoring or editing Marc's files. No browser verification or broader regression rerun in this review.
- Assistance: direct attention to creating selected reactively in frontend code or preparing local fields in the store when loading records, while preserving trusted API behavior. Do not silently apply a repair. The earlier requested error-handling and pending-count assistance remains recorded; no independent score or elapsed time is inferred.
- Exact next correction: restore supplied api.js and test baseline, repair selection in frontend source, rerun all twelve mock checks, and submit review. B2 remains incomplete despite twelve current passes because trusted input was changed. After valid acceptance, request elapsed time and short reasoning/verification handoff for final scoring and B3 recommendation.

## 2026-10-20, B2 selection repair review: all rows toggled

- Marc restored api.js exactly to the supplied baseline and moved selection handling into the store. The test file still only reorders two unchanged assertions, with no weakened expectations. Do not keep treating the original-API boundary as unresolved.
- Current toggleSelected checks that the requested order exists, then maps every item to a copied object with selected inverted. This makes the update reactive but changes every row rather than only the requested ID.
- Verification: test:mock reports eleven passes and one failure. Toggling WS-201 yields selected IDs WS-201, WS-202, WS-203 instead of only WS-201. All search, payment summary, and error/retry checks pass. No browser verification or unrelated regression rerun. Tutor did not edit exercise source.
- Guidance: the outer found-order guard only checks existence; match item.id to the requested id inside map, toggle that item, and return other items unchanged. The immutable array replacement approach itself is valid. This is another assisted correction, not independent mastery.
- Exact next action: Marc limits the map change to the matching ID, reruns test:mock, and requests review. B2 remains incomplete with one tested behavior failure; elapsed time and final explanation pending.

## 2026-10-20, B2 code repair accepted with browser verification

- Marc replaced the all-item map with an ID lookup and splice of a copied target order whose selected value is inverted. Original API remains restored. Changes stay in page/store frontend source; tutor did not edit exercise source. Test expectations remain intact, with only the previously observed two-assertion reorder.
- Verification: all twelve mock tests pass. Tested selection now changes only the intended ID and toggles off again. Search normalization, payment response propagation, caller-visible failure, saving cleanup, retained records, page feedback, and retry all pass their existing behavior checks. Earlier drills were not rerun because this change is isolated to mock source; no new regression issue calls for those unrelated checks.
- Browser verification on a separate temporary tab at http://127.0.0.1:5174/: initial three records/two pending; select WS-201 gives exactly one selected and toggling off restores zero; mixed-case padded Cedar search shows one record; failure switch plus Mark paid displays the API message, retains pending status, and releases controls; retry shows Payment saved., changes WS-201 to paid, and reduces pending count to one without refresh. Final DOM snapshot confirms feedback and rows. No production API or external side effects. Old mock tab handle was unavailable; opened a new temporary verification tab using the same browser.
- B2 code repair is accepted as assisted work. Requested help covered array reactivity, error return versus throw, store versus page error contracts, error payload/readonly computed state, and selection targeting. Do not label this an independent successful mock or infer time from wall-clock gaps.
- Remaining debrief: ask Marc for elapsed time and a short explanation of why the action rejects while this page handler catches without rethrowing. Final reasoning/communication scores remain pending this evidence; no fabricated independent mastery. Exact next recommendation after debrief is B3, a short targeted verbal recall of reactivity and error flow, followed by interview-day logistics rather than new broad topics. Record code acceptance separately from completion of the debrief.

## 2026-10-20, error-boundary explanation and Vue 3 array comparison

- Marc asks directly why the action throws while the page catches, rather than independently explaining it, and asks how to change array values in Vue 3. Answer both directly without another quiz gate. Independent error-flow understanding remains unconfirmed and elapsed time is still unreported.
- Explain caller roles using this mock: the action reports a failed operation through rejection, so await in the page skips success feedback and enters catch. The page is the final interaction handler and already renders the committed error message, so its catch finishes handling the failure without propagating it further. This is the chosen screen contract, not a Vue requirement to rethrow in actions or swallow in every component. A caller that still needs notification may require a different contract.
- Clarify that splice is a JavaScript array method and still works in Vue 3. With ordinary ref/reactive state, Vue 3 proxies also track direct indexed replacement, nested field changes, and new properties. Show .value access for a ref in script, alternatives for replacement versus field mutation, and the Vue 2 direct-index distinction. Preserve Vuex mutation ownership if using a store; this discussion does not authorize moving state writes to components.
- Official Vue 3 deep-reactivity/proxy and list-array-mutation docs fetched through Context7. No exercise source changes or checks rerun. Accepted B2 code and twelve passing tests/browser evidence remain as previously verified, with assistance recorded.
- Exact next recommendation: B3 short recall on error flow and reactive updates, asking whether Marc wants to proceed. Do not assign a confident independent score or claim interview readiness from the demonstrated fixes.

## 2026-10-20, B3 error-flow recall assigned

- Marc explicitly asks to begin B3. Start one short prediction at a time rather than a broad interview-question list. First task is a code-reading variation on async failure propagation, with no Vue-specific API or new concept introduced.
- Scenario: api.saveOrder rejects; saveOrder awaits it but catches and returns the Error; the UI caller awaits saveOrder inside try, then assigns Saved, with a catch that assigns Save failed. Ask what notice contains and which line explains the result. Budget about one minute, without running the code. Do not provide the prediction or correction before Marc's answer.
- No exercise source changed or tests run. This checks recall after direct explanation, not untouched independent mock performance. B2 code remains accepted with assistance, while elapsed time and complete reasoning scores remain unknown.
- Exact next checkpoint: review Marc's prediction and reasoning, then choose the next B3 reactive-array variation based on his answer. B3 is assigned/in progress, not complete. Preserve the one-task-at-a-time teaching contract.

## 2026-10-20, B3 error-flow recall correct; array variation assigned

- Marc correctly predicts notice is Saved because saveOrder does not throw. This demonstrates correct immediate recall of the return-versus-throw distinction after the preceding explanation. Tutor confirms that returning the caught Error resolves the wrapper's promise and allows the success line to run. Do not generalize this one answer to independent mastery of all error handling.
- Next one-minute code-reading task: a Vue 2.7 mutation finds an order index, guards index !== -1, then directly assigns state.items[index] = updated. Ask for the reactivity risk and one replacement for the assignment. The concept and reactive alternatives have already been taught; no new unexplained API or runtime result is introduced.
- No practice source changed or checks run. Exact next checkpoint: review Marc's proposed array update and explanation, then close or briefly reinforce the targeted B3 recall. B2 elapsed time remains unreported.

## 2026-10-20, B3 targeted verbal recall reviewed

- Marc identifies splice at the found array index as the Vue 2 repair. His spoken explanation mixes index/ID terminology and does not specify the deletion count. Tutor confirms the correct method choice, supplies state.items.splice(index, 1, updated), and explains index = position, 1 = remove one existing element, updated = replacement. Clarify that reading an index is fine; direct indexed replacement is the reactivity issue.
- Combined B3 evidence: error-flow prediction correctly identified Saved because the wrapper returned rather than threw; Vue 2 repair correctly identified splice, with syntax/argument clarification supplied by the tutor. This is immediate recall after prior instruction and an assisted mock, not an independently executed coding variation or broad mastery.
- No practice source changes or test execution for this verbal review. B2's last verified evidence remains twelve passing mock checks against the original API plus the documented main browser flows. Elapsed time remains unknown; do not invent timing or final independent-performance scores.
- Close the agreed short B3 recall sequence as reviewed, with assistance and limits explicit. Exact next recommendation: a brief interview-day debugging and setup checkpoint using the already established workflow, with no new broad topic. Ask whether Marc wants to proceed. The original broader independent repair variation was not executed and is not claimed complete.

## 2026-10-20, interview-day checkpoint delivered

- Marc authorizes the final checkpoint. Reinforce the existing investigation loop: establish actual versions and baseline checks; reproduce one issue and state expected/actual; trace the relevant component/store/API path; make one justified change; verify the focused behavior and browser flow before moving on. Use short observation/hypothesis/check/result narration and keep repairs within the trusted-API frontend scope. No new broad lesson or code task assigned.
- Evidence-based assessment of the assisted mock: correctness meets the twelve exercised test requirements and checked browser flows; Vue understanding is developing, with reactive replacement/selection diagnosis needing hints; failure handling now meets the exercised contracts after explicit guidance; code clarity is adequate for this small fixture with leftover debug comments and redundant lookup cleanup non-blocking; explanation shows correct immediate return/throw recall and correct splice choice after teaching, with fuller independent narration not sufficiently observed. These are qualitative review ratings, not a fabricated independent score or interview-readiness guarantee. Time management cannot be assessed because elapsed time was not supplied.
- No practice source edits or checks rerun. The most recent code evidence remains twelve passing mock tests against the restored API plus browser search, selection, save failure, retry, and pending-count verification. B3's short verbal sequence is reviewed; an independent executed variation was not performed. Tracker 2.2 remains paused/incomplete.
- Existing setup evidence is dated October 18: Docker/Compose and hello-world passed, base images present. Teams webcam/full-screen sharing without blur and Vue Devtools remain unverified by the tutor. Do not claim the employer project, startup script, hidden tests, or interview-specific AI permissions have been checked. Recommend a one-minute personal Teams rehearsal and close unrelated notifications/windows before screen sharing, without changing settings on Marc's behalf.
- Exact next action: Marc rehearses the Teams webcam/microphone/full-screen share with no blurred/virtual background and confirms the Vue Devtools extension is available. Further tutoring is optional and should be targeted to a stated remaining question; no new exercise or automation is pending. If he returns after the interview, begin with his account of actual tasks and outcomes rather than assuming success or failure.

## 2026-10-20, additional short recall requested

- Marc explicitly requests more short recall drills. Continue one question at a time using already taught material, without a broad new topic or unsolicited mock. Start with a source-reading Vuex invocation variation: namespaced orders module, async load action, setOrders mutation, and a component using this.$store.commit('orders/load'). Ask what is wrong and for the corrected call; wait for his answer before feedback or advancing.
- This is immediate recall after guided practice, not a timed independent assessment. No framework behavior is newly introduced, no practice source edited, and no checks run. Personal Teams/Devtools setup remains unverified and is not presumed complete because he asks to continue tutoring.
- Exact next checkpoint: assess Marc's commit-versus-dispatch answer, then choose one short Vue-specific recall task based on the result. Budget about 30–60 seconds per question.

## 2026-10-20, extra recall 1 correct; store-reference recall assigned

- Marc correctly states that actions are dispatched and mutations committed. Tutor confirms and shows this.$store.dispatch('orders/load'), retaining the namespace. This is a correct verbal distinction; he did not supply the exact call himself in this response.
- Extra recall 2, about thirty seconds: show a component data() initializing local orders from this.$store.state.orders.items, then state that the store later replaces items with a new array. Ask whether the local orders automatically points to that new array and why. This revisits the earlier A4 weakness without supplying its answer or computed correction before his attempt.
- No source edited or checks run. Exact next checkpoint: assess the reference explanation and give only the clarification needed, then continue one short recall at a time. Earlier assistance and setup gaps remain as recorded.

## 2026-10-20, extra recall 2: correct prediction, reference concept still unclear

- Marc predicts no automatic switch but attributes it to Vue 2 array limitations and an uncertain slice/splice fix. The outcome is correct; the causal explanation is not. Do not credit independent understanding of initialization versus live store reads.
- Explain that replacing the entire declared reactive array property is supported in Vue 2. This issue arises because data() initially assigns a reference to the existing array, without establishing an ongoing link between the two properties. Reassigning the source property later does not reassign the local property. This reference behavior applies in Vue 3 too and is distinct from Vue 2 indexed-element replacement limitations.
- Supply a minimal plain-JavaScript reference example, then the computed orders getter that reads the current store property. Explain reactive dependency tracking rather than claiming the getter executes on every access. Official Vue 2 array-replacement and computed docs checked through Context7. No runtime checks or practice source edits.
- Exact next checkpoint: ask whether the shown computed version follows a later store array replacement. Keep the focus on this distinction before advancing to a different recall topic. This is direct explanation assistance after a partial answer.

## 2026-10-20, computed checkpoint correct; extra recall 3 assigned

- Marc answers yes to whether the computed current-store read follows a replacement store array. This is correct immediate recognition after the explicit reference explanation; do not treat the earlier incorrect causal explanation as independently resolved mastery.
- Next thirty-second recall: in Vue 2.7 with no custom model option, show StatusSelect v-model="status" and ask for the child prop name and emitted event name. This revisits the already taught default contract without supplying the names first. No new API, source changes, or runtime checks.
- Exact next checkpoint: assess the two contract names, then reinforce or continue with one short task at a time. Existing assistance, unreported mock elapsed time, and personal setup gaps remain recorded.

## 2026-10-20, extra recall 3: event correct, parent variable confused with prop

- Marc answers prop status, event input. Credit input as correct; default child prop is value. Explain that status is the parent's state variable, while Vue 2's default component v-model contract chooses value/input independently of that local variable name.
- Show the equivalent parent expression :value="status" @input="status = $event". This contract was documented earlier; this is review correction, not a new framework feature or runtime check. No source changes or tests run.
- Exact next checkpoint: rename the parent's state variable to paymentStatus and ask only which child prop name is used. Do not advance to Vue 3 names until this variable-versus-prop distinction is clear. Assistance recorded; do not credit the original answer as fully correct.

## 2026-10-20, extra recall 3 reinforcement correct; Vue 3 contract assigned

- Marc correctly answers that the child still receives value after the parent variable changes to paymentStatus. This demonstrates immediate recognition of the parent-variable versus child-contract distinction after correction. His initial prop-name error remains recorded.
- Extra recall 4, thirty seconds: keep the same unnamed component v-model expression but use native Vue 3 without compatibility behavior. Ask for the default prop and event names. Both names were taught earlier; no new feature or API is introduced. Await the answer without supplying the names first.
- No practice source edits or checks run. Exact next checkpoint: review Vue 3 contract recall, then continue one short drill at a time. No broader mastery, elapsed time, or personal setup completion inferred.

## 2026-10-20, extra recall 4: Vue 2 names carried into Vue 3

- Marc answers value/input for native Vue 3. Correct those as the Vue 2 defaults; native Vue 3's default unnamed component v-model uses modelValue/update:modelValue. Do not credit independent recall of the migration names.
- Teach the two pairs side by side and expand the Vue 3 parent binding using :modelValue and @update:modelValue while retaining paymentStatus as the parent's state variable. Keep the topic to the default contract without named models, compatibility customization, or defineModel abstractions. Official migration-guide v-model documentation fetched through Context7.
- No source changes or runtime checks. Exact next checkpoint: ask only which event a Vue 3 child receiving modelValue emits to request a change. Reinforce this pair before advancing to another topic. This is direct correction and immediate recall, not an independent migration exercise.

## 2026-10-20, extra recall 4 reinforcement correct; Options API method assigned

- Marc correctly answers update:modelValue for the Vue 3 event after correction. Credit immediate recall of that event; the original version-contract confusion and assistance remain recorded.
- Extra recall 5, thirty seconds: show an Options API component with declared count state and increment defined as an arrow function using this.count++. Ask what is wrong and how to define the method instead. This revisits A1's taught component-this issue, without introducing a new API or editing code.
- No checks run or practice source changed. Exact next checkpoint: review Marc's this-binding explanation and proposed method definition before choosing another short recall task.

## 2026-10-20, extra recall 5 correct method choice; nextTick recall assigned

- Marc identifies the arrow function as the problem and proposes a regular function. Credit the diagnosis and method-style correction. Tutor shows increment() { this.count++ } and explains that Vue binds a regular Options API method to the component, whereas an arrow inherits enclosing this. Marc has not independently verbalized that binding mechanism in this response.
- Extra recall 6, about thirty seconds: after this.status = 'paid', await this.$nextTick(); ask what nextTick waits for. This API was explicitly taught earlier after Marc said it was unfamiliar; the current prompt is recall, not an assumption that he knew it before teaching.
- No practice source edited or checks run. Exact next checkpoint: assess DOM-flush versus state/network understanding and clarify only if needed before another short drill.

## 2026-10-20, nextTick answer requested; cleanup recall assigned

- Marc asks to spill the beans instead of attempting nextTick recall. Provide the answer directly: state assignment happens immediately, Vue batches DOM rendering, and nextTick waits for the queued DOM update after the change. It does not await an API response or repair unobserved mutations. Use it when the following operation needs updated DOM, such as measuring or focusing a newly rendered element. Official Vue 2 async-update/nextTick docs fetched through Context7.
- No correct nextTick recall is demonstrated; this is direct explanation assistance. No practice source edited or checks executed, and no browser paint/network completion guarantee claimed.
- Continue the explicitly requested short drill sequence with extra recall 7: which try/catch/finally block should clear loading so both successful and failed API requests receive cleanup? Ask one short question and await Marc's answer. This cleanup concept was taught and practised in A3b/B2.

## 2026-10-20, extra recall 7 correct; stable-key recall assigned

- Marc correctly answers finally for loading cleanup after either a successful or failed request. Credit correct recall of cleanup placement; no new coding execution or broader independent async assessment.
- Extra recall 8, thirty seconds: show an OrderRow v-for using :key="index", with rows that may be filtered or reordered. Ask what key to use instead and why. Stable record identity was explained earlier and had remained an independent explanation gap. Do not supply the answer before his attempt.
- No practice source changes or checks run. Exact next checkpoint: assess both key choice and identity reasoning, then continue one short task at a time. Setup and elapsed-time uncertainties remain as recorded.

## 2026-10-20, extra recall 8: uniqueness recognized; stability clarified

- Marc rejects index keys and proposes a unique value, explaining index as predictable. Credit the unique-key direction, but clarify the reason: index identifies a position that may contain a different record after filtering/reordering; a stable record ID preserves component identity with the same record.
- Tutor supplies :key="order.id" and explains that keys must be unique among sibling rows and stable for the same order across renders. Official Vue 2 list/key documentation fetched through Context7. No source edits or checks run.
- Exact next checkpoint: if an order moves from index 2 to index 0, should its key change? Await the stability prediction before advancing. Do not claim independent identity reasoning from the initial uniqueness-only answer.

## 2026-10-20, key-stability checkpoint correct; ownership recall assigned

- Marc correctly says an order's key should not change when it moves positions. Credit immediate recognition after the stability explanation, with the earlier uniqueness-only answer and guidance preserved.
- Extra recall 9, thirty seconds: parent owns an order and passes :status="order.status" to a child. The child attempts this.status = 'paid'. Ask what the child should do instead and who changes the actual order status. This is the previously taught props/events ownership rule, not a new API or migration feature. Wait for Marc's answer.
- No source edits or checks run. Exact next checkpoint: assess the event request and parent ownership explanation before continuing with another short drill. No setup completion or elapsed time inferred.

## 2026-10-20, extra recall 9: parent/child roles need correction

- Marc says the parent receives the status prop and refers to updating a status ref. Correct the direction explicitly: in this scenario the parent owns order, the child receives the status prop, the child emits a change request, and the parent's listener updates order.status. There is no automatic ref update implied by a plain :status binding, and no ref was specified in this Options API scenario.
- Supply a small child this.$emit('mark-paid') example and parent listener @mark-paid="order.status = 'paid'" beside :status="order.status". This is a local-state teaching example, not a production payment flow or permission to bypass Vuex ownership. Official Vue 2 one-way props/custom-event documentation checked through Context7.
- No source edits or runtime checks. Exact next checkpoint: ask whether the parent or child calls $emit in this example. Do not advance before the role distinction is reinforced or credit the original answer as correct ownership reasoning.

## 2026-10-20, ownership checkpoint correct; computed derivation recall assigned

- Marc correctly identifies the child as the component calling $emit in the provided example. Credit immediate role recognition after the correction, with the initial ownership confusion preserved.
- Extra recall 10, thirty seconds: show computed.pendingOrders assigning the filtered pending-only array back to this.orders and returning this.orders. Ask what is wrong with changing this.orders there and what to return instead. This revisits source-versus-derived state from the tracker without adding a new package or API. Await his answer before giving a correction.
- No practice source changes or checks run. Exact next checkpoint: review computed purity/source preservation reasoning and the return expression. Continue one task at a time; no independent mastery or setup completion inferred.

## 2026-10-20, extra recall 10: assignment effect clarified

- Marc says the getter just returns original this.orders without changing it, then proposes const orders = this.orders.... Credit the local-variable repair direction but correct the causal explanation: this.orders = filteredArray replaces source state with the pending-only result. The subsequent return reads that newly assigned array, not the original full collection.
- Explain with a pending/paid source example that paid records disappear from source after the assignment. Supply a getter using a local const orders = this.orders.filter(...) followed by return orders, preserving the full source list. The filter operation returns a new array; assignment to the source was the unwanted side effect. This is source review/general assignment reasoning using previously taught computed derivation, not a new API.
- No source edits or runtime checks. Exact next checkpoint: after reading pendingOrders, should the original this.orders still contain paid orders? Await the source-preservation answer before moving to another drill. Do not claim independent computed-purity understanding from the initial response.

## 2026-10-20, source-preservation checkpoint correct; migration recall assigned

- Marc correctly answers yes: the source orders should still contain paid records after deriving pendingOrders. Credit immediate recognition following the assignment explanation, with the initial misconception and supplied getter retained in the assistance record.
- Extra recall 11, thirty seconds: ask whether a Vue 2 app mostly written in Options API must have every component rewritten into Composition API to migrate to Vue 3, and why. This revisits the already taught distinction between runtime migration and API style; no new ecosystem scope or implementation.
- No source edits or runtime checks. Exact next checkpoint: review the migration/API-style explanation, then choose whether one targeted reinforcement is useful before closing the recall set. Independent mastery and interview readiness remain unclaimed.

## 2026-10-20, extra recall 11 correct with expanded migration reasoning

- Marc correctly states Vue 3 supports Options API. He then volunteers an incremental migration plan, investigating @vue/compat warnings and checking dependencies for Vue 3-compatible versions first. Credit this later recall of dependency compatibility and staged migration reasoning, which were previously supplied by the tutor in B1b. No migration was implemented or independently verified.
- Clarify the sequencing nuance in his proposal to migrate dependencies immediately: inspect compatibility first, then coordinate upgrades with the target runtime/tooling in a migration branch. A Vue 3-only dependency cannot be assumed to run in an unchanged Vue 2 app. Explain @vue/compat is a Vue 3 build offering configurable Vue 2-compatible behavior and warnings, not a guarantee for libraries relying on Vue 2 internals. Baseline tests and critical-flow checks remain necessary; absence of warnings alone is insufficient evidence. Official migration-build docs checked through Context7; do not reuse historical installation version examples as current recommendations.
- Extra recall 12, thirty seconds: API response contains three orders, Vuex state contains three, page shows zero. Ask what to inspect next and why. This is a hypothetical code-reading/diagnostic prioritization scenario using earlier concepts, not a new observed app defect or test execution.
- No practice source changed or checks run. Exact next checkpoint: assess the proposed investigation boundary/evidence before giving a hint or advancing. Existing source-read/reference confusion remains recorded pending independent application.

## 2026-10-20, extra recall 12: evidence-based narrowing needs guidance

- Marc proposes the load action, getter, or broken API and says he does not know. A getter is a possible downstream candidate if the component reads it, but the provided API/store facts do not justify starting by changing the backend or load action. Do not treat a possible cause as a confirmed diagnosis or infer poor reading/ability from uncertainty.
- Tutor gives one concrete investigation step: locate the component array feeding the list, then inspect component.orders against the known store records. If component orders has zero while store has three, investigate its state/getter binding; if component orders has three but visibleOrders is empty, inspect the filtering path and active filter values. Empty rendered results can be valid with active filters, so establish expected behavior before changing code.
- This is a hypothetical explanation, not runtime evidence from the practice app. No files, tests, or browser checks changed/run. No new framework API or source repair supplied. Keep the focus on locating where values diverge rather than prescribing computed or another repair without evidence.
- Exact next checkpoint: if component orders has three records and visibleOrders has zero, ask which part to inspect next. The diagnostic prioritization answer required explanation assistance; do not credit independent narrowing yet.

## 2026-10-20, session ended for rest at Marc's request

- Marc says his brain is tired and he wants to rest before today's interview. Stop tutoring now. Do not ask him to answer the pending checkpoint, assign new drills, or add setup tasks in the closing response. No automatic follow-up or reminder requested or created.
- Saved outcome: B2 code passes all twelve supplied mock tests against the restored API and the main browser flows were verified, with the recorded hints and direct guidance. Short B3/extra recall demonstrated dispatch versus commit, finally cleanup, regular-method choice, and later Options API/migration reasoning. Several reference, contract-name, ownership, identity, and source-preservation checkpoints needed explanation. NextTick was explained directly. Do not infer independent readiness or a timed score; elapsed time remains unknown.
- The final drill 12 follow-up is unanswered because Marc stopped for rest, not a failed answer. If he explicitly resumes before the interview and wants to continue, resume only with the saved narrow question about component orders versus visibleOrders. If he returns after the interview, first ask about the actual session and adapt from his account. Tracker 2.2 remains paused and incomplete.
- No practice source changed or verification rerun during session close. Personal Teams/Devtools setup remains unverified; avoid turning this rest request into another checklist. No commits, pushes, or other external actions requested.

## 2026-10-20, checkpoint commit and push authorized

- Marc explicitly requests saving the checkpoint, committing, and pushing to GitHub. This authorizes repository publication of the current learning work, not resuming tutoring. The rest checkpoint and unanswered drill 12 remain as recorded above.
- Repository is on main with origin git@github.com:mcometa/learning-vue.git. Save distinct commits for unfinished Session 2 tracker source, isolated Vue 2 practice/drills/mock, and tutoring/sprint/checkpoint documentation. Keep machine-local instructions out of Git; the AGENTS.md change contains only the shared tutoring contract. Generated dependencies, builds, caches, and temporary comparison snapshots are excluded by the existing ignore rules.
- Fresh verification before committing: all thirteen Node drill tests, three Vitest investigation tests, and twelve mock tests pass, totaling twenty-eight checks. mock:build succeeds. git diff --check passes for tracked changes. No additional browser run; the accepted browser verification remains the earlier documented check.
- Root npm run type-check still fails in the parked JobApplicationForm.vue, including draft status typing, generic indexed access, validation-message object shape, optional URL typing, and ID payload issues. Preserve and label the tracker source as unfinished rather than silently repairing Marc's exercise. Tracker 2.2 remains incomplete. These failures do not affect the isolated passing Vue 2 package.
- Commit messages should describe these actual results and assistance limits. Push uses the configured origin/main without rewriting existing history. Confirm the remote result after the push; this entry records authorization and pre-commit verification, not a premature claim of successful publication.
- Local source commits created: e8c2596 checkpoints unfinished Session 2 tracker work; ac54d2a saves the Vue 2 drills and wholesale mock. Tutoring/sprint/checkpoint documents are saved separately from those source commits.
