import axios from 'axios'
import state from '@/store'

const request = axios.create({
  baseURL: 'http://localhost:8000/' // 基础路径
})

// 请求拦截
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = state.state
  if (user && user.token) {
    console.log(config)
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default request
