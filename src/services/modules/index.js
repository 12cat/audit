import axios from 'axios'
import login from './login'
import review from './review'
import setting from './setting'

// api 为代理字段， 代理配置请查看 config/index.js  dev环境的 proxyTable
const baseUrl = 'api/'
// const baseUrl = ''
let obj = {}
let arr = [login, review, setting]

arr.forEach(p => {
  obj[p.category] = {}
  p.pathList.forEach(v => {
    obj[p.category][v.key] = param => {
      if (v.type === 'post') {
        return axios.post(baseUrl + v.url, param)
      }
      if (v.type === 'get') {
        return axios.get(baseUrl + v.url, {params: param})
      }
    }
  })
})

export default obj
