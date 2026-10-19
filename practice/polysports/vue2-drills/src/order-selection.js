export default {
  data() {
    return {
      orders: [
        { id: 'PO-101', customer: 'Cedar Retail', status: 'pending', selected: false },
        { id: 'PO-102', customer: 'Harbor Stores', status: 'paid', selected: false }
      ]
    }
  },
  computed: {
    selectedIds() {
      return this.orders.filter(order => order.selected).map(order => order.id)
    }
  },
  methods: {
    toggleSelection(id) {
      const order = this.orders.find(order => order.id === id)
      if (order) order.selected = !order.selected
    }
  }
}
