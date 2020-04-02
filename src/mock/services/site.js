import Mock from 'mockjs'
import Vue from 'vue'
import {getQueryParameters} from '../../utils/util'

const Random = Mock.Random

Random.guid()

// 常用模版
const templateList = [
  {
    id: Random.increment(), name: '空白', group: '常用', img: Random.dataImage('250x180'),
    boxs: [
      {
        "id": "a2cbbcccb4a0456ebd5779ec7f693214",
        "x": 0,
        "y": 0,
        "w": 800,
        "h": 650
      }
    ]
  },
  {
    id: Random.increment(), name: '首页', group: '推荐', img: Random.dataImage('250x180')
  },
  {
    id: Random.increment(), name: 'TBox', group: '推荐', img: Random.dataImage('250x180'),
    boxs: [
      {
        "id": "a2cbbcccb4a0456ebd5779ec7f69cda5",
        "x": 0,
        "y": 0,
        "w": 961,
        "h": 650,
      }
    ]
  },
  {
    id: Random.increment(), name: 'SBox', group: '推荐', img: Random.dataImage('250x180')
  },
  {
    id: Random.increment(), name: '门户网站', group: '北京', img: Random.dataImage('250x180')
  },
  {
    id: Random.increment(), name: '新闻详情', group: '北京', img: Random.dataImage('250x180')
  }
]

const siteList = Vue.ls.get('sites') || []

// 模版列表
Mock.mock(/\/api\/templates/, 'get', {errcode: 0, data: templateList})

// 发布站点
Mock.mock(/\/api\/publish\/site/, 'post', req => {
  const params = getQueryParameters(req)
  if (params && params.id) {
    const site = siteList.find(d => d.id === params.id)
    if (site) {
      site.status = 'publish'
      Vue.ls.set('sites', siteList)
      return {errcode: 0, data: 'published'}
    } else {
      return {errcode: 102, errmsg: 'this site is not exist'}
    }
  } else {
    return {errcode: 101, errmsg: 'param id is need'}
  }
})

// 保存站点
Mock.mock(/\/api\/save\/site/, 'post', req => {
  const site = JSON.parse(req.body)
  const temp = siteList.find(d => d.id === site.id)
  temp.name = site.name
  temp.utime = new Date().getTime()
  Vue.ls.set('sites', siteList)
  Vue.ls.set('site-' + site.id, site.boxs)
  return {errcode: 0, errmsg: 'saved'}
})

// 获取站点列表
Mock.mock(/\/api\/sites/, 'get', {errcode: 0, data: Vue.ls.get('sites') || []})

// 获取模版详情
Mock.mock(/\/api\/template/, 'get', req => {
  const params = getQueryParameters(req)
  if (params && params.id) {
    const data = templateList.find(d => d.id === params.id)
    if (data) {
      return {errcode: 0, data: data}
    } else {
      return {errcode: 103, errmsg: 'this template is not exist'}
    }
  } else {
    return {errcode: 101, errmsg: 'param id is need'}
  }
})

// 获取站点详情
Mock.mock(/\/api\/site/, 'get', req => {
  const params = getQueryParameters(req)
  if (params && params.id) {
    const site = siteList.find(d => d.id === params.id)
    if (site) {
      site.boxs = Vue.ls.get('site-' + site.id) || []
      return {errcode: 0, data: site}
    } else {
      return {errcode: 102, errmsg: 'this site is not exist'}
    }
  } else {
    return {errcode: 101, errmsg: 'param id is need'}
  }
})

// 站点初始化
Mock.mock(/\/api\/init\/site/, 'post', req => {
  const template = JSON.parse(req.body)
  const sid = Random.uuid().replace(/-/g, '')
  siteList.push({
    id: sid,
    name: template.name,
    utime: new Date().getTime(),
    ctime: new Date().getTime()
  })
  Vue.ls.set('sites', siteList)
  Vue.ls.set('site-' + sid, template.boxs)
  return {errcode: 0, data: sid}
})
