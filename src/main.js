import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App'
import router from './router/main'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')