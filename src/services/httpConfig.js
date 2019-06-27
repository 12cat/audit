import axios from 'axios'
import Vue from 'vue'

axios.defaults.withCredentials = true
axios.defaults.timeout = 5000

// 请求拦截器，可以自定义 预处理内容
axios.interceptors.request.use(request => {
  Vue.prototype.$store.commit('showLoading')
  return request
}, error => {
  Vue.prototype.$message.error('ERROR: ' + error.toString())
  return Promise.reject(error)
})

// 影响拦截器，可以自定义 预处理内容
axios.interceptors.response.use(response => {
  // 接口参数，权限问题，统一提示，然后错误（业务模块选择性处理）
  Vue.prototype.$store.commit('hideLoading')
  if (response.data.code === '000000') {
    return response.data.data
  } else if (response.data.code === '000050') {
    Vue.prototype.$message.error('请登录')
    location.href = `${location.origin}${location.port ? ':' : ''}${location.port}/#/login`
    return Promise.reject(response.data.msg)
  } else {
    Vue.prototype.$message.error(response.data.msg)
    return Promise.reject(response.data.msg)
  }
}, err => {
  // 网络问题，通过2种方式提示，业务不处理
  Vue.prototype.$store.commit('hideLoading')
  Vue.prototype.$message.error('ERROR: ' + err.toString())
  return Promise.reject(err)
})
