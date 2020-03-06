// 根据项目加载小组件
import Vue from 'vue'

if (process.env.VUE_APP_PROJECT === 'ALLINONE') {
  Promise.all([
    import('./Aa'),
    import('./Bb'),
  ]).then(([a, b]) => {
    Vue.component(a.default.name, a.default)
    Vue.component(b.default.name, b.default)
  })
}
