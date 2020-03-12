import Vue from 'vue'
import App from './App'
import router from './router/demo'
import store from './store'
import {VueAxios} from './utils/request'
import './core/use-demo'

Vue.config.productionTip = false
Vue.use(VueAxios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')