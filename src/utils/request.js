import axios from 'axios'
import state from '@/store'
import router from '@/router'

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

// 响应拦截器
request.interceptors.response.use(
  // 响应成功进入第1个函数
  // 该函数的参数是响应对象
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  // 响应失败进入第2个函数，该函数的参数是错误对象
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 如果响应码是 401 ，则请求获取新的 token
    // 响应拦截器中的 error 就是那个响应的错误对象
    console.dir(error)
    if (error.response && error.response.status === 401) {
      // 校验是否有 refresh_token
      const user = state.state.user
      if (!user || !user.refresh_token) {
        router.push('/login')

        // 代码不要往后执行了
        return
      }
      // 如果有refresh_token，则请求获取新的 token
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://localhost:8000/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        // 如果获取成功，则把新的 token 更新到容器中
        console.log('刷新 token  成功', res)
        state.commit('setUser', {
          token: res.data.data.token, // 最新获取的可用 token
          refresh_token: user.refresh_token // 还是原来的 refresh_token
        })
        // 把之前失败的用户请求继续发出去
        // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
        // return 把 request 的请求结果继续返回给发请求的具体位置
        return request(error.config)
      } catch (err) {
        // 如果获取失败，直接跳转 登录页
        console.log('请求刷线 token 失败', err)
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)
export default request
