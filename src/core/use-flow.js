import Vue from 'vue'
import VueStorage from 'vue-ls'

// ant-design-vue常用组件
import './antdv'

// 额外组件
import {Breadcrumb} from 'ant-design-vue'
import SFlow from '../components/Flow/SFlow'

Vue.use(Breadcrumb)
Vue.component(SFlow.name, SFlow)
Vue.use(VueStorage, {
  namespace: 'flow__',
  name: 'ls',
  storage: 'local'
})
