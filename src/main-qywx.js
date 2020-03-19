import 'core-js/stable'

import Vue from 'vue'
import App from './App'
import router from './router/qywx'
import store from './store'
import {VueAxios} from './utils/request'
import './core/use-qywx'
import './mock/qywx'

Vue.config.productionTip = false
Vue.use(VueAxios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')