/**
 * 配置拦截器 和 全局地址 token
 */
import axios from 'axios'
// import qs from 'qs' // 引入qs模块，用来序列化post类型的数据，某些请求会用得到
// 创建axios实例
let httpAxios = axios.create({
  timeout: 10000, // 请求时间
  responseType: 'json', // 默认的 // 表示服务器响应的数据类型
  headers:{
    'Content-Type': 'application/json charset=utf-8'
  }
})
// post请求提交的是json格式的数据，则content-type如下
httpAxios.defaults.headers.post['Content-Type'] = 'application/json charset=utf-8'
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
  if (localStorage.getItem('token')) { // 需自定义 // 判断是否存在token，如果存在的话，则每个http header都加上token
    // 让每个请求携带token
    config.headers.Authorization = 'Bearer' + localStorage.getItem('token')
  }
  return config
}, error => {
  // 请求错误处理
  return Promise.reject(error)
})

/**
 * 设置拦截器 response响应拦截
 */
httpAxios.interceptors.response.use(response => {
  console.info(response)
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
}, error => {
  // 对响应错误时
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        // 清除token信息并跳转到登录页面
        localStorage.removeItem('Authorization')
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000);
        break
      case 403:
        // 403 token过期
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误，未找到该资源！'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `未知错误${error.response.status}`
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
