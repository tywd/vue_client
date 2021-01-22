// 获取地址栏参数
export const getQueryString = name => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export function urlParams(route, isObj = true) {
  let query = route.query
  let res = {
    token: query.token || '',
    login_user_id: query.login_user_id || '',
    os: query.os || '',
    deviceId: query.deviceId || '',
    channel: query.channel || '',
    version: query.version || '',
    status_height: query.status_height || '',
    canRefresh: query.canRefresh || 0,
    appearTopBar: query.appearTopBar || 0,
    transparentStatusBar: query.transparentStatusBar || 0
  }
  if (isObj) {
    return res
  } else {
    let arr = []
    for (let i in res) {
      arr.push(i + '=' + res[i])
    }
    return arr.join('&')
  }
}