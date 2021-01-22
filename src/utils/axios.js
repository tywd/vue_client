/**
 * 配置拦截器 和 全局地址 token
 */
import axios from 'axios'
import { Toast } from 'vant'
import { getQueryString,urlParams } from './plugins'
// import qs from 'qs' // 引入qs模块，用来序列化post类型的数据，某些请求会用得到
// 创建axios实例
let httpAxios = axios.create({
  // baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000, // 请求时间
  responseType: 'json', // 默认的 // 表示服务器响应的数据类型
  headers:{
    'Content-Type': 'application/json charset=utf-8'
  }
})

// 环境切换
if (process.env.NODE_ENV === 'development') {
  // 开发环境下的代理地址，解决本地跨域，配置在config目录下的index.js dev.proxyConfig中
  httpAxios.defaults.baseURL = process.env.VUE_APP_BASE_URL
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境
  httpAxios.defaults.baseURL = process.env.VUE_APP_BASE_URL
}
// post请求提交的是json格式的数据，则content-type如下
// httpAxios.defaults.headers.post['Content-Type'] = 'application/json charset=utf-8'
// 如果要将content-type改为如下，则需在post的时候，将post的数据data 进行序列化 ：qs.stringify(data)
// httpAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // 默认值

/*  在请求或响应被 then 或 catch 处理前拦截它们。 */
/**
 * 设置拦截器 request请求拦截
 */
httpAxios.interceptors.request.use(config => {
  // 发送请求前做些什么
  // 根据条件加入token-安全携带
  // eslint-disable-next-line no-constant-condition
  if (getQueryString('token')) { // 需自定义 // 判断是否存在token，如果存在的话，则每个http header都加上token
    // 让每个请求携带token
    config.headers.Authorization = getQueryString('token')
  }
  return config
}, error => {
  // 请求错误处理
  return Promise.reject(error)
})

/**
 * 设置拦截器 response响应拦截
 */
httpAxios.interceptors.response.use(res => {
  console.info(res)
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (res.status === 200) {
    return Promise.resolve(res.data);
  } else {
    return Promise.reject(res);
  }
}, error => {
  // 对响应错误时
  if (error && error.res) {
    switch (error.res.rtn) {
      case 400:
        if (error.response && error.response.data && error.response.data.msg) {
          console.log('400错误=', error.response.data.msg)
          // redirect( '/error?status=408&'+urlParams(route, false))
          redirect( '/error?status=400')
        }
        break
      
      default:
        error.message = `未知错误${error.res.status}`
    }
  } else {
    error.message = '连接到服务器失败'
  }
  return Promise.reject(error)
})

export default httpAxios

// 是否销毁拦截器
// 1.给拦截器起个名称 var myInterceptors = instance.interceptors.requesst.use()
// 2.httpAxios.interceptors.request.reject(myInterceptor)
// var myInterceptor = httpAxios.interceptors.request.use(function () {/*...*/})
// httpAxios.interceptors.request.eject(myInterceptor)
