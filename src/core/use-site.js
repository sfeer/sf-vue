import Vue from 'vue'
import VueStorage from 'vue-ls'
import './antdv'
import 'vue-resize/dist/vue-resize.css'
import VueResize from 'vue-resize'

// 自定义网站组件
import Aa from  '../views/site/box/Aa'
import Bb from  '../views/site/box/Bb'

Vue.component(Aa.name, Aa)
Vue.component(Bb.name, Bb)

Vue.use(VueResize)

Vue.use(VueStorage, {
  namespace: 'sfeer__',
  name: 'ls',
  storage: 'local'
})
Vue.use({...VueStorage}, {
  namespace: 'sfeer__',
  name: 'ss',
  storage: 'session'
})
