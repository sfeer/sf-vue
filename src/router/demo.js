import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/table',
    component: () => import('../views/antdv/table')
  },
  {
    path: '/menu',
    component: () => import('../views/antdv/menu')
  },

  // JSON 编辑器
  {
    path: '/json',
    component: () => import('../views/demo/Json')
  },

  // 富文本编辑器
  {
    path: '/rte',
    component: () => import('../views/demo/RichTextEditor')
  },

  // Markdown编辑器
  {
    path: '/mde',
    component: () => import('../views/demo/MarkdownEditor')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
