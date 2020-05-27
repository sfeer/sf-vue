import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/demo/table/11',
    component: () => import('../views/antdv/table')
  },
  {
    path: '/demo/menu',
    component: () => import('../views/antdv/menu')
  },

  // 富文本编辑器
  {
    path: '/demo/rte',
    // component: () => import('../views/demo/rich-text-editor/Quill')
    component: () => import('../views/demo/rich-text-editor/EWebEditor')
  },

  {
    path: '/demo/clone',
    component: () => import('../views/demo/Clone')
  },

  // WebSocket
  {
    path: '/demo/ws',
    component: ()=>import('../views/demo/WebSocket')
  },

  // 分享
  {
    path: '/demo/share',
    component: ()=>import('../views/demo/Share')
  },

  // 打印
  {
    path: '/demo/print',
    component: ()=>import('../views/demo/print/Main')
  },
  {
    path: '/demo/print/ticket',
    component: ()=>import('../views/demo/print/Print')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
