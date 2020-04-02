const path = require('path')

const pageNames = []
if (process.env.VUE_APP_PAGES) {
  pageNames.push(...process.env.VUE_APP_PAGES.split(','))
}

let pages
if (process.env.NODE_ENV === 'production') {
  pages = {index: 'src/main.js'}
  pageNames.forEach(d => {
    pages[d] = `src/main-${d}.js`
  })
} else {
  pages = undefined
}

const vueConfig = {
  configureWebpack: config => {
    if (process.env.VUE_APP_PRERENDER === 'true') {
      // 网站预渲染
      const PrerenderSPAPlugin = require('prerender-spa-plugin')
      const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/'],
          renderer: new Renderer({
            headless: false,
            renderAfterDocumentEvent: 'render-event'
          })
        })
      )
    }
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    proxy: {
      '/ewebeditor': {
        target: 'http://192.168.0.78:8080/ewebeditor/',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {'^/ewebeditor': ''}
      },

      '/websocket': {
        target: 'http://127.0.0.1:9000/',
        ws: true,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {'^/websocket': ''}
      }
    }
  },

  pages: pages,

  productionSourceMap: false,

  // transpileDependencies: ['ant-design-vue']
}

module.exports = vueConfig
