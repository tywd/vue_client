import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from './utils/axios' // axios请求与相应拦截
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios // axios请求放入全局
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
