import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "site" */ '../views/site/List')
  },
  {
    path: '/site/design',
    component: () => import(/* webpackChunkName: "site" */ '../views/site/Design')
  },
  {
    path: '/site/:sid',
    component: () => import(/* webpackChunkName: "site" */ '../views/site/View')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
