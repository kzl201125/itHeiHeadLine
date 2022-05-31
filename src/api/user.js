import request from '@/utils/request'

// 用户验证
export const login = data => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}
// 发送短信验证码
export const getSmsCode = mobile => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'get'
  })
}
// 获取用户频道
export const getUserInfoList = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 获取所有频道列表
export const getAllUserInfoList = () => {
  return request({
    url: '/v1_0/channels'
  })
}
// 设置用户的频道（部分覆盖）
export const addUserChannels = channels => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels
    }
  })
}
// 删除指定用户频道
export const deleteUserChannels = target => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
// 获取个人信息
export const getUserProfile = params => {
  return request({
    url: '/v1_0/user/profile',
    params
  })
}
// 编辑用户个人资料
export const getUpdateProfile = data => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
export const getUpdatePhotoProfile = data => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
