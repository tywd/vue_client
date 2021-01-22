function reHttpVer(url) {
  return '/v3' + url
}
export const apis = {
  appoint: reHttpVer('/broadcast/detail'), // 直播预约详情
  appointCreate: reHttpVer('/broadcast/subscribe/create'), // 提交直播预约
  appointList: reHttpVer('/broadcast/subscribe/list'), // 直播预约列表
  myWallet: reHttpVer('/my/wallet'), // 钱包余额
  productList: reHttpVer('/product/list'), // 充值产品列表
  payType: reHttpVer('/order/pay_type'), // 支付方式
  recharge: reHttpVer('/product/create'), // 充值
  buyBroadcast: reHttpVer('/order/buy_broadcast'), // 购买直播或点播视频
  payType: reHttpVer('/order/pay_type'), // 支付方式
  payStatus: reHttpVer('/order/pay_status'), // 支付状态
  payOrderCancel: reHttpVer('/order/cancel'), // 取消订单
  companyVerify: reHttpVer('/broadcast/code/verify'), // 预告企业邀请码验证
  userInfo: reHttpVer('/my/profile'), // 个人信息
  redbagList: reHttpVer('/redbag/my'), // 我的红包列表
  redbagChange: reHttpVer('/redbag/change'), // 我的红包列表
  starList: reHttpVer('/star/index'), // 星缘首页 参数 listType sign: 星光招募, vote: 海选投票, my: 我的报名
  history: reHttpVer('/my/history'), // 浏览记录
  myOrder: reHttpVer('/my/order'), // 我的订单
  broadcastDetail: reHttpVer('/broadcast/detail'), // 直播间
}