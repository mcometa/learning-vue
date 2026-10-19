import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StatusFilter',
  props: { value: { type: String, required: true } },
  setup(props, { emit }) {
    function change(event) {
      emit('input', event.target.value)
    }
    return { change }
  },
  template: `
    <label>Status
      <select :value="value" @change="change">
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
      </select>
    </label>
  `
})
