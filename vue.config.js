const path = require('path')

const vueConfig = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 预渲染
      const PrerenderSPAPlugin = require('prerender-spa-plugin')
      const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/view/5DF1Bdf4d239c11B2Af7E2567DB41DE3'],
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

  productionSourceMap: false
}

module.exports = vueConfig
