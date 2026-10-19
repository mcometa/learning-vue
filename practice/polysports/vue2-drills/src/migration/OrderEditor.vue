<script>
import StatusSelect from './StatusSelect.vue'

export default {
  components: { StatusSelect },
  data() {
    return { status: 'pending' }
  }
}
</script>

<template>
  <section>
    <h2>Order status</h2>
    <StatusSelect v-model="status"/>
    <p>Stored status: {{ status }}</p>
  </section>
</template>
