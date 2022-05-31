import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/login',
    // component: Login,
    component: () =>
      import('@/views/login'),
    name: 'login'
  },
  {
    path: '/layout',
    component: () =>
      import('@/views/layout'),
    name: 'layout',
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home'),
        name: 'home'
      },
      {
        path: 'questions',
        component: () => import('@/views/questions'),
        name: 'questions'
      },
      {
        path: 'video',
        component: () => import('@/views/video'),
        name: 'video'
      },
      {
        path: 'my',
        component: () => import('@/views/my'),
        name: 'my'
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/search'),
    name: 'search'
  },
  {
    path: '/user/profile',
    component: () => import('@/views/user')
  },
  {
    path: '/article/:article',
    component: () => import('@/views/article'),
    name: 'article',
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
