const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const IS_DEV = ["development"].includes(process.env.NODE_ENV);
const hostname = 'https://api.ibrolive.cn'
const hostname_test = 'https://apit.ibrolive.cn'
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 引入生产环境中console数据清掉 插件
const path = require("path");

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1,
  pwa: {},
  devServer: {
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        // target: hostname, // api主机
        target: process.env.NODE_ENV === 'development' ? hostname_test : hostname, // api主机
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        secure: false, // 如果是https接口，需要配置这个参数
        pathRewrite: {
          ['^/'+process.env.VUE_APP_BASE_URL]: ''
        }
      }
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", path.join(__dirname, "src"))
      .set("@/api", path.join(__dirname, "api"))
      .set("@/assets", path.join(__dirname, "src/assets"))
      .set("@/components", path.join(__dirname, "src/components"))
      .set("@/utils", path.join(__dirname, "src/utils"))
      .set("@/store", path.join(__dirname, "src/store"))
  },
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, //console
              drop_debugger: false,
              pure_funcs: ["console.log"] //移除console
            }
          }
        })
      ]
    }
  },
};