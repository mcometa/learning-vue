import StatusFilter from './StatusFilter.js'

export function createOrdersPage(api) {
  return {
    name: 'OrdersPage',
    components: { StatusFilter },
    data() {
      return { search: '', status: 'all', notice: '' }
    },
    computed: {
      orders() { return this.$store.state.orders.items },
      loading() { return this.$store.state.orders.loading },
      saving() { return this.$store.state.orders.saving },
      error() { return this.$store.state.orders.error },
      pendingCount() { return this.$store.getters['orders/pendingCount'] },
      selectedIds() { return this.$store.getters['orders/selectedIds'] },
      visibleOrders() {
        return this.orders.filter(order => {
          const matchesSearch = order.customer.toLowerCase().includes(this.search.trim().toLowerCase())
          const matchesStatus = this.status === 'all' || order.status === this.status
          return matchesSearch && matchesStatus
        })
      }
    },
    methods: {
      refresh() { return this.$store.dispatch('orders/load') },
      toggleSelected(id) {
        return this.$store.commit('orders/toggleSelected', id)
      },
      async markPaid(id) {
        this.notice = ''
        try {
          await this.$store.dispatch('orders/markPaid', id)
          this.notice = 'Payment saved.'
        } catch (error) {
          this.notice = ''
        }
      },
      armFailure() {
        api.failNextSave()
        this.notice = 'The next payment save will fail.'
      }
    },
    template: `
      <main>
        <header><p>Wholesale operations</p><h1>Orders</h1></header>
        <section class="summary" aria-label="Order summary">
          <p><strong>{{ orders.length }}</strong> orders</p>
          <p><strong>{{ pendingCount }}</strong> pending</p>
          <p><strong>{{ selectedIds.length }}</strong> selected</p>
        </section>
        <section class="toolbar" aria-label="Order controls">
          <label>Customer search<input v-model="search" type="search" placeholder="Search customers"></label>
          <StatusFilter v-model="status" />
          <button type="button" :disabled="loading || saving" @click="refresh">Refresh</button>
          <button type="button" :disabled="saving" @click="armFailure">Make next save fail</button>
        </section>
        <p v-if="loading" role="status">Loading orders…</p>
        <p v-if="saving" role="status">Saving payment…</p>
        <p v-if="error" role="alert" class="error">{{ error }}</p>
        <p v-if="notice" role="status">{{ notice }}</p>
        <p aria-live="polite">Showing {{ visibleOrders.length }} of {{ orders.length }} orders</p>
        <table>
          <thead><tr><th scope="col">Select</th><th scope="col">Order</th><th scope="col">Customer</th><th scope="col">Total</th><th scope="col">Status</th><th scope="col">Action</th></tr></thead>
          <tbody>
            <tr v-for="order in visibleOrders" :key="order.id">
              <td><input type="checkbox" :aria-label="'Select ' + order.id" :checked="Boolean(order.selected)" @change="toggleSelected(order.id)"></td>
              <td>{{ order.id }}</td><td>{{ order.customer }}</td><td>{{ order.total.toFixed(2) }}</td><td>{{ order.status }}</td>
              <td><button v-if="order.status === 'pending'" type="button" :disabled="saving" @click="markPaid(order.id)">Mark paid</button></td>
            </tr>
          </tbody>
        </table>
        <p v-if="!loading && !visibleOrders.length">No matching orders.</p>
      </main>
    `
  }
}
