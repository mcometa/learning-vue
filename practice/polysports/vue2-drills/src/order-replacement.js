export default {
  data() {
    return {
      orders: [
        { id: 'PO-101', customer: 'Cedar Retail', status: 'pending' },
        { id: 'PO-102', customer: 'Harbor Stores', status: 'paid' }
      ]
    }
  },
  computed: {
    pendingIds() {
      return this.orders.filter(order => order.status === 'pending').map(order => order.id)
    }
  },
  methods: {
    applyOrderUpdate(updatedOrder) {
      const index = this.orders.findIndex(order => order.id === updatedOrder.id)
      if (index === -1) return
      // this.orders[index] = { ...updatedOrder }
      this.$set(this.orders, index, updatedOrder)
    }
  }
}
