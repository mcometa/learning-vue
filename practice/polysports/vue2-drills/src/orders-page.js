export default {
  computed: {
    orders() {
      return this.$store.state.orders.items
    },
    pendingCount() {
      return this.$store.getters['orders/pendingCount']
    }
  },
  methods: {
    loadOrders() {
      return this.$store.dispatch('orders/load')
    }
  }
}
