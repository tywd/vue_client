const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const IS_DEV = ["development"].includes(process.env.NODE_ENV);
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 引入生产环境中console数据清掉 插件
const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      ['/' + process.env.BASE_URL + '/']: {
        target: process.env.VUE_APP_BASE_URL, // api主机
        // target: IS_DEV ? hostname_test : hostname, // api主机
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        secure: false, // 如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/apit': ''
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