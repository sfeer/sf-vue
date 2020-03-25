import Vue from 'vue'
import MainPage from '../views/Main'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: MainPage
    }
  ]
})

export default router
