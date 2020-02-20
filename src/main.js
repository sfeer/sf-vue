import 'core-js/stable'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { VueAxios } from './utils/request'

import './mock' // 模拟数据
import './core/use' // 全局引入
import './assets/index.less'

Vue.config.productionTip = false

Vue.use(VueAxios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
