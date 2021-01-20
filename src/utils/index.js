import store from '@/store'

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  store.commit('resetStore')
}
