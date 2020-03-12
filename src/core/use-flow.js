import Vue from 'vue'
import VueStorage from 'vue-ls'

// ant-design-vue
import './antdv'

// 额外组件
import SFlow from '../components/SFlow/SFlow'

Vue.component(SFlow.name, SFlow)
Vue.use(VueStorage, {
  namespace: 'flow__',
  name: 'ls',
  storage: 'local'
})
Vue.use({...VueStorage}, {
  namespace: 'flow__',
  name: 'ss',
  storage: 'session'
})
