// Trusted synthetic API. Treat this file as the working backend.
export function seedOrders() {
  return [
    { id: 'WS-201', customer: 'Cedar Retail', status: 'pending', total: 420 },
    { id: 'WS-202', customer: 'Harbor Stores', status: 'paid', total: 175 },
    { id: 'WS-203', customer: 'Maple Wholesale', status: 'pending', total: 860 }
  ]
}

export function createApi({ delayMs = 180 } = {}) {
  let records = seedOrders()
  let nextSaveFails = false
  const wait = () => new Promise(resolve => setTimeout(resolve, delayMs))

  return {
    failNextSave() { nextSaveFails = true },
    async listOrders() {
      await wait()
      return records.map(order => ({ ...order }))
    },
    async markPaid(id) {
      await wait()
      if (nextSaveFails) {
        nextSaveFails = false
        throw new Error('Payment service unavailable. Try again.')
      }
      const index = records.findIndex(order => order.id === id)
      if (index === -1) throw new Error('Order not found')
      records[index] = { ...records[index], status: 'paid' }
      return { ...records[index] }
    }
  }
}
