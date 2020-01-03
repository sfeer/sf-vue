import Vue from 'vue'
import VueStorage from 'vue-ls'

// ant-design-vue
import './antdv'

// 额外组件
import MultiTab from '../components/MultiTab'
import BasicFlow from '../components/Flow/BasicFlow'
import 'vue-resize/dist/vue-resize.css'
import VueResize from 'vue-resize'

Vue.use(MultiTab)
Vue.use(VueResize)
Vue.component(BasicFlow.name, BasicFlow)
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
