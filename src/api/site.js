import {axios} from '../utils/request'


// 获取模版列表
export function getTemplateList() {
  return axios.get('/templates')
}