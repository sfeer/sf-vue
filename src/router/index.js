import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Home')
  },

  {
    path: '/table',
    component: () => import(/* webpackChunkName: "antdv" */ '../views/antdv/table')
  },
  {
    path: '/menu',
    component: () => import(/* webpackChunkName: "antdv" */ '../views/antdv/menu')
  },

  {
    path: '/flow/design',
    component: () => import(/* webpackChunkName: "flow" */ '../views/flow/Design')
  },
  {
    path: '/flow/play',
    component: () => import(/* webpackChunkName: "flow" */ '../views/flow/Play')
  },
  {
    path: '/flow/debug',
    component: () => import(/* webpackChunkName: "flow" */ '../views/flow/Debug')
  },

  {
    path: '/site',
    component: () => import(/* webpackChunkName: "site" */ '../views/site/List')
  },
  {
    path: '/site/design',
    component: () => import(/* webpackChunkName: "site" */ '../views/site/Design')
  },

  // JSON 编辑器
  // {
  //   path: '/json',
  //   component: () => import('../views/json')
  // },

  // 富文本编辑器
  {
    path: '/quill',
    component: () => import('../views/quill')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
