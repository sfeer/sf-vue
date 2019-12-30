import Vue from 'vue'
import VueStorage from 'vue-ls'

// ant-design-vue
import './antdv'

// 额外组件
import MultiTab from '../components/MultiTab'
import BasicFlow from '../components/Flow/BasicFlow'

Vue.use(MultiTab)
Vue.component(BasicFlow.name, BasicFlow)
Vue.use(VueStorage, {
  namespace: 'ecp__',
    name: 'ls',
    storage: 'session',
})
