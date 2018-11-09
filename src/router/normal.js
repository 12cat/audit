/**
 * 业务模块 路由配置
 */
import Normal from '@/routes/normal'

export default {
  path: '',
  name: 'normal',
  component: Normal,
  children: [
    {
      path: '/setting',
      name: 'setting',
      meta: {
        pathName: '系统设置'
      },
      component: () => import('@/routes/normal/setting')
    },
    {
      path: '/review',
      name: 'review',
      meta: {
        pathName: '内容审核-复审'
      },
      component: () => import('@/routes/normal/review')
    }
  ]
}
