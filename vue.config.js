const vueConfig = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  productionSourceMap: false
}

// 发布在show.longjitech.com上的多页应用
if (process.env.VUE_APP_PROJECT === 'SITE') {
  vueConfig.pages = {site: 'src/main-site.js'}
} else if (process.env.VUE_APP_PROJECT === 'DEMO') {
  vueConfig.pages = {demo: 'src/main-demo.js'}
} else if (process.env.VUE_APP_PROJECT === 'FLOW') {
  vueConfig.pages = {flow: 'src/main-flow.js'}
} else if (process.env.VUE_APP_PROJECT === 'QYWX') {
  vueConfig.pages = {qywx: 'src/main-qywx.js'}
} else {
  vueConfig.pages = {
    site: 'src/main-site.js',
    demo: 'src/main-demo.js',
    flow: 'src/main-flow.js',
    qywx: 'src/main-qywx.js'
  }
}

module.exports = vueConfig
