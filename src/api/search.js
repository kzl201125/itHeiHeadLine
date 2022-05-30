import request from '@/utils/request'

// 获取联想建议（自动补全）
export const getSearchSugguestiomList = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索结果
export const getSearhResultList = params => {
  return request({
    url: '/v1_0/search',
    params
  })
}
