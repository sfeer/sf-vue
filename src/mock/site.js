// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  const Mock = require('mockjs')
  require('./services/site')

  Mock.setup({
    timeout: 800 // setter delay time
  })
  console.log('[mockjs]', '模式数据加载完毕')
}