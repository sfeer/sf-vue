import Vue from 'vue'
import VueStorage from 'vue-ls'

// ant-design-vue
import './antdv'

// 额外组件
import MultiTab from '../components/MultiTab'
import SFlow from '../components/SFlow/SFlow'
import 'vue-resize/dist/vue-resize.css'
import VueResize from 'vue-resize'

Vue.use(MultiTab)
Vue.use(VueResize)
Vue.component(SFlow.name, SFlow)
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
