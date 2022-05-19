import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  // component: Login,
  component: () =>
    import('@/views/login'),
  name: 'login'
}
]

const router = new VueRouter({
  routes
})

export default router
