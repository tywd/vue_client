import { Toast } from 'vant'
// .toast-tip 写在 import '@/assets/scss/index.scss'
// 可参考文档 https://youzan.github.io/vant/#/zh-CN/toast
const success = (msg = '操作成功', state = 'success', time = 2000, maskBool = false) => {
  Toast({
    type: state, // toast的类型
    message: msg, // toast提示语
    duration: time, // toast出现的时长
    mask: maskBool, // 是否加入mask遮罩层
    className: 'toast-tip' // toast弹框的样式
  })
}
const fail = (msg = '操作失败', state = 'fail', time = 2000, maskBool = false) => {
  Toast({
    type: state,
    message: msg,
    duration: time,
    mask: maskBool,
    className: 'toast-tip'
  })
}
const loading = (msg = '加载中...', state = 'loading', time = 2000, maskBool = false) => {
  Toast({
    type: state,
    message: msg,
    duration: time,
    mask: maskBool,
    className: 'toast-tip'
  })
}

export default {
  success,
  fail,
  loading
}
// 用法
// this.$toastTip.success() // 成功
// this.$toast.clear() // 清除所有，这个方法就一行不需要再配置，用原来vant的就行
