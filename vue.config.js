let pages
if (process.env.VUE_APP_PROJECT === 'SITE') {
  pages = {site: 'src/main-site.js'}
} else if (process.env.VUE_APP_PROJECT === 'DEMO') {
  pages = {demo: 'src/main-demo.js'}
} else if (process.env.VUE_APP_PROJECT === 'FLOW') {
  pages = {flow: 'src/main-flow.js'}
} else if (process.env.VUE_APP_PROJECT === 'QYWX') {
  pages = {flow: 'src/main-qywx.js'}
} else {
  pages = {
    site: 'src/main-site.js',
    demo: 'src/main-demo.js',
    flow: 'src/main-flow.js',
    qywx: 'src/main-qywx.js'
  }
}

module.exports = {
  pages: pages,

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  productionSourceMap: false
}
