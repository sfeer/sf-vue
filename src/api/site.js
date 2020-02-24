import {axios} from '../utils/request'


// 获取模版列表
export function getTemplateList() {
  return axios.get('/templates')
}

// 发布
export function publishSite(site) {
  return axios.post('/publish/site', site)
}

// 获取站点列表
export function getSiteList() {
  return axios.get('/sites')
}
