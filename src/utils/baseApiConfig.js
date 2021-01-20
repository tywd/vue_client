const running = true; //true正式环境 false测试环境
let host = location.host

// 正式环境和预发布环境
if (host.port === '') {
  running = true
} else {
  running = false
}

// TODO 域名 测试环境与生产环境存在不同的域名origin配置
const runningApi = {
  apiTy: 'https://tywd.com/',
  apiTyDevelop: 'https://cjtywd.com/'
}

const developApi = {
  apiTy: 'https://tywd.com/',
  apiTyDevelop: 'https://cjtywd.com/'
}

export default {
  isDev: !running,
  getTy: function () {
    if (running) {
      return running.apiTy;
    } else {
      return developApi.apiTy;
    }
  },
  getTyDevelop: function () {
    if (running) {
      return running.apiTyDevelop;
    } else {
      return developApi.apiTyDevelop;
    }
  }
}