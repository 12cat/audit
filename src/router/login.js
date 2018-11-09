/**
 * 登录模块 路由配置
 */

export default {
  path: '/login',
  name: 'login',
  meta: {
    notAuth: true,
    pathName: '登录页'
  },
  component: () => import('@/routes/login')
}
