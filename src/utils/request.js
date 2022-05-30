import axios from 'axios'
import state from '@/store'

import JSONBIG from 'json-bigint'
// import { parse } from 'json-bigint'

const request = axios.create({
  baseURL: 'http://localhost:8000/', // 基础路径
  transformResponse: [function (data) {
    // 后台返回的数据json字符串格式 统一处理后台返回的数据 防止出现大数据精度丢失问题
    try {
      // 防止后台直接返回 普通字符串形式的数据 导致解析失败的情况
      return JSONBIG.parse(data)
      // return parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 处理数值大问题
// const json = '{"value" : 9223372036854775807, "v2" : 123}'
// console.log(JSON.parse(json))
// console.log(JSON.parse(json).value)
// console.log(JSONBIG.parse(json).value.toString())

// 请求拦截
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = state.state
  if (user && user.token) {
    // console.log(config)
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default request
