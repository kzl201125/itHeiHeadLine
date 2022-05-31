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

// 收藏文章
export const getArticleCollect = target => {
  return request({
    url: '/v1_0/article/collections',
    method: 'post',
    data: {
      target
    }
  })
}

// 取消收藏
export const getArticleCollectDel = target => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
// 对文章点赞
export const getArticleLiking = target => {
  return request({
    url: '/v1_0/article/likings',
    method: 'post',
    data: {
      target
    }
  })
}
// 对文章不喜欢
export const getArticleLike = target => {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'post',
    data: {
      target
    }
  })
}
// 取消对文章点赞
export const getArticleLikingDel = target => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
// 取消对文章不喜欢
export const getArticleLikeDel = target => {
  return request({
    url: `/v1_0/article/dislikes/${target}`,
    method: 'DELETE'
  })
}
