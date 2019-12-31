import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "main" */ '../views/Home')
  },
  {
    path: '/table',
    component: () => import(/* webpackChunkName: "demo" */ '../views/demo/table')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
