import Vue from 'vue'
import dayjs from 'dayjs'
// 引入中文语言包
import 'dayjs/locale/zh-cn'
// 使用相对时间 插件
import RelativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(RelativeTime)
// 注册
dayjs.locale('zh-cn')
// 测试
// console.log(dayjs().format('DD/MM/YYYY'), 'day')
// 注册全局过滤器
Vue.filter('RelativeTime', value => {
  return dayjs().to(dayjs(value))
})
