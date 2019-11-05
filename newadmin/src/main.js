// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";

// 绑定到原型
Vue.prototype.$axios = axios;

//设置默认的 api 域名
axios.defaults.baseURL = "http://127.0.0.1:3000";

Vue.config.productionTip = false;
// 引入 ui 库
import ElementUI from "element-ui";
// 引入 css
import "element-ui/lib/theme-chalk/index.css";

// 使用请求拦截默认放上我们的token
axios.interceptors.request.use(config => {
  if (!config.headers.Authorization && localStorage.getItem("token")) {
    config.headers.Authorization = localStorage.getItem("token");
  }
  return config;
});
// 如果我想设置一个公共函数,在组件内可以直接用 this.xxx 调用
// 那么可以使用 Vue.prototype 来进行定义
Vue.prototype.$fixImgUrl = function(url) {
  // 如果这个 url 没有 http 这个部分
  // 我就要默认带上 axios 的基准路径
  var res = "";
  if (url.indexOf("http") < 0) {
    res = axios.defaults.baseURL + url;
  } else {
    res = url;
  }
  return res;
};
// 添加错误拦截
router.beforeEach((to, from, next) => {
  if (to.path != "/login") {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});
//注册组件库
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
