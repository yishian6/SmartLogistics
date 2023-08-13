import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/index'
    },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: '/index',
          component: () => import('@/views/layout/LayoutBody.vue'),
          meta: { title: "首页" }
        },
        {
          path: '/job',
          component: () => import('@/components/Job.vue'),
          meta: { title: "岗位招聘" }
        },
        {
          path: '/job/page/:id',
          component: () => import('@/components/JobPage.vue'),
          meta: { title: "岗位信息" }
        },
        {
          path: '/news',
          component: () => import('@/components/News.vue'),
          meta: { title: "新闻传递" }
        },
        {
          path: '/news/page/:id/:newsType',
          component: () => import('@/components/NewsPage.vue'),
          meta: { title: "新闻信息" }
        },
        {
          path: '/aboutus',
          component: () => import('@/components/AboutUs.vue'),
          meta: { title: "联系我们" }
        },
        {
          path: '/center',
          component: () => import('@/components/Center.vue'),
          meta: { title: "个人中心" }
        },
        // {
        //   path: '/center',
        //   component: () => import('@/components/JobChat.vue'),
        //   meta: { title: "个人中心" }
        // },
      ]
    }

  ],
  // 路由滚动行为定制
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
