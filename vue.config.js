'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-leju-jiangwan/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 跨域 :  协议  域名  端口 任意一个不同 就会产生跨域
    // 浏览器的同源策略导致的 在页面中 通过js语法访问其他域的数据会被限制
    // 解决跨域:
    // 1. 如果是开发阶段,可以通过配置webpack.devServer.proxy 来解决
    // 2. 如果打包部署继承到了后台,webpack失效,但是也不存在跨域了(协议,域名,端口都一致了)
    // 3. 特殊> 如果打包后,前台项目单独部署(apache/nginx等启动),跨域依然存在
    //     - a.后台配置cors忽略跨域请求的主机
    //         .  https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS
    //     - b.后台配置nginx
    // proxy对象  webpack给我们配置的一个代理  解决跨域问题
    // 跨域
    //   1. 开发
    //     a) webpack devServer  proxy 配置代理
    //     b) cors 后台配置跨域资源共享 可以实现前台无感知请求数据
    //     c) nginx 解决跨域
    //   2. 生成环境
    //     a) 集成到后台  不存在跨域了
    //     b) 如果是前台独立部署
    //       i) 后他开启cors配置
    //       ii) 前台发送的是相对请求,改成绝对地址 axios.baseURL
    proxy: {
      // 配置代理 希望拦截当前的host地址 替换为目标地址
      // key: {}   ;  key为拦截的规则,可以是正则表达式
      '/(api|admin|lejuAdmin)': {
        target: 'http://leju.bufan.cloud', // 8080可以省略不写 所以代理地址和当前项目不是同一个地址!!
        changeOrigin: true, // 如果是跨域 需要添加
        secure: false,
        pathRewrite: {
          // ['/xxx']: '/yyy'
        }
      }
    },
    // 开发时将此处的before修改为after 用mock模拟的一个登陆服务  开发时不需要的  包括整个的登陆逻辑
    after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
