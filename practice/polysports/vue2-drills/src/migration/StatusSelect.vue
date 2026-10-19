<script setup>
defineProps({
  value: { type: String, required: true }
})

const emit = defineEmits(['input'])

function handleChange(event) {
  emit('input', event.target.value)
}
</script>

<template>
  <label>
    Status
    <select :value="value" @change="handleChange">
      <option value="pending">pending</option>
      <option value="paid">paid</option>
      <option value="cancelled">cancelled</option>
    </select>
  </label>
</template>
