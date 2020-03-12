import 'core-js/stable'

import Vue from 'vue'
import App from './App'
import router from './router/site'
import store from './store'
import {VueAxios} from './utils/request'
import './core/use-site'
import './mock/site'

Vue.config.productionTip = false
Vue.use(VueAxios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')