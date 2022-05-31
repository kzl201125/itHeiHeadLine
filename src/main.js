import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局样式
import './styles/index.less'

import 'amfe-flexible'

// 自动引入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/utils/dayjs'
import Follow from '@/components/FollowButton.vue'

Vue.component('Follow', Follow)

Vue.use(Vant)
Vue.directive('tab', {
  inserted (el, binding) {
    const tab = el.querySelector('.van-tabs__wrap')
    tab.className = 'van-tabs__wrap van-tabs__wrap--scrollable'
  },
  update (el, binding) {
    const tab = el.querySelector('.van-tabs__wrap')
    tab.className = 'van-tabs__wrap van-tabs__wrap--scrollable'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
