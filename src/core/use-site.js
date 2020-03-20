import Vue from 'vue'
import VueStorage from 'vue-ls'
import './antdv'
import 'vue-resize/dist/vue-resize.css'
import VueResize from 'vue-resize'
import VueMeta from 'vue-meta'

// 自定义网站组件
Vue.component('Aa', () => import('../views/site/box/Aa'))
Vue.component('Bb', () => import('../views/site/box/Bb'))

Vue.use(VueResize)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

Vue.use(VueStorage, {
  namespace: 'site__',
  name: 'ls',
  storage: 'local'
})
