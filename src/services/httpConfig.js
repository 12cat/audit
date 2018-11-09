import axios from 'axios'
import Vue from 'vue'

axios.defaults.withCredentials = true

// 影响拦截器，可以自定义 预处理内容
axios.interceptors.response.use(
  function (response) {
    // 接口参数，权限问题，统一提示，然后错误（业务模块选择性处理）
    if (!response.data.success) {
      Vue.prototype.$message.error(response.data.error.message)
      return Promise.reject(response.data.error)
    }
    return response
  },
  function (error) {
    // 网络问题，通过2种方式提示，业务不处理
    Vue.prototype.$message.error(error.toString())
    console.error(error)
  }
)
