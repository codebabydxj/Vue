// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'
import './routerFilter'
// 时间转换插件
import moment from 'moment/moment'
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY/MM/DD';
  return moment(value).format(formatString); // value可以是普通日期 20170723
  //return moment.unix(value).format(formatString); // 这是时间戳转时间
});


import '@/styles/index.scss'
// 按需引入element-ui组件
// import './importElement/index'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
Vue.config.productionTip = false
//引入多级联动插件
import EleMultiCascader from "ele-multi-cascader"
Vue.use(EleMultiCascader)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
