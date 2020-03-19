// 企业微信相关接口
import {axios} from '../utils/request'

// 企业微信获取用户ID
export function getUserId(code) {
  return axios.get('/wx/get_user_info', {
    params: {
      code: code,
      agent: process.env.VUE_APP_WX_CP_AGENT
    }
  })
}

// 企业微信获取用户信息
export function getUserInfo(id) {
  return axios.get('/wx/user/get', {
    params: {
      userid: id
    }
  })
}

// 企业微信获取OAuth认证地址
export function getOauthUrl(url) {
  return axios.get('/wx/get_oauth_url', {
    params: {
      url: url
    }
  })
}