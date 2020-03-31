import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/site',
    component: () => import('../views/site/List')
  },
  {
    path: '/site/init',
    component: () => import('../views/site/Init')
  },
  {
    path: '/site/design/:sid',
    component: () => import('../views/site/Design')
  },
  {
    path: '/site/view/:sid',
    component: () => import('../views/site/View')
  },
  {
    path: '/site/x-design',
    component: () => import('../views/site/XDesign')
  },
  {
    path: '/site/t-design',
    component: () => import('../views/site/TDesign')
  }
]

if (process.env.NODE_ENV === 'development') {
  routes.push({path: '/', redirect: '/site'})
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
