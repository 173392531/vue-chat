// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';
//引入中英文切换插件vue-i18n
import VueI18n from 'vue-i18n'

Vue.use(VueI18n) // 挂载
Vue.use(Vant);
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识
  messages: {
    'en-US': require('./lang/en.js'),
    'zh-CN': require('./lang/zh.js')
  }
})


// 在vue原型中添加$http方法等于axios
Vue.prototype.$http = axios
// 设置默认打开的页面
router.replace('message')

/* eslint-disable no-new */
var vm= new Vue({
  el: '#app',
  router,
  store,
  data:{
    eventBus:new Vue(),
  },
  i18n,
  components: { App },
  template: '<App/>',
  // 组件创建前，进行异步数据数据请求
  beforeCreate() {
    this.$store.dispatch('getAllData', this)
  }
})
window.vm=vm
