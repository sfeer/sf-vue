import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/flow/design',
    component: () => import('../views/flow/Design')
  },
  {
    path: '/flow/play',
    component: () => import('../views/flow/Play')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
