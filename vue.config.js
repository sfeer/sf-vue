const path = require('path')

const pageNames = []
if (process.env.VUE_APP_PAGES) {
  pageNames.push(...process.env.VUE_APP_PAGES.split(','))
}

let pages
if(process.env.NODE_ENV === 'production') {
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

  pages: pages,

  productionSourceMap: false
}

module.exports = vueConfig
