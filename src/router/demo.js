import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/demo/table',
    component: () => import('../views/antdv/table')
  },
  {
    path: '/demo/menu',
    component: () => import('../views/antdv/menu')
  },

  // JSON 编辑器
  {
    path: '/demo/json',
    component: () => import('../views/demo/Json')
  },

  // 富文本编辑器
  {
    path: '/demo/rte',
    // component: () => import('../views/demo/rich-text-editor/Quill')
    component: () => import('../views/demo/rich-text-editor/EWebEditor')
  },

  // Markdown编辑器
  {
    path: '/demo/mde',
    component: () => import('../views/demo/markdown-editor/SimpleMde')
  },

  {
    path: '/demo/clone',
    component: () => import('../views/demo/Clone')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
