import events from './events'
import MultiTab from './MultiTab'
import store from '../../store'
import './index.less'

const api = {
  open(path, name = '新标签页', refresh = false) {
    events.$emit('open', path, name, refresh)
    if (refresh) {
      events.$emit('clear', path)
    }
  },

  close(path) {
    events.$emit('close', path)
  }
}

MultiTab.install = function (Vue) {
  Vue.mixin({
    beforeRouteEnter(to, from, next) {
      next(vm => {
        const tabs = store.getters.tabs
        if (tabs) {
          const tab = tabs.find(o => o.path === to.fullPath)
          if (tab && tab.key === undefined) {
            const vnode = vm.$vnode
            if (vnode && vnode.data && vnode.data.ref === 'tab-router') {
              tab.key = vnode.key || vnode.componentOptions.Ctor.cid
              store.dispatch('UpdateTab', tab)
            }
          }
        }
      })
    }
  })

  if (Vue.prototype.$multiTab) {
    return
  }
  api.instance = events
  Vue.prototype.$multiTab = api
  Vue.component(MultiTab.name, MultiTab)
}

export default MultiTab
