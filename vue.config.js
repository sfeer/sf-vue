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
    if (process.env.NODE_ENV === 'production') { // 生产环境
      // 配置gizp压缩 https://github.com/webpack-contrib/compression-webpack-plugin
      const CompressionWebpackPlugin = require('compression-webpack-plugin')
      const productionGzipExtensions = ['js', 'css'] // 定义压缩文件类型
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240 // 大于10kb的会压缩
        })
      )
    } else { // 开发环境
    }
  },

  publicPath: process.env.NODE_ENV === 'production' ? '/sf-vue/' : '/',

  css: {
    extract: {ignoreOrder: true},
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
        // target: 'http://117.149.2.233:8081/ewebeditor/',
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

  productionSourceMap: false, // 是否提供sourcemap

  // transpileDependencies: ['ant-design-vue']
}

module.exports = vueConfig
