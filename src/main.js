// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import services from '@/services'

// self plugins
Vue.use(elementUI)
Vue.prototype.$service = services
Vue.prototype.qs = qs
Vue.prototype.axios = axios
Vue.config.productionTip = false

// 全局变量
Vue.prototype.local_user_name = ''
Vue.prototype.local_user_img = ''

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
