import Vue from 'vue'
import { createApi } from './api.js'
import { createStore } from './store.js'
import { createOrdersPage } from './OrdersPage.js'
import './style.css'

Vue.config.productionTip = false
const api = createApi()
const store = createStore(api)
const page = new Vue({ ...createOrdersPage(api), store }).$mount('#app')
page.refresh().catch(() => {})
