import 'core-js/stable'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './core/use' // 全局引入

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')