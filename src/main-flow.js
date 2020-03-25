import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App'
import router from './router/flow'
import store from './store'
import {VueAxios} from './utils/request'
import './core/use-flow'

Vue.config.productionTip = false
Vue.use(VueAxios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')