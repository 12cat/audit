/**
 * 审核部分接口url配置
 */

export default {
  category: 'review',
  pathList: [
    {key: 'getList', type: 'post', url: 'classify/goSearch'},
    {key: 'getData', type: 'get', url: 'classify/getMoreProduct'}
  ]
}
