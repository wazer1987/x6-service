// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
// 用来配置文件的别名，方便路径的寻找
const path = require('path')// 引入path模块
function resolve (dir) {
  return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
    // set第一个参数：设置的别名，第二个参数：设置的路径
      .set('@', resolve('./src'))// 根据目录的层级来决定，也可以自行设
    // .set('components',resolve('./src/components'))
    // .set('views',resolve('./src/views'))
    // .set('assets',resolve('./src/assets'))
    config.plugin('html').tap((args) => {
      args[0].title = '高伟达软件股份有限公司'
      return args
    })
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/common.scss";'
      }
    }
  }
}
