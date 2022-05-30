import request from '@/utils/request'
// 获取文章新闻推荐
export const getUserList = params => {
  return request({
    url: '/v1_0/articles',
    params
  })
}

// 获取新闻详情
export const getArticlrDetail = article => {
  return request({
    url: `/v1_0/articles/${article}`
  })
}

// 关注用户
export const getArticlrFollow = params => {
  return request({
    url: '/v1_0/user/followings',
    method: 'post',
    data: {
      target: params
    }
  })
}
// 取消关注用户
export const getArticlrFollowDel = params => {
  return request({
    url: `/v1_0/user/followings/${params}`,
    method: 'DELETE'
  })
}
// 获取评论或评论回复
export const getArticleDscuss = params => {
  return request({
    url: '/v1_0/comments',
    params
  })
}

// 对文章或者评论进行评论
export const getArticleComment = params => {
  return request({
    url: '/v1_0/comments',
    method: 'post',
    data: params
  })
}
