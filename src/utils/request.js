import axios from 'axios'
import Vue from 'vue'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000
})

service.interceptors.request.use(req => {
  const token = Vue.ls.get('token')
  if (token) {
    req.headers['token'] = token
  }
  return req
})

service.interceptors.response.use(res => {
  return res.data
})

const installer = {
  vm: {},
  install(Vue) {
    Vue.axios = service
    Object.defineProperties(Vue.prototype, {
      axios: {
        get: function get() {
          return service
        }
      },
      $http: {
        get: function get() {
          return service
        }
      }
    })
  }
}

export {
  installer as VueAxios,
  service as axios
}
