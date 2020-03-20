import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import {getOauthUrl, getUserId} from '../api/qywx'

Vue.use(VueRouter)

const routes = [
  {
    path: '/qywx',
    component: () => import('../views/qywx/Home')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const lsUser = Vue.ls.get('userId'), qCode = to.query.code
  if (lsUser) {
    // 从本地存储获取用户
    if (store.getters.userId !== lsUser) {
      // 通过用户标识获取用户详细信息
      store.dispatch('GetUserInfo').then(() => {
        next()
      })
    } else {
      next()
    }
  } else if (qCode) {
    // 使用OAuth2返回的code获取用户标识，同时完成移动平台后台服务的认证
    getUserId(qCode).then(d=>{

    })
  } else {
    getOauthUrl(location.href).then(d => {
      location.href = d
    })
  }
})

export default router
