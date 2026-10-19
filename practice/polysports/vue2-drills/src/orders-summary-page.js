export default {
  computed: {
    orders() {
      return this.$store.state.orders.items
    },
    pendingCount() {
      return this.orders.filter(order => order.status === 'pending').length
    }
  },
  methods: {
    loadOrders() {
      return this.$store.dispatch('orders/load')
    }
  }
}
