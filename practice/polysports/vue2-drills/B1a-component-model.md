# B1a: a component migrated ahead of its runtime

Budget: 5–10 minutes. Code-reading and repair exercise, not a mounted browser fixture. These SFCs are not imported by the existing test suites; no runtime/browser validation is claimed for them.

Environment: the practice package pins Vue 2.7.16. No custom component model option or Vue 3 compatibility build is configured. The Options API parent and script-setup child are intentionally mixed; Vue 2.7 supports script setup. Script style alone does not establish the runtime.

## The one concept

Component v-model is a prop plus an event listener. With the default component contract:

| Runtime | Value passed to the child | Event the parent listens for |
| --- | --- | --- |
| Vue 2 | value | input |
| Vue 3 | modelValue | update:modelValue |

For Vue 2, this parent expression:

```vue
<StatusSelect v-model="status" />
```

behaves like:

```vue
<StatusSelect :value="status" @input="status = $event" />
```

Here $event is the value emitted by the child. The parent supplies the prop and updates its own status when it receives the expected custom event. The child reads its prop and requests a change through an event; it does not mutate the parent's state directly.

Vue 3's default expansion instead passes modelValue and listens for update:modelValue. That is a runtime/compiler contract change, not a requirement to rewrite all components into another API style. Vue 2 can customize its model contract, but that is not used in this exercise.

## Task

Read src/migration/OrderEditor.vue and src/migration/StatusSelect.vue. The reported symptom is that changing the dropdown does not update the parent's stored status.

Repair only StatusSelect.vue for the current Vue 2.7 runtime. Keep script setup, the native select's change handler, and the parent's v-model. Do not upgrade dependencies or add a custom model option to bypass the default contract.

Acceptance by source review:

- The child's declared prop and template read agree with the value the Vue 2 parent supplies.
- The child declares and emits the event the Vue 2 parent listens for, carrying the selected string.
- The parent still owns status; the child does not mutate props.
- Explain the two contract names that would change after a native Vue 3 migration.

Docs: [v-model migration](https://v3-migration.vuejs.org/breaking-changes/v-model.html) and [Vue 2.7 backports](https://v2.vuejs.org/v2/guide/migration-vue-2-7.html).
