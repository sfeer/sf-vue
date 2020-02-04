import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "main" */ '../views/Home')
  },
  {
    path: '/design',
    component: () => import(/* webpackChunkName: "main" */ '../views/Design')
  },
  {
    path: '/table',
    component: () => import(/* webpackChunkName: "antdv" */ '../views/antdv/table')
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
    path: '/json',
    component: () => import(/* webpackChunkName: "json" */ '../views/json')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
