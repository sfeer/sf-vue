import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000
})

service.interceptors.response.use(res=>{
  const d = res.data
  if (d.errcode === 0) {
    return d.data
  } else {
    // TODO 指定错误码进行操作，注销并跳到错误页面
  }
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
