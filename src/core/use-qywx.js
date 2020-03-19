import Vue from 'vue'
import VueStorage from 'vue-ls'
import './vant'


Vue.use(VueStorage, {
  namespace: 'qywx__',
  name: 'ls',
  storage: 'local'
})

// 判断环境不是 prod 或者 preview 是 true 时，加载 vConsole
if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  const VConsole = require('vconsole')
  new VConsole()
}
