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
    component: () => import(/* webpackChunkName: "demo" */ '../views/demo/table')
  },
  {
    path: '/flow/design',
    component: () => import(/* webpackChunkName: "flow" */ '../views/flow/Design')
  },
  {
    path: '/flow/play',
    component: () => import(/* webpackChunkName: "flow" */ '../views/flow/Play')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
