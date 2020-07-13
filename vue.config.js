const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production' // 生产环境

// 多页打包配置
const pageNames = process.env.VUE_APP_PAGES ? process.env.VUE_APP_PAGES.split(',') : []
const pages = {index: 'src/main.js'}
pageNames.forEach(d => {
  pages[d] = `src/main-${d}.js`
})

// cdn配置
const assetsCDN = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    'vue-ls': 'VueStorage'
  },
  css: [],
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/vue-ls@3.2.1/dist/vue-ls.min.js'
  ]
}

const vueConfig = {
  configureWebpack: config => {
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    if (isProd) {
      // 配置gizp压缩 https://github.com/webpack-contrib/compression-webpack-plugin
      const CompressionWebpackPlugin = require('compression-webpack-plugin')
      const productionGzipExtensions = ['js', 'css'] // 定义压缩文件类型
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240 // 大于10kb的会压缩
        })
      )
      config.externals = assetsCDN.externals
      config.optimization.splitChunks.cacheGroups['ant-design-vue'] = {
        name: 'ant-design-vue',
        test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
        priority: -9,
        chunks: 'initial'
      }
    }
  },

  chainWebpack: config => {
    if (isProd) {
      Object.keys(pages).forEach(d => {
        config.plugin('html-' + d).tap(args => {
          args[0].cdn = assetsCDN
          return args
        })
      })
    }
  },

  publicPath: isProd ? '/sf-vue/' : '/',

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
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

  pages: isProd ? pages : undefined,

  productionSourceMap: false, // 是否提供sourcemap

  // transpileDependencies: ['ant-design-vue']
}

module.exports = vueConfig
