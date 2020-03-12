import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/site/List')
  },
  {
    path: '/init',
    component: () => import('../views/site/Init')
  },
  {
    path: '/design/:sid',
    component: () => import('../views/site/Design')
  },
  {
    path: '/site/:sid',
    component: () => import('../views/site/View')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
