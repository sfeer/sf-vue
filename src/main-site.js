import Vue from 'vue'
import App from './App'
import router from './router/site'
import store from './store'
import { VueAxios } from './utils/request'

import './core/use-site' // 全局引入
import './mock' // 模拟数据

Vue.config.productionTip = false

Vue.use(VueAxios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')